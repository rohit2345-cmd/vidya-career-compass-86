
import React from "react";
import { Link } from "react-router-dom";
import {
  Microscope,
  Calculator,
  Palette,
  ArrowRight,
  Brain,
  Users,
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
import AssessmentCard from "./AssessmentCard";
import OpenEndedAssessmentCard from "./OpenEndedAssessmentCard";

const AssessmentsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Assessment Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take our comprehensive assessments designed specifically for Indian students 
            to discover your ideal career path and stream selection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <OpenEndedAssessmentCard />
          <AssessmentCard
            icon={<Microscope className="h-8 w-8" />}
            title="Science Stream"
            description="Perfect for students interested in Physics, Chemistry, Biology, and Mathematics. Explore careers in engineering, medicine, and research."
            duration="45 mins"
            questions="50 Questions"
            difficulty="Intermediate"
            href="/assessment/science"
          />
          <AssessmentCard
            icon={<Calculator className="h-8 w-8" />}
            title="Commerce Stream"
            description="Ideal for students passionate about business, economics, and finance. Discover opportunities in accounting, management, and entrepreneurship."
            duration="40 mins"
            questions="45 Questions"
            difficulty="Beginner"
            href="/assessment/commerce"
          />
          <AssessmentCard
            icon={<Palette className="h-8 w-8" />}
            title="Arts & Humanities"
            description="For creative minds interested in literature, history, psychology, and social sciences. Explore diverse career paths in media, education, and public service."
            duration="35 mins"
            questions="40 Questions"
            difficulty="Beginner"
            href="/assessment/arts"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Not sure which assessment to take? Start with our comprehensive evaluation.
          </p>
          <Link to="/assessment/comprehensive">
            <Button size="lg" className="px-8">
              Take Comprehensive Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsSection;
