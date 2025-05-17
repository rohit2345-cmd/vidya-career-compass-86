
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AssessmentsSection from "@/components/landing/AssessmentsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen font-archivo">
      <HeroSection />
      <FeaturesSection />
      <AssessmentsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Landing;
