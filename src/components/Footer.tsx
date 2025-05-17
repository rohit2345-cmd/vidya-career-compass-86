
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CareerPath</span>
            </div>
            <p className="text-muted-foreground">
              Guiding students towards their ideal career paths through comprehensive assessments and AI-powered counseling.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/assessments" className="text-muted-foreground hover:text-foreground">Assessments</Link></li>
              <li><Link to="/results-demo" className="text-muted-foreground hover:text-foreground">Demo Results</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Assessment Types</h3>
            <ul className="space-y-2">
              <li><Link to="/assessment/comprehensive" className="text-muted-foreground hover:text-foreground">General Assessment</Link></li>
              <li><Link to="/assessment/science" className="text-muted-foreground hover:text-foreground">Science Stream</Link></li>
              <li><Link to="/assessment/commerce" className="text-muted-foreground hover:text-foreground">Commerce Stream</Link></li>
              <li><Link to="/assessment/arts" className="text-muted-foreground hover:text-foreground">Arts Stream</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CareerPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
