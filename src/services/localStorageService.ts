
/**
 * Local Storage Service for storing chat history and assessment results
 * This mimics a database by using browser localStorage
 */

// Types for our local storage data
export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  sessionId: string;
}

export interface AssessmentResultStorage {
  id: string;
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
  timestamp: string;
}

export interface AdminUser {
  username: string;
  password_hash: string;
}

// Generate a unique ID for items
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Generate a session ID for grouping related chat messages
const generateSessionId = () => {
  let sessionId = localStorage.getItem("current_session_id");
  if (!sessionId) {
    sessionId = generateId();
    localStorage.setItem("current_session_id", sessionId);
  }
  return sessionId;
};

// Chat history methods
export const saveChatMessage = (content: string, role: "user" | "assistant"): ChatMessage => {
  const messages = getChatMessages();
  const sessionId = generateSessionId();
  
  const newMessage: ChatMessage = {
    id: generateId(),
    content,
    role,
    timestamp: new Date().toISOString(),
    sessionId
  };
  
  messages.push(newMessage);
  localStorage.setItem("chat_messages", JSON.stringify(messages));
  
  return newMessage;
};

export const getChatMessages = (): ChatMessage[] => {
  const messagesStr = localStorage.getItem("chat_messages");
  return messagesStr ? JSON.parse(messagesStr) : [];
};

export const getChatMessagesBySession = (sessionId: string): ChatMessage[] => {
  const messages = getChatMessages();
  return messages.filter(msg => msg.sessionId === sessionId);
};

export const clearChatHistory = () => {
  localStorage.removeItem("chat_messages");
  localStorage.removeItem("current_session_id");
};

// Assessment results methods
export const saveAssessmentResult = (result: Omit<AssessmentResultStorage, "id" | "timestamp">): AssessmentResultStorage => {
  const results = getAssessmentResults();
  
  const newResult: AssessmentResultStorage = {
    ...result,
    id: generateId(),
    timestamp: new Date().toISOString()
  };
  
  results.push(newResult);
  localStorage.setItem("assessment_results", JSON.stringify(results));
  
  return newResult;
};

export const getAssessmentResults = (): AssessmentResultStorage[] => {
  const resultsStr = localStorage.getItem("assessment_results");
  return resultsStr ? JSON.parse(resultsStr) : [];
};

export const getAssessmentResultById = (id: string): AssessmentResultStorage | undefined => {
  const results = getAssessmentResults();
  return results.find(result => result.id === id);
};

export const getLatestAssessmentResult = (): AssessmentResultStorage | undefined => {
  const results = getAssessmentResults();
  if (results.length === 0) return undefined;
  
  // Sort by timestamp (descending) and return the first item
  return [...results].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];
};

// Admin user methods
export const getAdminUsers = (): AdminUser[] => {
  const usersStr = localStorage.getItem("admin_users");
  if (!usersStr) {
    // Initialize with default admin user if none exists
    const defaultAdmin: AdminUser = { username: "admin", password_hash: "admin@123" };
    localStorage.setItem("admin_users", JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  }
  return JSON.parse(usersStr);
};

export const verifyAdminLogin = (username: string, password: string): boolean => {
  const users = getAdminUsers();
  const user = users.find(u => u.username === username);
  
  // Simple password verification (in a real app, use proper hashing)
  if (user && user.password_hash === password) {
    localStorage.setItem("admin_auth", "true");
    localStorage.setItem("admin_username", username);
    return true;
  }
  
  return false;
};

export default {
  saveChatMessage,
  getChatMessages,
  getChatMessagesBySession,
  clearChatHistory,
  saveAssessmentResult,
  getAssessmentResults,
  getAssessmentResultById,
  getLatestAssessmentResult,
  generateSessionId,
  getAdminUsers,
  verifyAdminLogin
};
