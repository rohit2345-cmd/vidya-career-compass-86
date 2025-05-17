
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
  Lightbulb,
  BookText,
  FileSearch,
  HelpCircle
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
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
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

          <TabsContent value="assessments" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileSearch className="h-5 w-5 text-primary" />
                    <CardTitle>Understanding Our Assessments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Our scientifically-designed assessments help students identify their strengths, interests, and aptitudes to make informed career decisions. Each assessment is tailored to provide insights specific to different educational streams.</p>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">How Assessments Help Students:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                      <li>Discover natural strengths and aptitudes</li>
                      <li>Identify career paths aligned with personality traits</li>
                      <li>Explore educational pathways matched to interests</li>
                      <li>Understand skill development needs for chosen careers</li>
                      <li>Build confidence through self-awareness</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-emerald-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <CardTitle>For Career Counselors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Career counselors can leverage our assessment data to provide more personalized guidance to students. Our detailed reports offer actionable insights that help counselors make targeted recommendations.</p>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Benefits for Counselors:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                      <li>Data-driven counseling approach</li>
                      <li>Comprehensive student aptitude profiles</li>
                      <li>Scientific basis for career recommendations</li>
                      <li>Personalized educational pathway planning</li>
                      <li>Progress tracking and development monitoring</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-blue-100 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookText className="h-5 w-5 text-blue-600" />
                    Comprehensive Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Our Comprehensive Assessment provides a holistic evaluation of a student's aptitudes, interests, and personality traits across all streams of education. This assessment is ideal for students who are undecided about which educational path to pursue.</p>
                  
                  <h3 className="font-semibold">What It Measures:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                    <li>General aptitude across multiple disciplines</li>
                    <li>Cross-stream interest patterns</li>
                    <li>Core personality traits relevant to career success</li>
                    <li>Learning styles and work preferences</li>
                  </ul>
                  
                  <p className="text-sm italic text-muted-foreground mt-4">The comprehensive assessment contains 60 questions carefully designed to evaluate a student's potential across all three major streams - Science, Commerce, and Arts.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto">
                    Take Assessment
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle>Science Stream Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>Our Science Stream Assessment evaluates aptitudes and interests specifically relevant to science careers including engineering, medicine, research, and technology.</p>
                    
                    <h4 className="font-medium">Key Focus Areas:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                      <li>Logical reasoning and problem solving</li>
                      <li>Mathematical aptitude and spatial thinking</li>
                      <li>Scientific observation and experimental design</li>
                      <li>Research aptitude and analytical skills</li>
                      <li>Theoretical understanding and application</li>
                    </ul>
                    
                    <p className="text-sm italic text-muted-foreground mt-2">The Science assessment includes real-world scenarios and practical problems that require applying scientific thinking.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Take Assessment</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-100">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-emerald-600" />
                      <CardTitle>Commerce Stream Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>The Commerce Stream Assessment evaluates aptitudes and interests aligned with business, finance, accounting, economics, and management careers.</p>
                    
                    <h4 className="font-medium">Key Focus Areas:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                      <li>Numerical and analytical abilities</li>
                      <li>Business acumen and economic reasoning</li>
                      <li>Financial literacy and aptitude</li>
                      <li>Management and organizational skills</li>
                      <li>Entrepreneurial thinking</li>
                    </ul>
                    
                    <p className="text-sm italic text-muted-foreground mt-2">Questions are designed around business cases and financial scenarios that test commercial awareness and decision-making.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Take Assessment</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-100">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-600" />
                      <CardTitle>Arts Stream Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>The Arts Stream Assessment evaluates aptitudes and interests related to humanities, social sciences, creative arts, design, literature, and performing arts.</p>
                    
                    <h4 className="font-medium">Key Focus Areas:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                      <li>Verbal reasoning and language aptitude</li>
                      <li>Creative thinking and expression</li>
                      <li>Social awareness and cultural sensitivity</li>
                      <li>Critical analysis and interpretation</li>
                      <li>Visual and performing arts aptitude</li>
                    </ul>
                    
                    <p className="text-sm italic text-muted-foreground mt-2">Questions evaluate both analytical and creative aspects through scenarios that reflect real humanities and arts challenges.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Take Assessment</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
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
