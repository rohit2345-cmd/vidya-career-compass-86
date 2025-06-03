
import React from "react";
import { Link } from "react-router-dom";
import {
  Microscope,
  Calculator,
  Palette,
  ArrowRight,
  Brain,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AssessmentCard from "./AssessmentCard";
import OpenEndedAssessmentCard from "./OpenEndedAssessmentCard";

const AssessmentsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Assessment Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take our comprehensive assessments designed specifically for Indian students 
            to discover your ideal career path and stream selection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="transform hover:scale-105 transition-all duration-300">
            <OpenEndedAssessmentCard />
          </div>
          
          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="h-full bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-xl text-white shadow-lg">
                    <Microscope className="h-8 w-8" />
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">Science</Badge>
                </div>
                <CardTitle className="text-xl font-bold text-blue-900">Science Stream</CardTitle>
                <CardDescription className="text-blue-700">
                  Perfect for students interested in Physics, Chemistry, Biology, and Mathematics. Explore careers in engineering, medicine, and research.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-blue-600">
                  <span>⏱️ 45 mins</span>
                  <span>📝 50 Questions</span>
                  <span>📊 Intermediate</span>
                </div>
                <Link to="/assessment/science">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg">
                    Start Science Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="h-full bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl text-white shadow-lg">
                    <Calculator className="h-8 w-8" />
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white">Commerce</Badge>
                </div>
                <CardTitle className="text-xl font-bold text-orange-900">Commerce Stream</CardTitle>
                <CardDescription className="text-orange-700">
                  Ideal for students passionate about business, economics, and finance. Discover opportunities in accounting, management, and entrepreneurship.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-orange-600">
                  <span>⏱️ 40 mins</span>
                  <span>📝 45 Questions</span>
                  <span>📊 Beginner</span>
                </div>
                <Link to="/assessment/commerce">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg">
                    Start Commerce Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl text-white shadow-lg">
                    <Palette className="h-8 w-8" />
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">Arts</Badge>
                </div>
                <CardTitle className="text-xl font-bold text-purple-900">Arts & Humanities</CardTitle>
                <CardDescription className="text-purple-700">
                  For creative minds interested in literature, history, psychology, and social sciences. Explore diverse career paths in media, education, and public service.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-purple-600">
                  <span>⏱️ 35 mins</span>
                  <span>📝 40 Questions</span>
                  <span>📊 Beginner</span>
                </div>
                <Link to="/assessment/arts">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg">
                    Start Arts Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Not sure which assessment to take? Start with our comprehensive evaluation.
          </p>
          <Link to="/assessment/comprehensive">
            <Button size="lg" className="px-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Take Comprehensive Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsSection;
