
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
