
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

// Import refactored components
import AssessmentHeader from "../components/assessment/AssessmentHeader";
import QuestionCard from "../components/assessment/QuestionCard";
import { ExitDialog, TimeWarningDialog } from "../components/assessment/DialogComponents";
import useAssessment from "../hooks/useAssessment";

const Assessment = () => {
  const { assessmentType = "comprehensive" } = useParams<{ assessmentType: string }>();
  const navigate = useNavigate();
  
  const {
    currentQuestionIndex,
    questions,
    currentQuestion,
    selectedOption,
    timeRemaining,
    showExitDialog,
    showTimeWarning,
    progress,
    assessmentTitle,
    handleOptionSelect,
    handleNext,
    handlePrevious,
    handleSaveAndExit,
    setShowExitDialog,
    setShowTimeWarning,
  } = useAssessment(assessmentType);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Assessment Not Available</h2>
              <p className="text-muted-foreground mb-4">
                The requested assessment is not available at this time.
              </p>
              <Button onClick={() => navigate("/assessments")}>Return to Assessments</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 max-w-3xl mx-auto min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
        <AssessmentHeader
          title={assessmentTitle}
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          timeRemaining={timeRemaining}
          progress={progress}
        />

        {currentQuestion && (
          <QuestionCard
            currentQuestionIndex={currentQuestionIndex}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            handleOptionSelect={handleOptionSelect}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            questionsLength={questions.length}
            showExitDialog={() => setShowExitDialog(true)}
          />
        )}

        {/* Dialogs */}
        <ExitDialog 
          open={showExitDialog}
          onOpenChange={setShowExitDialog}
          onConfirm={handleSaveAndExit}
        />
        
        <TimeWarningDialog
          open={showTimeWarning}
          onOpenChange={setShowTimeWarning}
        />
      </div>
    </div>
  );
};

export default Assessment;
