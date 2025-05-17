
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface AssessmentHeaderProps {
  title: string;
  currentQuestionIndex: number;
  questionsLength: number;
  timeRemaining: number;
  progress: number;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  title,
  currentQuestionIndex,
  questionsLength,
  timeRemaining,
  progress,
}) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questionsLength}
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
    </>
  );
};

export default AssessmentHeader;
