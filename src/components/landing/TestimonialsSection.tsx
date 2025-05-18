
import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Sparkles } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-20 relative bg-background">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-muted/20 to-transparent -z-10"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>
      
      <div className="container max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
            <Sparkles className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium">Student Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Transforming Career Journeys
          </h2>
          <p className="text-xl text-muted-foreground">
            Here's what students are saying about our career counseling platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-70 -z-10"></div>
            <TestimonialCard 
              initial="A"
              name="Aarav Sharma"
              school="Delhi Public School"
              testimonial={`The assessments helped me realize my strengths in analytical thinking. I'm now pursuing Computer Science at IIT Bombay with confidence in my choice.`}
              initialColor="text-primary"
              backgroundColor="bg-primary/10"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-2xl blur-xl opacity-70 -z-10"></div>
            <TestimonialCard 
              initial="P"
              name="Priya Patel"
              school="St. Xavier's High School"
              testimonial={`The AI counselor provided personalized guidance that helped me choose Commerce stream. Now I'm preparing for CA with clear goals.`}
              initialColor="text-secondary"
              backgroundColor="bg-secondary/10"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl blur-xl opacity-70 -z-10"></div>
            <TestimonialCard 
              initial="R"
              name="Rahul Nair"
              school="Kendriya Vidyalaya"
              testimonial={`I was confused between Science and Arts streams. The comprehensive assessment clarified my interests in design. Now studying at NID Ahmedabad.`}
              initialColor="text-accent"
              backgroundColor="bg-accent/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
