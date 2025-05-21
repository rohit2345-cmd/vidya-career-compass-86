import { supabase } from '@/lib/supabase';

export interface AssessmentResult {
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

export const saveAssessmentResult = async (result: AssessmentResult, userId?: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('assessment_results')
      .insert([{
        user_id: userId,
        student_name: result.studentName,
        assessment_type: result.assessmentType,
        completed_on: result.completedOn,
        questions: result.questions,
        scores: result.scores,
        strengths: result.strengths,
        interests: result.interests,
        is_guest: !userId
      }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to save assessment result:', error);
    return false;
  }
};

export const getAssessmentResults = async (userId?: string) => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('user_id', userId)
      .order('completed_on', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching assessment results:', error);
    return { data: null, error };
  }
};