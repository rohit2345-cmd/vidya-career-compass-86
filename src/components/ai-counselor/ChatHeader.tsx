import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Info, AlertCircle, X } from "lucide-react";
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
  const [showGuestWarning, setShowGuestWarning] = React.useState(true);
  const [showDemoWarning, setShowDemoWarning] = React.useState(true);
  return <>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 px-[10px] py-[8px]">
            <Bot className="h-7 w-7 text-white" />
          </Avatar>
          <div>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Counselor
            </CardTitle>
            <CardDescription className="text-sm">
              Personalized guidance based on your assessment results
            </CardDescription>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <h4 className="font-medium mb-2">About AI Counselor</h4>
            <p className="text-sm text-muted-foreground">
              This AI assistant provides personalized career guidance based on your assessment results. It can help with:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside space-y-1">
              <li>Career path recommendations</li>
              <li>Educational options and institutions</li>
              <li>Skill development advice</li>
              <li>Industry insights and trends</li>
            </ul>
            <Separator className="my-3" />
            <p className="text-xs text-muted-foreground">
              For complex issues, consider scheduling a session with a human counselor.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      
      {isGuest && showGuestWarning && <Alert variant="default" className="mt-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              Guest users are limited to {maxGuestMessages} messages. You have used {messageCount} messages.{" "}
              <Link to="/register" className="font-medium underline hover:no-underline">Sign up</Link> for unlimited access.
            </span>
            <Button variant="ghost" size="sm" onClick={() => setShowGuestWarning(false)} className="ml-2 h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>}
      
      {isDemo && showDemoWarning && <Alert variant="default" className="mt-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              You're using the demo version with sample data. Take an{" "}
              <Link to="/assessments" className="font-medium underline hover:no-underline">assessment</Link> for personalized guidance.
            </span>
            <Button variant="ghost" size="sm" onClick={() => setShowDemoWarning(false)} className="ml-2 h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>}
    </>;
};
export default ChatHeader;