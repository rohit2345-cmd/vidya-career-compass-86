
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Calculator,
  Microscope,
  Palette,
  Users,
  Clock,
  Star,
  Sparkles,
  Quote,
} from "lucide-react";

import OpenEndedAssessmentCard from "../components/landing/OpenEndedAssessmentCard";

const Assessments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container py-12 animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-3xl -z-10"></div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Discover Your Future
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Career Assessment Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our range of assessments designed to help you discover your ideal career path.
            Each assessment is tailored to different aspects of career exploration.
          </p>
        </div>

        {/* Inspirational Quote Section */}
        <div className="relative mb-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="text-center pt-4">
            <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 leading-relaxed">
              "The future belongs to those who believe in the beauty of their dreams."
            </blockquote>
            <cite className="text-lg text-gray-600 font-medium">— Eleanor Roosevelt</cite>
          </div>
        </div>

        {/* Assessment Cards Grid - Fixed Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <div className="md:col-span-1">
            <OpenEndedAssessmentCard />
          </div>
          
          <AssessmentCard
            icon={<Brain className="h-8 w-8" />}
            title="Comprehensive Assessment"
            description="Complete career evaluation covering aptitude, interests, personality, and skills assessment for thorough guidance."
            duration="60 mins"
            questions="75 Questions"
            difficulty="Comprehensive"
            href="/assessment/comprehensive"
            featured={true}
            gradient="from-emerald-500 to-teal-600"
            bgGradient="from-emerald-50 to-teal-50"
          />
          
          <AssessmentCard
            icon={<Microscope className="h-8 w-8" />}
            title="Science Stream Assessment"
            description="Specialized for students considering Physics, Chemistry, Biology, and Mathematics career paths."
            duration="45 mins"
            questions="50 Questions"
            difficulty="Intermediate"
            href="/assessment/science"
            gradient="from-blue-500 to-cyan-600"
            bgGradient="from-blue-50 to-cyan-50"
          />
          
          <AssessmentCard
            icon={<Calculator className="h-8 w-8" />}
            title="Commerce Stream Assessment"
            description="Focused on business, finance, economics, and entrepreneurship career exploration."
            duration="40 mins"
            questions="45 Questions"
            difficulty="Beginner"
            href="/assessment/commerce"
            gradient="from-orange-500 to-red-600"
            bgGradient="from-orange-50 to-red-50"
          />
          
          <AssessmentCard
            icon={<Palette className="h-8 w-8" />}
            title="Arts & Humanities Assessment"
            description="Creative and liberal arts career exploration including media, literature, and social sciences."
            duration="35 mins"
            questions="40 Questions"
            difficulty="Beginner"
            href="/assessment/arts"
            gradient="from-purple-500 to-pink-600"
            bgGradient="from-purple-50 to-pink-50"
          />
          
          <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center justify-center p-6 lg:p-8 text-center h-full min-h-[300px]">
              <div className="bg-gradient-to-r from-gray-400 to-gray-600 p-4 rounded-full mb-6">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Group Assessment</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm lg:text-base">
                Coming soon! Collaborative assessments for classrooms and groups.
              </p>
              <Badge variant="outline" className="bg-white border-gray-300 text-gray-600">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <Star className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Not Sure Where to Start?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Our comprehensive assessment combines the best of all approaches to give you a complete picture 
              of your career potential. Perfect for students who want thorough career guidance.
            </p>
            <Link to="/assessment/comprehensive">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Take Comprehensive Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AssessmentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  questions: string;
  difficulty: string;
  href: string;
  featured?: boolean;
  gradient?: string;
  bgGradient?: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  icon,
  title,
  description,
  duration,
  questions,
  difficulty,
  href,
  featured,
  gradient = "from-gray-500 to-gray-600",
  bgGradient = "from-gray-50 to-gray-100",
}) => {
  return (
    <Card className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${bgGradient} border-0 shadow-lg h-full ${featured ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}>
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className={`bg-gradient-to-r ${gradient} p-3 rounded-xl text-white shadow-lg`}>
            {icon}
          </div>
          {featured && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-md">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed text-sm line-clamp-3 overflow-hidden">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-2 lg:gap-4 text-sm">
          <div className="text-center p-2 lg:p-3 bg-white/70 rounded-lg">
            <Clock className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <span className="font-medium text-gray-800 text-xs lg:text-sm block truncate">{duration}</span>
          </div>
          <div className="text-center p-2 lg:p-3 bg-white/70 rounded-lg">
            <Brain className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <span className="font-medium text-gray-800 text-xs lg:text-sm block truncate">{questions}</span>
          </div>
          <div className="text-center p-2 lg:p-3 bg-white/70 rounded-lg">
            <Palette className="h-4 w-4 mx-auto mb-1 text-gray-600" />
            <span className="font-medium text-gray-800 text-xs lg:text-sm block truncate">{difficulty}</span>
          </div>
        </div>
        <Link to={href} className="mt-auto">
          <Button className={`w-full bg-gradient-to-r ${gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold py-3`}>
            Start Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Assessments;
