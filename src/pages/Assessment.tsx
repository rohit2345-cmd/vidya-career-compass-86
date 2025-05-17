
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Clock, AlertCircle } from "lucide-react";

// Import all question JSON files
import scienceQuestions from "../questions/scienceQuestions.json";
import artsQuestions from "../questions/artsQuestions.json";
import commerceQuestions from "../questions/commerceQuestions.json";
import comprehensiveQuestions from "../questions/common_test.json";

const Assessment = () => {
  const { assessmentType = "comprehensive" } = useParams<{ assessmentType: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  // Get the appropriate questions based on assessment type
  const getQuestions = () => {
    switch (assessmentType) {
      case "science":
        return scienceQuestions.questions;
      case "commerce":
        return commerceQuestions.questions;
      case "arts":
        return artsQuestions.questions;
      case "comprehensive":
      default:
        return comprehensiveQuestions.questions;
    }
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  // Get assessment title for display
  const getAssessmentTitle = () => {
    switch (assessmentType) {
      case "science":
        return scienceQuestions.testName || "Science Stream Assessment";
      case "commerce":
        return commerceQuestions.testName || "Commerce Stream Assessment";
      case "arts":
        return artsQuestions.testName || "Arts Stream Assessment";
      case "comprehensive":
      default:
        return comprehensiveQuestions.testName || "Comprehensive Assessment";
    }
  };

  // Timer effect
  useEffect(() => {
    if (!questions.length) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/results/${assessmentType}`);
          return 0;
        }
        
        // Show warning when 5 minutes remaining
        if (prev === 300) {
          setShowTimeWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [assessmentType, navigate, questions.length]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Reset selected option when question changes
    setSelectedOption(answers[currentQuestion?.questionId] || null);
  }, [currentQuestionIndex, answers, currentQuestion]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption && currentQuestion) {
      // Save the answer
      setAnswers({
        ...answers,
        [currentQuestion.questionId]: selectedOption
      });

      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Complete the assessment
        navigate(`/results/${assessmentType}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveAndExit = () => {
    // In a real app, we would save progress to database
    navigate("/dashboard");
  };

  if (!questions.length) {
    return (
      <div className="container py-8 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Not Available</CardTitle>
            <CardDescription>
              The requested assessment is not available at this time.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/assessments")}>Return to Assessments</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl mx-auto min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {getAssessmentTitle()}
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <Clock className="h-5 w-5" />
          <span className={timeRemaining < 300 ? "text-destructive" : ""}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <Progress value={progress} className="mb-8 h-2" />

      {currentQuestion && (
        <Card className="flex-grow mb-6 animate-fade-in">
          <CardHeader>
            <div className="flex items-start gap-2">
              <span className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                {currentQuestionIndex + 1}
              </span>
              <div>
                <CardTitle className="text-xl mb-2">{currentQuestion.questionText}</CardTitle>
                <CardDescription>
                  {currentQuestion.category} - Question
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedOption || ""} className="space-y-4">
              {currentQuestion.options.map((option, idx) => {
                // Extract option ID and text
                const optionId = Object.keys(option)[0];
                const optionText = option[optionId as keyof typeof option]?.text || 
                                  (typeof option[optionId as keyof typeof option] === 'string' ? 
                                  option[optionId as keyof typeof option] : '');
                
                return (
                  <div
                    key={optionId}
                    className={`flex items-center space-x-2 border rounded-lg p-4 transition-all ${
                      selectedOption === optionId
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/20"
                    }`}
                    onClick={() => handleOptionSelect(optionId)}
                  >
                    <RadioGroupItem value={optionId} id={optionId} />
                    <Label className="flex-grow cursor-pointer" htmlFor={optionId}>
                      {optionText}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Button
                variant="outline"
                onClick={() => setShowExitDialog(true)}
                className="mr-4"
              >
                Save & Exit
              </Button>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
            </div>
            <Button
              onClick={handleNext}
              disabled={!selectedOption}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Save & Exit Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save and exit?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be saved and you can resume the assessment later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAndExit}>
              Save & Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time Warning Dialog */}
      <AlertDialog open={showTimeWarning} onOpenChange={setShowTimeWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Time Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have 5 minutes remaining to complete this assessment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue Assessment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Assessment;
