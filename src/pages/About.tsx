import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuidesTab from "../components/resources/GuidesTab";
import EducationTab from "../components/resources/EducationTab";
import AssessmentsTab from "../components/resources/AssessmentsTab";
import VideosTab from "../components/resources/VideosTab";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, LineChart, BookOpen, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 animate-fade-in">
        <div className="container py-12">
          {/* Project Overview Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About CareerPath</h1>
            <p className="text-xl text-muted-foreground">
              Guiding career decisions through evidence-based insights and personalized recommendations
            </p>
          </div>

          {/* Mission and Philosophy */}
          <Card className="mb-12 bg-gradient-to-r from-white to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                Our Philosophy
              </CardTitle>
              <CardDescription className="text-lg">
                Making career decisions based on impact, fit, and comparative advantage
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-blue max-w-none">
              <p>
                At CareerPath, we believe that choosing a career is one of the most important decisions you'll ever make. 
                The average person spends about 80,000 hours working in their career — that's 40 hours a week, 50 weeks 
                a year, for 40 years. This means your career choices don't just affect your income and daily satisfaction 
                but represent a significant opportunity to make a positive contribution to the world.
              </p>
              <p>
                Unfortunately, conventional career advice often falls short. It typically focuses on following your 
                passion or pursuing prestigious positions, without considering whether these paths truly match your 
                abilities or will lead to fulfilling and impactful work. We take a different approach, drawing on 
                evidence-based frameworks to help you make decisions.
              </p>
              <p>
                Our approach focuses on three key dimensions that are often overlooked:
              </p>
              <ul>
                <li><strong>Personal fit</strong>: Where your skills, interests, and working style will allow you to excel</li>
                <li><strong>Impact potential</strong>: How your career can contribute to solving important problems</li>
                <li><strong>Career capital</strong>: How each path builds skills, credentials, and connections for future opportunities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Our Assessment Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-white to-emerald-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-emerald-600" />
                  Our Assessment Approach
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Traditional career tests often place people into broad categories based on a narrow set of personality traits 
                  or interests. Our assessments take a more nuanced approach:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-primary-foreground">
                    <span className="text-foreground"><strong>Personal abilities and aptitudes</strong> - Identifying your strengths across multiple dimensions, not just academic intelligence</span>
                  </li>
                  <li className="text-primary-foreground">
                    <span className="text-foreground"><strong>Personal fit factors</strong> - Examining work preferences, values, and environments where you're likely to thrive</span>
                  </li>
                  <li className="text-primary-foreground">
                    <span className="text-foreground"><strong>Transferable skills</strong> - Recognizing abilities that can be applied across multiple fields</span>
                  </li>
                  <li className="text-primary-foreground">
                    <span className="text-foreground"><strong>Career capital potential</strong> - Identifying paths that build valuable credentials and open doors to future opportunities</span>
                  </li>
                  <li className="text-primary-foreground">
                    <span className="text-foreground"><strong>Impact alignment</strong> - Finding career paths that match your values and desire to contribute</span>
                  </li>
                </ul>
                <p>
                  Our questions are designed to reveal patterns in your reasoning, decision-making style, and priorities, 
                  rather than just assigning you to a personality type. This helps identify careers where you have a genuine 
                  comparative advantage—areas where you can excel relative to others who might pursue the same path.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-amber-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  Beyond "Follow Your Passion"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  While passion is important, our guidance challenges the oversimplified "follow your passion" advice for several reasons:
                </p>
                
                <h3 className="font-semibold">Passions Are Often Developed, Not Discovered</h3>
                <p>
                  Research shows that passion typically develops as you gain mastery and see the impact of your work, 
                  rather than being something innate that you simply need to discover.
                </p>
                
                <h3 className="font-semibold">Job Satisfaction Depends on Multiple Factors</h3>
                <p>
                  Meaningful work, supportive colleagues, autonomy, and achievement matter more for long-term satisfaction 
                  than simply working in an area of initial interest.
                </p>
                
                <h3 className="font-semibold">Personal Growth Through Challenge</h3>
                <p>
                  Career paths that push your boundaries often lead to greater personal development and satisfaction 
                  than those that keep you in your comfort zone.
                </p>
                
                <h3 className="font-semibold">Making a Contribution</h3>
                <p>
                  Careers that allow you to make a meaningful contribution to others or to important causes are consistently 
                  associated with higher levels of fulfillment.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Framework */}
          <Card className="mb-12 bg-gradient-to-r from-white to-indigo-50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Our Career Decision Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Rather than focusing solely on what you're passionate about today, our framework encourages you to consider:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-primary mb-2">Career Capital</h3>
                  <p>Which paths will help you build the most valuable skills, connections, credentials, and resources for future impact?</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-emerald-600 mb-2">Exploration Value</h3>
                  <p>Which options will teach you the most about your strengths and the problems you might want to work on?</p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-bold text-lg text-amber-600 mb-2">Personal Fit</h3>
                  <p>Where do you have the strongest potential to excel, considering your abilities, working style, and values?</p>
                </div>
              </div>
              
              <p>
                Our assessments measure multiple dimensions of personal fit and potential impact, helping you identify 
                options where these factors align. We believe this leads to more fulfilling and impactful career choices 
                than following simplistic advice about passion or prestige.
              </p>
            </CardContent>
          </Card>

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
    </div>
  );
};

export default About;
