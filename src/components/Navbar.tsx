
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, LogIn, LogOut, User, LayoutDashboard } from "lucide-react";
import MobileNav from "./MobileNav";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
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
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={isActive("/") ? "nav-link-active" : "nav-link"}>
            Home
          </Link>
          <Link to="/assessments" className={isActive("/assessments") ? "nav-link-active" : "nav-link"}>
            Assessments
          </Link>
          <Link to="/results-demo" className={isActive("/results-demo") ? "nav-link-active" : "nav-link"}>
            Demo Results
          </Link>
          <Link to="/about" className={isActive("/about") ? "nav-link-active" : "nav-link"}>
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {!loading && !user ? (
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
          ) : !loading && user ? (
            <>
              <Link to="/dashboard" className="hidden md:block">
                <Button variant="outline" size="sm" className="items-center gap-1">
                  <LayoutDashboard className="mr-1 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.user_metadata?.first_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.user_metadata?.first_name || user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : null}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
