
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  GraduationCap,
  BarChart,
  Clock,
  FileText,
  School,
  Award,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import assessment data to get metrics
import scienceQuestions from "../questions/scienceQuestions.json";
import artsQuestions from "../questions/artsQuestions.json";
import commerceQuestions from "../questions/commerceQuestions.json";
import commonQuestions from "../questions/common_test.json";

interface AssessmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  questions: number;
  path: string;
  category: string;
  popular?: boolean;
  gradientClass: string;
  iconColor: string;
}

const AssessmentCard = ({
  title,
  description,
  icon,
  duration,
  questions,
  path,
  category,
  popular,
  gradientClass,
  iconColor,
}: AssessmentCardProps) => {
  return (
    <Card className={`card-hover overflow-hidden ${gradientClass} border-0 shadow-lg transition-all duration-300`}>
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl"></div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${iconColor} text-white`}>
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          {popular && <Badge className="bg-accent hover:bg-accent/80">Popular</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{questions} Questions</span>
          </div>
          <div className="flex items-center text-sm">
            <School className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={path} className="w-full">
          <Button className={`w-full transition-all hover:scale-105 ${iconColor} hover:opacity-90`}>
            Start Assessment
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Assessments = () => {
  // Get question counts
  const scienceCount = scienceQuestions.questions?.length || 0;
  const artsCount = artsQuestions.questions?.length || 0;
  const commerceCount = commerceQuestions.questions?.length || 0;
  const commonCount = commonQuestions.questions?.length || 0;
  
  return (
    <div className="min-h-screen py-12 relative animate-fade-in">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50 -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 -z-10"></div>
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent animate-fade-in-up">Career Assessments</h1>
          <p className="text-xl text-muted-foreground">
            Discover your ideal career path through our comprehensive assessment suite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 px-4">
          <AssessmentCard
            title="Comprehensive Assessment"
            description="Complete assessment covering all career paths"
            icon={<Brain className="h-6 w-6" />}
            duration="60-75 minutes"
            questions={commonCount}
            path="/assessment/comprehensive"
            category="All Streams"
            popular={true}
            gradientClass="bg-gradient-to-br from-card to-primary/5"
            iconColor="bg-primary"
          />
          <AssessmentCard
            title="Science Stream Assessment"
            description="For students interested in STEM fields"
            icon={<GraduationCap className="h-6 w-6" />}
            duration="45-60 minutes"
            questions={scienceCount}
            path="/assessment/science"
            category="Science Stream"
            gradientClass="bg-gradient-to-br from-card to-emerald-500/5"
            iconColor="bg-emerald-600"
          />
          <AssessmentCard
            title="Commerce Stream Assessment"
            description="For business and economics oriented students"
            icon={<BarChart className="h-6 w-6" />}
            duration="45-60 minutes"
            questions={commerceCount}
            path="/assessment/commerce"
            category="Commerce Stream"
            gradientClass="bg-gradient-to-br from-card to-amber-500/5"
            iconColor="bg-amber-600"
          />
          <AssessmentCard
            title="Arts Stream Assessment"
            description="For humanities and liberal arts focused students"
            icon={<BookOpen className="h-6 w-6" />}
            duration="45-60 minutes"
            questions={artsCount}
            path="/assessment/arts"
            category="Arts Stream"
            gradientClass="bg-gradient-to-br from-card to-indigo-500/5"
            iconColor="bg-indigo-600"
          />
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-6">
            <Trophy className="mr-2 h-4 w-4 text-amber-500" />
            <span>Top-rated career assessment platform</span>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Our assessments help thousands of students make informed decisions about their
            academic and career futures every month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assessments;
