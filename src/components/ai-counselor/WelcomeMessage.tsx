import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Sparkles, Target, BookOpen } from "lucide-react";
const WelcomeMessage: React.FC = () => {
  return <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 py-[6px] px-[10px]">
            <Bot className="h-6 w-6 text-white" />
          </Avatar>
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                👋 Welcome! I'm here to help with your career journey
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Based on your assessment results, I can provide personalized guidance about career paths, 
                educational options, and skill development strategies. Let's explore your potential together!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Target className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Career Planning</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Education Guidance</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Sparkles className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">Skill Development</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default WelcomeMessage;