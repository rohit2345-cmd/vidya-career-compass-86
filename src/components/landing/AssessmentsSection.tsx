
import React from "react";
import { Card } from "@/components/ui/card";
import AssessmentCard from "./AssessmentCard";
import { BookOpen, GraduationCap, BarChart } from "lucide-react";

const AssessmentsSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Tailored Assessment Categories</h2>
          <p className="text-xl text-muted-foreground">
            Choose from specialized assessment tracks designed for different educational streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AssessmentCard 
            variant="large"
            title="Comprehensive Assessment"
            description="Our complete battery of tests for students still exploring options"
            icon={<BookOpen className="h-6 w-6 text-primary" />}
            backgroundColor="bg-indigo-50 dark:bg-indigo-900/20"
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

          <div className="grid grid-cols-1 gap-8">
            <AssessmentCard 
              variant="large"
              title="Science Stream Assessment"
              description=""
              icon={<GraduationCap className="h-6 w-6 text-emerald-600" />}
              backgroundColor="bg-emerald-50 dark:bg-emerald-900/20"
              link="/assessment/science"
              linkText="Explore"
              shortDescription="Specialized assessment for students interested in pursuing science-based careers."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AssessmentCard 
                variant="small"
                title="Commerce Stream"
                icon={<BarChart className="h-5 w-5 text-amber-600" />}
                backgroundColor="bg-amber-50 dark:bg-amber-900/20"
                link="/assessment/commerce"
                linkText="Explore"
                shortDescription="For business & economics paths"
              />

              <AssessmentCard 
                variant="small"
                title="Arts Stream"
                icon={<BookOpen className="h-5 w-5 text-indigo-600" />}
                backgroundColor="bg-indigo-50 dark:bg-indigo-900/20"
                link="/assessment/arts"
                linkText="Explore"
                shortDescription="For humanities & liberal arts"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsSection;
