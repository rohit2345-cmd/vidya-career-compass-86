
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const OpenEndedAssessmentCard = () => {
  return (
    <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <FileText className="h-8 w-8 text-primary" />
          <Badge variant="secondary">New</Badge>
        </div>
        <CardTitle className="text-xl">Open-Ended Career Assessment</CardTitle>
        <CardDescription>
          Comprehensive career exploration through thoughtful, personalized questions designed to understand your unique interests and aspirations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>17 Questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>60 mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>All Students</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">What you'll explore:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Your academic interests and strengths</li>
            <li>• Personal values and career preferences</li>
            <li>• Future goals and aspirations</li>
            <li>• Work environment preferences</li>
          </ul>
        </div>

        <div className="pt-4">
          <Link to="/assessment/open-ended">
            <Button className="w-full group-hover:bg-primary/90 transition-colors">
              Start Assessment
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenEndedAssessmentCard;
