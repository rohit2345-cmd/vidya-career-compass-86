
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Database, Users, MessageSquare, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import AdminDataGenerator from "@/components/AdminDataGenerator";

const AdminGenerateData = () => {
  const navigate = useNavigate();

  const generateSupabaseData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-demo-data');
      
      if (error) {
        console.error("Error generating data:", error);
        toast.error("Failed to generate data via Supabase function");
        return;
      }
      
      if (data?.success) {
        toast.success(`${data.message} - ${data.assessmentResults} assessments, ${data.chatMessages} chat messages`);
      } else {
        toast.error("Failed to generate demo data");
      }
    } catch (error) {
      console.error("Error calling function:", error);
      toast.error("Error calling demo data generation function");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button onClick={() => navigate("/admin/dashboard")} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Generate Demo Data</h1>
              <p className="text-gray-600 mt-2">Create realistic test data for the admin dashboard</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Local Storage Data
                </CardTitle>
                <CardDescription>
                  Generate demo data stored in browser's local storage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>• 40 diverse assessment results</li>
                  <li>• 60 realistic chat messages</li>
                  <li>• Context-appropriate strengths & interests</li>
                  <li>• Varied difficulty levels</li>
                  <li>• Indian student names from different regions</li>
                </ul>
                <AdminDataGenerator />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Supabase Database Data
                </CardTitle>
                <CardDescription>
                  Generate demo data stored in Supabase database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>• 50 enhanced assessment results</li>
                  <li>• 80 comprehensive chat messages</li>
                  <li>• Real-world career guidance scenarios</li>
                  <li>• Authentic user queries and AI responses</li>
                  <li>• Proper data relationships and constraints</li>
                </ul>
                <Button onClick={generateSupabaseData} className="w-full">
                  Generate Supabase Data
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Data Overview
              </CardTitle>
              <CardDescription>
                What gets generated in the enhanced demo data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Student Profiles</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Diverse names from all Indian regions</li>
                    <li>• Realistic score distributions (60-95%)</li>
                    <li>• Subject-specific strengths</li>
                    <li>• Interest alignment with career paths</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Assessment Types</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Science stream assessments</li>
                    <li>• Commerce stream assessments</li>
                    <li>• Arts stream assessments</li>
                    <li>• Comprehensive career tests</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Chat Scenarios</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Career guidance conversations</li>
                    <li>• College admission queries</li>
                    <li>• Stream selection dilemmas</li>
                    <li>• Professional skill development</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminGenerateData;
