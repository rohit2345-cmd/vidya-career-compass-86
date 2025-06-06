
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const MobileNav = () => {
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
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[75%] h-full">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-end mb-8">
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </DrawerClose>
          </div>
          
          <nav className="flex flex-col gap-4 mb-10 border rounded-md p-4">
            <DrawerClose asChild>
              <Link to="/" className={`text-lg py-2 ${isActive("/") ? "text-primary font-medium" : "text-foreground/80"}`}>
                Home
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link to="/assessments" className={`text-lg py-2 ${isActive("/assessments") ? "text-primary font-medium" : "text-foreground/80"}`}>
                Tests
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link to="/results-demo" className={`text-lg py-2 ${isActive("/results-demo") ? "text-primary font-medium" : "text-foreground/80"}`}>
                Demo
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link to="/about" className={`text-lg py-2 ${isActive("/about") ? "text-primary font-medium" : "text-foreground/80"}`}>
                About
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link to="/ai-counselor" className={`text-lg py-2 ${isActive("/ai-counselor") ? "text-primary font-medium" : "text-foreground/80"}`}>
                AI Help
              </Link>
            </DrawerClose>
          </nav>
          
          <div className="mt-auto flex flex-col gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <DrawerClose asChild>
                      <Link to="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <User className="h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Button 
                        variant="ghost" 
                        onClick={handleSignOut}
                        className="w-full justify-start gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </DrawerClose>
                  </>
                ) : (
                  <>
                    <DrawerClose asChild>
                      <Link to="/login" className="w-full">
                        <Button variant="outline" className="w-full justify-start gap-2">
                          <LogIn className="h-4 w-4" />
                          Log In
                        </Button>
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to="/register" className="w-full">
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </DrawerClose>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
