
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CareerData {
  title: string;
  match: number;
  description: string;
  skills: string[];
  education: string[];
}

interface CareerRecommendationsProps {
  careers: CareerData[];
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ careers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {careers.map((career, index) => (
        <Card key={index} className="card-hover bg-gradient-to-b from-white to-blue-50">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{career.title}</CardTitle>
              <Badge className="bg-primary">{career.match}% Match</Badge>
            </div>
            <CardDescription>{career.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Key Skills Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, i) => (
                    <Badge key={i} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Recommended Education:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {career.education.map((edu, i) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Explore Career
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CareerRecommendations;
