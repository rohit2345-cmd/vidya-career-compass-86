
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Find Your Career Path?</h2>
          <p className="text-xl opacity-90">
            Take the first step towards a fulfilling career journey tailored to your unique abilities and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
            <Link to="/assessments">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white hover:bg-white/10">
                View All Assessments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
