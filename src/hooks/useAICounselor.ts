
import { useState } from "react";
import { toast } from "sonner";

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

      // Call edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-counselor`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          assessmentResults,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response to chat
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response.content,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setMessageCount(prevCount => prevCount + 1);

      // Store chat in database if possible
      try {
        await saveChatMessage(userMessage.content, "user", isGuest);
        await saveChatMessage(assistantMessage.content, "assistant", isGuest);
      } catch (error) {
        console.error("Could not save chat messages:", error);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveChatMessage = async (content: string, role: "user" | "assistant", isGuest: boolean) => {
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/chat_messages`, {
        method: "POST",
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          content,
          role,
          is_guest: isGuest
        }),
      });
    } catch (error) {
      console.error("Error saving chat message:", error);
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
