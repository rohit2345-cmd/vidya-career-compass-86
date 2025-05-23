
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isDisabled = false }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className="w-full flex gap-3">
      <div className="flex-grow relative">
        <Input
          placeholder="Ask about career paths, education options, or skill development..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="pr-12 py-3 text-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl bg-white dark:bg-gray-800"
          disabled={isLoading || isDisabled}
        />
        <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Button 
        type="submit" 
        disabled={inputMessage.trim() === "" || isLoading || isDisabled}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <SendHorizontal className="h-4 w-4" />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
};

export default ChatInput;
