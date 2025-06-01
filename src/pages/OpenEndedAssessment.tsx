import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, Save } from "lucide-react";
import { toast } from "sonner";
import openEndedQuestions from "../questions/openended.json";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeTextInput, validateTextInput, prepareForDatabase } from "../utils/textSanitizer";

const OpenEndedAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [studentName, setStudentName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);

  const questions = openEndedQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (showNameInput) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showNameInput]);

  // Load saved answer when question changes
  useEffect(() => {
    setCurrentAnswer(answers[currentQuestionIndex] || "");
  }, [currentQuestionIndex, answers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartAssessment = () => {
    if (!studentName.trim()) {
      toast.error("Please enter your name to start the assessment");
      return;
    }
    setShowNameInput(false);
  };

  const handleNext = () => {
    // Sanitize and validate current answer
    const sanitizedAnswer = sanitizeTextInput(currentAnswer);
    const validation = validateTextInput(sanitizedAnswer);
    
    if (!validation.isValid) {
      toast.error(validation.error || "Please provide a valid answer");
      return;
    }

    // Save sanitized answer
    setAnswers({ ...answers, [currentQuestionIndex]: sanitizedAnswer });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleCompleteAssessment();
    }
  };

  const handlePrevious = () => {
    // Save sanitized answer
    const sanitizedAnswer = sanitizeTextInput(currentAnswer);
    setAnswers({ ...answers, [currentQuestionIndex]: sanitizedAnswer });
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveAnswer = () => {
    const sanitizedAnswer = sanitizeTextInput(currentAnswer);
    const validation = validateTextInput(sanitizedAnswer);
    
    if (!validation.isValid) {
      toast.error(validation.error || "Please provide a valid answer");
      return;
    }
    
    setAnswers({ ...answers, [currentQuestionIndex]: sanitizedAnswer });
    setCurrentAnswer(sanitizedAnswer); // Update display with sanitized version
    toast.success("Answer saved!");
  };

  const handleCompleteAssessment = async () => {
    try {
      // Sanitize and prepare final answers
      const finalAnswers = { ...answers, [currentQuestionIndex]: sanitizeTextInput(currentAnswer) };
      
      // Prepare assessment result for Supabase with sanitized data
      const assessmentResult = {
        student_name: sanitizeTextInput(studentName),
        assessment_type: "open-ended",
        questions: questions.map((question, index) => ({
          questionId: `q${index + 1}`,
          question: question,
          answer: prepareForDatabase(finalAnswers[index] || "Not answered")
        })),
        completed_on: new Date().toISOString(),
        is_guest: true
      };

      // Save to Supabase
      const { data, error } = await supabase
        .from('assessment_results')
        .insert(assessmentResult)
        .select()
        .single();

      if (error) {
        console.error("Error saving assessment:", error);
        toast.error("Failed to save assessment results");
      } else {
        console.log("Assessment saved successfully:", data);
        toast.success("Assessment completed successfully!");
        navigate(`/results/open-ended/${data.id}`);
      }
    } catch (error) {
      console.error("Error completing assessment:", error);
      toast.error("An error occurred while saving your assessment");
    }
  };

  if (showNameInput) {
    return (
      <div className="container py-8 max-w-md mx-auto min-h-screen flex items-center justify-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Open-Ended Career Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• This assessment contains {questions.length} open-ended questions</p>
              <p>• You have 60 minutes to complete it</p>
              <p>• Answer thoughtfully and honestly</p>
              <p>• You can navigate between questions and save your progress</p>
            </div>
            <Button onClick={handleStartAssessment} className="w-full">
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Open-Ended Career Assessment
          </h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className={timeRemaining < 300 ? "text-red-500" : "text-blue-600"}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <Progress value={progress} className="mb-8 h-3 bg-blue-100" />

      {/* Question Card */}
      <Card className="mb-6 shadow-xl bg-gradient-to-br from-white to-blue-50 border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-xl">
            {currentQuestion}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <Textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Type your answer here... Be as detailed as you'd like."
            className="min-h-[200px] resize-none border-2 border-blue-200 focus:border-blue-400 bg-white"
          />
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleSaveAnswer}
              className="flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Save className="h-4 w-4" />
              Save Answer
            </Button>
            <div className="text-sm text-gray-500">
              {currentAnswer.length} characters
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!currentAnswer.trim()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {currentQuestionIndex === questions.length - 1 ? "Complete Assessment" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default OpenEndedAssessment;
