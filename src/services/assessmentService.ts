
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { supabase } from "@/integrations/supabase/client";

interface AssessmentResult {
  studentName: string;
  assessmentType: string;
  completedOn: string;
  questions: {
    questionId: string;
    question: string;
    selectedOption: string;
    correctOption?: string;
  }[];
  scores?: Record<string, number>;
  strengths?: string[];
  interests?: string[];
  userId?: string | null;
  isGuest?: boolean;
}

// Save assessment result to Supabase database
export const saveAssessmentResult = async (result: AssessmentResult): Promise<boolean> => {
  try {
    // Prepare the data for saving
    const { userId, isGuest = false, ...resultData } = result;
    
    // Insert into the assessment_results table
    const { error } = await supabase
      .from('assessment_results')
      .insert({
        user_id: userId || null,
        student_name: resultData.studentName,
        assessment_type: resultData.assessmentType,
        completed_on: resultData.completedOn,
        questions: resultData.questions,
        scores: resultData.scores || null,
        strengths: resultData.strengths || null,
        interests: resultData.interests || null,
        is_guest: isGuest
      });
    
    if (error) {
      console.error("Error saving assessment result:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to save assessment result:", error);
    return false;
  }
};

// Get user's assessment results
export const getUserAssessmentResults = async (userId: string | null, isGuest: boolean = false) => {
  try {
    let query = supabase
      .from('assessment_results')
      .select('*')
      .order('completed_on', { ascending: false });
    
    // If user is logged in, filter by user_id, otherwise if user is guest, get only guest results
    if (userId) {
      query = query.eq('user_id', userId);
    } else if (isGuest) {
      query = query.eq('is_guest', true);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Failed to fetch assessment results:", error);
    return [];
  }
};

// Generate PDF from assessment results
export const generateResultsPDF = (result: AssessmentResult): Blob => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text("Assessment Results", 105, 15, { align: "center" });
  
  // Add student info
  doc.setFontSize(12);
  doc.text(`Student Name: ${result.studentName}`, 20, 30);
  doc.text(`Assessment Type: ${result.assessmentType}`, 20, 40);
  doc.text(`Completed On: ${result.completedOn}`, 20, 50);
  
  // Add scores if available
  if (result.scores && Object.keys(result.scores).length > 0) {
    doc.setFontSize(16);
    doc.text("Scores", 20, 70);
    
    const scoresData = Object.entries(result.scores).map(([category, score]) => [
      category,
      `${score}%`,
    ]);
    
    (doc as any).autoTable({
      startY: 75,
      head: [["Category", "Score"]],
      body: scoresData,
    });
  }
  
  // Add questions and answers
  const lastY = (doc as any).lastAutoTable?.finalY || 120;
  doc.setFontSize(16);
  doc.text("Questions & Answers", 20, lastY + 10);
  
  const questionData = result.questions.map((q, index) => [
    `Q${index + 1}`,
    q.question,
    q.selectedOption,
  ]);
  
  (doc as any).autoTable({
    startY: lastY + 15,
    head: [["#", "Question", "Your Answer"]],
    body: questionData,
  });
  
  return doc.output("blob");
};

export default {
  saveAssessmentResult,
  generateResultsPDF,
  getUserAssessmentResults
};
