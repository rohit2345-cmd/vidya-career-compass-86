
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, Brain, MessageSquare, TrendingUp, Download, Search, Filter, Plus, Eye, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AssessmentResult {
  id: string;
  created_at: string;
  student_name: string;
  assessment_type: string;
  completed_on: string;
  questions: any[];
  user_id: string | null;
  scores?: any;
  interests?: any;
  strengths?: any;
  is_guest: boolean;
}

interface ChatMessage {
  id: string;
  created_at: string;
  content: string;
  role: string;
  user_id: string | null;
  assessment_result_id: string | null;
  is_guest: boolean;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const { data, error } = await supabase
          .from('assessment_results')
          .select('*')
          .order('completed_on', { ascending: false });

        if (error) {
          console.error("Error fetching assessments:", error);
        } else {
          // Map the data to match our interface
          const mappedData: AssessmentResult[] = (data || []).map(item => ({
            id: item.id,
            created_at: item.completed_on, // Use completed_on as created_at
            student_name: item.student_name,
            assessment_type: item.assessment_type,
            completed_on: item.completed_on,
            questions: Array.isArray(item.questions) ? item.questions : [],
            user_id: item.user_id,
            scores: item.scores,
            interests: item.interests,
            strengths: item.strengths,
            is_guest: item.is_guest
          }));
          setAssessments(mappedData);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };

    const fetchChatMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching chat messages:", error);
        } else {
          // Map the data to match our interface
          const mappedData: ChatMessage[] = (data || []).map(item => ({
            id: item.id,
            created_at: item.created_at,
            content: item.content,
            role: item.role,
            user_id: item.user_id,
            assessment_result_id: item.assessment_result_id,
            is_guest: item.is_guest
          }));
          setChatMessages(mappedData);
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchAssessments();
    fetchChatMessages();
  }, []);

  const exportData = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text('Assessment Results Report', 20, 20);
      
      // Summary stats
      doc.setFontSize(12);
      doc.text(`Total Assessments: ${assessments.length}`, 20, 40);
      doc.text(`Total Chat Messages: ${chatMessages.length}`, 20, 50);
      
      // Assessment data table
      const tableData = assessments.map(assessment => [
        assessment.student_name,
        assessment.assessment_type,
        new Date(assessment.completed_on).toLocaleDateString(),
        assessment.questions?.length || 0
      ]);
      
      autoTable(doc, {
        head: [['Student Name', 'Assessment Type', 'Completed On', 'Questions']],
        body: tableData,
        startY: 70,
      });
      
      doc.save('assessment-results.pdf');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor and manage assessment data</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={exportData} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={() => navigate('/admin/generate')}>
              <Plus className="mr-2 h-4 w-4" />
              Generate Test Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{assessments.length}</div>
              <p className="text-xs text-blue-600 mt-1">
                +{Math.floor(assessments.length * 0.1)} from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Science Stream</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {assessments.filter(a => a.assessment_type === 'science').length}
              </div>
              <p className="text-xs text-green-600 mt-1">
                {assessments.length > 0 ? Math.round((assessments.filter(a => a.assessment_type === 'science').length / assessments.length) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{chatMessages.length}</div>
              <p className="text-xs text-purple-600 mt-1">
                +{Math.floor(chatMessages.length * 0.15)} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
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

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <Select value={assessmentTypeFilter} onValueChange={setAssessmentTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Assessment Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Completed On
                </th>
                <th scope="col" className="px-6 py-3">
                  Questions
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {assessments
                .filter(assessment =>
                  assessment.student_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  (assessmentTypeFilter === 'all' || assessment.assessment_type === assessmentTypeFilter)
                )
                .sort((a, b) => {
                  const dateA = new Date(a.completed_on).getTime();
                  const dateB = new Date(b.completed_on).getTime();
                  return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                })
                .map((assessment) => (
                  <tr key={assessment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {assessment.student_name}
                    </th>
                    <td className="px-6 py-4">
                      {assessment.assessment_type}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(assessment.completed_on)}
                    </td>
                    <td className="px-6 py-4">
                      {assessment.questions.length}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAssessment(assessment)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Assessment Details Modal */}
        {selectedAssessment && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Assessment Details
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Student Name: {selectedAssessment.student_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Assessment Type: {selectedAssessment.assessment_type}
                        </p>
                        <p className="text-sm text-gray-500">
                          Completed On: {formatDate(selectedAssessment.completed_on)}
                        </p>
                        <Separator className="my-4" />
                        <h4 className="text-md font-medium text-gray-700">Questions:</h4>
                        <ul>
                          {selectedAssessment.questions.map((question, index) => (
                            <li key={index} className="text-sm text-gray-500">
                              {question.question} - Selected: {question.selectedOption}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button
                    variant="outline"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setSelectedAssessment(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
