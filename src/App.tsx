
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assessments from "./pages/Assessments";
import Assessment from "./pages/Assessment";
import OpenEndedAssessment from "./pages/OpenEndedAssessment";
import Results from "./pages/Results";
import AssessmentResults from "./pages/AssessmentResults";
import ResultsDemo from "./pages/ResultsDemo";
import About from "./pages/About";
import AICounselor from "./pages/AICounselor";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Create a wrapper component that conditionally renders the footer
const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAdminPage = location.pathname.includes('/admin');
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessment/:assessmentType" element={<Assessment />} />
          <Route path="/assessment/open-ended" element={<OpenEndedAssessment />} />
          <Route path="/results/:assessmentType" element={<Results />} />
          <Route path="/results/:assessmentType/:resultId" element={<AssessmentResults />} />
          <Route path="/results-demo" element={<ResultsDemo />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-counselor" element={<AICounselor />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {isLandingPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
