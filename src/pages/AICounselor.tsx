
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChatHeader from "../components/ai-counselor/ChatHeader";
import ChatMessage from "../components/ai-counselor/ChatMessage";
import ChatInput from "../components/ai-counselor/ChatInput";
import WelcomeMessage from "../components/ai-counselor/WelcomeMessage";
import useAICounselor from "../hooks/useAICounselor";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, FileText } from "lucide-react";

const AICounselor = () => {
  const location = useLocation();
  const [showAssessmentData, setShowAssessmentData] = useState(false);
  
  // Get assessment results from navigation state or local storage
  const assessmentResults = location.state?.assessmentResults || null;
  const analysisContext = location.state?.analysisContext || null;
  
  const {
    messages,
    isLoading,
    sendMessage,
    messageCount,
    maxGuestMessages,
    isGuest,
  } = useAICounselor(assessmentResults);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Career Counselor
          </h1>
          <p className="text-gray-600 text-lg">
            Get personalized career guidance from our AI-powered counselor
          </p>
          
          {/* Assessment Data Indicator */}
          {assessmentResults && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
                <FileText className="h-4 w-4" />
                Assessment data loaded: {assessmentResults.student_name}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAssessmentData(!showAssessmentData)}
              >
                {showAssessmentData ? "Hide" : "Show"} Assessment Data
              </Button>
            </div>
          )}
        </div>

        {/* Assessment Data Panel */}
        {assessmentResults && showAssessmentData && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FileText className="h-5 w-5" />
                Loaded Assessment Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Student:</strong> {assessmentResults.student_name}
                </div>
                <div>
                  <strong>Assessment Type:</strong> {assessmentResults.assessment_type}
                </div>
                <div>
                  <strong>Completed:</strong> {new Date(assessmentResults.completed_on).toLocaleDateString()}
                </div>
                <div>
                  <strong>Questions Answered:</strong> {assessmentResults.questions?.length || 0}
                </div>
                {analysisContext && (
                  <div>
                    <strong>Previous Analysis:</strong> Available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Interface */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <ChatHeader 
            messageCount={messageCount} 
            maxGuestMessages={maxGuestMessages}
            isGuest={isGuest}
          />
          
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto border-t border-b bg-gray-50/50">
              <div className="p-6 space-y-4">
                {messages.length === 0 ? (
                  <WelcomeMessage hasAssessmentData={!!assessmentResults} />
                ) : (
                  messages.map((message) => (
                    <ChatMessage 
                      key={message.id} 
                      message={message} 
                    />
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 bg-white p-4 rounded-2xl shadow-sm border max-w-xs">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
              disabled={isGuest && messageCount >= maxGuestMessages}
            />
          </CardContent>
        </Card>

        {/* Guest Warning */}
        {isGuest && messageCount >= maxGuestMessages && (
          <Card className="mt-4 border-amber-200 bg-amber-50">
            <CardContent className="flex items-center gap-3 p-4">
              <User className="h-5 w-5 text-amber-600" />
              <div className="flex-1">
                <p className="text-amber-800 font-medium">Message limit reached</p>
                <p className="text-amber-700 text-sm">Sign up to continue chatting with the AI counselor</p>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700">
                Sign Up
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Additional Context for Assessment Results */}
        {assessmentResults && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              💡 The AI counselor has access to your assessment responses and can provide personalized guidance based on your answers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICounselor;
