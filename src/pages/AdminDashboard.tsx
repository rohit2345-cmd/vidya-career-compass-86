
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Users, MessageSquare, BookOpen, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AdminDataGenerator from "@/components/AdminDataGenerator";

interface AssessmentResult {
  id: string;
  student_name: string;
  assessment_type: string;
  completed_on: string;
  is_guest: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  role: string;
  created_at: string;
  is_guest: boolean;
}

// Sample dummy data
const dummyAssessments: AssessmentResult[] = [
  {
    id: "1",
    student_name: "Alex Johnson",
    assessment_type: "Comprehensive",
    completed_on: "2025-05-15T14:32:00",
    is_guest: false
  },
  {
    id: "2",
    student_name: "Mia Rodriguez",
    assessment_type: "Science",
    completed_on: "2025-05-14T16:45:00",
    is_guest: false
  },
  {
    id: "3",
    student_name: "Guest User",
    assessment_type: "Commerce",
    completed_on: "2025-05-14T10:23:00",
    is_guest: true
  },
  {
    id: "4",
    student_name: "Ethan Park",
    assessment_type: "Arts",
    completed_on: "2025-05-12T09:15:00",
    is_guest: false
  },
  {
    id: "5",
    student_name: "Sofia Chen",
    assessment_type: "Comprehensive",
    completed_on: "2025-05-11T13:40:00",
    is_guest: false
  }
];

const dummyChatMessages: ChatMessage[] = [
  {
    id: "1",
    content: "I'm interested in pursuing medicine but concerned about the long training period. What alternatives should I consider?",
    role: "user",
    created_at: "2025-05-15T15:10:00",
    is_guest: false
  },
  {
    id: "2",
    content: "Based on your assessment results and interests, you might consider fields like biomedical research, healthcare administration, or medical technology. These careers still allow you to make an impact in healthcare without the extensive medical school requirements.",
    role: "assistant",
    created_at: "2025-05-15T15:11:00",
    is_guest: false
  },
  {
    id: "3",
    content: "How can I best prepare for a career in data science with my arts background?",
    role: "user",
    created_at: "2025-05-14T11:22:00",
    is_guest: true
  },
  {
    id: "4",
    content: "Your arts background gives you unique perspectives in data visualization and storytelling. I recommend starting with online courses in statistics and programming (Python or R), then building projects that combine your creative strengths with analytical skills. Consider specializing in data visualization or UX research.",
    role: "assistant",
    created_at: "2025-05-14T11:24:00",
    is_guest: true
  }
];

const AdminDashboard = () => {
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem("admin_auth") === "true";
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }

    // Fetch data
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Check if environment variables are defined
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      // Log information about the connection attempt
      console.log("Attempting to connect to Supabase with:", { 
        url: supabaseUrl ? "Set" : "Not set", 
        key: supabaseKey ? "Set" : "Not set"
      });

      // Only attempt to fetch if both URL and key are defined
      if (supabaseUrl && supabaseKey) {
        try {
          // Fetch assessment results
          const assessmentsResponse = await fetch(`${supabaseUrl}/rest/v1/assessment_results?select=*&order=completed_on.desc`, {
            method: "GET",
            headers: {
              "apikey": supabaseKey,
              "Content-Type": "application/json",
            },
          });
          
          if (!assessmentsResponse.ok) {
            throw new Error(`Failed to fetch assessments: ${assessmentsResponse.status}`);
          }
          
          const assessmentsData = await assessmentsResponse.json();
          
          // Only use real data if it exists and is not empty
          if (assessmentsData && Array.isArray(assessmentsData) && assessmentsData.length > 0) {
            setAssessments(assessmentsData);
          } else {
            console.log("No assessment data found, falling back to dummy data");
            setAssessments(dummyAssessments);
          }

          // Fetch chat messages
          const messagesResponse = await fetch(`${supabaseUrl}/rest/v1/chat_messages?select=*&order=created_at.desc`, {
            method: "GET",
            headers: {
              "apikey": supabaseKey,
              "Content-Type": "application/json",
            },
          });
          
          if (!messagesResponse.ok) {
            throw new Error(`Failed to fetch messages: ${messagesResponse.status}`);
          }
          
          const messagesData = await messagesResponse.json();
          
          // Only use real data if it exists and is not empty
          if (messagesData && Array.isArray(messagesData) && messagesData.length > 0) {
            setChatMessages(messagesData);
          } else {
            console.log("No chat messages found, falling back to dummy data");
            setChatMessages(dummyChatMessages);
          }
        } catch (error) {
          console.error("Supabase API error:", error);
          toast.error("Failed to connect to database, showing demo data");
          // Use dummy data if API fails
          setAssessments(dummyAssessments);
          setChatMessages(dummyChatMessages);
        }
      } else {
        console.log("Supabase credentials not found, using dummy data");
        // Use dummy data if no credentials
        setAssessments(dummyAssessments);
        setChatMessages(dummyChatMessages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data, showing demo data");
      
      // Use dummy data on any error
      setAssessments(dummyAssessments);
      setChatMessages(dummyChatMessages);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {localStorage.getItem("admin_username") || "Admin"}
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.filter(a => !a.is_guest).length}
            </div>
            <p className="text-xs text-muted-foreground">
              + {assessments.filter(a => a.is_guest).length} guests
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chatMessages.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assessments">
        <TabsList className="mb-4">
          <TabsTrigger value="assessments">Assessment Results</TabsTrigger>
          <TabsTrigger value="chats">Chat Messages</TabsTrigger>
        </TabsList>

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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assessments.length > 0 ? (
                        assessments.map((assessment) => (
                          <TableRow key={assessment.id}>
                            <TableCell>{assessment.student_name}</TableCell>
                            <TableCell>{assessment.assessment_type}</TableCell>
                            <TableCell>{formatDate(assessment.completed_on)}</TableCell>
                            <TableCell>{assessment.is_guest ? "Guest" : "Registered"}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4">
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
                        chatMessages.map((message) => (
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
