
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AssessmentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  questions: string;
  difficulty: string;
  href: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  icon,
  title,
  description,
  duration,
  questions,
  difficulty,
  href,
}) => {
  return (
    <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{questions}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{difficulty}</span>
          </div>
        </div>

        <div className="pt-4">
          <Link to={href}>
            <Button className="w-full group-hover:bg-primary/90 transition-colors">
              Start Assessment
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentCard;
