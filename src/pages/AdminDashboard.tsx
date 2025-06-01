
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Users, MessageSquare, BookOpen, RefreshCw, TrendingUp, BarChart3, PieChart, Calendar } from "lucide-react";
import { toast } from "sonner";
import AdminDataGenerator from "@/components/AdminDataGenerator";
import { getAssessmentResults, getChatMessages } from "@/services/localStorageService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

const AdminDashboard = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem("admin_auth") === "true";
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = () => {
    setIsLoading(true);
    try {
      // Get assessment results from localStorage
      const assessmentResults = getAssessmentResults();
      const formattedAssessments = assessmentResults.map(result => ({
        id: result.id,
        student_name: result.studentName,
        assessment_type: result.assessmentType,
        completed_on: result.completedOn || result.timestamp,
        is_guest: !localStorage.getItem("auth.token"),
        scores: result.scores,
        strengths: result.strengths,
        interests: result.interests
      }));
      setAssessments(formattedAssessments);

      // Get chat messages from localStorage
      const messages = getChatMessages();
      const formattedMessages = messages.map(message => ({
        id: message.id,
        content: message.content,
        role: message.role,
        created_at: message.timestamp,
        is_guest: !localStorage.getItem("auth.token")
      }));
      setChatMessages(formattedMessages);

      // Generate analytics
      generateAnalytics(formattedAssessments, formattedMessages);

      toast.success("Data loaded successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAnalytics = (assessments: any[], messages: any[]) => {
    // Assessment type distribution
    const assessmentTypeCount = assessments.reduce((acc, assessment) => {
      acc[assessment.assessment_type] = (acc[assessment.assessment_type] || 0) + 1;
      return acc;
    }, {});

    const assessmentTypeData = Object.entries(assessmentTypeCount).map(([key, value]) => ({
      name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: value as number
    }));

    // User type distribution
    const guestUsers = assessments.filter(a => a.is_guest).length;
    const registeredUsers = assessments.length - guestUsers;
    
    const userTypeData = [
      { name: 'Registered Users', value: registeredUsers },
      { name: 'Guest Users', value: guestUsers }
    ];

    // Daily activity (last 7 days)
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyActivity = last7Days.map(date => {
      const assessmentsCount = assessments.filter(a => 
        a.completed_on && a.completed_on.startsWith(date)
      ).length;
      const messagesCount = messages.filter(m => 
        m.created_at && m.created_at.startsWith(date)
      ).length;
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        assessments: assessmentsCount,
        messages: messagesCount
      };
    });

    // Average scores by assessment type
    const avgScores = assessments
      .filter(a => a.scores)
      .reduce((acc, assessment) => {
        if (!acc[assessment.assessment_type]) {
          acc[assessment.assessment_type] = { total: 0, count: 0, scores: {} };
        }
        
        Object.entries(assessment.scores).forEach(([skill, score]) => {
          if (!acc[assessment.assessment_type].scores[skill]) {
            acc[assessment.assessment_type].scores[skill] = { total: 0, count: 0 };
          }
          acc[assessment.assessment_type].scores[skill].total += score as number;
          acc[assessment.assessment_type].scores[skill].count += 1;
        });
        
        acc[assessment.assessment_type].count += 1;
        return acc;
      }, {});

    const avgScoresData = Object.entries(avgScores).map(([type, data]: [string, any]) => {
      const avgSkillScores = Object.entries(data.scores).map(([skill, scoreData]: [string, any]) => ({
        skill: skill.replace(/([A-Z])/g, ' $1').trim(),
        avgScore: Math.round(scoreData.total / scoreData.count)
      }));
      
      return {
        assessmentType: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        skills: avgSkillScores
      };
    });

    // Chat engagement metrics
    const chatEngagement = {
      totalConversations: Math.ceil(messages.length / 2), // Approximate conversations
      avgMessagesPerConversation: messages.length > 0 ? Math.round(messages.length / Math.ceil(messages.length / 2)) : 0,
      userMessages: messages.filter(m => m.role === 'user').length,
      aiResponses: messages.filter(m => m.role === 'assistant').length
    };

    setAnalytics({
      assessmentTypeData,
      userTypeData,
      dailyActivity,
      avgScoresData,
      chatEngagement
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin_username");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome, {localStorage.getItem("admin_username") || "Admin"} - Data Science Insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchData} className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <AdminDataGenerator />
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{assessments.length}</div>
            <p className="text-xs text-blue-600 mt-1">
              +{Math.round((assessments.length / 30) * 100)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {assessments.filter(a => !a.is_guest).length}
            </div>
            <p className="text-xs text-green-600 mt-1">
              + {assessments.filter(a => a.is_guest).length} guests
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{chatMessages.length}</div>
            <p className="text-xs text-purple-600 mt-1">
              {analytics.chatEngagement?.totalConversations || 0} conversations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {assessments.length > 0 ? Math.round((chatMessages.length / assessments.length) * 100) : 0}%
            </div>
            <p className="text-xs text-orange-600 mt-1">
              Messages per assessment
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="mb-4">
          <TabsTrigger value="analytics">Analytics Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessment Data</TabsTrigger>
          <TabsTrigger value="chats">Chat Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assessment Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Assessment Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={analytics.assessmentTypeData || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {(analytics.assessmentTypeData || []).map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Type Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.userTypeData || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Daily Activity (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.dailyActivity || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="assessments" stackId="1" stroke="#4F46E5" fill="#4F46E5" />
                    <Area type="monotone" dataKey="messages" stackId="1" stroke="#10B981" fill="#10B981" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading assessment data...</div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Assessment Type</TableHead>
                        <TableHead>Completed On</TableHead>
                        <TableHead>User Type</TableHead>
                        <TableHead>Avg Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessments.length > 0 ? (
                        assessments.map((assessment) => {
                          const avgScore = assessment.scores ? 
                            Math.round(Object.values(assessment.scores).reduce((a: any, b: any) => a + b, 0) / Object.values(assessment.scores).length) : 
                            'N/A';
                          
                          return (
                            <TableRow key={assessment.id}>
                              <TableCell>{assessment.student_name}</TableCell>
                              <TableCell>{assessment.assessment_type}</TableCell>
                              <TableCell>{formatDate(assessment.completed_on)}</TableCell>
                              <TableCell>{assessment.is_guest ? "Guest" : "Registered"}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  typeof avgScore === 'number' && avgScore >= 80 ? 'bg-green-100 text-green-800' :
                                  typeof avgScore === 'number' && avgScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                  typeof avgScore === 'number' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {typeof avgScore === 'number' ? `${avgScore}%` : avgScore}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No assessment results found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chat Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Conversations</span>
                    <span className="font-semibold">{analytics.chatEngagement?.totalConversations || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Messages/Conv</span>
                    <span className="font-semibold">{analytics.chatEngagement?.avgMessagesPerConversation || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User Messages</span>
                    <span className="font-semibold">{analytics.chatEngagement?.userMessages || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">AI Responses</span>
                    <span className="font-semibold">{analytics.chatEngagement?.aiResponses || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chat Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading chat data...</div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>User Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chatMessages.length > 0 ? (
                        chatMessages.slice(0, 50).map((message) => (
                          <TableRow key={message.id}>
                            <TableCell>{formatDate(message.created_at)}</TableCell>
                            <TableCell>
                              <span className={message.role === "assistant" ? "text-primary" : ""}>
                                {message.role === "assistant" ? "AI" : "User"}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {message.content}
                            </TableCell>
                            <TableCell>{message.is_guest ? "Guest" : "Registered"}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">
                            No chat messages found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {/* Average Scores by Assessment Type */}
            {analytics.avgScoresData && analytics.avgScoresData.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Average Scores by Assessment Type</h3>
                {analytics.avgScoresData.map((assessment: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{assessment.assessmentType}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={assessment.skills}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="avgScore" fill={COLORS[index % COLORS.length]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
