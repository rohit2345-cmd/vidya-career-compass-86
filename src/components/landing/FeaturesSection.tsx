
import React from "react";
import FeatureCard from "./FeatureCard";
import { Brain, BarChart, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesSection = () => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-background to-muted/30">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Advanced Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Everything You Need for 
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our comprehensive platform combines cutting-edge AI technology with proven assessment methodologies 
            to provide you with the most accurate career guidance available.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <FeatureCard 
                icon={<Brain className="h-12 w-12 text-primary" />}
                title="AI-Powered Assessments"
                description="Advanced algorithms analyze your responses to provide highly accurate personality and aptitude insights."
                features={[
                  "Multi-dimensional personality analysis",
                  "Cognitive ability assessment", 
                  "Learning style identification"
                ]}
                link="/assessments"
                linkText="Start Assessment"
              />
            </div>
          </div>
          
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <FeatureCard 
                icon={<BarChart className="h-12 w-12 text-secondary" />}
                title="Career Path Analytics"
                description="Get detailed analysis of career opportunities with market trends and salary insights."
                features={[
                  "Industry growth projections",
                  "Salary benchmarking",
                  "Skill gap analysis"
                ]}
                link="/results-demo"
                linkText="View Analytics"
              />
            </div>
          </div>
          
          <div className="transform hover:scale-105 transition-all duration-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
              <FeatureCard 
                icon={<MessageSquare className="h-12 w-12 text-accent" />}
                title="AI Career Counselor"
                description="24/7 personalized guidance from our advanced AI counselor trained on career data."
                features={[
                  "Instant personalized advice",
                  "Course recommendations",
                  "Career progression planning"
                ]}
                link="/ai-counselor"
                linkText="Try Counselor"
              />
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-muted/50 to-background rounded-3xl p-8 border border-muted">
          <h3 className="text-2xl font-bold mb-4">Ready to discover your potential?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect career path with our comprehensive assessment platform.
          </p>
          <Link to="/about">
            <Button size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-white">
              Learn Our Methodology
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
