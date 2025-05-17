
import { useMemo } from "react";
import scienceQuestions from "../questions/scienceQuestions.json";
import artsQuestions from "../questions/artsQuestions.json";
import commerceQuestions from "../questions/commerceQuestions.json";
import commonQuestions from "../questions/common_test.json";

export const useResultsData = () => {
  // Get question counts
  const scienceCount = scienceQuestions.questions?.length || 0;
  const artsCount = artsQuestions.questions?.length || 0;
  const commerceCount = commerceQuestions.questions?.length || 0;
  const commonCount = commonQuestions.questions?.length || 0;

  // Mock data
  const aptitudeData = [
    { name: "Logical", score: 75 },
    { name: "Numerical", score: 82 },
    { name: "Verbal", score: 65 },
    { name: "Spatial", score: 90 },
    { name: "Memory", score: 78 },
  ];

  const interestData = [
    { name: "Science", value: 35 },
    { name: "Commerce", value: 25 },
    { name: "Arts", value: 15 },
    { name: "Technology", value: 25 },
  ];

  const personalityData = [
    { subject: "Openness", A: 80, fullMark: 100 },
    { subject: "Conscientiousness", A: 70, fullMark: 100 },
    { subject: "Extraversion", A: 60, fullMark: 100 },
    { subject: "Agreeableness", A: 90, fullMark: 100 },
    { subject: "Neuroticism", A: 50, fullMark: 100 },
  ];

  const careerRecommendations = [
    {
      title: "Software Engineer",
      match: 95,
      description: "Develop applications and systems using programming and development skills.",
      skills: ["Programming", "Problem Solving", "Analytical Thinking"],
      education: ["B.Tech in Computer Science", "MCA", "B.Sc in IT"],
    },
    {
      title: "Data Scientist",
      match: 88,
      description: "Analyze complex data sets to identify trends and develop insights.",
      skills: ["Statistics", "Machine Learning", "Data Visualization"],
      education: ["B.Tech + M.Tech in CS/IT", "MSc in Statistics", "B.Sc in Mathematics with specialization"],
    },
    {
      title: "UX Designer",
      match: 82,
      description: "Design user-centered digital experiences and interfaces.",
      skills: ["Design Thinking", "Wireframing", "User Research"],
      education: ["B.Des", "Diploma in UX Design", "Any degree + UX certification"],
    },
  ];

  const topColleges = [
    {
      name: "Indian Institute of Technology (IIT), Mumbai",
      courses: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Mechanical Engineering"],
      location: "Mumbai, Maharashtra",
    },
    {
      name: "National Institute of Design (NID), Ahmedabad",
      courses: ["B.Des Product Design", "B.Des Graphic Design", "B.Des Animation"],
      location: "Ahmedabad, Gujarat",
    },
    {
      name: "St. Stephen's College, Delhi University",
      courses: ["B.A. Economics", "B.Sc. Mathematics", "B.A. English"],
      location: "Delhi",
    },
  ];

  // Technical and soft skills data
  const technicalSkills = [
    { name: "Programming", percentage: 65 },
    { name: "Data Analysis", percentage: 80 },
    { name: "Design Tools", percentage: 45 },
    { name: "Mathematics", percentage: 90 },
  ];
  
  const softSkills = [
    { name: "Communication", percentage: 75 },
    { name: "Leadership", percentage: 60 },
    { name: "Problem Solving", percentage: 85 },
    { name: "Teamwork", percentage: 70 },
  ];
  
  // Student information
  const studentInfo = {
    name: "Rahul Sharma",
    age: 17,
    grade: "12th Standard",
    school: "Delhi Public School, R.K. Puram",
    board: "CBSE",
    currentStream: "Science with Mathematics",
    assessmentTaken: "Comprehensive Career Assessment",
    date: "May 15, 2025",
    duration: "65 minutes",
    overallScore: 84,
    questionsAnswered: commonCount
  };

  return {
    aptitudeData,
    interestData,
    personalityData,
    careerRecommendations,
    topColleges,
    technicalSkills,
    softSkills,
    studentInfo,
  };
};

export default useResultsData;
