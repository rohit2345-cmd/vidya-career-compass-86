
import React from "react";
import FeatureCard from "./FeatureCard";
import { Brain, BarChart, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,rgba(79,70,229,0.05)_0%,rgba(16,185,129,0.05)_30%,rgba(252,211,77,0.05)_60%)]"></div>
      
      <div className="container max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
            <span className="font-medium">Our Core Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Comprehensive Career Guidance
          </h2>
          <p className="text-xl text-muted-foreground">
            Our platform offers a suite of tools designed to help students navigate their career journey with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard 
            icon={<Brain className="h-10 w-10 text-primary mb-2" />}
            title="Aptitude Assessment"
            description="Discover your natural strengths and abilities through comprehensive testing."
            features={[
              "Logical reasoning evaluation",
              "Spatial awareness testing",
              "Numerical ability assessment"
            ]}
            link="/assessments"
            linkText="Learn More"
          />
          
          <FeatureCard 
            icon={<BarChart className="h-10 w-10 text-secondary mb-2" />}
            title="Career Path Analysis"
            description="Get personalized recommendations based on your assessment results."
            features={[
              "Stream-specific career options",
              "Industry alignment analysis",
              "Skill gap identification"
            ]}
            link="/results-demo"
            linkText="View Sample"
          />
          
          <FeatureCard 
            icon={<MessageSquare className="h-10 w-10 text-accent mb-2" />}
            title="AI Career Counselor"
            description="Chat with our AI counselor for personalized guidance and answers."
            features={[
              "24/7 personalized guidance",
              "Course & college recommendations",
              "Industry insights & trends"
            ]}
            link="/ai-counselor"
            linkText="Try Demo"
          />
        </div>
        
        <div className="flex justify-center">
          <Link to="/about">
            <Button variant="outline" className="group">
              Learn about our methodology
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
