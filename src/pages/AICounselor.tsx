
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
import { Sparkles, Brain, Target, Quote, Star } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container py-6 max-w-7xl mx-auto h-screen flex flex-col">
        {/* Motivational Quote Section */}
        <div className="relative mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="text-center pt-4">
            <blockquote className="text-xl md:text-2xl font-serif text-gray-800 mb-3 leading-relaxed">
              "Your career is a marathon, not a sprint. Every step you take today builds the foundation for tomorrow's success."
            </blockquote>
            <cite className="text-lg text-gray-600 font-medium">— Career Guidance Wisdom</cite>
            <div className="flex justify-center mt-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Friendly Header Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Career Counselor
              </h1>
              <p className="text-lg text-muted-foreground">
                Your personal AI assistant for career guidance and educational planning
              </p>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-blue-200 dark:border-gray-700 shadow-sm">
            <Target className="h-7 w-7 text-blue-500" />
            <div>
              <h3 className="font-semibold text-base">Personalized Guidance</h3>
              <p className="text-sm text-muted-foreground">Based on your assessment results</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-purple-200 dark:border-gray-700 shadow-sm">
            <Sparkles className="h-7 w-7 text-purple-500" />
            <div>
              <h3 className="font-semibold text-base">Real-time Responses</h3>
              <p className="text-sm text-muted-foreground">Instant AI-powered advice</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-green-200 dark:border-gray-700 shadow-sm">
            <Brain className="h-7 w-7 text-green-500" />
            <div>
              <h3 className="font-semibold text-base">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">Industry trends & opportunities</p>
            </div>
          </div>
        </div>

        {/* Main Chat Interface - Takes remaining space */}
        <Card className="flex-1 flex flex-col shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm min-h-0">
          <CardHeader className="border-b bg-white/60 dark:bg-gray-800/60 rounded-t-lg flex-shrink-0">
            <ChatHeader 
              isGuest={isGuest}
              isDemo={isDemo}
              messageCount={messageCount}
              maxGuestMessages={maxGuestMessages}
            />
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/40 to-white/40 dark:from-gray-900/40 dark:to-gray-800/40 min-h-0">
            <div className="space-y-6">
              {messages.length === 0 && <WelcomeMessage />}
            
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  isStreaming={message.isStreaming}
                />
              ))}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="p-6 bg-white/60 dark:bg-gray-800/60 rounded-b-lg flex-shrink-0">
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
              isDisabled={isGuest && messageCount >= maxGuestMessages}
            />
          </CardFooter>
        </Card>

        {/* Quick Suggestions */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 flex-shrink-0">
          <button 
            onClick={() => sendMessage("What career paths would you recommend based on my assessment?")}
            className="p-4 text-left bg-white/70 dark:bg-gray-800/70 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-sm hover:shadow-md"
            disabled={isLoading || (isGuest && messageCount >= maxGuestMessages)}
          >
            <p className="font-semibold text-base mb-1">💼 Career Recommendations</p>
            <p className="text-sm text-muted-foreground">Get personalized career suggestions based on your strengths</p>
          </button>
          <button 
            onClick={() => sendMessage("What skills should I develop to improve my career prospects?")}
            className="p-4 text-left bg-white/70 dark:bg-gray-800/70 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-sm hover:shadow-md"
            disabled={isLoading || (isGuest && messageCount >= maxGuestMessages)}
          >
            <p className="font-semibold text-base mb-1">🚀 Skill Development</p>
            <p className="text-sm text-muted-foreground">Learn what skills to focus on for your future</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICounselor;
