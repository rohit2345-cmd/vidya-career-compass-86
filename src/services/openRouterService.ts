
/**
 * OpenRouter AI Service
 * Handles integration with OpenRouter API for AI responses with backup model support
 */

import { systemPrompt } from "../prompts/systemPrompt";

// API keys (would typically be stored in environment variables)
const OPENROUTER_API_KEY = "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";
const BACKUP_API_KEY = "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";

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

// Primary model (Claude 2) and backup model (Phi-4)
const PRIMARY_MODEL = "anthropic/claude-2";
const BACKUP_MODEL = "microsoft/phi-4";

const makeOpenRouterRequest = async (
  messages: Message[], 
  model: string,
  apiKey: string,
  stream: boolean = false
) => {
  console.log(`Making request to OpenRouter with model: ${model}`);
  
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
      stream: stream,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(`${model} error response:`, errorData);
    throw new Error(`API error for ${model}: ${errorData.error?.message || response.statusText}`);
  }

  return response;
};

export const getAIResponse = async (
  messages: Message[], 
  assessmentResults?: any
): Promise<string> => {
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
  
  // Try primary model first
  try {
    console.log("🔄 Attempting primary model (Claude 2)...");
    const response = await makeOpenRouterRequest(conversationMessages, PRIMARY_MODEL, OPENROUTER_API_KEY);
    const data: OpenRouterResponse = await response.json();
    console.log("✅ Primary model successful");
    return data.choices[0].message.content;
  } catch (primaryError) {
    console.warn("⚠️ Primary model failed, trying backup model (Phi-4):", primaryError);
    
    try {
      console.log("🔄 Attempting backup model (Phi-4)...");
      const response = await makeOpenRouterRequest(conversationMessages, BACKUP_MODEL, BACKUP_API_KEY);
      const data: OpenRouterResponse = await response.json();
      console.log("✅ Backup model successful");
      return data.choices[0].message.content;
    } catch (backupError) {
      console.error("❌ Both models failed:", backupError);
      throw new Error(`Both primary and backup models failed. Primary: ${primaryError.message}, Backup: ${backupError.message}`);
    }
  }
};

// Optimized streaming function with backup support
export const streamAIResponse = async (
  messages: Message[],
  assessmentResults: any | undefined,
  onChunk: (chunk: string) => void,
  onComplete: () => void
) => {
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
  
  const processStreamResponse = async (response: Response, modelName: string) => {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader");
    }

    console.log(`✅ ${modelName} stream reader initialized, starting to process chunks...`);
    
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log(`✅ ${modelName} stream completed`);
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
              console.log(`📝 ${modelName} streaming chunk: "${textChunk}"`);
              onChunk(textChunk);
            }
          } catch (e) {
            console.warn(`⚠️ Error parsing ${modelName} SSE data:`, e, "Line:", line);
          }
        } else if (line === "data: [DONE]") {
          console.log(`🏁 ${modelName} stream marked as [DONE]`);
          break;
        }
      }
    }

    if (buffer.startsWith("data: ") && buffer !== "data: [DONE]") {
      try {
        const jsonData = JSON.parse(buffer.substring(6)); 
        if (jsonData.choices && jsonData.choices[0]?.delta?.content) {
          const textChunk = jsonData.choices[0].delta.content;
          console.log(`📝 ${modelName} final chunk: "${textChunk}"`);
          onChunk(textChunk);
        }
      } catch (e) {
        console.warn(`⚠️ Error parsing ${modelName} final buffer chunk`);
      }
    }
  };

  // Try primary model first
  try {
    console.log("🚀 Starting streaming with primary model (Claude 2)...");
    const response = await makeOpenRouterRequest(conversationMessages, PRIMARY_MODEL, OPENROUTER_API_KEY, true);
    await processStreamResponse(response, "Primary (Claude 2)");
    console.log("✅ Primary model streaming complete, calling onComplete");
    onComplete();
  } catch (primaryError) {
    console.warn("⚠️ Primary model streaming failed, trying backup model (Phi-4):", primaryError);
    
    try {
      console.log("🚀 Starting streaming with backup model (Phi-4)...");
      const response = await makeOpenRouterRequest(conversationMessages, BACKUP_MODEL, BACKUP_API_KEY, true);
      await processStreamResponse(response, "Backup (Phi-4)");
      console.log("✅ Backup model streaming complete, calling onComplete");
      onComplete();
    } catch (backupError) {
      console.error("❌ Both streaming models failed:", backupError);
      throw new Error(`Both primary and backup streaming failed. Primary: ${primaryError.message}, Backup: ${backupError.message}`);
    }
  }
};

export default {
  getAIResponse,
  streamAIResponse
};
