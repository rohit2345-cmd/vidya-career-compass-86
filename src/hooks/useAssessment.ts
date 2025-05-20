
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import all question JSON files
import scienceQuestions from "../questions/scienceQuestions.json";
import artsQuestions from "../questions/artsQuestions.json";
import commerceQuestions from "../questions/commerceQuestions.json";
import comprehensiveQuestions from "../questions/common_test.json";
import { saveAssessmentResult } from "../services/assessmentService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const useAssessment = (assessmentType: string) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  
  const { user, isGuest, guestName, setGuestName } = useAuth();
  const [studentName, setStudentName] = useState(user ? `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim() : guestName);

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

  const questions = getQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  // Update name when user changes
  useEffect(() => {
    if (user) {
      const userName = `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim();
      setStudentName(userName || guestName);
    } else {
      setStudentName(guestName);
    }
  }, [user, guestName]);

  // Timer effect
  useEffect(() => {
    if (!questions.length) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleCompleteAssessment();
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
  }, [assessmentType, questions.length]);

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
        handleCompleteAssessment();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveAndExit = () => {
    navigate("/dashboard");
  };

  const handleCompleteAssessment = async () => {
    // Require student name for guest users
    if (isGuest && !studentName) {
      toast.error("Please enter your name before completing the assessment");
      return;
    }

    // If guest name provided, save it
    if (isGuest && studentName) {
      setGuestName(studentName);
    }
    
    // Prepare results for saving
    try {
      const assessmentResults = {
        studentName: studentName || "Anonymous User",
        assessmentType,
        completedOn: new Date().toISOString(),
        questions: questions.map(q => ({
          questionId: q.questionId,
          question: q.questionText,
          selectedOption: answers[q.questionId] || "Not answered",
          correctOption: q.options.find(opt => opt.isCorrect)?.optionText || ""
        })),
        userId: user?.id || null,
        isGuest: isGuest
      };
      
      // Save results
      await saveAssessmentResult(assessmentResults);
      toast.success("Assessment completed successfully!");
      
      // Navigate to results page
      navigate(`/results/${assessmentType}`);
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("There was a problem saving your assessment. Please try again.");
    }
  };

  return {
    currentQuestionIndex,
    questions,
    currentQuestion,
    selectedOption,
    timeRemaining,
    showExitDialog,
    showTimeWarning,
    progress,
    studentName,
    assessmentTitle: getAssessmentTitle(),
    handleOptionSelect,
    handleNext,
    handlePrevious,
    handleSaveAndExit,
    setShowExitDialog,
    setShowTimeWarning,
    setStudentName,
  };
};

export default useAssessment;
