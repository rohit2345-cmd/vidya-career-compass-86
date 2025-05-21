
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

const WelcomeMessage: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
        <div className="flex items-start gap-2">
          <Avatar className="w-6 h-6">
            <Bot className="h-4 w-4" />
          </Avatar>
          <div>
            <p className="text-sm whitespace-pre-wrap">
              Hello! I'm your AI Career Counselor. Based on your assessment results, 
              I can provide personalized guidance about career paths, educational options, 
              and skill development. What would you like to know?
            </p>
            <p className="text-xs opacity-70 mt-1">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
