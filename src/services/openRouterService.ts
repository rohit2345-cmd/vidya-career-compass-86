
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
    const conversationMessages: Message[] = [
      { role: "system", content: systemPrompt },
    ];
    
    if (assessmentResults) {
      conversationMessages.push({ 
        role: "system", 
        content: `Student's Assessment Results: ${JSON.stringify(assessmentResults)}` 
      });
    }
    
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

// Optimized streaming function for real-time AI responses
export const streamAIResponse = async (
  messages: Message[],
  assessmentResults: any | undefined,
  onChunk: (chunk: string) => void,
  onComplete: () => void
) => {
  try {
    const conversationMessages: Message[] = [
      { role: "system", content: systemPrompt },
    ];
    
    if (assessmentResults) {
      conversationMessages.push({ 
        role: "system", 
        content: `Student's Assessment Results: ${JSON.stringify(assessmentResults)}` 
      });
    }
    
    messages.forEach(message => {
      conversationMessages.push(message);
    });
    
    console.log("🚀 Starting real-time AI response streaming...");
    
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
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenRouter streaming error:", errorText);
      throw new Error(`API error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    console.log("✅ Stream reader initialized, starting to process chunks...");
    
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("✅ Stream completed");
        break;
      }
      
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      
      for (const line of lines) {
        if (line.startsWith("data: ") && line !== "data: [DONE]") {
          try {
            const jsonData = JSON.parse(line.substring(6));
            if (jsonData.choices && jsonData.choices[0]?.delta?.content) {
              const textChunk = jsonData.choices[0].delta.content;
              console.log(`📝 Streaming chunk: "${textChunk}"`);
              onChunk(textChunk);
            }
          } catch (e) {
            console.warn("⚠️ Error parsing SSE data:", e, "Line:", line);
          }
        } else if (line === "data: [DONE]") {
          console.log("🏁 Stream marked as [DONE]");
          break;
        }
      }
    }

    if (buffer.startsWith("data: ") && buffer !== "data: [DONE]") {
      try {
        const jsonData = JSON.parse(buffer.substring(6)); 
        if (jsonData.choices && jsonData.choices[0]?.delta?.content) {
          const textChunk = jsonData.choices[0].delta.content;
          console.log(`📝 Final chunk: "${textChunk}"`);
          onChunk(textChunk);
        }
      } catch (e) {
        console.warn("⚠️ Error parsing final buffer chunk");
      }
    }

    console.log("✅ Streaming complete, calling onComplete");
    onComplete();
  } catch (error) {
    console.error("❌ OpenRouter streaming API error:", error);
    throw error;
  }
};

export default {
  getAIResponse,
  streamAIResponse
};
