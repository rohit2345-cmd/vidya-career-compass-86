import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, GraduationCap, BarChart, Clock, FileText, School, Award, Trophy, Star, Users, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
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
  iconColor
}: AssessmentCardProps) => {
  return <Card className={`card-hover overflow-hidden ${gradientClass} border-0 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 relative group`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 -ml-6 -mb-6 bg-white/5 rounded-full blur-xl"></div>
      
      <CardHeader className="relative z-20">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${iconColor} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
              <CardDescription className="mt-1 text-sm">{description}</CardDescription>
            </div>
          </div>
          {popular && <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
              <Star className="mr-1 h-3 w-3" />
              Popular
            </Badge>}
        </div>
      </CardHeader>
      <CardContent className="relative z-20">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm bg-white/20 rounded-lg p-2">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{duration}</span>
            </div>
            <div className="flex items-center text-sm bg-white/20 rounded-lg p-2">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{questions} Questions</span>
            </div>
          </div>
          <div className="flex items-center text-sm bg-white/20 rounded-lg p-2">
            <School className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-20">
        <Link to={path} className="w-full">
          <Button className={`w-full transition-all hover:scale-105 shadow-lg ${iconColor} hover:opacity-90 group relative overflow-hidden`}>
            <span className="relative z-10 flex items-center justify-center">
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
          </Button>
        </Link>
      </CardFooter>
    </Card>;
};
const Assessments = () => {
  // Get question counts
  const scienceCount = scienceQuestions.questions?.length || 0;
  const artsCount = artsQuestions.questions?.length || 0;
  const commerceCount = commerceQuestions.questions?.length || 0;
  const commonCount = commonQuestions.questions?.length || 0;
  return <div className="min-h-screen relative animate-fade-in">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)] -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,206,84,0.1),transparent_50%)] -z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] -z-10"></div>
      
      <div className="container py-16 relative">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Discover Your Future
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
            Career Assessments
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unlock your potential with our scientifically-designed assessments. 
            <span className="font-semibold text-foreground"> Discover your strengths, explore career paths, and shape your future</span> with confidence.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-muted-foreground">Students Assessed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">200+</div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
          </div>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 px-4 mb-20">
          <AssessmentCard title="Comprehensive Assessment" description="Complete evaluation across all streams" icon={<Brain className="h-6 w-6" />} duration="60-75 minutes" questions={commonCount} path="/assessment/comprehensive" category="All Streams" popular={true} gradientClass="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20" iconColor="bg-gradient-to-r from-blue-500 to-indigo-600" />
          <AssessmentCard title="Science Stream" description="STEM fields and technical careers" icon={<GraduationCap className="h-6 w-6" />} duration="45-60 minutes" questions={scienceCount} path="/assessment/science" category="Science Stream" gradientClass="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20" iconColor="bg-gradient-to-r from-emerald-500 to-green-600" />
          <AssessmentCard title="Commerce Stream" description="Business and economics pathways" icon={<BarChart className="h-6 w-6" />} duration="45-60 minutes" questions={commerceCount} path="/assessment/commerce" category="Commerce Stream" gradientClass="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20" iconColor="bg-gradient-to-r from-amber-500 to-orange-600" />
          <AssessmentCard title="Arts Stream" description="Humanities and creative fields" icon={<BookOpen className="h-6 w-6" />} duration="45-60 minutes" questions={artsCount} path="/assessment/arts" category="Arts Stream" gradientClass="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20" iconColor="bg-gradient-to-r from-purple-500 to-pink-600" />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Scientifically Validated</h3>
            <p className="text-muted-foreground">
              Our assessments are backed by research and validated by career counseling experts.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Results</h3>
            <p className="text-muted-foreground">
              Get detailed insights tailored to your unique strengths and interests.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white mb-4">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Guidance</h3>
            <p className="text-muted-foreground">
              Access AI-powered career counseling based on your assessment results.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="relative z-10">
            <Trophy className="h-16 w-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Path?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their ideal career direction through our assessments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment/comprehensive">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ai-counselor">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl text-lime-500">
                  Talk to AI Counselor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Assessments;