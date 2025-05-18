
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>
      <div className="absolute top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-24 -right-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm bg-background/80 backdrop-blur-sm">
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full mr-2">New</span>
              <span>AI-powered career recommendations</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Discover Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Perfect</span> Career Path
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive assessments and AI-powered guidance to help you
              make informed career choices tailored to the Indian education system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto font-medium group">
                  Get Started
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/assessments">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Assessments
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-lg rounded-full transform translate-x-10 translate-y-10"></div>
            <div className="relative z-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1920&q=80"
                alt="Students planning careers"
                className="rounded-2xl object-cover w-full h-full transform transition hover:scale-105 duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-primary font-bold">94%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Students satisfied</p>
                    <p className="text-xs text-muted-foreground">with our career guidance</p>
                  </div>
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
