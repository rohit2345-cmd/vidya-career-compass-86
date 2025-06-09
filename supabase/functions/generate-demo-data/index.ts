import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
};

// Enhanced diverse student names from different regions of India
const studentNames = [
  "Aadhya Sharma", "Arjun Patel", "Bhavana Reddy", "Chetan Kumar", "Divya Nair",
  "Eshaan Singh", "Fatima Khan", "Gaurav Malhotra", "Harini Iyer", "Ishaan Gupta",
  "Jiya Desai", "Kabir Mehta", "Lavanya Rao", "Manish Verma", "Nisha Joshi",
  "Om Prakash", "Priya Choudhury", "Rahul Agarwal", "Sneha Pillai", "Tanvi Kapoor",
  "Uday Mishra", "Varun Sinha", "Waseema Begum", "Yash Bansal", "Zara Ahmed",
  "Aditya Bhatt", "Kavya Menon", "Rohan Tiwari", "Sanya Kulkarni", "Vikram Jain",
  "Ananya Ghosh", "Harsh Pandey", "Meera Saxena", "Nitin Yadav", "Pooja Bhatia",
  "Rishabh Goel", "Shweta Khanna", "Tarun Agnihotri", "Urvi Srivastava", "Vishal Dubey",
  "Aarav Singh", "Diya Verma", "Karan Malhotra", "Riya Bansal", "Siddharth Agarwal"
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
  "What programming languages should I learn for software development?"
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
  "Teaching is a noble profession with multiple pathways. For school teaching, pursue B.Ed after your graduation. For college teaching, you'll need a master's degree and NET/SET qualification. Consider specializations like early childhood education, special education, or educational technology. Government teaching positions offer job security, while private institutions provide better initial salaries."
];

// Generate random date within the past 6 months
function getRandomDate() {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  return new Date(
    sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime())
  ).toISOString();
}

// Generate enhanced assessment result
function generateAssessmentResult() {
  const studentName = studentNames[Math.floor(Math.random() * studentNames.length)];
  const assessmentType = assessmentTypes[Math.floor(Math.random() * assessmentTypes.length)];
  const isGuest = Math.random() > 0.7;
  const completedOn = getRandomDate();
  
  // Generate realistic scores based on assessment type
  const baseScore = 60 + Math.floor(Math.random() * 35);
  const scores = {
    analytical: Math.max(40, Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5)),
    verbal: Math.max(40, Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5)),
    quantitative: Math.max(40, Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5)),
    spatial: Math.max(40, Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5)),
    memory: Math.max(40, Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5)),
  };
  
  // Generate context-appropriate strengths
  const strengthsByType = {
    science: ["Analytical Thinking", "Problem Solving", "Mathematical Reasoning", "Scientific Method", "Research Skills", "Logical Analysis", "Technical Skills"],
    commerce: ["Financial Analysis", "Business Acumen", "Numerical Skills", "Communication", "Leadership", "Market Understanding", "Strategic Thinking"],
    arts: ["Creative Thinking", "Critical Analysis", "Communication", "Cultural Awareness", "Writing Skills", "Artistic Expression", "Interpersonal Skills"],
    comprehensive: ["Problem Solving", "Critical Thinking", "Communication", "Creativity", "Teamwork", "Leadership", "Adaptability", "Time Management"]
  };
  
  const relevantStrengths = strengthsByType[assessmentType] || strengthsByType.comprehensive;
  const strengthCount = Math.floor(Math.random() * 3) + 3;
  const strengths = [];
  
  for (let i = 0; i < strengthCount; i++) {
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
  
  for (let i = 0; i < interestCount; i++) {
    const interest = relevantInterests[Math.floor(Math.random() * relevantInterests.length)];
    if (!interests.includes(interest)) {
      interests.push(interest);
    }
  }
  
  // Generate realistic questions with varied difficulty
  const questionCount = Math.floor(Math.random() * 15) + 20;
  const questions = [];
  
  for (let i = 0; i < questionCount; i++) {
    const difficulty = ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)];
    questions.push({
      questionId: `q${i+1}`,
      question: `${difficulty} ${assessmentType} question ${i+1}: Sample question testing ${assessmentType} aptitude`,
      selectedOption: `Option ${Math.floor(Math.random() * 4) + 1}`,
      correctOption: `Option ${Math.floor(Math.random() * 4) + 1}`,
      difficulty: difficulty,
      category: assessmentType
    });
  }
  
  return {
    student_name: studentName,
    assessment_type: assessmentType,
    is_guest: isGuest,
    completed_on: completedOn,
    scores: scores,
    strengths: strengths,
    interests: interests,
    questions: questions
  };
}

// Generate enhanced chat messages
function generateChatMessages(count: number) {
  const messages = [];
  
  for (let i = 0; i < count; i++) {
    const pairIndex = Math.floor(Math.random() * Math.min(userQueries.length, aiResponses.length));
    const timestamp = getRandomDate();
    const isGuest = Math.random() > 0.7;
    
    // User message
    messages.push({
      content: userQueries[pairIndex],
      role: "user",
      is_guest: isGuest,
      created_at: timestamp
    });
    
    // AI response with realistic delay
    const responseTimestamp = new Date(new Date(timestamp).getTime() + Math.random() * 300000 + 30000).toISOString();
    messages.push({
      content: aiResponses[pairIndex],
      role: "assistant",
      is_guest: isGuest,
      created_at: responseTimestamp
    });
  }
  
  return messages;
}

Deno.serve(async (req) => {
  console.log("Function called with method:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    console.log("Environment variables check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey
    });
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log("Starting to clear existing demo data...");
    
    // Clear existing demo data first (keep at least one record to avoid errors)
    const { error: clearChatError } = await supabase
      .from("chat_messages")
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
      
    if (clearChatError) {
      console.log("Warning clearing chat messages:", clearChatError.message);
    }
    
    const { error: clearAssessmentError } = await supabase
      .from("assessment_results")
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
      
    if (clearAssessmentError) {
      console.log("Warning clearing assessment results:", clearAssessmentError.message);
    }
    
    console.log("Generating assessment results...");
    
    // Generate and insert enhanced assessment results (50 records)
    const assessmentResults = [];
    for (let i = 0; i < 50; i++) {
      assessmentResults.push(generateAssessmentResult());
    }
    
    console.log("Inserting assessment results...");
    const { error: assessmentError } = await supabase
      .from("assessment_results")
      .insert(assessmentResults);
      
    if (assessmentError) {
      console.error("Error inserting assessment results:", assessmentError);
      throw new Error(`Error inserting assessment results: ${assessmentError.message}`);
    }
    
    console.log("Generating chat messages...");
    
    // Generate and insert enhanced chat messages (80 messages = 40 conversation pairs)
    const chatMessages = generateChatMessages(40);
    
    console.log("Inserting chat messages...");
    const { error: chatError } = await supabase
      .from("chat_messages")
      .insert(chatMessages);
      
    if (chatError) {
      console.error("Error inserting chat messages:", chatError);
      throw new Error(`Error inserting chat messages: ${chatError.message}`);
    }
    
    console.log("Demo data generation completed successfully");
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Enhanced demo data generated successfully with realistic, diverse content",
        assessmentResults: assessmentResults.length,
        chatMessages: chatMessages.length,
        features: [
          "Diverse student names from different regions",
          "Context-appropriate strengths and interests",
          "Realistic score distributions",
          "Varied question difficulties",
          "Real-world user queries and responses"
        ]
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
    
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  }
});
