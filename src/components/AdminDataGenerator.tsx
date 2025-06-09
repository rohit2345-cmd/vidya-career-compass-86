
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saveAssessmentResult, getAssessmentResults } from "../services/localStorageService";
import { saveChatMessage, getChatMessages } from "../services/localStorageService";

// Generate random date within the past 6 months
function getRandomDate() {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  return new Date(
    sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
  ).toISOString();
}

const AdminDataGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateDemoData = async () => {
    setIsLoading(true);
    try {
      // More diverse student names from different regions of India
      const studentNames = [
        "Aadhya Sharma", "Arjun Patel", "Bhavana Reddy", "Chetan Kumar", "Divya Nair",
        "Eshaan Singh", "Fatima Khan", "Gaurav Malhotra", "Harini Iyer", "Ishaan Gupta",
        "Jiya Desai", "Kabir Mehta", "Lavanya Rao", "Manish Verma", "Nisha Joshi",
        "Om Prakash", "Priya Choudhury", "Rahul Agarwal", "Sneha Pillai", "Tanvi Kapoor",
        "Uday Mishra", "Varun Sinha", "Waseema Begum", "Yash Bansal", "Zara Ahmed",
        "Aditya Bhatt", "Kavya Menon", "Rohan Tiwari", "Sanya Kulkarni", "Vikram Jain",
        "Ananya Ghosh", "Harsh Pandey", "Meera Saxena", "Nitin Yadav", "Pooja Bhatia",
        "Rishabh Goel", "Shweta Khanna", "Tarun Agnihotri", "Urvi Srivastava", "Vishal Dubey"
      ];

      const assessmentTypes = ["science", "commerce", "arts", "comprehensive"];

      // More realistic and diverse user queries
      const userQueries = [
        "I scored 87% in 12th science. Should I go for engineering or medical?",
        "What are the best commerce colleges in Mumbai for CA preparation?",
        "I'm interested in psychology but my parents want me to do engineering. What should I do?",
        "Can you suggest some good career options after BA English Literature?",
        "I want to study abroad for computer science. Which countries are best?",
        "Is data science a good career option? What skills do I need?",
        "I'm confused between mechanical and computer engineering. Help me decide.",
        "What are the job prospects for biotechnology graduates in India?",
        "Should I take a gap year to prepare for JEE again or join a private college?",
        "I want to become a teacher. What courses should I pursue after 12th?",
        "Is graphic design a stable career option in India?",
        "What's the difference between BBA and BCom? Which is better?",
        "I scored low in JEE. Are there any good engineering colleges I can get into?",
        "Can you tell me about careers in digital marketing?",
        "I want to start my own business. Should I do an MBA first?",
        "What are the emerging fields in science and technology?",
        "Is it worth doing engineering from a Tier 3 college?",
        "I'm interested in fashion designing. What are the best institutes?",
        "Should I choose PCM or PCB in 11th for a career in research?",
        "What programming languages should I learn for software development?",
        "I want to work in the entertainment industry. What are my options?",
        "Is NEET the only way to become a doctor in India?",
        "What are the career options in journalism and mass communication?",
        "I'm good at mathematics. What career options do I have apart from engineering?",
        "Should I pursue chartered accountancy or company secretary?",
        "What skills do I need to become a successful entrepreneur?",
        "Is studying law a good option for girls in India?",
        "I want to work in an NGO. What courses should I take?",
        "What are the opportunities in the sports industry?",
        "Should I choose arts stream if I want to become an IAS officer?"
      ];

      const aiResponses = [
        "With 87% in science, you have excellent options in both fields. For engineering, focus on JEE preparation - your strong academics indicate good potential for top IITs/NITs. For medical, start NEET preparation immediately. Consider your interests: engineering offers diverse specializations like AI, robotics, while medicine provides direct patient care opportunities. Both have excellent career prospects.",
        "Top commerce colleges in Mumbai for CA include HR College of Commerce, NM College, St. Xavier's College, and Sydenham College. These institutions have strong CA coaching support and excellent industry connections. HR College particularly has a high CA success rate. Focus on maintaining above 90% in 12th commerce for admission to these prestigious institutions.",
        "This is a common dilemma. Psychology is a growing field with opportunities in clinical practice, counseling, organizational psychology, and research. Engineering offers technical roles but may not align with your interests. Consider discussing your passion for psychology with parents, showing them career prospects and growth potential. You could also explore engineering psychology or human-computer interaction as a middle ground.",
        "BA English Literature opens doors to diverse careers: content writing, journalism, publishing, teaching, civil services, advertising, public relations, and digital marketing. You can pursue MA English, mass communication, or professional courses in content marketing. The digital economy has created numerous opportunities for English graduates in content creation and communication roles.",
        "For computer science abroad, consider USA (strong tech industry), Canada (immigration-friendly), Germany (affordable education), and Singapore (tech hub in Asia). Focus on building a strong profile with good grades, coding skills, and relevant projects. Start preparing for GRE/IELTS early. Research scholarship opportunities and university rankings in your preferred countries.",
        "Data science is an excellent career choice with high demand across industries. Essential skills include: Python/R programming, statistics, machine learning, SQL, data visualization (Tableau/PowerBI), and domain knowledge. Start with online courses from Coursera or edX, practice on Kaggle, and build a portfolio of projects. Entry-level salaries range from 6-12 LPA.",
        "Both are excellent engineering branches. Mechanical engineering is broader, covering automotive, aerospace, manufacturing, and energy sectors. Computer engineering focuses on software, hardware, and emerging technologies like AI. Consider your interests: do you prefer working with physical systems or digital technologies? Computer engineering currently has higher starting salaries and more job opportunities.",
        "Biotechnology in India is growing rapidly with opportunities in pharmaceuticals, agriculture, healthcare, and research. Major companies like Biocon, Dr. Reddy's, and Serum Institute offer good positions. You can work in R&D, quality control, regulatory affairs, or product development. Consider pursuing M.Tech or MBA in biotechnology for better prospects. Starting salaries range from 4-8 LPA.",
        "This depends on your JEE rank and goals. If you're within 50,000 rank, consider NITs or good private colleges like BITS, VIT, or SRM. A gap year makes sense only if you're confident of significant improvement and targeting top IITs. Private colleges offer good placement opportunities, especially in computer science. Evaluate the trade-off between college brand and one year of career time.",
        "Teaching is a noble profession with multiple pathways. For school teaching, pursue B.Ed after your graduation. For college teaching, you'll need a master's degree and NET/SET qualification. Consider specializations like early childhood education, special education, or educational technology. Government teaching positions offer job security, while private institutions provide better initial salaries.",
        "Graphic design is increasingly stable with digital transformation. Opportunities exist in advertising agencies, digital marketing companies, e-commerce, gaming, and freelancing. Build a strong portfolio, learn tools like Adobe Creative Suite, and understand UI/UX principles. Starting salaries range from 3-6 LPA, with experienced designers earning 10+ LPA. Freelancing can be very lucrative.",
        "BBA focuses on management principles, leadership, and business administration - ideal for managerial roles or MBA preparation. BCom provides strong foundation in accounting, finance, and commerce - better for CA, banking, or finance careers. BBA offers more practical exposure through internships and projects. Choose based on whether you prefer management or finance/accounting specialization.",
        "Yes, several good options exist: NITs through JoSAA counseling, state government colleges, and reputed private institutions like VIT, SRM, Manipal, or BITS (if affordable). Focus on computer science or electronics branches for better placements. Many Tier 2 colleges have excellent placement records. Don't compromise on branch for college ranking - a good branch in a decent college often outperforms average branches in top colleges.",
        "Digital marketing is booming with excellent growth prospects. Key areas include SEO, social media marketing, content marketing, email marketing, PPC advertising, and analytics. Skills needed: Google Ads/Analytics, social media tools, content creation, and basic design. Certifications from Google, Facebook, and HubSpot add value. Starting salaries range from 3-6 LPA with rapid growth potential.",
        "Starting a business benefits from experience and knowledge. Consider working for 2-3 years in your field of interest, then pursuing MBA from a good institution. This combination provides practical experience plus management skills. Alternatively, start small ventures during college or immediately after graduation. MBA from top institutions offers excellent networking opportunities for entrepreneurs.",
        "Emerging fields include: Artificial Intelligence/Machine Learning, Data Science, Cybersecurity, Biotechnology, Renewable Energy, Nanotechnology, Robotics, Space Technology, and Environmental Engineering. These fields offer excellent growth prospects and societal impact. Focus on building strong fundamentals in mathematics, programming, and your chosen specialization. Continuous learning is crucial in these rapidly evolving domains.",
        "Tier 3 engineering colleges can be worthwhile with the right approach. Focus on: choosing computer science or electronics branches, self-learning programming skills, building projects, participating in hackathons, and securing good internships. Many successful engineers have graduated from Tier 3 colleges. Your efforts matter more than college ranking, especially in software engineering where skills are valued over college brands.",
        "Fashion designing is creative and rewarding. Top institutes include NIFT, Pearl Academy, Symbiosis Institute of Design, and JD Institute. The curriculum covers design principles, garment construction, fashion marketing, and trend forecasting. Career options include fashion designer, stylist, fashion journalist, or starting your own label. Build a strong portfolio and stay updated with global fashion trends.",
        "Choose based on your research interests. PCM opens doors to engineering, pure sciences (Physics, Chemistry, Mathematics), computer science, and technology research. PCB leads to medical sciences, life sciences, biotechnology, and biological research. Both paths offer excellent research opportunities. Consider your subject preferences and long-term career goals in research.",
        "For software development, start with: Python (beginner-friendly and versatile), Java (enterprise applications), JavaScript (web development), and C++ (system programming). Focus on one language initially, then expand. Learn frameworks like React for frontend, Django/Flask for backend. Practice on platforms like LeetCode and GitHub. Contribute to open-source projects to build your portfolio.",
        "Entertainment industry offers diverse opportunities: film/TV production, music industry, gaming, digital content creation, event management, artist management, and media journalism. Consider courses in mass communication, film studies, music production, or digital media. Build a portfolio, network actively, and consider internships with production houses or media companies. Freelancing is also common in this industry.",
        "NEET is the primary route for MBBS in India, but alternatives exist: veterinary sciences (also through NEET), nursing, physiotherapy, medical laboratory technology, and studying MBBS abroad (though costlier). Some private medical colleges have management quota seats. Dental courses (BDS) also go through NEET. Explore paramedical courses if medical science interests you beyond just MBBS.",
        "Journalism and mass communication offer exciting career paths: news reporting, digital journalism, content creation, public relations, advertising, radio/TV production, and documentary filmmaking. Digital media has created new opportunities in social media management and online content creation. Build writing skills, stay updated with current affairs, and consider internships with media houses. Starting salaries range from 3-7 LPA.",
        "Mathematics opens numerous career paths beyond engineering: data science, actuarial science, statistical analysis, research, teaching, finance, investment banking, market research, and government services (statistics department). Consider courses like statistics, economics with statistics, or specialized programs in data analytics. Mathematics graduates are highly valued in banking and finance sectors.",
        "Both CA and CS are prestigious commerce careers. CA focuses on accounting, auditing, taxation, and financial advisory - broader scope with higher earning potential. CS specializes in corporate law, compliance, and secretarial practices - more focused but growing importance with corporate governance. CA has more recognition globally. Consider your interest in numbers (CA) versus legal compliance (CS).",
        "Essential entrepreneurial skills include: leadership, financial management, marketing, strategic thinking, risk assessment, networking, communication, and adaptability. Develop these through practical experience, mentorship, and courses. Start small ventures to gain experience. Learn from failures and stay updated with market trends. Building a strong network and maintaining persistence are crucial for entrepreneurial success.",
        "Law is an excellent career option for women with growing opportunities in corporate law, judiciary, legal journalism, and social advocacy. Women lawyers are increasingly prominent in Supreme Court and High Courts. Challenges include long working hours and initial struggle period. Consider specializations like family law, corporate law, or constitutional law based on your interests. Many women have successfully built legal careers in India.",
        "NGO work is fulfilling but requires dedication. Relevant courses include social work, development studies, public administration, rural development, or specialized programs in NGO management. Develop skills in project management, fundraising, community mobilization, and communication. Start with internships or volunteer work. While initial salaries are modest, senior positions in large NGOs offer competitive packages and international opportunities.",
        "Sports industry is expanding rapidly in India. Opportunities include: sports management, sports journalism, fitness training, sports marketing, event management, sports psychology, and athlete representation. Consider courses in sports management, journalism, or physiotherapy. Build relevant experience through internships with sports organizations. Former athletes often transition to coaching, commentary, or sports administration roles.",
        "Arts stream is excellent for UPSC preparation as it develops analytical thinking, essay writing, and general awareness. Subjects like history, political science, geography, and economics directly help in UPSC syllabus. Many successful IAS officers are from arts background. Focus on developing strong writing skills, current affairs knowledge, and optional subject expertise. Arts provides flexibility to explore diverse career options alongside UPSC preparation."
      ];

      // Generate 40 assessment results with more realistic data
      const assessmentResults = [];
      for (let i = 0; i < 40; i++) {
        const studentName = studentNames[Math.floor(Math.random() * studentNames.length)];
        const assessmentType = assessmentTypes[Math.floor(Math.random() * assessmentTypes.length)];
        const completedOn = getRandomDate();
        
        // Generate realistic scores based on assessment type
        const baseScore = 60 + Math.floor(Math.random() * 35); // 60-95 range
        const scores = {
          analytical: baseScore + Math.floor(Math.random() * 10) - 5,
          verbal: baseScore + Math.floor(Math.random() * 10) - 5,
          quantitative: baseScore + Math.floor(Math.random() * 10) - 5,
          spatial: baseScore + Math.floor(Math.random() * 10) - 5,
          memory: baseScore + Math.floor(Math.random() * 10) - 5,
        };
        
        // Ensure scores are within valid range
        Object.keys(scores).forEach(key => {
          scores[key] = Math.max(40, Math.min(100, scores[key]));
        });
        
        // Generate context-appropriate strengths based on assessment type
        const strengthsByType = {
          science: ["Analytical Thinking", "Problem Solving", "Mathematical Reasoning", "Scientific Method", "Research Skills", "Logical Analysis", "Technical Skills"],
          commerce: ["Financial Analysis", "Business Acumen", "Numerical Skills", "Communication", "Leadership", "Market Understanding", "Strategic Thinking"],
          arts: ["Creative Thinking", "Critical Analysis", "Communication", "Cultural Awareness", "Writing Skills", "Artistic Expression", "Interpersonal Skills"],
          comprehensive: ["Problem Solving", "Critical Thinking", "Communication", "Creativity", "Teamwork", "Leadership", "Adaptability", "Time Management"]
        };
        
        const relevantStrengths = strengthsByType[assessmentType] || strengthsByType.comprehensive;
        const strengthCount = Math.floor(Math.random() * 3) + 3;
        const strengths = [];
        
        for (let j = 0; j < strengthCount; j++) {
          const strength = relevantStrengths[Math.floor(Math.random() * relevantStrengths.length)];
          if (!strengths.includes(strength)) {
            strengths.push(strength);
          }
        }
        
        // Generate context-appropriate interests
        const interestsByType = {
          science: ["Science", "Technology", "Mathematics", "Research", "Innovation", "Medicine", "Engineering", "Environment"],
          commerce: ["Business", "Economics", "Finance", "Entrepreneurship", "Marketing", "International Trade", "Banking", "Management"],
          arts: ["Literature", "History", "Arts", "Culture", "Philosophy", "Psychology", "Social Sciences", "Creative Writing"],
          comprehensive: ["Science", "Technology", "Arts", "Literature", "Mathematics", "History", "Business", "Sports", "Music", "Travel"]
        };
        
        const relevantInterests = interestsByType[assessmentType] || interestsByType.comprehensive;
        const interestCount = Math.floor(Math.random() * 4) + 3;
        const interests = [];
        
        for (let j = 0; j < interestCount; j++) {
          const interest = relevantInterests[Math.floor(Math.random() * relevantInterests.length)];
          if (!interests.includes(interest)) {
            interests.push(interest);
          }
        }
        
        // Generate realistic questions with varied difficulty
        const questionCount = Math.floor(Math.random() * 15) + 20; // 20-35 questions
        const questions = [];
        
        for (let j = 0; j < questionCount; j++) {
          const difficulty = ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)];
          questions.push({
            questionId: `q${j+1}`,
            question: `${difficulty} ${assessmentType} question ${j+1}: Sample question testing ${assessmentType} aptitude`,
            selectedOption: `Option ${Math.floor(Math.random() * 4) + 1}`,
            correctOption: `Option ${Math.floor(Math.random() * 4) + 1}`,
            difficulty: difficulty,
            category: assessmentType
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

      // Generate 60 diverse chat message pairs
      let chatMessages = 0;
      
      for (let i = 0; i < 30; i++) {
        const queryIndex = Math.floor(Math.random() * userQueries.length);
        const responseIndex = Math.floor(Math.random() * aiResponses.length);
        const timestamp = getRandomDate();
        
        // User message
        saveChatMessage(userQueries[queryIndex], "user");
        chatMessages++;
        
        // AI response (with slight delay)
        const responseTime = new Date(new Date(timestamp).getTime() + Math.random() * 300000 + 30000); // 30 seconds to 5 minutes delay
        saveChatMessage(aiResponses[responseIndex], "assistant");
        chatMessages++;
      }

      // Set admin user in localStorage if it doesn't exist
      if (!localStorage.getItem("admin_users")) {
        localStorage.setItem("admin_users", JSON.stringify([
          { username: "admin", password_hash: "admin@123" }
        ]));
      }

      toast.success(`Successfully generated ${assessmentResults.length} assessment results and ${chatMessages} chat messages with diverse, realistic data`);
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
          Generating Enhanced Data...
        </>
      ) : (
        "Generate Enhanced Demo Data"
      )}
    </Button>
  );
};

export default AdminDataGenerator;
