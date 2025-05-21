
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAIResponse } from "../services/openRouterService";
import { saveChatMessage, getLatestAssessmentResult } from "../services/localStorageService";

interface Message {
  role: "user" | "assistant";
  content: string;
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

      // Get response from AI
      const aiResponse = await getAIResponse(apiMessages, resultsToUse);
      
      // Add AI response to chat
      const assistantMessage: Message = {
        role: "assistant",
        content: aiResponse,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setMessageCount(prevCount => prevCount + 1);

      // Save assistant message to local storage
      saveChatMessage(aiResponse, "assistant");

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
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
