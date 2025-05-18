
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AssessmentCardProps {
  variant: "large" | "small";
  title: string;
  description?: string;
  icon: React.ReactNode;
  iconColor?: string;
  backgroundColor?: string;
  link: string;
  linkText: string;
  buttonVariant?: "default" | "outline";
  details?: {
    label: string;
    value: string;
  }[];
  shortDescription?: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  variant,
  title,
  description,
  icon,
  iconColor,
  backgroundColor,
  link,
  linkText,
  buttonVariant = "outline",
  details,
  shortDescription
}) => {
  if (variant === "large") {
    return (
      <Card className="card-hover border-0 shadow-lg h-full transition-all duration-300">
        <CardHeader className={`${backgroundColor} rounded-t-lg py-6 flex flex-row items-start space-y-0 gap-4`}>
          <div className={`p-3 rounded-lg ${backgroundColor} backdrop-blur-sm`}>
            {icon}
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">{shortDescription}</p>
          {details && (
            <div className="mt-6 space-y-3">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">{detail.label}</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link to={link} className="w-full">
            <Button variant={buttonVariant} className="w-full group">
              {linkText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className="card-hover border-0 shadow-lg h-full transition-all duration-300">
        <CardHeader className={`${backgroundColor} rounded-t-lg py-4 flex flex-row items-center space-y-0 gap-3`}>
          <div className={`p-2 rounded-lg ${backgroundColor} backdrop-blur-sm`}>
            {icon}
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <p className="text-sm">{shortDescription}</p>
        </CardContent>
        <CardFooter>
          <Link to={link} className="w-full">
            <Button variant="outline" size="sm" className="w-full group">
              {linkText}
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
};

export default AssessmentCard;
