
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ready to Find Your Career Path?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-xl">
              Take the first step towards a fulfilling career journey tailored to your unique abilities and interests.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Personalized Guidance</h4>
                  <p className="text-primary-foreground/80">Assessment results tailored to your unique profile</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Expert Insights</h4>
                  <p className="text-primary-foreground/80">AI-powered recommendations based on latest trends</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Future-Proof Choices</h4>
                  <p className="text-primary-foreground/80">Aligned with emerging industries and opportunities</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-medium group">
                  Create Free Account
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/assessments">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10">
                  View All Assessments
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative lg:h-96 hidden lg:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
              <div className="p-8 h-full">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold">A+</span>
                      </div>
                      <p className="text-white font-medium">Assessment preview</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="h-10 bg-white/10 rounded-md w-full"></div>
                      <div className="h-10 bg-white/10 rounded-md w-3/4"></div>
                      <div className="h-10 bg-white/10 rounded-md w-5/6"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-white/10 rounded-lg"></div>
                    <div className="h-24 bg-white/10 rounded-lg"></div>
                    <div className="h-24 bg-white/10 rounded-lg"></div>
                    <div className="h-24 bg-white/10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
