
import React from "react";
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
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  currentQuestionIndex: number;
  currentQuestion: any;
  selectedOption: string | null;
  handleOptionSelect: (optionId: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  questionsLength: number;
  showExitDialog: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  currentQuestionIndex,
  currentQuestion,
  selectedOption,
  handleOptionSelect,
  handlePrevious,
  handleNext,
  questionsLength,
  showExitDialog,
}) => {
  return (
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
          {currentQuestion.options.map((option: any, idx: number) => {
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
            onClick={showExitDialog}
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
          {currentQuestionIndex === questionsLength - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
