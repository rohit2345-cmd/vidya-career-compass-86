
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  GraduationCap,
  FileText,
  Globe,
  Youtube,
  BookMarked,
  Download,
  Lightbulb
} from "lucide-react";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 animate-fade-in">
      <div className="container py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Career Resources</h1>
          <p className="text-xl text-muted-foreground">
            Helpful resources to guide your career journey
          </p>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="guides">Career Guides</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="tools">Career Tools</TabsTrigger>
              <TabsTrigger value="videos">Video Resources</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="guides" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover bg-gradient-to-br from-white to-blue-50 border-blue-100">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle>Science Career Guide</CardTitle>
                  </div>
                  <CardDescription>Explore various career paths in the Science stream</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This comprehensive guide covers various Science career paths including Engineering, Medicine, Research, and more. Learn about required qualifications, job prospects, and salary expectations.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-emerald-50 border-emerald-100">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-secondary" />
                    <CardTitle>Commerce Career Guide</CardTitle>
                  </div>
                  <CardDescription>Discover opportunities in Commerce and Business</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our Commerce stream guide covers paths like Chartered Accountancy, Business Management, Economics, Finance, and more. Understand the education requirements and career progression.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-amber-50 border-amber-100">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <CardTitle>Arts Career Guide</CardTitle>
                  </div>
                  <CardDescription>Creative and humanities career opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our Arts and Humanities guide explores paths in Design, Literature, Psychology, Media, Performing Arts, and more. Discover how to leverage your creative talents professionally.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Career Planning Worksheet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our step-by-step career planning worksheet helps you identify your strengths, interests, and skills to align them with suitable career options. Perfect for students who have completed an assessment and want to further explore their results.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full md:w-auto flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Worksheet
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <CardTitle>Top Engineering Colleges</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Comprehensive guide to India's top engineering institutions including admission criteria, specializations, and placement records.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Guide</Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-emerald-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-secondary" />
                    <CardTitle>Business School Directory</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Explore top management institutes in India with details on MBA programs, admission process, fees, and career outcomes.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Directory</Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-amber-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    <CardTitle>Arts & Design Institutes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Find the best arts, design, and humanities institutions offering undergraduate and graduate programs across India.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Institutes</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle>Scholarship Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Discover scholarships available for Indian students across various streams and institutions. Our regularly updated database includes government schemes, private scholarships, and university-specific financial aid.</p>
              </CardContent>
              <CardFooter>
                <Button>Search Scholarships</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-hover bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle>Resume Builder</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Create professional resumes tailored to your career path with our easy-to-use resume builder. Includes templates designed for various industries and experience levels.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Building</Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-emerald-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-secondary" />
                    <CardTitle>College Finder</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Find the perfect college based on your interests, academic performance, location preference, and budget with our advanced college matching algorithm.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Find Colleges</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-emerald-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-primary" />
                  Entrance Exam Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline">JEE Preparation</Button>
                  <Button variant="outline">NEET Resources</Button>
                  <Button variant="outline">CAT Study Material</Button>
                  <Button variant="outline">CLAT Practice Tests</Button>
                  <Button variant="outline">NID Prep Guide</Button>
                  <Button variant="outline">All Exams</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <CardTitle>Career Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Video Thumbnail</p>
                  </div>
                  <p>Interviews with professionals across various fields sharing their career journeys and advice.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Watch Series</Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-emerald-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <CardTitle>Skill Development</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Video Thumbnail</p>
                  </div>
                  <p>Tutorial videos on developing essential skills for various career paths and industries.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Watch Tutorials</Button>
                </CardFooter>
              </Card>

              <Card className="card-hover bg-gradient-to-br from-white to-amber-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    <CardTitle>Student Success Stories</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Video Thumbnail</p>
                  </div>
                  <p>Real stories from students who successfully navigated their career journeys with our guidance.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Watch Stories</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
