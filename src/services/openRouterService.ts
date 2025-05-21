
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

// Using Claude 2 model which works well with OpenRouter
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

// New streaming function for AI responses
export const streamAIResponse = async (
  messages: Message[],
  assessmentResults?: any,
  onChunk: (chunk: string) => void,
  onComplete: () => void
) => {
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
    
    // Add user messages
    messages.forEach(message => {
      conversationMessages.push(message);
    });
    
    console.log("Streaming from OpenRouter with model:", MODEL);
    
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
        stream: true, // Enable streaming
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter streaming error:", errorText);
      throw new Error(`API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    const decoder = new TextDecoder("utf-8");
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      // Decode the chunk
      const chunk = decoder.decode(value);
      
      // OpenRouter uses SSE format for streaming
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ") && line !== "data: [DONE]") {
          try {
            const jsonData = JSON.parse(line.substring(6)); // Remove "data: " prefix
            if (jsonData.choices && jsonData.choices[0]?.delta?.content) {
              const textChunk = jsonData.choices[0].delta.content;
              fullText += textChunk;
              onChunk(textChunk);
            }
          } catch (e) {
            console.error("Error parsing SSE data:", e);
          }
        }
      }
    }

    onComplete();
    return fullText;
  } catch (error) {
    console.error("OpenRouter streaming API error:", error);
    throw error;
  }
};

export default {
  getAIResponse,
  streamAIResponse
};
