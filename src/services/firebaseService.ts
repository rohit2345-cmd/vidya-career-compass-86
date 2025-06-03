
import { supabase } from "@/integrations/supabase/client";

export interface SupabaseAssessmentResult {
  id?: string;
  user_id?: string;
  student_name: string;
  assessment_type: string;
  completed_on: string;
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

export const saveAssessmentResultToSupabase = async (
  result: Omit<SupabaseAssessmentResult, "id" | "user_id">
): Promise<string> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const assessmentData = {
      ...result,
      user_id: user?.id || null,
      is_guest: !user,
      completed_on: new Date(result.completed_on).toISOString()
    };

    const { data, error } = await supabase
      .from('assessment_results')
      .insert(assessmentData)
      .select()
      .single();
    
    if (error) {
      console.error("Error saving assessment result to Supabase:", error);
      throw error;
    }
    
    console.log("Assessment result saved to Supabase with ID:", data.id);
    return data.id;
  } catch (error) {
    console.error("Error saving assessment result to Supabase:", error);
    throw error;
  }
};

export const getUserAssessmentResults = async (): Promise<SupabaseAssessmentResult[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_on', { ascending: false });
    
    if (error) {
      console.error("Error fetching user assessment results:", error);
      return [];
    }
    
    // Type cast the data to match our interface
    const typedResults: SupabaseAssessmentResult[] = (data || []).map(item => ({
      id: item.id,
      user_id: item.user_id,
      student_name: item.student_name,
      assessment_type: item.assessment_type,
      completed_on: item.completed_on,
      questions: Array.isArray(item.questions) ? item.questions as any[] : [],
      scores: typeof item.scores === 'object' && item.scores !== null ? item.scores as Record<string, number> : undefined,
      strengths: Array.isArray(item.strengths) ? item.strengths as string[] : undefined,
      interests: Array.isArray(item.interests) ? item.interests as string[] : undefined
    }));
    
    return typedResults;
  } catch (error) {
    console.error("Error fetching user assessment results:", error);
    return [];
  }
};
