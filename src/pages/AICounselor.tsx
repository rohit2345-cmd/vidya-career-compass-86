
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAICounselor } from "@/hooks/useAICounselor";
import { useLocation } from "react-router-dom";
import { getLatestAssessmentResult } from "../services/localStorageService";
import ChatMessage from "@/components/ai-counselor/ChatMessage";
import ChatInput from "@/components/ai-counselor/ChatInput";
import WelcomeMessage from "@/components/ai-counselor/WelcomeMessage";
import ChatHeader from "@/components/ai-counselor/ChatHeader";
import { Sparkles, Brain, Target } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-6 max-w-5xl mx-auto">
        {/* Friendly Header Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Counselor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal AI assistant for career guidance, educational planning, and skill development
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-blue-200 dark:border-gray-700">
            <Target className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="font-semibold text-sm">Personalized Guidance</h3>
              <p className="text-xs text-muted-foreground">Based on your assessment results</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-purple-200 dark:border-gray-700">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="font-semibold text-sm">Real-time Responses</h3>
              <p className="text-xs text-muted-foreground">Instant AI-powered advice</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-green-200 dark:border-gray-700">
            <Brain className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="font-semibold text-sm">Smart Insights</h3>
              <p className="text-xs text-muted-foreground">Industry trends & opportunities</p>
            </div>
          </div>
        </div>

        {/* Main Chat Interface */}
        <Card className="h-[70vh] flex flex-col shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="border-b bg-white/50 dark:bg-gray-800/50 rounded-t-lg">
            <ChatHeader 
              isGuest={isGuest}
              isDemo={isDemo}
              messageCount={messageCount}
              maxGuestMessages={maxGuestMessages}
            />
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto p-6 bg-gradient-to-b from-gray-50/30 to-white/30 dark:from-gray-900/30 dark:to-gray-800/30">
            <div className="space-y-6">
              {messages.length === 0 && <WelcomeMessage />}
            
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index}
                  role={message.role}
                  content={message.content}
                  isStreaming={message.isStreaming}
                />
              ))}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-b-lg">
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
              isDisabled={isGuest && messageCount >= maxGuestMessages}
            />
          </CardFooter>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button 
            onClick={() => sendMessage("What career paths would you recommend based on my assessment?")}
            className="p-3 text-left bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
            disabled={isLoading || (isGuest && messageCount >= maxGuestMessages)}
          >
            <p className="font-medium text-sm">💼 Career Recommendations</p>
            <p className="text-xs text-muted-foreground">Get personalized career suggestions</p>
          </button>
          <button 
            onClick={() => sendMessage("What skills should I develop to improve my career prospects?")}
            className="p-3 text-left bg-white/60 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
            disabled={isLoading || (isGuest && messageCount >= maxGuestMessages)}
          >
            <p className="font-medium text-sm">🚀 Skill Development</p>
            <p className="text-xs text-muted-foreground">Learn what skills to focus on</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICounselor;
