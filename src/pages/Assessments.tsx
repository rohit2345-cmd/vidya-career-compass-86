
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
} from "lucide-react";

import OpenEndedAssessmentCard from "../components/landing/OpenEndedAssessmentCard";

const Assessments = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Career Assessment Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from our range of assessments designed to help you discover your ideal career path.
          Each assessment is tailored to different aspects of career exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <OpenEndedAssessmentCard />
        </div>
        
        <AssessmentCard
          icon={<Brain className="h-8 w-8" />}
          title="Comprehensive Assessment"
          description="Complete career evaluation covering aptitude, interests, personality, and skills assessment."
          duration="60 mins"
          questions="75 Questions"
          difficulty="Comprehensive"
          href="/assessment/comprehensive"
          featured={true}
        />
        
        <AssessmentCard
          icon={<Microscope className="h-8 w-8" />}
          title="Science Stream Assessment"
          description="Specialized for students considering Physics, Chemistry, Biology, and Mathematics careers."
          duration="45 mins"
          questions="50 Questions"
          difficulty="Intermediate"
          href="/assessment/science"
        />
        
        <AssessmentCard
          icon={<Calculator className="h-8 w-8" />}
          title="Commerce Stream Assessment"
          description="Focused on business, finance, economics, and entrepreneurship career paths."
          duration="40 mins"
          questions="45 Questions"
          difficulty="Beginner"
          href="/assessment/commerce"
        />
        
        <AssessmentCard
          icon={<Palette className="h-8 w-8" />}
          title="Arts & Humanities Assessment"
          description="For creative and liberal arts career exploration including media, literature, and social sciences."
          duration="35 mins"
          questions="40 Questions"
          difficulty="Beginner"
          href="/assessment/arts"
        />
        
        <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/10">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Group Assessment</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Coming soon! Collaborative assessments for classrooms and groups.
            </p>
            <Badge variant="outline">Coming Soon</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Not Sure Where to Start?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our comprehensive assessment combines the best of all approaches to give you a complete picture 
          of your career potential. Perfect for students who want thorough career guidance.
        </p>
        <Link to="/assessment/comprehensive">
          <Button size="lg" className="px-8">
            Take Comprehensive Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
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
}) => {
  return (
    <Card className={`group hover:shadow-lg transition-shadow duration-300 ${featured ? 'border-primary border-2' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          {icon}
          {featured && <Badge variant="secondary">Featured</Badge>}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            <Clock className="h-4 w-4 inline-block mr-1" />
            <span>{duration}</span>
          </div>
          <div>
            <Brain className="h-4 w-4 inline-block mr-1" />
            <span>{questions}</span>
          </div>
          <div>
            <Palette className="h-4 w-4 inline-block mr-1" />
            <span>{difficulty}</span>
          </div>
        </div>
        <Link to={href}>
          <Button className="w-full group-hover:bg-primary/90 transition-colors">
            Start Assessment
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Assessments;
