
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { getAIResponse, streamAIResponse } from "../services/openRouterService";
import { saveChatMessage, getLatestAssessmentResult } from "../services/localStorageService";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export const useAICounselor = (assessmentResults?: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const streamingMessageRef = useRef<string>("");
  const isGuest = !localStorage.getItem("auth.token");
  const MAX_GUEST_MESSAGES = 5;

  // Fetch the latest assessment result if not provided
  useEffect(() => {
    if (!assessmentResults) {
      const latestResult = getLatestAssessmentResult();
      if (latestResult) {
        console.log("Using latest assessment result:", latestResult);
      }
    } else {
      console.log("Using provided assessment result:", assessmentResults);
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
      const userMessage: Message = { 
        id: `user-${Date.now()}`,
        role: "user", 
        content 
      };
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

      // Add specific context if we have open-ended assessment results
      let enhancedResults = resultsToUse;
      if (resultsToUse && resultsToUse.assessment_type === 'open-ended') {
        console.log("Enhancing context for open-ended assessment");
        enhancedResults = {
          ...resultsToUse,
          contextType: 'open-ended-assessment',
          detailedResponses: resultsToUse.questions || []
        };
      }

      // Create a placeholder for the AI response with streaming flag
      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = { 
        id: assistantMessageId,
        role: "assistant", 
        content: "", 
        isStreaming: true 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      streamingMessageRef.current = "";

      // Initialize streaming response
      console.log("🚀 Starting AI response streaming with assessment context...");
      
      try {
        await streamAIResponse(
          apiMessages,
          enhancedResults,
          // On each chunk received - update the streaming message immediately
          (chunk) => {
            console.log(`📝 Received chunk: "${chunk}"`);
            streamingMessageRef.current += chunk;
            
            // Force immediate UI update with the new chunk
            setMessages(prev => {
              return prev.map(msg => 
                msg.id === assistantMessageId 
                  ? { ...msg, content: streamingMessageRef.current }
                  : msg
              );
            });
          },
          // On complete
          () => {
            console.log("✅ Streaming complete");
            const finalContent = streamingMessageRef.current;
            
            // Update streaming status
            setMessages(prev => {
              return prev.map(msg => 
                msg.id === assistantMessageId 
                  ? { ...msg, content: finalContent, isStreaming: false }
                  : msg
              );
            });
            
            // Save assistant message to local storage
            if (finalContent) {
              saveChatMessage(finalContent, "assistant");
            }
            setMessageCount(prevCount => prevCount + 1);
            setIsLoading(false);
            streamingMessageRef.current = "";
          }
        );
      } catch (error) {
        console.error("Streaming failed, falling back to standard response:", error);
        
        try {
          // If streaming fails, fall back to non-streaming method
          const aiResponse = await getAIResponse(apiMessages, enhancedResults);
          
          setMessages(prev => {
            return prev.map(msg => 
              msg.id === assistantMessageId 
                ? { ...msg, content: aiResponse, isStreaming: false }
                : msg
            );
          });
          
          saveChatMessage(aiResponse, "assistant");
          setMessageCount(prevCount => prevCount + 1);
        } catch (secondError) {
          toast.error("Failed to get response. Please try again.");
          console.error("Standard response also failed:", secondError);
          
          // Remove the placeholder streaming message if it exists
          setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
        }
        setIsLoading(false);
        streamingMessageRef.current = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response. Please try again.");
      
      // Remove any placeholder streaming message
      setMessages(prev => prev.filter(msg => !msg.isStreaming));
      setIsLoading(false);
      streamingMessageRef.current = "";
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
