
import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Sparkles, Star, ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-3 border border-amber-200">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <Sparkles className="h-5 w-5 text-yellow-600 ml-2" />
            <span className="text-sm font-semibold text-yellow-800">5-Star Reviews</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Stories of 
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join thousands of students who have discovered their perfect career path and achieved their dreams 
            with our comprehensive guidance platform.
          </p>
          
          {/* Stats row */}
          <div className="flex justify-center items-center gap-12 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Students Guided</div>
            </div>
            <div className="w-px h-12 bg-muted"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="w-px h-12 bg-muted"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="relative group animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-70"></div>
            <div className="relative transform hover:scale-105 transition-all duration-300">
              <TestimonialCard 
                initial="A"
                name="Aarav Sharma"
                school="Delhi Public School, Mumbai"
                testimonial={`The AI-powered assessments completely changed my perspective. I discovered my passion for data science and I'm now studying at IIT Bombay. The career guidance was spot-on and helped me make the right choice with confidence.`}
                initialColor="text-primary"
                backgroundColor="bg-primary/10"
              />
            </div>
          </div>

          <div className="relative group animate-fade-in-up animation-delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-70"></div>
            <div className="relative transform hover:scale-105 transition-all duration-300">
              <TestimonialCard 
                initial="P"
                name="Priya Patel"
                school="St. Xavier's College, Ahmedabad"
                testimonial={`I was completely confused between different streams until I found this platform. The comprehensive assessment and AI counselor helped me choose Commerce with confidence. Now I'm pursuing CA and loving every moment of it!`}
                initialColor="text-secondary"
                backgroundColor="bg-secondary/10"
              />
            </div>
          </div>

          <div className="relative group animate-fade-in-up animation-delay-400">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-70"></div>
            <div className="relative transform hover:scale-105 transition-all duration-300">
              <TestimonialCard 
                initial="R"
                name="Rahul Menon"
                school="Kendriya Vidyalaya, Kochi"
                testimonial={`The platform's insights into my creative abilities were incredible. I was torn between Science and Arts, but the detailed analysis showed my true calling in design. Now I'm at NID Ahmedabad pursuing my dream career!`}
                initialColor="text-accent"
                backgroundColor="bg-accent/10"
              />
            </div>
          </div>
        </div>
        
        {/* Navigation indicators */}
        <div className="flex justify-center items-center gap-4">
          <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
          </div>
          <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
