import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, MessageSquare, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from 'date-fns';

import SupabaseTest from "../components/SupabaseTest";

const Dashboard = () => {
  const [profile, setProfile] = useState<{
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  }>({ id: "", firstName: null, lastName: null, email: null });
  const [assessmentCount, setAssessmentCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await supabase.auth.getUser();
      if (user.data?.user?.id) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.data.user.id)
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
  }, []);

  const { data: assessments, isLoading } = useQuery({
    queryKey: ["assessments", profile.id],
    queryFn: async () => {
      if (!profile.id) return [];
      const { data, error } = await supabase
        .from("assessment_results")
        .select("*")
        .eq("user_id", profile.id)
        .order("completed_on", { ascending: false });

      if (error) {
        console.error("Error fetching assessments:", error);
        return [];
      }
      return data;
    },
  });

  useEffect(() => {
    if (assessments) {
      setAssessmentCount(assessments.length);
    }
  }, [assessments]);

  return (
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
        <div className="lg:col-span-2">
          <Card className="mb-8">
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
                      className="flex items-center justify-between"
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
                      </div>
                      <Link to={`/results/${assessment.assessment_type}/${assessment.id}`}>
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No assessments completed yet. Start exploring!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">AI Career Counselor</CardTitle>
              {/* <CardDescription>
                Get personalized guidance based on your assessment results.
              </CardDescription> */}
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

        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{assessmentCount} Assessments Completed</span>
                </div>
                <Progress
                  value={(assessmentCount / 5) * 100}
                  className="h-2"
                />
              </div>
              <Link to="/assessments">
                <Button className="mt-auto w-full">
                  Explore More Assessments
                </Button>
              </Link>
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
  );
};

export default Dashboard;
