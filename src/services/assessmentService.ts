
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
}

// This function saves results to Supabase
export const saveAssessmentResult = async (result: AssessmentResult): Promise<boolean> => {
  try {
    console.log("Saving assessment result:", result);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    // Prepare the data for Supabase
    const assessmentData = {
      student_name: result.studentName,
      assessment_type: result.assessmentType,
      completed_on: new Date(result.completedOn).toISOString(),
      questions: result.questions,
      scores: result.scores || null,
      strengths: result.strengths || null,
      interests: result.interests || null,
      user_id: user?.id || null,
      is_guest: !user
    };
    
    const { error } = await supabase
      .from('assessment_results')
      .insert(assessmentData);
    
    if (error) {
      console.error("Error saving to Supabase:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to save assessment result:", error);
    return false;
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
  const lastY = (doc as any).lastAutoTable.finalY || 120;
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
};
