
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold text-foreground">
            CareerPath
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link-active">
            Home
          </Link>
          <Link to="/assessments" className="nav-link">
            Assessments
          </Link>
          <Link to="/resources" className="nav-link">
            Resources
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
              <LogIn className="mr-1 h-4 w-4" />
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
