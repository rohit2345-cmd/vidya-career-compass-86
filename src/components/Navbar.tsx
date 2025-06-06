
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, Lock, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };
  
  return (
    <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold text-foreground">
            CareerPath
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-3 px-3 py-1 border rounded-md">
          <Link to="/" className={isActive("/") ? "nav-link-active" : "nav-link"}>
            Home
          </Link>
          <Link to="/assessments" className={isActive("/assessments") ? "nav-link-active" : "nav-link"}>
            Tests
          </Link>
          <Link to="/results-demo" className={isActive("/results-demo") ? "nav-link-active" : "nav-link"}>
            Demo
          </Link>
          <Link to="/about" className={isActive("/about") ? "nav-link-active" : "nav-link"}>
            About
          </Link>
          <Link to="/ai-counselor" className={isActive("/ai-counselor") ? "nav-link-active" : "nav-link"}>
            AI Help
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link to="/dashboard" className="hidden md:block">
                    <Button variant="outline" size="sm" className="items-center gap-1">
                      <User className="mr-1 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="hidden md:flex items-center gap-1"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hidden md:block">
                    <Button variant="outline" size="sm" className="items-center gap-1">
                      <LogIn className="mr-1 h-4 w-4" />
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" className="hidden md:block">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}
          <Link to="/admin-login" className="hidden md:block">
            <Button variant="ghost" size="icon" className="ml-2">
              <Lock className="h-4 w-4" />
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
