
import React from 'react';
import Navbar from '@/components/Navbar';
import EndpointTester from '@/components/EndpointTester';

const TestEndpoints = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Endpoint Testing Dashboard
            </h1>
            <p className="text-gray-600">
              Verify that all Supabase authentication and data endpoints are working correctly
            </p>
          </div>
          
          <EndpointTester />
        </div>
      </div>
    </div>
  );
};

export default TestEndpoints;
