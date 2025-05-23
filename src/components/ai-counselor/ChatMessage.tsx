
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  isStreaming?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  timestamp = new Date(),
  isStreaming = false
}) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${role === "user" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"}`}>
        <div className="flex items-start gap-3">
          {role === "assistant" && (
            <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 px-[6px] py-[4px]">
              <Bot className="h-5 w-5 text-white" />
            </Avatar>
          )}
          <div className="flex-1">
            <div className={`text-sm leading-relaxed whitespace-pre-wrap ${role === "user" ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>
              {content}
              {isStreaming && (
                <span className="inline-flex items-center ml-1 animate-pulse">
                  <span className="w-1 h-4 bg-current rounded-sm opacity-75 animate-pulse" />
                </span>
              )}
            </div>
            {!isStreaming && (
              <p className={`text-xs mt-2 ${role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                {timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            )}
          </div>
          {role === "user" && (
            <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 px-[6px] py-[4px]">
              <User className="h-5 w-5 text-white" />
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
