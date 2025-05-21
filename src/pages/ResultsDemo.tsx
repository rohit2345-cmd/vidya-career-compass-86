
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Share2,
  MessageSquare,
  Brain,
  Lightbulb,
} from "lucide-react";

// Import refactored components
import StudentInfoCard from "../components/results/StudentInfoCard";
import AptitudeChart from "../components/results/AptitudeChart";
import InterestChart from "../components/results/InterestChart";
import PersonalityChart from "../components/results/PersonalityChart";
import CareerRecommendations from "../components/results/CareerRecommendations";
import CollegeRecommendations from "../components/results/CollegeRecommendations";
import SkillsSection from "../components/results/SkillsSection";
import useResultsData from "../hooks/useResultsData";

const ResultsDemo = () => {
  // Get all data from our hook
  const {
    aptitudeData,
    interestData,
    personalityData,
    careerRecommendations,
    topColleges,
    technicalSkills,
    softSkills,
    studentInfo,
  } = useResultsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 animate-fade-in">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Demo Assessment Results</h1>
            <p className="text-muted-foreground">
              See how our comprehensive assessment analyzes aptitude, interests, and personality
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
          </div>
        </div>

        {/* Student Information Card */}
        <StudentInfoCard studentInfo={studentInfo} />

        {/* Aptitude and Personality Charts - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AptitudeChart data={aptitudeData} />
          <PersonalityChart data={personalityData} />
        </div>

        {/* Interest Distribution Chart - Separate row */}
        <div className="mb-8">
          <InterestChart data={interestData} />
        </div>

        <Tabs defaultValue="careers" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="careers">Career Recommendations</TabsTrigger>
            <TabsTrigger value="education">Educational Pathways</TabsTrigger>
            <TabsTrigger value="skills">Skill Development</TabsTrigger>
          </TabsList>

          <TabsContent value="careers" className="pt-6">
            <div className="space-y-6">
              <CareerRecommendations careers={careerRecommendations} />
            </div>
          </TabsContent>

          <TabsContent value="education" className="pt-6">
            <CollegeRecommendations colleges={topColleges} />
          </TabsContent>

          <TabsContent value="skills" className="pt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Skills to Develop</h3>
              <SkillsSection 
                technicalSkills={technicalSkills} 
                softSkills={softSkills} 
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                AI Career Counselor
              </h3>
              <p className="text-muted-foreground">
                Chat with our AI counselor for personalized guidance about your results
              </p>
            </div>
            <Link to="/ai-counselor">
              <Button className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Start Chat
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="card bg-gradient-to-br from-white to-amber-50 p-6 rounded-lg border">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-accent" />
                Get Full Results
              </h3>
              <p className="mb-4">This is a demonstration of our analysis capabilities. Take a full assessment to receive your personalized career guidance.</p>
              <Link to="/assessments" className="w-full">
                <Button className="w-full">Take Assessment</Button>
              </Link>
            </div>
            
            <div className="card bg-gradient-to-br from-white to-blue-50 p-6 rounded-lg border">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-primary" />
                Our Methodology
              </h3>
              <p className="mb-4">Our advanced algorithms analyze 40+ data points to generate career recommendations matched to your unique profile.</p>
              <Link to="/about" className="w-full">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDemo;
