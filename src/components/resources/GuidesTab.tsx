
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Download, Lightbulb } from "lucide-react";

const GuidesTab = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-hover bg-gradient-to-br from-white to-blue-50 border-blue-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>Science Career Guide</CardTitle>
            </div>
            <CardDescription>
              Explore various career paths in the Science stream
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This comprehensive guide covers various Science career paths
              including Engineering, Medicine, Research, and more. Learn about
              required qualifications, job prospects, and salary expectations.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Guide
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-white to-emerald-50 border-emerald-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              <CardTitle>Commerce Career Guide</CardTitle>
            </div>
            <CardDescription>
              Discover opportunities in Commerce and Business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our Commerce stream guide covers paths like Chartered Accountancy,
              Business Management, Economics, Finance, and more. Understand the
              education requirements and career progression.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Guide
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-white to-amber-50 border-amber-100">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <CardTitle>Arts Career Guide</CardTitle>
            </div>
            <CardDescription>
              Creative and humanities career opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Our Arts and Humanities guide explores paths in Design,
              Literature, Psychology, Media, Performing Arts, and more. Discover
              how to leverage your creative talents professionally.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Guide
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Career Planning Worksheet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Our step-by-step career planning worksheet helps you identify your
            strengths, interests, and skills to align them with suitable career
            options. Perfect for students who have completed an assessment and
            want to further explore their results.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full md:w-auto flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Worksheet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuidesTab;
