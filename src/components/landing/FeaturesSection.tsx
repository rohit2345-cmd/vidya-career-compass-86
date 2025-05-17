
import React from "react";
import FeatureCard from "./FeatureCard";
import { Brain, BarChart, MessageSquare } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Comprehensive Career Guidance</h2>
          <p className="text-xl text-muted-foreground">
            Our platform offers a suite of tools designed to help students navigate their career journey with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Brain className="h-8 w-8 text-primary mb-2" />}
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
            icon={<BarChart className="h-8 w-8 text-primary mb-2" />}
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
            icon={<MessageSquare className="h-8 w-8 text-primary mb-2" />}
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
      </div>
    </section>
  );
};

export default FeaturesSection;
