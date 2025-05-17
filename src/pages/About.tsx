
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuidesTab from "../components/resources/GuidesTab";
import EducationTab from "../components/resources/EducationTab";
import AssessmentsTab from "../components/resources/AssessmentsTab";
import VideosTab from "../components/resources/VideosTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, LineChart, BookOpen, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 animate-fade-in">
      <div className="container py-12">
        {/* Project Overview Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About CareerPath</h1>
          <p className="text-xl text-muted-foreground">
            Revolutionizing career guidance through data-driven insights and personalized recommendations
          </p>
        </div>

        {/* Mission and Vision */}
        <Card className="mb-12 bg-gradient-to-r from-white to-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
            <CardDescription className="text-lg">
              Empowering students to make informed career decisions through scientific assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none">
            <p>
              At CareerPath, we believe that every student deserves access to high-quality career guidance that is 
              personalized, evidence-based, and accessible. Our mission is to bridge the gap between education and career 
              choices by providing scientific assessments and data-driven insights that help students discover their 
              natural aptitudes and align them with suitable career paths.
            </p>
            <p>
              Founded in 2024 by a team of educational psychologists, data scientists, and career counselors, CareerPath 
              was born out of a recognition that traditional career guidance often falls short of addressing the unique 
              individual attributes that contribute to career success and satisfaction. Our approach combines psychometric 
              testing, labor market data, and advanced analytics to create a comprehensive picture of each student's potential 
              career trajectory.
            </p>
          </CardContent>
        </Card>

        {/* Our Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-white to-emerald-50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <LineChart className="h-5 w-5 text-emerald-600" />
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CareerPath employs a multidimensional assessment approach that evaluates students across several key dimensions:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-primary-foreground"><span className="text-foreground">Cognitive abilities and aptitudes</span> - Measuring natural strengths across different types of intelligence</li>
                <li className="text-primary-foreground"><span className="text-foreground">Personality traits</span> - Identifying character attributes that influence work style and environment preferences</li>
                <li className="text-primary-foreground"><span className="text-foreground">Interests and values</span> - Uncovering passion areas and principles that drive motivation and satisfaction</li>
                <li className="text-primary-foreground"><span className="text-foreground">Skills assessment</span> - Evaluating current capabilities and potential for skill development</li>
                <li className="text-primary-foreground"><span className="text-foreground">Learning style</span> - Understanding how students best absorb and process information</li>
              </ul>
              <p className="mt-4">
                Our proprietary algorithm synthesizes these dimensions to create a holistic profile that matches students 
                with career paths where they are most likely to thrive. Unlike conventional approaches that focus solely on 
                academic performance or expressed interests, our method accounts for the full spectrum of factors that 
                contribute to career success.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-600" />
                What Makes Us Different
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Scientific Rigor</h3>
              <p>
                Our assessments are developed by experts in psychometrics and validated through extensive research. 
                Each question and measurement tool undergoes rigorous testing to ensure reliability and validity.
              </p>
              
              <h3 className="font-semibold">Comprehensive Analysis</h3>
              <p>
                We don't just match students to careers based on interests or aptitudes alone. Our algorithm considers 
                over 40 different data points to create nuanced recommendations that account for the complexity of 
                individual differences.
              </p>
              
              <h3 className="font-semibold">Future-Focused</h3>
              <p>
                Our career recommendations incorporate labor market projections and emerging industry trends to 
                ensure that students are prepared for the careers of tomorrow, not just today.
              </p>
              
              <h3 className="font-semibold">Accessibility</h3>
              <p>
                We believe quality career guidance should be available to all students, regardless of geographic 
                location or economic background. Our digital platform makes expert-level guidance accessible to 
                students everywhere.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Impact Statistics */}
        <Card className="mb-12 bg-gradient-to-r from-white to-indigo-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Our Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-primary">50,000+</p>
                <p className="text-muted-foreground">Students Assessed</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-emerald-600">92%</p>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-amber-600">500+</p>
                <p className="text-muted-foreground">Partner Schools</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold text-indigo-600">85%</p>
                <p className="text-muted-foreground">Career Path Alignment</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              *Based on surveys and follow-up studies with students who have used CareerPath
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="guides" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="guides">Career Guides</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="videos">Video Resources</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="guides">
            <GuidesTab />
          </TabsContent>

          <TabsContent value="education">
            <EducationTab />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentsTab />
          </TabsContent>

          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default About;
