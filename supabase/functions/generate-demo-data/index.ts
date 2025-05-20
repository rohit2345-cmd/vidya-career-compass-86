
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Dummy data for assessment results
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
  "How important are board exam marks for college admissions?",
  "What are good commerce colleges in Mumbai?",
  "How to prepare for CAT exam?",
  "Is BBA a good option after 12th?",
  "Career options after BA in Economics?",
  "What skills do I need for digital marketing?"
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
  "Board exam marks remain important for college admissions, especially for top institutions like Delhi University. Many colleges have high cutoffs for popular courses. However, entrance exams like JEE, NEET, or CLAT often carry more weight for specialized programs. Balance your preparation accordingly.",
  "Top commerce colleges in Mumbai include HR College, NM College, Narsee Monjee, St. Xavier's, and Sydenham. Your assessment shows strong aptitude in numerical and analytical thinking, which would serve you well in these institutions. Focus on maintaining high academic scores for admission.",
  "For CAT preparation, focus on quantitative aptitude, verbal ability, logical reasoning, and data interpretation. Your assessment shows strengths in analytical thinking, which is beneficial. Start preparation at least 6-8 months before the exam and take regular mock tests to track progress.",
  "BBA is a versatile option after 12th commerce. It provides a foundation in business management and opens doors to MBA programs later. Your assessment shows strengths in interpersonal and analytical skills, which align well with management roles. Consider institutions with strong industry connections.",
  "With a BA in Economics, you could pursue careers in economic analysis, consulting, banking, public policy, or further studies like MA Economics or MBA. Your assessment shows strong analytical and quantitative skills, which are valuable in these fields. Consider specializing in areas like econometrics or development economics.",
  "For digital marketing, develop skills in SEO, content marketing, social media management, email marketing, analytics, and basic graphic design. Your assessment shows creative thinking and communication skills, which are essential in this field. Consider certifications from Google or HubSpot to enhance your credentials."
];

// Generate random date within the past 3 months
function getRandomDate() {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  
  return new Date(
    threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  ).toISOString();
}

// Generate random assessment result
function generateAssessmentResult() {
  const studentName = studentNames[Math.floor(Math.random() * studentNames.length)];
  const assessmentType = assessmentTypes[Math.floor(Math.random() * assessmentTypes.length)];
  const isGuest = Math.random() > 0.6;
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

// Generate random chat messages
function generateChatMessages(count: number) {
  const messages = [];
  const isGuest = Math.random() > 0.6;
  
  for (let i = 0; i < count; i++) {
    const pairIndex = Math.floor(Math.random() * userQueries.length);
    const timestamp = getRandomDate();
    
    // User message
    messages.push({
      content: userQueries[pairIndex],
      role: "user",
      is_guest: isGuest,
      created_at: timestamp
    });
    
    // AI response
    const responseTimestamp = new Date(new Date(timestamp).getTime() + 2000).toISOString();
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Generate and insert admin user if it doesn't exist
    const { data: existingAdmins } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", "admin");
      
    if (!existingAdmins || existingAdmins.length === 0) {
      await supabase
        .from("admin_users")
        .insert({
          username: "admin",
          password_hash: "admin@123"
        });
    }
    
    // Generate and insert assessment results
    const assessmentResults = [];
    for (let i = 0; i < 15; i++) {
      assessmentResults.push(generateAssessmentResult());
    }
    
    const { error: assessmentError } = await supabase
      .from("assessment_results")
      .insert(assessmentResults);
      
    if (assessmentError) throw new Error(`Error inserting assessment results: ${assessmentError.message}`);
    
    // Generate and insert chat messages
    const chatMessages = generateChatMessages(20);
    
    const { error: chatError } = await supabase
      .from("chat_messages")
      .insert(chatMessages);
      
    if (chatError) throw new Error(`Error inserting chat messages: ${chatError.message}`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Demo data generated successfully",
        assessmentResults: assessmentResults.length,
        chatMessages: chatMessages.length
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
    return new Response(
      JSON.stringify({ error: error.message }),
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
