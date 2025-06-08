
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, MessageSquare, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface AssessmentResult {
  id: string;
  student_name: string;
  assessment_type: string;
  questions: any;
  completed_on: string;
  scores?: any;
  interests?: any;
  strengths?: any;
}

const AssessmentResults = () => {
  const { assessmentType, resultId } = useParams();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [resultId]);

  const fetchResult = async () => {
    if (!resultId) {
      // Show demo results if no specific result ID
      setResult({
        id: "demo",
        student_name: "Demo Student",
        assessment_type: "comprehensive",
        questions: [],
        completed_on: new Date().toISOString(),
        scores: { analytical: 85, creative: 92, technical: 78 },
        interests: ["Technology", "Design", "Problem Solving"],
        strengths: ["Creative Thinking", "Analytical Skills", "Communication"]
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('id', resultId)
        .single();

      if (error) {
        console.error('Error fetching result:', error);
        toast.error('Failed to load assessment results');
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while loading results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8 flex items-center justify-center min-h-screen">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Results Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The assessment results you're looking for could not be found.
              </p>
              <Link to="/assessments">
                <Button>Back to Assessments</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Assessment Results</h1>
            <p className="text-muted-foreground">
              {result.assessment_type.charAt(0).toUpperCase() + result.assessment_type.slice(1)} Assessment
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Link to="/ai-counselor">
              <Button className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Get AI Guidance
              </Button>
            </Link>
          </div>
        </div>

        {/* Student Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Student Name</p>
                <p className="font-semibold">{result.student_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assessment Type</p>
                <Badge variant="secondary" className="mt-1">
                  {result.assessment_type.replace('-', ' ')}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed On</p>
                <p className="font-semibold flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(result.completed_on)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Content */}
        {result.assessment_type === 'open-ended' && result.questions && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Responses</h2>
            {result.questions.map((q: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}
                  </CardTitle>
                  <p className="text-muted-foreground">{q.question}</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{q.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Demo Results for other assessment types */}
        {result.assessment_type !== 'open-ended' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.scores && (
              <Card>
                <CardHeader>
                  <CardTitle>Aptitude Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(result.scores).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="capitalize">{key}</span>
                        <Badge variant="outline">{String(value)}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {result.interests && (
              <Card>
                <CardHeader>
                  <CardTitle>Interest Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.interests.map((interest: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {result.strengths && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.strengths.map((strength: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* AI Counselor CTA */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6 border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                AI Career Counselor
              </h3>
              <p className="text-muted-foreground">
                Get personalized career guidance based on your assessment results
              </p>
            </div>
            <Link to="/ai-counselor">
              <Button className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Start Guidance Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;
