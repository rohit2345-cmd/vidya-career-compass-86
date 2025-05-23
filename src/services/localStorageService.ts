
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

// Chat history methods with enhanced logging
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
  
  console.log(`💾 Saved ${role} message to localStorage:`, newMessage);
  console.log(`📊 Total messages in storage: ${messages.length}`);
  
  return newMessage;
};

export const getChatMessages = (): ChatMessage[] => {
  const messagesStr = localStorage.getItem("chat_messages");
  const messages = messagesStr ? JSON.parse(messagesStr) : [];
  console.log(`📖 Retrieved ${messages.length} messages from localStorage`);
  return messages;
};

export const getChatMessagesBySession = (sessionId: string): ChatMessage[] => {
  const messages = getChatMessages();
  const sessionMessages = messages.filter(msg => msg.sessionId === sessionId);
  console.log(`📂 Found ${sessionMessages.length} messages for session: ${sessionId}`);
  return sessionMessages;
};

export const clearChatHistory = () => {
  localStorage.removeItem("chat_messages");
  localStorage.removeItem("current_session_id");
  console.log("🗑️ Cleared all chat history from localStorage");
};

// Assessment results methods with enhanced logging
export const saveAssessmentResult = (result: Omit<AssessmentResultStorage, "id" | "timestamp">): AssessmentResultStorage => {
  const results = getAssessmentResults();
  
  const newResult: AssessmentResultStorage = {
    ...result,
    id: generateId(),
    timestamp: new Date().toISOString()
  };
  
  results.push(newResult);
  localStorage.setItem("assessment_results", JSON.stringify(results));
  
  console.log("💾 Saved assessment result to localStorage:", newResult);
  console.log(`📊 Total assessment results in storage: ${results.length}`);
  
  return newResult;
};

export const getAssessmentResults = (): AssessmentResultStorage[] => {
  const resultsStr = localStorage.getItem("assessment_results");
  const results = resultsStr ? JSON.parse(resultsStr) : [];
  console.log(`📖 Retrieved ${results.length} assessment results from localStorage`);
  return results;
};

export const getAssessmentResultById = (id: string): AssessmentResultStorage | undefined => {
  const results = getAssessmentResults();
  const result = results.find(result => result.id === id);
  console.log(`🔍 Looking for assessment result with ID: ${id}, found:`, !!result);
  return result;
};

export const getLatestAssessmentResult = (): AssessmentResultStorage | undefined => {
  const results = getAssessmentResults();
  if (results.length === 0) {
    console.log("📭 No assessment results found in localStorage");
    return undefined;
  }
  
  const latest = [...results].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];
  
  console.log("📅 Latest assessment result:", latest);
  return latest;
};

// Admin user methods with enhanced logging
export const getAdminUsers = (): AdminUser[] => {
  const usersStr = localStorage.getItem("admin_users");
  if (!usersStr) {
    const defaultAdmin: AdminUser = { username: "admin", password_hash: "admin@123" };
    localStorage.setItem("admin_users", JSON.stringify([defaultAdmin]));
    console.log("👑 Initialized default admin user in localStorage");
    return [defaultAdmin];
  }
  const users = JSON.parse(usersStr);
  console.log(`👥 Retrieved ${users.length} admin users from localStorage`);
  return users;
};

export const verifyAdminLogin = (username: string, password: string): boolean => {
  const users = getAdminUsers();
  const user = users.find(u => u.username === username);
  
  if (user && user.password_hash === password) {
    localStorage.setItem("admin_auth", "true");
    localStorage.setItem("admin_username", username);
    console.log(`✅ Admin login successful for user: ${username}`);
    return true;
  }
  
  console.log(`❌ Admin login failed for user: ${username}`);
  return false;
};

// Debug function to check localStorage status
export const getStorageStatus = () => {
  const chatMessages = getChatMessages();
  const assessmentResults = getAssessmentResults();
  const adminUsers = getAdminUsers();
  
  const status = {
    chatMessages: chatMessages.length,
    assessmentResults: assessmentResults.length,
    adminUsers: adminUsers.length,
    currentSession: localStorage.getItem("current_session_id"),
    adminAuth: localStorage.getItem("admin_auth"),
    storageSize: JSON.stringify(localStorage).length
  };
  
  console.log("📊 localStorage Status:", status);
  return status;
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
  verifyAdminLogin,
  getStorageStatus
};
