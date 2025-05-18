
import React from "react";
import { Card } from "@/components/ui/card";
import AssessmentCard from "./AssessmentCard";
import { BookOpen, GraduationCap, BarChart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AssessmentsSection = () => {
  return (
    <section className="py-20 relative bg-muted/20">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,rgba(79,70,229,0.05)_0%,rgba(16,185,129,0.05)_100%)]"></div>
      <div className="absolute inset-0 -z-10 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
            <span className="font-medium">Personalized For You</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tailored Assessment Categories
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose from specialized assessment tracks designed for different educational streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <AssessmentCard 
              variant="large"
              title="Comprehensive Assessment"
              description="Our complete battery of tests for students still exploring options"
              icon={<Brain className="h-7 w-7 text-primary" />}
              backgroundColor="bg-primary/10"
              link="/assessment/comprehensive"
              linkText="Start Assessment"
              buttonVariant="default"
              shortDescription="Includes all assessment types to help you explore all possible career paths across streams."
              details={[
                { label: "Aptitude Questions", value: "25 Questions" },
                { label: "Interest Inventory", value: "20 Questions" },
                { label: "Personality Assessment", value: "15 Questions" },
                { label: "Technical Questions", value: "20 Questions" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-emerald-600/5 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <AssessmentCard 
                variant="large"
                title="Science Stream Assessment"
                description="For future scientists, doctors, engineers & researchers"
                icon={<GraduationCap className="h-7 w-7 text-emerald-600" />}
                backgroundColor="bg-emerald-600/10"
                link="/assessment/science"
                linkText="Explore"
                shortDescription="Specialized assessment for students interested in pursuing science-based careers."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-600/5 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <AssessmentCard 
                  variant="small"
                  title="Commerce Stream"
                  icon={<BarChart className="h-6 w-6 text-amber-600" />}
                  backgroundColor="bg-amber-600/10"
                  link="/assessment/commerce"
                  linkText="Explore"
                  shortDescription="For business & economics paths"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <AssessmentCard 
                  variant="small"
                  title="Arts Stream"
                  icon={<BookOpen className="h-6 w-6 text-indigo-600" />}
                  backgroundColor="bg-indigo-600/10"
                  link="/assessment/arts"
                  linkText="Explore"
                  shortDescription="For humanities & liberal arts"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/assessments">
            <Button variant="outline" size="lg" className="mt-4">
              View All Assessment Details
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsSection;
