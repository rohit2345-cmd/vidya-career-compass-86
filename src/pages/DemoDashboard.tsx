
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, MessageSquare, User, Upload, FileText, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DemoDashboard = () => {
  // Demo data
  const demoAssessments = [
    {
      id: "demo-1",
      type: "Science Stream Assessment",
      date: "2024-01-15",
      score: 85
    },
    {
      id: "demo-2", 
      type: "Open-Ended Career Assessment",
      date: "2024-01-10",
      score: 78
    },
    {
      id: "demo-3",
      type: "Aptitude Test",
      date: "2024-01-05",
      score: 92
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container py-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Demo Mode
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome, Demo User!
          </h1>
          <p className="text-muted-foreground">
            This is a demonstration of the student dashboard with sample data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Reports</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoAssessments.map((assessment, index) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          {assessment.type}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Completed on {new Date(assessment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">
                          Score: {assessment.score}%
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Career Counselor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">AI Career Counselor</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">
                    Get personalized guidance based on your assessment results
                  </p>
                </div>
                <Link to="/ai-counselor">
                  <Button>
                    Start Chat
                    <MessageSquare className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>3 Assessments Completed</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    60% of recommended assessments completed
                  </p>
                </div>
                <Link to="/assessments">
                  <Button className="w-full mt-4">
                    Explore More Assessments
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* File Upload Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Upload your academic transcripts, certificates, or other relevant documents.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag & drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOC, JPG up to 10MB
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files (Demo)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DemoDashboard;
