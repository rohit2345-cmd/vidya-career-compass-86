
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SupabaseTest = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('count(*)', { count: 'exact' });
      
      if (error) throw error;
      setIsConnected(true);
      toast.success("Supabase connection successful!");
    } catch (error) {
      console.error('Connection error:', error);
      toast.error("Failed to connect to Supabase");
    }
  };

  const testInsert = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .insert({
          student_name: "Test Student",
          assessment_type: "test",
          questions: { test: "This is a test entry" },
          is_guest: true
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success("Test data inserted successfully!");
      fetchTestResults();
    } catch (error) {
      console.error('Insert error:', error);
      toast.error("Failed to insert test data");
    } finally {
      setLoading(false);
    }
  };

  const fetchTestResults = async () => {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('assessment_type', 'test')
        .order('completed_on', { ascending: false })
        .limit(5);

      if (error) throw error;
      setTestResults(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error("Failed to fetch test results");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>{isConnected ? "Connected to Supabase" : "Not connected"}</span>
        </div>

        <div className="flex gap-2">
          <Button onClick={testInsert} disabled={loading || !isConnected}>
            {loading ? "Inserting..." : "Test Insert"}
          </Button>
          <Button variant="outline" onClick={fetchTestResults} disabled={!isConnected}>
            Fetch Test Data
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Test Results:</h4>
            <div className="space-y-2">
              {testResults.map((result) => (
                <div key={result.id} className="p-2 bg-muted/50 rounded text-sm">
                  <p><strong>ID:</strong> {result.id}</p>
                  <p><strong>Student:</strong> {result.student_name}</p>
                  <p><strong>Created:</strong> {new Date(result.completed_on).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseTest;
