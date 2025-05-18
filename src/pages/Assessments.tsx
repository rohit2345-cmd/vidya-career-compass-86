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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}: AssessmentCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {popular && <Badge className="bg-accent hover:bg-accent/80">Popular</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
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
          <Button className="w-full">Start Assessment</Button>
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
    <div className="container py-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Career Assessments</h1>
        <p className="text-xl text-muted-foreground">
          Discover your ideal career path through our comprehensive assessment suite
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
            <TabsTrigger value="arts">Arts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AssessmentCard
              title="Comprehensive Career Assessment"
              description="Complete assessment covering all career paths"
              icon={<Brain className="h-8 w-8 text-primary" />}
              duration="60-75 minutes"
              questions={commonCount}
              path="/assessment/comprehensive"
              category="All Streams"
              popular={true}
            />
            <AssessmentCard
              title="Science Stream Assessment"
              description="For students interested in STEM fields"
              icon={<GraduationCap className="h-8 w-8 text-emerald-600" />}
              duration="45-60 minutes"
              questions={scienceCount}
              path="/assessment/science"
              category="Science Stream"
            />
            <AssessmentCard
              title="Commerce Stream Assessment"
              description="For business and economics oriented students"
              icon={<BarChart className="h-8 w-8 text-amber-600" />}
              duration="45-60 minutes"
              questions={commerceCount}
              path="/assessment/commerce"
              category="Commerce Stream"
            />
            <AssessmentCard
              title="Arts Stream Assessment"
              description="For humanities and liberal arts focused students"
              icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
              duration="45-60 minutes"
              questions={artsCount}
              path="/assessment/arts"
              category="Arts Stream"
            />
          </div>
        </TabsContent>

        <TabsContent value="comprehensive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AssessmentCard
              title="Comprehensive Career Assessment"
              description="Complete assessment covering all career paths"
              icon={<Brain className="h-8 w-8 text-primary" />}
              duration="60-75 minutes"
              questions={commonCount}
              path="/assessment/comprehensive"
              category="All Streams"
              popular={true}
            />
          </div>
        </TabsContent>

        <TabsContent value="science">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AssessmentCard
              title="Science Stream Assessment"
              description="For students interested in STEM fields"
              icon={<GraduationCap className="h-8 w-8 text-emerald-600" />}
              duration="45-60 minutes"
              questions={scienceCount}
              path="/assessment/science"
              category="Science Stream"
            />
          </div>
        </TabsContent>

        <TabsContent value="commerce">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AssessmentCard
              title="Commerce Stream Assessment"
              description="For business and economics oriented students"
              icon={<BarChart className="h-8 w-8 text-amber-600" />}
              duration="45-60 minutes"
              questions={commerceCount}
              path="/assessment/commerce"
              category="Commerce Stream"
            />
          </div>
        </TabsContent>

        <TabsContent value="arts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AssessmentCard
              title="Arts Stream Assessment"
              description="For humanities and liberal arts focused students"
              icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
              duration="45-60 minutes"
              questions={artsCount}
              path="/assessment/arts"
              category="Arts Stream"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assessments;
