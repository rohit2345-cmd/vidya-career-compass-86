
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import systemPrompt from "@/prompts/systemPrompt";
import initialResultsPrompt from "@/prompts/initialResultsPrompt";
import { useResultsData } from "./useResultsData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Message {
  role: string;
  content: string;
}

export const useAICounselor = () => {
  const [conversations, setConversations] = useState<Message[]>([]);
  const { resultsData } = useResultsData();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, isGuest } = useAuth();
  const [assessmentResultId, setAssessmentResultId] = useState<string | null>(null);

  // Function to load chat history from Supabase
  const loadChatHistory = async () => {
    try {
      if (!resultsData) return;

      // First, get the assessment result ID
      const { data: resultData } = await supabase
        .from('assessment_results')
        .select('id')
        .eq('assessment_type', resultsData.assessmentType)
        .order('completed_on', { ascending: false })
        .limit(1);

      if (resultData && resultData.length > 0) {
        setAssessmentResultId(resultData[0].id);
        
        // Then, get chat messages for this assessment result
        const { data: chatData } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('assessment_result_id', resultData[0].id)
          .order('created_at', { ascending: true });

        if (chatData && chatData.length > 0) {
          // Convert from database format to message format
          const messages = chatData.map((chat: any) => ({
            role: chat.role,
            content: chat.content
          }));
          setConversations(messages);
        } else {
          // Initialize with system prompt
          const initialPrompt = {
            role: "assistant",
            content: initialResultsPrompt(resultsData)
          };
          setConversations([initialPrompt]);
          // Save the initial message to the database
          saveMessage(initialPrompt, resultData[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  // Try to load chat history when resultsData is available
  useEffect(() => {
    if (resultsData) {
      loadChatHistory();
    }
  }, [resultsData]);

  // Save message to the database
  const saveMessage = async (message: Message, resultId: string | null) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user?.id || null,
          assessment_result_id: resultId,
          content: message.content,
          role: message.role,
          is_guest: isGuest
        });

      if (error) throw error;
    } catch (error) {
      console.error("Failed to save chat message:", error);
    }
  };

  // Get response from the Supabase Edge Function
  const getAIResponse = async (messages: Message[]) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://jtmnrgypcvyjwiqtqppd.supabase.co/functions/v1/ai-counselor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          assessmentResults: resultsData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    
    // Check if we've reached the limit for guest users
    const userMessages = conversations.filter(msg => msg.role === "user").length;
    if (isGuest && userMessages >= 5) {
      toast.error("You've reached the limit of 5 messages as a guest. Please sign up to continue.");
      return;
    }

    const userMessage = { role: "user", content: message };
    const updatedConversations = [...conversations, userMessage];
    
    setConversations(updatedConversations);
    setInputMessage("");
    
    // Save user message to the database
    if (assessmentResultId) {
      saveMessage(userMessage, assessmentResultId);
    }

    try {
      const aiResponse = await getAIResponse(updatedConversations);
      const assistantMessage = { role: "assistant", content: aiResponse.content };
      
      setConversations([...updatedConversations, assistantMessage]);
      
      // Save AI response to the database
      if (assessmentResultId) {
        saveMessage(assistantMessage, assessmentResultId);
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);
      toast.error("Failed to get a response. Please try again.");
      // Remove the user message if we couldn't get a response
      setConversations(conversations);
    }
  };

  return {
    conversations,
    inputMessage,
    setInputMessage,
    sendMessage,
    isLoading,
    isGuest,
    messageCount: conversations.filter(msg => msg.role === "user").length,
    maxGuestMessages: 5
  };
};
