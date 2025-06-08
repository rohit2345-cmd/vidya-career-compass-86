
import React from "react";
import { Link } from "react-router-dom";
import {
  Microscope,
  Calculator,
  Palette,
  ArrowRight,
  Brain,
  Users,
  Clock,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OpenEndedAssessmentCard from "./OpenEndedAssessmentCard";

const AssessmentsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background design */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 mb-6">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Specialized Assessments
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Choose Your 
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Perfect Assessment
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover your ideal career path through our scientifically-designed assessments 
            tailored specifically for Indian students and the local education system.
          </p>
        </div>
        
        {/* Assessment cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* Open-ended assessment */}
          <div className="md:col-span-2 transform hover:scale-105 transition-all duration-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative">
                <OpenEndedAssessmentCard />
              </div>
            </div>
          </div>
          
          {/* Science stream */}
          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="h-full relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-2xl text-white shadow-xl">
                      <Microscope className="h-8 w-8" />
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 shadow-lg">
                    <Award className="h-3 w-3 mr-1" />
                    Science
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl font-bold text-blue-900 mb-2">
                  Science Stream Assessment
                </CardTitle>
                <CardDescription className="text-blue-700 text-base leading-relaxed">
                  Comprehensive evaluation for students interested in Physics, Chemistry, Biology, and Mathematics. 
                  Discover opportunities in engineering, medicine, and research fields.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-blue-800">45 mins</span>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-blue-800">50 Questions</span>
                  </div>
                  <div className="text-center">
                    <Brain className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-blue-800">Advanced</span>
                  </div>
                </div>
                
                <Link to="/assessment/science">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl border-0 group">
                    Start Science Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* Commerce stream */}
          <div className="transform hover:scale-105 transition-all duration-300">
            <Card className="h-full relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl"></div>
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl text-white shadow-xl">
                      <Calculator className="h-8 w-8" />
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-lg">
                    <Award className="h-3 w-3 mr-1" />
                    Commerce
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl font-bold text-orange-900 mb-2">
                  Commerce Stream Assessment
                </CardTitle>
                <CardDescription className="text-orange-700 text-base leading-relaxed">
                  Perfect for business-minded students passionate about economics, finance, and entrepreneurship. 
                  Explore careers in accounting, management, and business leadership.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-6">
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-orange-800">40 mins</span>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-orange-800">45 Questions</span>
                  </div>
                  <div className="text-center">
                    <Brain className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                    <span className="text-sm font-medium text-orange-800">Intermediate</span>
                  </div>
                </div>
                
                <Link to="/assessment/commerce">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-xl border-0 group">
                    Start Commerce Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          {/* Arts stream */}
          <div className="md:col-span-2 transform hover:scale-105 transition-all duration-300">
            <Card className="h-full relative overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
              
              <CardHeader className="relative z-10 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl text-white shadow-xl">
                      <Palette className="h-8 w-8" />
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
                    <Award className="h-3 w-3 mr-1" />
                    Arts & Humanities
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold text-purple-900 mb-3">
                      Arts & Humanities Assessment
                    </CardTitle>
                    <CardDescription className="text-purple-700 text-base leading-relaxed">
                      Designed for creative minds interested in literature, history, psychology, and social sciences. 
                      Discover diverse opportunities in media, education, public service, and creative industries.
                    </CardDescription>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 py-4">
                      <div className="text-center">
                        <Clock className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-purple-800">35 mins</span>
                      </div>
                      <div className="text-center">
                        <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-purple-800">40 Questions</span>
                      </div>
                      <div className="text-center">
                        <Brain className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <span className="text-sm font-medium text-purple-800">Creative</span>
                      </div>
                    </div>
                    
                    <Link to="/assessment/arts">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl border-0 group">
                        Start Arts Assessment
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Bottom comprehensive CTA */}
        <div className="text-center bg-gradient-to-r from-background via-muted/30 to-background rounded-3xl p-12 border border-muted/50 shadow-xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl font-bold">Not sure which path to choose?</h3>
            <p className="text-lg text-muted-foreground">
              Take our comprehensive assessment that covers all streams and provides personalized recommendations 
              based on your unique interests, skills, and personality traits.
            </p>
            <Link to="/assessment/comprehensive">
              <Button size="lg" className="px-12 py-6 text-lg bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white shadow-2xl border-0 group">
                Take Comprehensive Assessment
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsSection;
