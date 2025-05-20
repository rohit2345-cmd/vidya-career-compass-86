
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, BookOpen, BarChart, Info, LogIn, User, LogOut, LayoutDashboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <SheetClose asChild>
    <Link to={to}>
      <Button
        variant="ghost"
        className="w-full justify-start text-base font-normal mb-1"
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    </Link>
  </SheetClose>
);

const MobileNav = () => {
  const { user, signOut } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-md md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>CareerPath</span>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex flex-col gap-1 pt-2">
          <NavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" />
          <NavItem to="/assessments" icon={<BookOpen className="h-5 w-5" />} label="Assessments" />
          <NavItem to="/results-demo" icon={<BarChart className="h-5 w-5" />} label="Demo Results" />
          <NavItem to="/about" icon={<Info className="h-5 w-5" />} label="About" />
          
          <Separator className="my-3" />
          
          {user ? (
            <>
              <NavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
              <NavItem to="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
              <Button
                variant="ghost"
                className="w-full justify-start text-base font-normal mb-1"
                onClick={() => signOut()}
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Log out</span>
              </Button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={<LogIn className="h-5 w-5" />} label="Log In" />
              <NavItem to="/register" icon={<User className="h-5 w-5" />} label="Sign Up" />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
