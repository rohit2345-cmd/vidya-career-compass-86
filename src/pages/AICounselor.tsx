
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { SendHorizontal, Loader2, Bot, User, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AICounselor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI Career Counselor. Based on your assessment results, I can provide personalized guidance about career paths, educational options, and skill development. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: aiResponse,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    // This is a mock function - in a real application, this would call an API
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("engineering") || lowerQuery.includes("computer science") || lowerQuery.includes("software")) {
      return "Based on your assessment results, you show strong aptitude in logical reasoning and mathematics, which aligns well with engineering paths. The top engineering fields that match your profile are Software Engineering, Data Science, and AI/ML Engineering. I'd recommend exploring B.Tech programs at institutions like IITs, NITs, or BITS. Would you like more specific information about any of these options?";
    } else if (lowerQuery.includes("medical") || lowerQuery.includes("doctor") || lowerQuery.includes("healthcare")) {
      return "Your assessment indicates strong aptitude in biological sciences and interpersonal skills. Medical careers that might suit you include Medicine (MBBS), Dentistry, Pharmacy, or Allied Health Sciences. To pursue medicine in India, you'll need to prepare for NEET. Would you like information about medical colleges or alternative healthcare careers?";
    } else if (lowerQuery.includes("commerce") || lowerQuery.includes("business") || lowerQuery.includes("finance")) {
      return "Your results show strengths in numerical analysis and strategic thinking, which align well with commerce fields. Career paths to consider include Chartered Accountancy, Investment Banking, Business Management, or Entrepreneurship. For education, consider BCom, BBA, or integrated programs at institutions like SRCC, IIMs (after graduation), or NMIMS. Would you like more details about any of these paths?";
    } else if (lowerQuery.includes("arts") || lowerQuery.includes("humanities") || lowerQuery.includes("design")) {
      return "Your assessment highlights creative thinking and communication skills. Arts and humanities career paths that match your profile include Design, Content Creation, Psychology, or Education. Top institutions to consider are NID for design, TISS for psychology/social work, or Delhi University for humanities subjects. Would you like more information about specific arts career paths?";
    } else if (lowerQuery.includes("skill") || lowerQuery.includes("improve") || lowerQuery.includes("develop")) {
      return "Based on your profile, I recommend focusing on developing these key skills: 1) Advanced Problem Solving - try online coding challenges or mathematical puzzles, 2) Data Analysis - consider courses on SQL, Excel, or Python for data, 3) Communication - join debate clubs or public speaking groups, 4) Design Thinking - try free online courses from Stanford d.school or IDEO. Would you like resources for any of these skill areas?";
    } else if (lowerQuery.includes("thank")) {
      return "You're welcome! I'm glad I could help. Feel free to return anytime you have more questions about your career path or educational options. Good luck with your journey!";
    } else {
      return "Based on your assessment results, you show a balanced profile with strengths in both analytical and creative thinking. This gives you flexibility in career choices across multiple streams. Some career paths that match your profile include Product Management, UX/UI Design, Data Analysis, or Digital Marketing. Would you like to explore any of these options in more detail, or would you prefer information about a specific industry?";
    }
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
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "ai" && (
                      <Avatar className="w-6 h-6">
                        <Bot className="h-4 w-4" />
                      </Avatar>
                    )}
                    <div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="w-6 h-6">
                        <User className="h-4 w-4" />
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
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
            />
            <Button type="submit" disabled={inputMessage.trim() === "" || isTyping}>
              {isTyping ? (
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
