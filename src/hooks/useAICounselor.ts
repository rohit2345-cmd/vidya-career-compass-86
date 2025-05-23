
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAIResponse, streamAIResponse } from "../services/openRouterService";
import { saveChatMessage, getLatestAssessmentResult } from "../services/localStorageService";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export const useAICounselor = (assessmentResults?: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const isGuest = !localStorage.getItem("auth.token");
  const MAX_GUEST_MESSAGES = 5;

  // Fetch the latest assessment result if not provided
  useEffect(() => {
    if (!assessmentResults) {
      const latestResult = getLatestAssessmentResult();
      if (latestResult) {
        console.log("Using latest assessment result:", latestResult);
      }
    }
  }, [assessmentResults]);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      
      // Check guest message limit
      if (isGuest && messageCount >= MAX_GUEST_MESSAGES) {
        toast.error("You've reached the maximum number of messages as a guest. Please sign up to continue.");
        setIsLoading(false);
        return;
      }
      
      // Add user message to chat
      const userMessage: Message = { role: "user", content };
      setMessages(prev => [...prev, userMessage]);

      // Save user message to local storage
      saveChatMessage(content, "user");

      // Either use provided assessment results or get the most recent one
      const resultsToUse = assessmentResults || getLatestAssessmentResult();
      
      // Format messages for the API
      const apiMessages = messages.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));
      
      // Add the new user message
      apiMessages.push({
        role: "user",
        content
      });

      // Create a placeholder for the AI response with streaming flag
      setMessages(prev => [
        ...prev, 
        { role: "assistant", content: "", isStreaming: true }
      ]);

      // Initialize streaming response
      console.log("🚀 Starting AI response streaming...");
      
      try {
        await streamAIResponse(
          apiMessages,
          resultsToUse,
          // On each chunk received - update the streaming message immediately
          (chunk) => {
            console.log(`📝 Received chunk: "${chunk}"`);
            
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.isStreaming) {
                // Append the new chunk to existing content
                lastMessage.content += chunk;
              }
              return newMessages;
            });
          },
          // On complete
          () => {
            console.log("✅ Streaming complete");
            let finalContent = "";
            
            // Update streaming status and get final content
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage && lastMessage.isStreaming) {
                lastMessage.isStreaming = false;
                finalContent = lastMessage.content;
              }
              return newMessages;
            });
            
            // Save assistant message to local storage
            if (finalContent) {
              saveChatMessage(finalContent, "assistant");
            }
            setMessageCount(prevCount => prevCount + 1);
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error("Streaming failed, falling back to standard response:", error);
        
        try {
          // If streaming fails, fall back to non-streaming method
          const aiResponse = await getAIResponse(apiMessages, resultsToUse);
          
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.isStreaming) {
              lastMessage.content = aiResponse;
              lastMessage.isStreaming = false;
            }
            return newMessages;
          });
          
          saveChatMessage(aiResponse, "assistant");
          setMessageCount(prevCount => prevCount + 1);
        } catch (secondError) {
          toast.error("Failed to get response. Please try again.");
          console.error("Standard response also failed:", secondError);
          
          // Remove the placeholder streaming message if it exists
          setMessages(prev => prev.filter(msg => !msg.isStreaming));
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response. Please try again.");
      
      // Remove the placeholder streaming message if it exists
      setMessages(prev => prev.filter(msg => !msg.isStreaming));
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    messageCount,
    maxGuestMessages: MAX_GUEST_MESSAGES,
    isGuest,
  };
};

export default useAICounselor;
