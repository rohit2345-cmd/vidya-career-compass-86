
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart as BarChartIcon,
  BookOpen,
  Clock,
  Calendar,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <User className="h-8 w-8" />
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Priya!</h1>
            <p className="text-muted-foreground">Continue your career exploration journey</p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-start">
          <Link to="/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Profile Settings
            </Button>
          </Link>
          <Link to="/ai-counselor">
            <Button className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Counselor
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-primary" />
              Assessment Progress
            </CardTitle>
            <CardDescription>2 of 4 assessments completed</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={50} className="h-2 mb-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Comprehensive Assessment
                </span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Complete
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Personality Assessment
                </span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Complete
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  Science Stream Assessment
                </span>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                  Commerce Stream Assessment
                </span>
                <Badge variant="outline">Not Started</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/assessments" className="w-full">
              <Button variant="outline" className="w-full">View All Assessments</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Top Career Matches
            </CardTitle>
            <CardDescription>Based on your completed assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Software Engineer</span>
                  <span className="text-sm text-primary">95% Match</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Data Scientist</span>
                  <span className="text-sm text-primary">88% Match</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">UX Designer</span>
                  <span className="text-sm text-primary">82% Match</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/results/comprehensive" className="w-full">
              <Button variant="outline" className="w-full">View Full Results</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Career fairs and webinars</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Engineering Career Fair</h4>
                  <p className="text-xs text-muted-foreground">May 25, 2025 • 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Tech Industry Webinar</h4>
                  <p className="text-xs text-muted-foreground">May 28, 2025 • 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">College Application Workshop</h4>
                  <p className="text-xs text-muted-foreground">June 2, 2025 • 5:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/events" className="w-full">
              <Button variant="outline" className="w-full">View All Events</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommended Actions</CardTitle>
            <CardDescription>Next steps for your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm border-l-2 border-primary pl-3 py-1">
                Complete the Science Stream Assessment to refine your results
              </li>
              <li className="flex items-center gap-2 text-sm border-l-2 border-primary pl-3 py-1">
                Explore the recommended courses for Software Engineering
              </li>
              <li className="flex items-center gap-2 text-sm border-l-2 border-primary pl-3 py-1">
                Update your profile with your latest academic achievements
              </li>
              <li className="flex items-center gap-2 text-sm border-l-2 border-primary pl-3 py-1">
                Register for the upcoming Engineering Career Fair
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Learning Resources</CardTitle>
            <CardDescription>Recommended materials for your interests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <BookOpen className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Introduction to Computer Science</h4>
                  <p className="text-xs text-muted-foreground">Free online course • 8 weeks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <BookOpen className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Data Structures and Algorithms</h4>
                  <p className="text-xs text-muted-foreground">Video series • 12 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <BookOpen className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">UI/UX Design Fundamentals</h4>
                  <p className="text-xs text-muted-foreground">Interactive workshop • 4 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/resources" className="w-full">
              <Button variant="outline" className="w-full">View All Resources</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Need personalized guidance?</h3>
                <p className="text-muted-foreground">Chat with our AI Career Counselor for specific advice</p>
              </div>
            </div>
            <Link to="/ai-counselor">
              <Button>Start Conversation</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
