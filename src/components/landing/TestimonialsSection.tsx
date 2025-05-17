
import React from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Student Success Stories</h2>
          <p className="text-xl text-muted-foreground">
            Here's what students are saying about our career counseling platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            initial="A"
            name="Aarav Sharma"
            school="Delhi Public School"
            testimonial=""The assessments helped me realize my strengths in analytical thinking. I'm now pursuing Computer Science at IIT Bombay with confidence in my choice.""
            initialColor="text-primary"
            backgroundColor="bg-primary/10"
          />

          <TestimonialCard 
            initial="P"
            name="Priya Patel"
            school="St. Xavier's High School"
            testimonial=""The AI counselor provided personalized guidance that helped me choose Commerce stream. Now I'm preparing for CA with clear goals.""
            initialColor="text-secondary"
            backgroundColor="bg-secondary/10"
          />

          <TestimonialCard 
            initial="R"
            name="Rahul Nair"
            school="Kendriya Vidyalaya"
            testimonial=""I was confused between Science and Arts streams. The comprehensive assessment clarified my interests in design. Now studying at NID Ahmedabad.""
            initialColor="text-accent"
            backgroundColor="bg-accent/10"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
