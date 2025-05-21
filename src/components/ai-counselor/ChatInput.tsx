
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Loader2 } from "lucide-react";

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
    <form onSubmit={handleSendMessage} className="w-full flex gap-2">
      <Input
        placeholder="Ask about career paths, education options, or skill development..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="flex-grow"
        disabled={isLoading || isDisabled}
      />
      <Button 
        type="submit" 
        disabled={inputMessage.trim() === "" || isLoading || isDisabled}
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
