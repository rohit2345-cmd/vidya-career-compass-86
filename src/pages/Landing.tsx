
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, GraduationCap, BarChart, MessageSquare, CheckCircle } from "lucide-react";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen font-archivo">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24 px-10 md:px-40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Discover Your <span className="text-primary">Perfect</span> Career Path
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive assessments and AI-powered guidance to help you
                make informed career choices tailored to the Indian education system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/assessments">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Assessments
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt="Students planning careers"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Comprehensive Career Guidance</h2>
            <p className="text-xl text-muted-foreground">
              Our platform offers a suite of tools designed to help students navigate their career journey with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Aptitude Assessment</CardTitle>
                <CardDescription>
                  Discover your natural strengths and abilities through comprehensive testing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Logical reasoning evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Spatial awareness testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Numerical ability assessment</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/assessments" className="w-full">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <BarChart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Career Path Analysis</CardTitle>
                <CardDescription>
                  Get personalized recommendations based on your assessment results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Stream-specific career options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Industry alignment analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Skill gap identification</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/results-demo" className="w-full">
                  <Button variant="outline" className="w-full">View Sample</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI Career Counselor</CardTitle>
                <CardDescription>
                  Chat with our AI counselor for personalized guidance and answers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>24/7 personalized guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Course & college recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 flex-shrink-0" />
                    <span>Industry insights & trends</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/ai-counselor" className="w-full">
                  <Button variant="outline" className="w-full">Try Demo</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Tailored Assessment Categories</h2>
            <p className="text-xl text-muted-foreground">
              Choose from specialized assessment tracks designed for different educational streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-hover">
              <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Comprehensive Assessment
                </CardTitle>
                <CardDescription>
                  Our complete battery of tests for students still exploring options
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Includes all assessment types to help you explore all possible career paths across streams.</p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Aptitude Questions</span>
                    <span className="font-medium">25 Questions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Interest Inventory</span>
                    <span className="font-medium">20 Questions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Personality Assessment</span>
                    <span className="font-medium">15 Questions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Technical Questions</span>
                    <span className="font-medium">20 Questions</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/assessment/comprehensive" className="w-full">
                  <Button className="w-full">Start Assessment</Button>
                </Link>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 gap-8">
              <Card className="card-hover">
                <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-emerald-600" />
                    Science Stream Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p>Specialized assessment for students interested in pursuing science-based careers.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/assessment/science" className="w-full">
                    <Button variant="outline" className="w-full">Explore</Button>
                  </Link>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="card-hover">
                  <CardHeader className="bg-amber-50 dark:bg-amber-900/20 rounded-t-lg py-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BarChart className="h-5 w-5 text-amber-600" />
                      Commerce Stream
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm">For business & economics paths</p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/assessment/commerce" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">Explore</Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="card-hover">
                  <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20 rounded-t-lg py-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      Arts Stream
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm">For humanities & liberal arts</p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/assessment/arts" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">Explore</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Student Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Here's what students are saying about our career counseling platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Aarav Sharma</h4>
                    <p className="text-sm text-muted-foreground">Delhi Public School</p>
                  </div>
                </div>
                <p className="italic">
                  "The assessments helped me realize my strengths in analytical thinking. I'm now pursuing Computer Science at IIT Bombay with confidence in my choice."
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-secondary">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya Patel</h4>
                    <p className="text-sm text-muted-foreground">St. Xavier's High School</p>
                  </div>
                </div>
                <p className="italic">
                  "The AI counselor provided personalized guidance that helped me choose Commerce stream. Now I'm preparing for CA with clear goals."
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">R</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Rahul Nair</h4>
                    <p className="text-sm text-muted-foreground">Kendriya Vidyalaya</p>
                  </div>
                </div>
                <p className="italic">
                  "I was confused between Science and Arts streams. The comprehensive assessment clarified my interests in design. Now studying at NID Ahmedabad."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Find Your Career Path?</h2>
            <p className="text-xl opacity-90">
              Take the first step towards a fulfilling career journey tailored to your unique abilities and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/assessments">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white hover:bg-white/10">
                  View All Assessments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
