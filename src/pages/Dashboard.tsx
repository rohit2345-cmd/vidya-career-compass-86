import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, MessageSquare, User, Upload, FileText, BarChart3, X, TrendingUp, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import SupabaseTest from "../components/SupabaseTest";

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  }>({ id: "", firstName: null, lastName: null, email: null });
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Colors for charts
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  // Career recommendations based on assessment data
  const careerRecommendations = [
    {
      title: "Software Engineer",
      match: 95,
      description: "Develop applications and systems using programming skills.",
      avgSalary: "₹8-25 LPA",
      growth: "High",
      skills: ["Programming", "Problem Solving", "Analytical Thinking"],
    },
    {
      title: "Data Scientist", 
      match: 88,
      description: "Analyze complex data sets to identify trends and insights.",
      avgSalary: "₹6-20 LPA",
      growth: "Very High",
      skills: ["Statistics", "Machine Learning", "Data Visualization"],
    },
    {
      title: "Financial Analyst",
      match: 82,
      description: "Analyze financial data and market trends for businesses.",
      avgSalary: "₹4-15 LPA", 
      growth: "Medium",
      skills: ["Financial Analysis", "Excel", "Strategic Thinking"],
    },
    {
      title: "Content Writer",
      match: 79,
      description: "Create engaging content for various digital platforms.",
      avgSalary: "₹3-12 LPA",
      growth: "Medium",
      skills: ["Creative Writing", "Communication", "SEO"],
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (profileData) {
          setProfile({
            id: profileData.id,
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            email: profileData.email,
          });
        }
      }
    };

    fetchProfile();
  }, [user]);

  // Fetch all assessment results (including guest results for demo)
  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments", profile.id],
    queryFn: async () => {
      // Fetch user's assessments if logged in, otherwise fetch demo data
      if (profile.id) {
        const { data, error } = await supabase
          .from("assessment_results")
          .select("*")
          .eq("user_id", profile.id)
          .order("completed_on", { ascending: false });

        if (error) {
          console.error("Error fetching user assessments:", error);
        }
        return data || [];
      } else {
        // Fetch demo/guest assessments for display
        const { data, error } = await supabase
          .from("assessment_results")
          .select("*")
          .eq("is_guest", true)
          .order("completed_on", { ascending: false });

        if (error) {
          console.error("Error fetching demo assessments:", error);
        }
        return data || [];
      }
    },
  });

  useEffect(() => {
    if (assessments) {
      setAssessmentCount(assessments.length);
    }
  }, [assessments]);

  // Generate chart data from assessments
  const generateChartData = () => {
    if (!assessments || assessments.length === 0) return [];
    
    const latestAssessment = assessments[0];
    if (latestAssessment.scores) {
      return Object.entries(latestAssessment.scores as Record<string, number>)
        .filter(([key]) => key !== 'overall')
        .map(([subject, score]) => ({
          subject: subject.charAt(0).toUpperCase() + subject.slice(1),
          score: score
        }));
    }
    return [];
  };

  const generateInterestData = () => {
    if (!assessments || assessments.length === 0) return [];
    
    const interests = assessments.flatMap(assessment => 
      Array.isArray(assessment.interests) ? assessment.interests : []
    );
    
    const interestCounts = interests.reduce((acc: Record<string, number>, interest) => {
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(interestCounts).map(([name, value]) => ({ name, value }));
  };

  const chartData = generateChartData();
  const interestData = generateInterestData();

  // Calculate overall performance
  const calculateOverallScore = () => {
    if (!assessments || assessments.length === 0) return 0;
    
    const latestAssessment = assessments[0];
    if (latestAssessment.scores && typeof latestAssessment.scores === 'object') {
      const scores = latestAssessment.scores as Record<string, number>;
      return scores.overall || 0;
    }
    return 0;
  };

  const overallScore = calculateOverallScore();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} is not a supported file type`);
          return false;
        }
        
        if (file.size > maxSize) {
          toast.error(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        
        return true;
      });
      
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
          toast.error(`${file.name} is not a supported file type`);
          return false;
        }
        
        if (file.size > maxSize) {
          toast.error(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        
        return true;
      });
      
      setUploadedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setIsUploading(true);
    try {
      // For now, just simulate upload since we don't have storage configured
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`${uploadedFiles.length} file(s) uploaded successfully!`);
      setUploadedFiles([]);
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {profile.firstName || "Student"}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your career exploration journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{assessmentCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                      <p className="text-2xl font-bold">{overallScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="text-2xl font-bold">{Math.round((assessmentCount / 5) * 100)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Files</p>
                      <p className="text-2xl font-bold">{uploadedFiles.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts */}
            {chartData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subject Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" fontSize={12} />
                          <YAxis domain={[0, 100]} fontSize={12} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#4F46E5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {interestData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Interest Areas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={interestData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {interestData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Recommended Career Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Recommended Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerRecommendations.map((career, index) => (
                    <div
                      key={career.title}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedCareer === career.title 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCareer(selectedCareer === career.title ? null : career.title)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{career.title}</h3>
                        <Badge className="bg-primary">{career.match}% Match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                      <div className="space-y-1 text-xs">
                        <p><span className="font-medium">Salary:</span> {career.avgSalary}</p>
                        <p><span className="font-medium">Growth:</span> {career.growth}</p>
                      </div>
                      {selectedCareer === career.title && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium mb-2">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {career.skills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.success(`${career.title} added to your chosen career path!`);
                            }}
                          >
                            Choose This Career
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading assessments...</p>
                ) : assessments && assessments.length > 0 ? (
                  <div className="space-y-4">
                    {assessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="text-lg font-semibold">
                            {assessment.assessment_type.charAt(0).toUpperCase() +
                              assessment.assessment_type.slice(1)}{" "}
                            Assessment
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Completed on{" "}
                            {format(new Date(assessment.completed_on), 'PPP')}
                          </p>
                          {assessment.scores && typeof assessment.scores === 'object' && (
                            <p className="text-sm text-primary font-medium">
                              Score: {(assessment.scores as any).overall || 'N/A'}%
                            </p>
                          )}
                        </div>
                        <Link to={`/results/${assessment.assessment_type}`}>
                          <Button variant="outline" size="sm">
                            View Results
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No assessments completed yet. Start exploring!</p>
                    <Link to="/assessments">
                      <Button>Take Your First Assessment</Button>
                    </Link>
                  </div>
                )}
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
                    Chat with our AI counselor for personalized guidance about
                    your results
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
                    <span>{assessmentCount} Assessments Completed</span>
                  </div>
                  <Progress
                    value={(assessmentCount / 5) * 100}
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {Math.round((assessmentCount / 5) * 100)}% of recommended assessments completed
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
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Drag & drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOC, JPG up to 10MB
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Selected Files:</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button 
                    className="w-full" 
                    onClick={handleUpload}
                    disabled={uploadedFiles.length === 0 || isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Uploading..." : `Upload ${uploadedFiles.length} File(s)`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Supabase Connection Test - for development */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Database Connection Test</h2>
          <SupabaseTest />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
