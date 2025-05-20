
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, UserCheck, MessageSquare, FileSpreadsheet } from "lucide-react";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      toast.error("Admin session expired or invalid");
      navigate("/admin/login");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;
      setUsers(profilesData || []);
      
      // Fetch assessment results
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessment_results')
        .select('*')
        .order('completed_on', { ascending: false });
      
      if (assessmentsError) throw assessmentsError;
      setAssessments(assessmentsData || []);
      
      // Fetch chat messages
      const { data: chatsData, error: chatsError } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (chatsError) throw chatsError;
      setChats(chatsData || []);
      
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    toast.success("Admin logged out successfully");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              Users
            </CardTitle>
            <CardDescription>{users.length} registered users</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              Assessments
            </CardTitle>
            <CardDescription>{assessments.length} completed assessments</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Chat Messages
            </CardTitle>
            <CardDescription>{chats.length} chat messages</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="chats">Chat Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="border rounded-md p-4 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                    <TableCell>{user.first_name || "N/A"}</TableCell>
                    <TableCell>{user.last_name || "N/A"}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="assessments" className="border rounded-md p-4 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Completed On</TableHead>
                <TableHead>Guest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.length > 0 ? (
                assessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell>{assessment.student_name}</TableCell>
                    <TableCell>{assessment.assessment_type}</TableCell>
                    <TableCell>{new Date(assessment.completed_on).toLocaleString()}</TableCell>
                    <TableCell>{assessment.is_guest ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No assessments found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="chats" className="border rounded-md p-4 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Guest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell>{chat.role}</TableCell>
                    <TableCell className="max-w-md truncate">{chat.content}</TableCell>
                    <TableCell>{new Date(chat.created_at).toLocaleString()}</TableCell>
                    <TableCell>{chat.is_guest ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No chat messages found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
