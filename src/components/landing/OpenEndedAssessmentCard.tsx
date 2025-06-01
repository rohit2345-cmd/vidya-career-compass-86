
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const OpenEndedAssessmentCard = () => {
  return (
    <Card className="h-full group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-lg ring-2 ring-indigo-200 ring-offset-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl text-white shadow-lg">
            <FileText className="h-8 w-8" />
          </div>
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-md">
            <Sparkles className="h-3 w-3 mr-1" />
            New
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
          Open-Ended Career Assessment
        </CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">
          Comprehensive career exploration through thoughtful, personalized questions designed to understand your unique interests and aspirations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-white/70 rounded-lg">
            <FileText className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <span className="font-medium text-gray-800">17 Questions</span>
          </div>
          <div className="text-center p-3 bg-white/70 rounded-lg">
            <Clock className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <span className="font-medium text-gray-800">60 mins</span>
          </div>
          <div className="text-center p-3 bg-white/70 rounded-lg">
            <Users className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <span className="font-medium text-gray-800">All Students</span>
          </div>
        </div>
        
        <div className="space-y-3 bg-white/50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800">What you'll explore:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Your academic interests and strengths</li>
            <li>• Personal values and career preferences</li>
            <li>• Future goals and aspirations</li>
            <li>• Work environment preferences</li>
          </ul>
        </div>

        <Link to="/assessment/open-ended">
          <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300 text-white font-semibold py-3">
            Start Assessment
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default OpenEndedAssessmentCard;
