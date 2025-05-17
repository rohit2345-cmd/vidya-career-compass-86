
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface College {
  name: string;
  courses: string[];
  location: string;
}

interface CollegeRecommendationsProps {
  colleges: College[];
}

const CollegeRecommendations: React.FC<CollegeRecommendationsProps> = ({ colleges }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Recommended Colleges & Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colleges.map((college, index) => (
          <Card key={index} className="card-hover bg-gradient-to-b from-white to-emerald-50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-secondary" />
                {college.name}
              </CardTitle>
              <CardDescription>{college.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium mb-2">Recommended Courses:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {college.courses.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                College Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollegeRecommendations;
