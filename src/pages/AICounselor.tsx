
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAICounselor } from "@/hooks/useAICounselor";
import { useLocation } from "react-router-dom";
import { getLatestAssessmentResult } from "../services/localStorageService";
import ChatMessage from "@/components/ai-counselor/ChatMessage";
import ChatInput from "@/components/ai-counselor/ChatInput";
import WelcomeMessage from "@/components/ai-counselor/WelcomeMessage";
import ChatHeader from "@/components/ai-counselor/ChatHeader";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader className="border-b">
          <ChatHeader 
            isGuest={isGuest}
            isDemo={isDemo}
            messageCount={messageCount}
            maxGuestMessages={maxGuestMessages}
          />
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.length === 0 && <WelcomeMessage />}
          
            {messages.map((message, index) => (
              <ChatMessage 
                key={index}
                role={message.role}
                content={message.content}
              />
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
        
        <Separator />
        
        <CardFooter className="p-4">
          <ChatInput 
            onSendMessage={sendMessage}
            isLoading={isLoading}
            isDisabled={isGuest && messageCount >= maxGuestMessages}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AICounselor;
