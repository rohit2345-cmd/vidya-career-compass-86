
/**
 * OpenRouter AI Service
 * Handles integration with OpenRouter API for AI responses
 */

import { systemPrompt } from "../prompts/systemPrompt";

// API key (would typically be stored in environment variables)
const OPENROUTER_API_KEY = "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";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

// Updated model to a valid OpenRouter model - Claude 2
const MODEL = "anthropic/claude-2";

export const getAIResponse = async (
  messages: Message[], 
  assessmentResults?: any
): Promise<string> => {
  try {
    // Create a new array for the conversation that can include all role types
    const conversationMessages: Message[] = [
      { role: "system", content: systemPrompt },
    ];
    
    // Add assessment results if provided
    if (assessmentResults) {
      conversationMessages.push({ 
        role: "system", 
        content: `Student's Assessment Results: ${JSON.stringify(assessmentResults)}` 
      });
    }
    
    // Add user messages - safely copying them to the conversation array
    messages.forEach(message => {
      conversationMessages.push(message);
    });
    
    console.log("Sending to OpenRouter with model:", MODEL);
    console.log("Messages:", JSON.stringify(conversationMessages));
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter error response:", errorData);
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data: OpenRouterResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API error:", error);
    throw error;
  }
};

export default {
  getAIResponse,
};
