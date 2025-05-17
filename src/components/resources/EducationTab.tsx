
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
import { GraduationCap } from "lucide-react";

const EducationTab = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-hover bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle>Top Engineering Colleges</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Comprehensive guide to India's top engineering institutions
              including admission criteria, specializations, and placement
              records.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Guide
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-white to-emerald-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-secondary" />
              <CardTitle>Business School Directory</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Explore top management institutes in India with details on MBA
              programs, admission process, fees, and career outcomes.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Directory
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-white to-amber-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-accent" />
              <CardTitle>Arts & Design Institutes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Find the best arts, design, and humanities institutions offering
              undergraduate and graduate programs across India.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Institutes
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle>Scholarship Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Discover scholarships available for Indian students across various
            streams and institutions. Our regularly updated database includes
            government schemes, private scholarships, and university-specific
            financial aid.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Search Scholarships</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EducationTab;
