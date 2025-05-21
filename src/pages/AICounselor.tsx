
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { SendHorizontal, Loader2, Bot, User, Info, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAICounselor } from "@/hooks/useAICounselor";
import { Link, useLocation } from "react-router-dom";
import { getLatestAssessmentResult } from "../services/localStorageService";

// Sample assessment data for demo mode
const sampleAssessmentData = {
  studentName: "Demo Student",
  assessmentType: "comprehensive",
  completedOn: new Date().toISOString(),
  scores: {
    "Logical Reasoning": 85,
    "Verbal Ability": 78,
    "Numerical Ability": 90,
    "Abstract Reasoning": 82
  },
  strengths: ["Problem Solving", "Critical Thinking", "Data Analysis"],
  interests: ["Technology", "Mathematics", "Science"],
  questions: [
    {
      questionId: "q1",
      question: "Which career field interests you the most?",
      selectedOption: "Technology"
    },
    {
      questionId: "q2", 
      question: "What is your favorite subject?", 
      selectedOption: "Mathematics"
    }
  ]
};

const AICounselor = () => {
  const location = useLocation();
  const isDemo = location.pathname.includes("ai-counselor") && !getLatestAssessmentResult();
  
  // Use sample data if in demo mode, otherwise use latest assessment
  const assessmentData = isDemo ? sampleAssessmentData : undefined;
  
  const { messages, isLoading, sendMessage, messageCount, maxGuestMessages, isGuest } = useAICounselor(assessmentData);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    
    sendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader className="border-b">
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
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div
                className="flex justify-start"
              >
                <div
                  className="max-w-[80%] rounded-lg p-3 bg-muted"
                >
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
            )}
          
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === "assistant" && (
                      <Avatar className="w-6 h-6">
                        <Bot className="h-4 w-4" />
                      </Avatar>
                    )}
                    <div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="w-6 h-6">
                        <User className="h-4 w-4" />
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">AI Counselor is typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="w-full flex gap-2">
            <Input
              placeholder="Ask about career paths, education options, or skill development..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow"
              disabled={isLoading || (isGuest && messageCount >= maxGuestMessages)}
            />
            <Button 
              type="submit" 
              disabled={inputMessage.trim() === "" || isLoading || (isGuest && messageCount >= maxGuestMessages)}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AICounselor;
