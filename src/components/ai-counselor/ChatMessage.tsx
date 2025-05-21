
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp = new Date() }) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <div className="flex items-start gap-2">
          {role === "assistant" && (
            <Avatar className="w-6 h-6">
              <Bot className="h-4 w-4" />
            </Avatar>
          )}
          <div>
            <p className="text-sm whitespace-pre-wrap">{content}</p>
            <p className="text-xs opacity-70 mt-1">
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {role === "user" && (
            <Avatar className="w-6 h-6">
              <User className="h-4 w-4" />
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
