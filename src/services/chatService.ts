import { supabase } from '@/lib/supabase';

export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  assessmentResultId?: string;
  userId?: string;
}

export const saveChatMessage = async (message: ChatMessage) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .insert([{
        content: message.content,
        role: message.role,
        assessment_result_id: message.assessmentResultId,
        user_id: message.userId,
        is_guest: !message.userId
      }]);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error saving chat message:', error);
    return { error };
  }
};

export const getChatHistory = async (userId?: string, assessmentResultId?: string) => {
  try {
    let query = supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (userId) {
      query = query.eq('user_id', userId);
    }
    if (assessmentResultId) {
      query = query.eq('assessment_result_id', assessmentResultId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return { data: null, error };
  }
};