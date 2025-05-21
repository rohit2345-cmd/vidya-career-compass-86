
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Info, AlertCircle } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";

interface ChatHeaderProps {
  isGuest: boolean;
  isDemo: boolean;
  messageCount: number;
  maxGuestMessages: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isGuest, 
  isDemo, 
  messageCount, 
  maxGuestMessages 
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <Bot className="h-5 w-5" />
          </Avatar>
          <div>
            <CardTitle>AI Career Counselor</CardTitle>
            <CardDescription>Personalized guidance based on your assessment results</CardDescription>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <h4 className="font-medium mb-2">About AI Counselor</h4>
            <p className="text-sm text-muted-foreground">
              This AI assistant provides personalized career guidance based on your assessment results. It can help with:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
              <li>Career path recommendations</li>
              <li>Educational options and institutions</li>
              <li>Skill development advice</li>
              <li>Industry insights and trends</li>
            </ul>
            <Separator className="my-2" />
            <p className="text-xs text-muted-foreground">
              For complex issues, consider scheduling a session with a human counselor.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      
      {isGuest && (
        <Alert variant="default" className="mt-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            Guest users are limited to {maxGuestMessages} messages. You have used {messageCount} messages.{" "}
            <Link to="/register" className="font-medium underline">Sign up</Link> for unlimited access.
          </AlertDescription>
        </Alert>
      )}
      
      {isDemo && (
        <Alert variant="default" className="mt-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription>
            You're using the demo version with sample data. Take an{" "}
            <Link to="/assessments" className="font-medium underline">assessment</Link> for personalized guidance.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ChatHeader;
