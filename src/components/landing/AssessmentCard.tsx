
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, BarChart } from "lucide-react";

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
      <Card className="card-hover">
        <CardHeader className={`${backgroundColor} rounded-t-lg`}>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p>{shortDescription}</p>
          {details && (
            <div className="mt-6 space-y-2">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{detail.label}</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link to={link} className="w-full">
            <Button variant={buttonVariant} className="w-full">{linkText}</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className="card-hover">
        <CardHeader className={`${backgroundColor} rounded-t-lg py-4`}>
          <CardTitle className="flex items-center gap-2 text-base">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm">{shortDescription}</p>
        </CardContent>
        <CardFooter>
          <Link to={link} className="w-full">
            <Button variant="outline" size="sm" className="w-full">{linkText}</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
};

export default AssessmentCard;
