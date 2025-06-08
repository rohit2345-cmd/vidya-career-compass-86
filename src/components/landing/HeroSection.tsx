
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Zap, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Geometric background patterns */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/15 transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-accent/20 rounded-full animate-ping"></div>
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/20"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge with enhanced design */}
            <div className="inline-flex items-center rounded-full border-2 border-primary/20 bg-background/80 backdrop-blur-sm px-6 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI-Powered Career Discovery
                </span>
              </div>
            </div>
            
            {/* Main heading with enhanced typography */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none">
                Find Your 
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                  Dream Career
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Unlock your potential with comprehensive assessments, AI-powered insights, 
              and personalized guidance designed for the Indian education ecosystem.
            </p>
            
            {/* Enhanced stats */}
            <div className="flex items-center gap-8 py-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">50K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-xl">
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </Link>
              <Link to="/assessments">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-primary/5 hover:border-primary/50">
                  Explore Assessments
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Enhanced hero image section */}
          <div className="relative lg:h-[600px] animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-full transform -rotate-6"></div>
            
            {/* Main image card */}
            <div className="relative z-20 h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur transform hover:scale-105 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80"
                alt="Students planning careers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
              
              {/* Floating cards */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Assessment Score</p>
                    <p className="text-2xl font-bold text-primary">94%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float animation-delay-1000">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Career Match</p>
                  <p className="text-lg font-bold text-secondary">Computer Science</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
