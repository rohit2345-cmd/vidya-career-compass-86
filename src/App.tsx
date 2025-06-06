
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import ResultsDemo from "./pages/ResultsDemo";
import AssessmentResults from "./pages/AssessmentResults";
import OpenEndedAssessment from "./pages/OpenEndedAssessment";
import OpenEndedResults from "./pages/OpenEndedResults";
import AICounselor from "./pages/AICounselor";
import Assessments from "./pages/Assessments";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TestEndpoints from "./pages/TestEndpoints";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assessment/:type" element={<Assessment />} />
              <Route path="/assessment/open-ended" element={<OpenEndedAssessment />} />
              <Route path="/results/:type" element={<Results />} />
              <Route path="/results/open-ended/:resultId" element={<OpenEndedResults />} />
              <Route path="/results-demo" element={<ResultsDemo />} />
              <Route path="/assessment-results" element={<AssessmentResults />} />
              <Route path="/ai-counselor" element={<AICounselor />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/test-endpoints" element={<TestEndpoints />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
