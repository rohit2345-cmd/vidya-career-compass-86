
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  link: string;
  linkText: string;
}

const FeatureCard = ({ icon, title, description, features, link, linkText }: FeatureCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        {icon}
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={link} className="w-full">
          <Button variant="outline" className="w-full">{linkText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
