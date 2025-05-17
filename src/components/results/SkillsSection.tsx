
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

interface SkillItem {
  name: string;
  percentage: number;
}

interface SkillsSectionProps {
  technicalSkills: SkillItem[];
  softSkills: SkillItem[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ technicalSkills, softSkills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gradient-to-b from-white to-blue-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {technicalSkills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{skill.name}</span>
                <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Find Courses
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-b from-white to-emerald-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-secondary" />
            Soft Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {softSkills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{skill.name}</span>
                <div className="w-1/2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="bg-secondary h-full rounded-full" 
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Development Resources
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkillsSection;
