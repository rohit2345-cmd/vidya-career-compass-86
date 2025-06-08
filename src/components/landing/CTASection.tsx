
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, Zap, Target } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-ping"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-white/25 rounded-full animate-float animation-delay-2000"></div>
      </div>
      
      <div className="container max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Start Your 
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Success Journey
                </span>
                Today
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-white to-white/50 rounded-full"></div>
            </div>
            
            <p className="text-xl text-white/90 max-w-xl leading-relaxed">
              Take the first step towards a fulfilling career with our comprehensive assessment platform. 
              Join thousands of students who have discovered their true potential.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Personalized AI Guidance</h4>
                  <p className="text-white/80">Get custom recommendations based on your unique profile and aspirations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Career Path Clarity</h4>
                  <p className="text-white/80">Discover the perfect career match with our advanced assessment algorithms</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Future-Ready Skills</h4>
                  <p className="text-white/80">Align your career choices with emerging industries and future opportunities</p>
                </div>
              </div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold group relative overflow-hidden bg-white text-primary hover:bg-white/90 shadow-2xl">
                  <span className="relative z-10 flex items-center">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </Link>
              
              <Link to="/assessments">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 hover:border-white/80 font-semibold">
                  Explore All Assessments
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">50K+ Students Guided</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm">95% Success Rate</span>
              </div>
            </div>
          </div>
          
          {/* Interactive preview card */}
          <div className="relative lg:h-[500px] hidden lg:block">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
              
              <div className="p-8 h-full">
                <div className="h-full flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">Assessment Preview</p>
                          <p className="text-white/70 text-sm">Interactive Demo</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-500/20 rounded-full">
                        <span className="text-green-300 text-xs font-medium">Live</span>
                      </div>
                    </div>
                    
                    {/* Mock assessment questions */}
                    <div className="space-y-4 mb-8">
                      <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                        <p className="text-white/90 text-sm mb-2">What motivates you the most?</p>
                        <div className="w-3/4 h-2 bg-white/20 rounded-full"></div>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                        <p className="text-white/90 text-sm mb-2">Which environment do you thrive in?</p>
                        <div className="w-2/3 h-2 bg-white/20 rounded-full"></div>
                      </div>
                      
                      <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                        <p className="text-white/90 text-sm mb-2">What's your ideal work style?</p>
                        <div className="w-4/5 h-2 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Results preview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">94%</div>
                        <div className="text-white/70 text-xs">Match Score</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white mb-1">Tech</div>
                        <div className="text-white/70 text-xs">Top Field</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white mb-1">15min</div>
                        <div className="text-white/70 text-xs">Duration</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white mb-1">A+</div>
                        <div className="text-white/70 text-xs">Grade</div>
                      </div>
                    </div>
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
