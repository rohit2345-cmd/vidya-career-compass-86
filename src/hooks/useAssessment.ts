
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import all question JSON files
import scienceQuestions from "../questions/scienceQuestions.json";
import artsQuestions from "../questions/artsQuestions.json";
import commerceQuestions from "../questions/commerceQuestions.json";
import comprehensiveQuestions from "../questions/common_test.json";

export const useAssessment = (assessmentType: string) => {
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

  return {
    currentQuestionIndex,
    questions,
    currentQuestion,
    selectedOption,
    timeRemaining,
    showExitDialog,
    showTimeWarning,
    progress,
    assessmentTitle: getAssessmentTitle(),
    handleOptionSelect,
    handleNext,
    handlePrevious,
    handleSaveAndExit,
    setShowExitDialog,
    setShowTimeWarning,
  };
};

export default useAssessment;
