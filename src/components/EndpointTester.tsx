
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Loader2, MessageSquare, Brain, Database, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getAIResponse } from '@/services/openRouterService';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  details?: string;
}

const EndpointTester = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testMessage, setTestMessage] = useState("What career advice do you have for someone interested in technology?");

  const updateResult = (name: string, status: 'success' | 'error', message: string, details?: string) => {
    setResults(prev => {
      const existing = prev.find(r => r.name === name);
      if (existing) {
        existing.status = status;
        existing.message = message;
        existing.details = details;
        return [...prev];
      }
      return [...prev, { name, status, message, details }];
    });
  };

  const initializeTest = (name: string) => {
    setResults(prev => {
      const existing = prev.find(r => r.name === name);
      if (existing) {
        existing.status = 'pending';
        existing.message = 'Testing...';
        existing.details = undefined;
        return [...prev];
      }
      return [...prev, { name, status: 'pending', message: 'Testing...', details: undefined }];
    });
  };

  const testAIModels = async () => {
    const testName = 'AI Models (Primary + Backup)';
    initializeTest(testName);

    try {
      console.log('🧪 Testing AI models with message:', testMessage);
      
      const messages = [
        { role: "user" as const, content: testMessage }
      ];

      const response = await getAIResponse(messages);
      
      if (response && response.length > 0) {
        updateResult(testName, 'success', 'AI models working correctly', 
          `Response received: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`);
      } else {
        updateResult(testName, 'error', 'Empty response from AI models', 'No response content received');
      }
    } catch (error: any) {
      console.error('AI model test failed:', error);
      updateResult(testName, 'error', 'AI models failed', error.message);
    }
  };

  const testSignUp = async () => {
    const testName = 'Sign Up';
    initializeTest(testName);

    try {
      const testEmail = `test_${Date.now()}@example.com`;
      const testPassword = 'TestPassword123!';

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });

      if (error) {
        updateResult(testName, 'error', 'Sign up failed', error.message);
      } else if (data.user) {
        updateResult(testName, 'success', 'Sign up successful', `User created: ${data.user.email}`);
        
        // Clean up - sign out the test user
        await supabase.auth.signOut();
      } else {
        updateResult(testName, 'error', 'Sign up failed', 'No user data returned');
      }
    } catch (error: any) {
      updateResult(testName, 'error', 'Sign up failed', error.message);
    }
  };

  const testSignIn = async () => {
    const testName = 'Sign In';
    initializeTest(testName);

    try {
      // First create a test account
      const testEmail = `signin_test_${Date.now()}@example.com`;
      const testPassword = 'TestPassword123!';

      const { error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });

      if (signUpError) {
        updateResult(testName, 'error', 'Failed to create test account', signUpError.message);
        return;
      }

      // Wait a moment then try to sign in
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (error) {
        updateResult(testName, 'error', 'Sign in failed', error.message);
      } else if (data.user) {
        updateResult(testName, 'success', 'Sign in successful', `Signed in as: ${data.user.email}`);
        
        // Clean up
        await supabase.auth.signOut();
      } else {
        updateResult(testName, 'error', 'Sign in failed', 'No user data returned');
      }
    } catch (error: any) {
      updateResult(testName, 'error', 'Sign in failed', error.message);
    }
  };

  const testSignOut = async () => {
    const testName = 'Sign Out';
    initializeTest(testName);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        updateResult(testName, 'error', 'Sign out failed', error.message);
      } else {
        updateResult(testName, 'success', 'Sign out successful', 'User signed out successfully');
      }
    } catch (error: any) {
      updateResult(testName, 'error', 'Sign out failed', error.message);
    }
  };

  const testAssessmentResults = async () => {
    const testName = 'Assessment Results Database';
    initializeTest(testName);

    try {
      // Test inserting assessment result
      const testData = {
        student_name: `Test Student ${Date.now()}`,
        assessment_type: 'comprehensive',
        completed_on: new Date().toISOString(),
        questions: [
          {
            questionId: 'test1',
            question: 'Test question?',
            selectedOption: 'Test answer'
          }
        ],
        scores: { 'Test Category': 85 },
        interests: ['Technology'],
        strengths: ['Problem Solving'],
        is_guest: true
      };

      const { data, error } = await supabase
        .from('assessment_results')
        .insert(testData)
        .select()
        .single();

      if (error) {
        updateResult(testName, 'error', 'Failed to insert assessment result', error.message);
        return;
      }

      // Test reading the data back
      const { data: readData, error: readError } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('id', data.id)
        .single();

      if (readError) {
        updateResult(testName, 'error', 'Failed to read assessment result', readError.message);
        return;
      }

      // Clean up - delete the test data
      await supabase
        .from('assessment_results')
        .delete()
        .eq('id', data.id);

      updateResult(testName, 'success', 'Assessment results database working', 
        `Successfully inserted and retrieved: ${readData.student_name}`);

    } catch (error: any) {
      updateResult(testName, 'error', 'Assessment results database failed', error.message);
    }
  };

  const testChatMessages = async () => {
    const testName = 'Chat Messages Database';
    initializeTest(testName);

    try {
      // Test inserting chat message
      const testData = {
        content: `Test message ${Date.now()}`,
        role: 'user',
        is_guest: true
      };

      const { data, error } = await supabase
        .from('chat_messages')
        .insert(testData)
        .select()
        .single();

      if (error) {
        updateResult(testName, 'error', 'Failed to insert chat message', error.message);
        return;
      }

      // Test reading the data back
      const { data: readData, error: readError } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('id', data.id)
        .single();

      if (readError) {
        updateResult(testName, 'error', 'Failed to read chat message', readError.message);
        return;
      }

      // Clean up - delete the test data
      await supabase
        .from('chat_messages')
        .delete()
        .eq('id', data.id);

      updateResult(testName, 'success', 'Chat messages database working', 
        `Successfully inserted and retrieved: ${readData.content.substring(0, 50)}...`);

    } catch (error: any) {
      updateResult(testName, 'error', 'Chat messages database failed', error.message);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);

    try {
      await testSignUp();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await testSignIn();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await testSignOut();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await testAssessmentResults();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await testChatMessages();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await testAIModels();
      
    } catch (error) {
      console.error('Test suite failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'pending':
        return <Badge variant="secondary">Testing...</Badge>;
      default:
        return <Badge variant="outline">Not Tested</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            AI Model Testing
          </CardTitle>
          <CardDescription>
            Test the AI counselor with both primary (Claude 2) and backup (Phi-4) models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Test Message:</label>
            <Textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Enter a test message for the AI..."
              className="mt-1"
            />
          </div>
          <Button onClick={testAIModels} disabled={isRunning}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Test AI Models
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Authentication Endpoints
          </CardTitle>
          <CardDescription>
            Test Supabase authentication functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={testSignUp} disabled={isRunning} variant="outline">
              Test Sign Up
            </Button>
            <Button onClick={testSignIn} disabled={isRunning} variant="outline">
              Test Sign In
            </Button>
            <Button onClick={testSignOut} disabled={isRunning} variant="outline">
              Test Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            Database Endpoints
          </CardTitle>
          <CardDescription>
            Test Supabase database operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={testAssessmentResults} disabled={isRunning} variant="outline">
              Test Assessment Results
            </Button>
            <Button onClick={testChatMessages} disabled={isRunning} variant="outline">
              Test Chat Messages
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={runAllTests} 
          disabled={isRunning}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run All Tests'
          )}
        </Button>
      </div>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Results from endpoint testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h4 className="font-medium">{result.name}</h4>
                      <p className="text-sm text-muted-foreground">{result.message}</p>
                      {result.details && (
                        <p className="text-xs text-muted-foreground mt-1">{result.details}</p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EndpointTester;
