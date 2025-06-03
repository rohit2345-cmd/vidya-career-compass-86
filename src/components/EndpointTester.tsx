
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Clock, User, Database, MessageSquare } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  duration?: number;
}

const EndpointTester = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('testpassword123');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check current auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const addTestResult = (name: string, status: 'success' | 'error', message: string, duration?: number) => {
    setTestResults(prev => [...prev, { name, status, message, duration }]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      // Test 1: Sign Up
      const signUpStart = Date.now();
      try {
        const { data, error } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword
        });
        
        if (error) {
          if (error.message.includes('already registered')) {
            addTestResult('Sign Up', 'success', 'User already exists (expected)', Date.now() - signUpStart);
          } else {
            addTestResult('Sign Up', 'error', `Error: ${error.message}`, Date.now() - signUpStart);
          }
        } else {
          addTestResult('Sign Up', 'success', 'Sign up successful', Date.now() - signUpStart);
        }
      } catch (err: any) {
        addTestResult('Sign Up', 'error', `Exception: ${err.message}`, Date.now() - signUpStart);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Test 2: Sign In
      const signInStart = Date.now();
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword
        });
        
        if (error) {
          addTestResult('Sign In', 'error', `Error: ${error.message}`, Date.now() - signInStart);
        } else {
          addTestResult('Sign In', 'success', 'Sign in successful', Date.now() - signInStart);
        }
      } catch (err: any) {
        addTestResult('Sign In', 'error', `Exception: ${err.message}`, Date.now() - signInStart);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Test 3: Assessment Results - Insert
      const insertStart = Date.now();
      try {
        const testAssessment = {
          student_name: 'Test Student',
          assessment_type: 'test',
          completed_on: new Date().toISOString(),
          questions: [
            {
              questionId: 'test1',
              question: 'Test Question',
              selectedOption: 'Test Answer'
            }
          ],
          scores: { overall: 85 },
          interests: ['technology', 'science'],
          strengths: ['analytical thinking'],
          is_guest: false
        };

        const { data, error } = await supabase
          .from('assessment_results')
          .insert(testAssessment)
          .select()
          .single();

        if (error) {
          addTestResult('Insert Assessment', 'error', `Error: ${error.message}`, Date.now() - insertStart);
        } else {
          addTestResult('Insert Assessment', 'success', `Assessment inserted with ID: ${data.id}`, Date.now() - insertStart);
        }
      } catch (err: any) {
        addTestResult('Insert Assessment', 'error', `Exception: ${err.message}`, Date.now() - insertStart);
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 4: Assessment Results - Read
      const readStart = Date.now();
      try {
        const { data, error } = await supabase
          .from('assessment_results')
          .select('*')
          .limit(5);

        if (error) {
          addTestResult('Read Assessments', 'error', `Error: ${error.message}`, Date.now() - readStart);
        } else {
          addTestResult('Read Assessments', 'success', `Retrieved ${data?.length || 0} assessments`, Date.now() - readStart);
        }
      } catch (err: any) {
        addTestResult('Read Assessments', 'error', `Exception: ${err.message}`, Date.now() - readStart);
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 5: Chat Messages - Insert
      const chatInsertStart = Date.now();
      try {
        const testMessage = {
          content: 'Test chat message',
          role: 'user',
          is_guest: false
        };

        const { data, error } = await supabase
          .from('chat_messages')
          .insert(testMessage)
          .select()
          .single();

        if (error) {
          addTestResult('Insert Chat Message', 'error', `Error: ${error.message}`, Date.now() - chatInsertStart);
        } else {
          addTestResult('Insert Chat Message', 'success', `Chat message inserted with ID: ${data.id}`, Date.now() - chatInsertStart);
        }
      } catch (err: any) {
        addTestResult('Insert Chat Message', 'error', `Exception: ${err.message}`, Date.now() - chatInsertStart);
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      // Test 6: Chat Messages - Read
      const chatReadStart = Date.now();
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .limit(5);

        if (error) {
          addTestResult('Read Chat Messages', 'error', `Error: ${error.message}`, Date.now() - chatReadStart);
        } else {
          addTestResult('Read Chat Messages', 'success', `Retrieved ${data?.length || 0} chat messages`, Date.now() - chatReadStart);
        }
      } catch (err: any) {
        addTestResult('Read Chat Messages', 'error', `Exception: ${err.message}`, Date.now() - chatReadStart);
      }

      toast.success('All endpoint tests completed!');
      
    } catch (error) {
      toast.error('Test suite failed');
      console.error('Test suite error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(`Sign out error: ${error.message}`);
      } else {
        toast.success('Signed out successfully');
        setCurrentUser(null);
      }
    } catch (err: any) {
      toast.error(`Sign out exception: ${err.message}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Endpoint Tester
          </CardTitle>
          <CardDescription>
            Test authentication and database operations to ensure everything is working correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Auth Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">Current User:</span>
              <Badge variant={currentUser ? "default" : "secondary"}>
                {currentUser ? currentUser.email : 'Not signed in'}
              </Badge>
            </div>
            {currentUser && (
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            )}
          </div>

          {/* Test Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="testEmail">Test Email</Label>
              <Input
                id="testEmail"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testPassword">Test Password</Label>
              <Input
                id="testPassword"
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Password (min 6 chars)"
              />
            </div>
          </div>

          {/* Run Tests Button */}
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            className="w-full"
            size="lg"
          >
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </Button>

          <Separator />

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Test Results</h3>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className="font-medium">{result.name}</span>
                      </div>
                      {result.duration && (
                        <Badge variant="outline" className="text-xs">
                          {result.duration}ms
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mt-1 ml-6">{result.message}</p>
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Summary:</span>
                  <div className="flex gap-4">
                    <span className="text-green-600">
                      ✓ {testResults.filter(r => r.status === 'success').length} passed
                    </span>
                    <span className="text-red-600">
                      ✗ {testResults.filter(r => r.status === 'error').length} failed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EndpointTester;
