
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
import { FileSearch, HelpCircle, BookText, FileText } from "lucide-react";

const AssessmentsTab = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileSearch className="h-5 w-5 text-primary" />
              <CardTitle>Understanding Our Assessments</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our scientifically-designed assessments help students identify
              their strengths, interests, and aptitudes to make informed career
              decisions. Each assessment is tailored to provide insights specific
              to different educational streams.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold">How Assessments Help Students:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                <li>Discover natural strengths and aptitudes</li>
                <li>Identify career paths aligned with personality traits</li>
                <li>Explore educational pathways matched to interests</li>
                <li>Understand skill development needs for chosen careers</li>
                <li>Build confidence through self-awareness</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-emerald-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <CardTitle>For Career Counselors</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Career counselors can leverage our assessment data to provide more
              personalized guidance to students. Our detailed reports offer
              actionable insights that help counselors make targeted
              recommendations.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold">Benefits for Counselors:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                <li>Data-driven counseling approach</li>
                <li>Comprehensive student aptitude profiles</li>
                <li>Scientific basis for career recommendations</li>
                <li>Personalized educational pathway planning</li>
                <li>Progress tracking and development monitoring</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="bg-gradient-to-r from-blue-100 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookText className="h-5 w-5 text-blue-600" />
              Comprehensive Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our Comprehensive Assessment provides a holistic evaluation of a
              student's aptitudes, interests, and personality traits across all
              streams of education. This assessment is ideal for students who are
              undecided about which educational path to pursue.
            </p>

            <h3 className="font-semibold">What It Measures:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
              <li>General aptitude across multiple disciplines</li>
              <li>Cross-stream interest patterns</li>
              <li>Core personality traits relevant to career success</li>
              <li>Learning styles and work preferences</li>
            </ul>

            <p className="text-sm italic text-muted-foreground mt-4">
              The comprehensive assessment contains 60 questions carefully
              designed to evaluate a student's potential across all three major
              streams - Science, Commerce, and Arts.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full md:w-auto">Take Assessment</Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle>Science Stream Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our Science Stream Assessment evaluates aptitudes and interests
                specifically relevant to science careers including engineering,
                medicine, research, and technology.
              </p>

              <h4 className="font-medium">Key Focus Areas:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                <li>Logical reasoning and problem solving</li>
                <li>Mathematical aptitude and spatial thinking</li>
                <li>Scientific observation and experimental design</li>
                <li>Research aptitude and analytical skills</li>
                <li>Theoretical understanding and application</li>
              </ul>

              <p className="text-sm italic text-muted-foreground mt-2">
                The Science assessment includes real-world scenarios and
                practical problems that require applying scientific thinking.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Take Assessment
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-100">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                <CardTitle>Commerce Stream Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Commerce Stream Assessment evaluates aptitudes and interests
                aligned with business, finance, accounting, economics, and
                management careers.
              </p>

              <h4 className="font-medium">Key Focus Areas:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                <li>Numerical and analytical abilities</li>
                <li>Business acumen and economic reasoning</li>
                <li>Financial literacy and aptitude</li>
                <li>Management and organizational skills</li>
                <li>Entrepreneurial thinking</li>
              </ul>

              <p className="text-sm italic text-muted-foreground mt-2">
                Questions are designed around business cases and financial
                scenarios that test commercial awareness and decision-making.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Take Assessment
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-100">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-600" />
                <CardTitle>Arts Stream Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Arts Stream Assessment evaluates aptitudes and interests
                related to humanities, social sciences, creative arts, design,
                literature, and performing arts.
              </p>

              <h4 className="font-medium">Key Focus Areas:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                <li>Verbal reasoning and language aptitude</li>
                <li>Creative thinking and expression</li>
                <li>Social awareness and cultural sensitivity</li>
                <li>Critical analysis and interpretation</li>
                <li>Visual and performing arts aptitude</li>
              </ul>

              <p className="text-sm italic text-muted-foreground mt-2">
                Questions evaluate both analytical and creative aspects through
                scenarios that reflect real humanities and arts challenges.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Take Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsTab;
