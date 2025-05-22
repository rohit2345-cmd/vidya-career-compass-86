
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saveAssessmentResult, getAssessmentResults } from "../services/localStorageService";
import { saveChatMessage, getChatMessages } from "../services/localStorageService";

// Generate random date within the past 3 months
function getRandomDate() {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  
  return new Date(
    threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  ).toISOString();
}

const AdminDataGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateDemoData = async () => {
    setIsLoading(true);
    try {
      // Student names for demo data
      const studentNames = [
        "Raj Sharma", "Priya Patel", "Arjun Singh", "Ananya Gupta", 
        "Vikram Malhotra", "Neha Reddy", "Aditya Kumar", "Divya Desai",
        "Rohan Kapoor", "Meera Nair", "Sunil Verma", "Kavita Rao",
        "Amit Choudhury", "Sunita Joshi", "Deepak Mishra"
      ];

      const assessmentTypes = ["science", "commerce", "arts", "common_test"];

      // Dummy chat messages
      const userQueries = [
        "Can you recommend careers that match my science aptitude?",
        "What are good colleges for engineering in India?",
        "How should I prepare for JEE?",
        "Is MBBS a good option for me?",
        "Should I consider studying abroad?",
        "What skills should I develop for a career in data science?",
        "How competitive is getting into IIT?",
        "What are the career prospects in biotechnology?",
        "Should I choose PCM or PCB?",
        "How important are board exam marks for college admissions?"
      ];

      const aiResponses = [
        "Based on your assessment results showing strong aptitude in logical reasoning and mathematics, engineering paths like Software Engineering, Data Science, and AI/ML Engineering would be suitable choices. Consider exploring B.Tech programs at institutions like IITs, NITs, or BITS.",
        "For engineering in India, top institutions include IITs, NITs, BITS Pilani, and VIT. Your assessment scores suggest you have the aptitude for competitive engineering programs. I recommend focusing on JEE preparation and exploring specializations that match your strengths in mathematics and physics.",
        "To prepare for JEE, focus on understanding concepts rather than memorization. Create a structured study plan covering all subjects, practice with previous years' papers, and consider joining a coaching program. Your assessment results show strong analytical skills, which will be valuable for JEE preparation.",
        "MBBS is a demanding but rewarding career option. Your assessment shows strengths in biological sciences and interpersonal skills, which align well with medical careers. Consider preparing for NEET and explore medical colleges based on your expected score range.",
        "Studying abroad offers exposure to diverse perspectives and global opportunities. Given your strong profile, universities in the US, UK, Canada, or Singapore could be good options. Consider your financial situation, scholarship opportunities, and whether you prefer specialized programs available abroad.",
        "For a career in data science, focus on developing skills in programming (Python, R), statistics, machine learning, and data visualization. Your assessment shows strong analytical thinking which is perfect for this field. Consider online courses from platforms like Coursera or edX to build these skills.",
        "IIT admission is highly competitive, with acceptance rates around 2-3%. Your assessment scores indicate strong potential, but you'll need dedicated preparation. Focus on building deep conceptual understanding and problem-solving skills rather than just solving practice questions.",
        "Biotechnology offers diverse career paths in research, pharmaceuticals, agriculture, and healthcare. The field is growing in India with increasing investment. Your assessment shows strengths in biological sciences and analytical thinking, which align well with this career path.",
        "Based on your assessment results, you show equal strength in mathematics and biology. If you're interested in medical fields, choose PCB. If you're more inclined toward engineering or computer science, PCM would be more appropriate. Consider your long-term career goals when making this decision.",
        "Board exam marks remain important for college admissions, especially for top institutions like Delhi University. Many colleges have high cutoffs for popular courses. However, entrance exams like JEE, NEET, or CLAT often carry more weight for specialized programs. Balance your preparation accordingly."
      ];

      // Generate assessment results
      const assessmentResults = [];
      for (let i = 0; i < 15; i++) {
        const studentName = studentNames[Math.floor(Math.random() * studentNames.length)];
        const assessmentType = assessmentTypes[Math.floor(Math.random() * assessmentTypes.length)];
        const completedOn = getRandomDate();
        
        // Generate scores
        const scores = {
          analytical: Math.floor(Math.random() * 40) + 60,
          verbal: Math.floor(Math.random() * 40) + 60,
          quantitative: Math.floor(Math.random() * 40) + 60,
          spatial: Math.floor(Math.random() * 40) + 60,
          memory: Math.floor(Math.random() * 40) + 60,
        };
        
        // Generate strengths
        const possibleStrengths = ["Problem Solving", "Critical Thinking", "Communication", "Creativity", "Teamwork", "Leadership", "Technical Skills", "Analytical Thinking", "Adaptability", "Time Management"];
        const strengthCount = Math.floor(Math.random() * 3) + 3;
        const strengths = [];
        
        for (let i = 0; i < strengthCount; i++) {
          const strength = possibleStrengths[Math.floor(Math.random() * possibleStrengths.length)];
          if (!strengths.includes(strength)) {
            strengths.push(strength);
          }
        }
        
        // Generate interests
        const possibleInterests = ["Science", "Technology", "Arts", "Literature", "Mathematics", "History", "Biology", "Physics", "Economics", "Business", "Design", "Music", "Sports", "Computers", "Medicine"];
        const interestCount = Math.floor(Math.random() * 4) + 2;
        const interests = [];
        
        for (let i = 0; i < interestCount; i++) {
          const interest = possibleInterests[Math.floor(Math.random() * possibleInterests.length)];
          if (!interests.includes(interest)) {
            interests.push(interest);
          }
        }
        
        // Generate questions
        const questionCount = Math.floor(Math.random() * 10) + 15;
        const questions = [];
        
        for (let i = 0; i < questionCount; i++) {
          questions.push({
            questionId: `q${i+1}`,
            question: `Sample question ${i+1} for ${assessmentType} assessment`,
            selectedOption: `Option ${Math.floor(Math.random() * 4) + 1}`,
            correctOption: `Option ${Math.floor(Math.random() * 4) + 1}`
          });
        }

        // Save to localStorage
        saveAssessmentResult({
          studentName,
          assessmentType,
          completedOn,
          questions,
          scores,
          strengths,
          interests
        });

        assessmentResults.push({
          studentName,
          assessmentType,
          completedOn,
          questions,
          scores,
          strengths,
          interests
        });
      }

      // Generate chat messages
      const chatCount = 20;
      let chatMessages = 0;
      
      for (let i = 0; i < chatCount; i++) {
        const pairIndex = Math.floor(Math.random() * userQueries.length);
        const timestamp = getRandomDate();
        
        // User message
        saveChatMessage(userQueries[pairIndex], "user");
        chatMessages++;
        
        // AI response
        saveChatMessage(aiResponses[pairIndex], "assistant");
        chatMessages++;
      }

      // Set admin user in localStorage if it doesn't exist
      if (!localStorage.getItem("admin_users")) {
        localStorage.setItem("admin_users", JSON.stringify([
          { username: "admin", password_hash: "admin@123" }
        ]));
      }

      toast.success(`Successfully generated ${assessmentResults.length} assessment results and ${chatMessages} chat messages`);
    } catch (error) {
      console.error("Error generating demo data:", error);
      toast.error("Failed to generate demo data. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={generateDemoData}
      disabled={isLoading}
      className="ml-4"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Demo Data"
      )}
    </Button>
  );
};

export default AdminDataGenerator;
