
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

// Mock questions for demonstration
const mockQuestions = {
  comprehensive: [
    {
      id: 1,
      question: "When solving problems, you usually prefer to:",
      type: "aptitude",
      options: [
        { id: "a", text: "Follow established methods and procedures" },
        { id: "b", text: "Try new approaches and creative solutions" },
        { id: "c", text: "Work together with others to find a solution" },
        { id: "d", text: "Analyze data before making decisions" }
      ]
    },
    {
      id: 2,
      question: "In a team project, which role do you most often take?",
      type: "personality",
      options: [
        { id: "a", text: "Leader who directs the team" },
        { id: "b", text: "Creative idea generator" },
        { id: "c", text: "Supportive team player who helps others" },
        { id: "d", text: "Analyst who evaluates options carefully" }
      ]
    },
    {
      id: 3,
      question: "Which of these activities would you most enjoy doing?",
      type: "interest",
      options: [
        { id: "a", text: "Conducting scientific experiments" },
        { id: "b", text: "Creating artwork or designs" },
        { id: "c", text: "Teaching or explaining concepts to others" },
        { id: "d", text: "Analyzing financial data and trends" }
      ]
    },
    {
      id: 4,
      question: "If a peach costs ₹25, how much will 4 peaches cost?",
      type: "aptitude",
      options: [
        { id: "a", text: "₹75" },
        { id: "b", text: "₹100" },
        { id: "c", text: "₹125" },
        { id: "d", text: "₹150" }
      ]
    },
    {
      id: 5,
      question: "When learning something new, you prefer to:",
      type: "personality",
      options: [
        { id: "a", text: "Read detailed instructions" },
        { id: "b", text: "Watch a demonstration" },
        { id: "c", text: "Try it hands-on right away" },
        { id: "d", text: "Discuss it with someone else" }
      ]
    }
  ],
  science: [
    {
      id: 1,
      question: "Which career field interests you most?",
      type: "interest",
      options: [
        { id: "a", text: "Medicine and healthcare" },
        { id: "b", text: "Engineering and technology" },
        { id: "c", text: "Research and development" },
        { id: "d", text: "Environmental science" }
      ]
    },
    {
      id: 2,
      question: "In chemistry, what is the pH of pure water at 25°C?",
      type: "technical",
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "7" },
        { id: "c", text: "10" },
        { id: "d", text: "14" }
      ]
    },
    {
      id: 3,
      question: "When faced with a complex scientific problem, you tend to:",
      type: "aptitude",
      options: [
        { id: "a", text: "Break it down into smaller parts and analyze systematically" },
        { id: "b", text: "Brainstorm creative solutions" },
        { id: "c", text: "Research what others have done in similar situations" },
        { id: "d", text: "Collaborate with others to solve it together" }
      ]
    }
  ],
  commerce: [
    {
      id: 1,
      question: "Which aspect of business interests you most?",
      type: "interest",
      options: [
        { id: "a", text: "Marketing and sales" },
        { id: "b", text: "Finance and accounting" },
        { id: "c", text: "Management and leadership" },
        { id: "d", text: "Entrepreneurship" }
      ]
    },
    {
      id: 2,
      question: "A company has assets worth ₹50,00,000 and liabilities of ₹20,00,000. What is the company's equity?",
      type: "technical",
      options: [
        { id: "a", text: "₹70,00,000" },
        { id: "b", text: "₹30,00,000" },
        { id: "c", text: "₹20,00,000" },
        { id: "d", text: "₹50,00,000" }
      ]
    },
    {
      id: 3,
      question: "When analyzing a business problem, you typically:",
      type: "aptitude",
      options: [
        { id: "a", text: "Focus on the financial implications" },
        { id: "b", text: "Consider the impact on people and relationships" },
        { id: "c", text: "Look at it from a strategic perspective" },
        { id: "d", text: "Evaluate operational efficiency" }
      ]
    }
  ],
  arts: [
    {
      id: 1,
      question: "Which field in arts and humanities interests you most?",
      type: "interest",
      options: [
        { id: "a", text: "Literature and writing" },
        { id: "b", text: "Visual arts and design" },
        { id: "c", text: "History and archaeology" },
        { id: "d", text: "Philosophy and psychology" }
      ]
    },
    {
      id: 2,
      question: "Who wrote the epic 'Mahabharata'?",
      type: "technical",
      options: [
        { id: "a", text: "Valmiki" },
        { id: "b", text: "Ved Vyasa" },
        { id: "c", text: "Kalidasa" },
        { id: "d", text: "Tulsidas" }
      ]
    },
    {
      id: 3,
      question: "When expressing ideas creatively, you prefer to:",
      type: "aptitude",
      options: [
        { id: "a", text: "Write stories or essays" },
        { id: "b", text: "Create visual art or designs" },
        { id: "c", text: "Engage in debate or discussion" },
        { id: "d", text: "Perform through music or drama" }
      ]
    }
  ]
};

const Assessment = () => {
  const { assessmentType = "comprehensive" } = useParams<{ assessmentType: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  const questions = mockQuestions[assessmentType as keyof typeof mockQuestions] || mockQuestions.comprehensive;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Timer effect
  useEffect(() => {
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
  }, [assessmentType, navigate]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      // Save the answer
      setAnswers({
        ...answers,
        [currentQuestion.id]: selectedOption
      });

      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reset selection
      } else {
        // Complete the assessment
        navigate(`/results/${assessmentType}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[questions[currentQuestionIndex - 1].id] || null);
    }
  };

  const handleSaveAndExit = () => {
    // In a real app, we would save progress to database
    navigate("/dashboard");
  };

  return (
    <div className="container py-8 max-w-3xl mx-auto min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {assessmentType.charAt(0).toUpperCase() + assessmentType.slice(1)} Assessment
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

      <Card className="flex-grow mb-6 animate-fade-in">
        <CardHeader>
          <div className="flex items-start gap-2">
            <span className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
              {currentQuestionIndex + 1}
            </span>
            <div>
              <CardTitle className="text-xl mb-2">{currentQuestion.question}</CardTitle>
              <CardDescription>
                {currentQuestion.type === "aptitude" && "Aptitude Question"}
                {currentQuestion.type === "personality" && "Personality Assessment"}
                {currentQuestion.type === "interest" && "Interest Inventory"}
                {currentQuestion.type === "technical" && "Technical Knowledge"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedOption || ""} className="space-y-4">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 border rounded-lg p-4 transition-all ${
                  selectedOption === option.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/20"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label className="flex-grow cursor-pointer" htmlFor={option.id}>
                  {option.text}
                </Label>
              </div>
            ))}
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
