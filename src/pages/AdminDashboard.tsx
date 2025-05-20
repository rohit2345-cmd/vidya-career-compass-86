
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
      // Fetch assessment results
      const assessmentsResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/assessment_results?select=*&order=completed_on.desc`, {
        method: "GET",
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      });
      const assessmentsData = await assessmentsResponse.json();
      setAssessments(assessmentsData);

      // Fetch chat messages
      const messagesResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/chat_messages?select=*&order=created_at.desc`, {
        method: "GET",
        headers: {
          "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      });
      const messagesData = await messagesResponse.json();
      setChatMessages(messagesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
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
