
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  setDoc,
  query, 
  orderBy, 
  where,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { db } from "../config/firebase";
import { getCurrentUser } from "./firebaseAuthService";

// Types for Firebase collections
export interface FirebaseChatMessage {
  id?: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Timestamp;
  sessionId: string;
  userId: string;
}

export interface FirebaseAssessmentResult {
  id?: string;
  studentName: string;
  assessmentType: string;
  completedOn: Timestamp;
  questions: {
    questionId: string;
    question: string;
    selectedOption: string;
    correctOption?: string;
  }[];
  scores?: Record<string, number>;
  strengths?: string[];
  interests?: string[];
  userId: string;
}

// Generate session ID
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Chat message operations
export const saveChatMessage = async (content: string, role: "user" | "assistant"): Promise<FirebaseChatMessage | null> => {
  const user = getCurrentUser();
  if (!user) {
    console.log("No authenticated user, saving to localStorage as fallback");
    return null;
  }

  try {
    const sessionId = localStorage.getItem("current_session_id") || generateSessionId();
    localStorage.setItem("current_session_id", sessionId);

    const messageData: Omit<FirebaseChatMessage, "id"> = {
      content,
      role,
      timestamp: Timestamp.now(),
      sessionId,
      userId: user.uid
    };

    const docRef = await addDoc(collection(db, "chatMessages"), messageData);
    console.log(`💾 Saved ${role} message to Firebase:`, docRef.id);
    
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error("Error saving chat message to Firebase:", error);
    return null;
  }
};

export const getChatMessages = async (): Promise<FirebaseChatMessage[]> => {
  const user = getCurrentUser();
  if (!user) {
    console.log("No authenticated user for getting chat messages");
    return [];
  }

  try {
    const q = query(
      collection(db, "chatMessages"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    const messages: FirebaseChatMessage[] = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as FirebaseChatMessage);
    });
    
    console.log(`📖 Retrieved ${messages.length} messages from Firebase`);
    return messages;
  } catch (error) {
    console.error("Error getting chat messages from Firebase:", error);
    return [];
  }
};

export const clearChatHistory = async (): Promise<void> => {
  const user = getCurrentUser();
  if (!user) return;

  try {
    const q = query(
      collection(db, "chatMessages"),
      where("userId", "==", user.uid)
    );
    
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    
    await Promise.all(deletePromises);
    localStorage.removeItem("current_session_id");
    console.log("🗑️ Cleared all chat history from Firebase");
  } catch (error) {
    console.error("Error clearing chat history:", error);
  }
};

// Assessment result operations
export const saveAssessmentResult = async (result: Omit<FirebaseAssessmentResult, "id" | "userId">): Promise<FirebaseAssessmentResult | null> => {
  const user = getCurrentUser();
  if (!user) {
    console.log("No authenticated user, cannot save assessment result");
    return null;
  }

  try {
    const resultData: Omit<FirebaseAssessmentResult, "id"> = {
      ...result,
      completedOn: Timestamp.now(),
      userId: user.uid
    };

    const docRef = await addDoc(collection(db, "assessmentResults"), resultData);
    console.log("💾 Saved assessment result to Firebase:", docRef.id);
    
    return { id: docRef.id, ...resultData };
  } catch (error) {
    console.error("Error saving assessment result to Firebase:", error);
    return null;
  }
};

export const getAssessmentResults = async (): Promise<FirebaseAssessmentResult[]> => {
  const user = getCurrentUser();
  if (!user) {
    console.log("No authenticated user for getting assessment results");
    return [];
  }

  try {
    const q = query(
      collection(db, "assessmentResults"),
      where("userId", "==", user.uid),
      orderBy("completedOn", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const results: FirebaseAssessmentResult[] = [];
    
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as FirebaseAssessmentResult);
    });
    
    console.log(`📖 Retrieved ${results.length} assessment results from Firebase`);
    return results;
  } catch (error) {
    console.error("Error getting assessment results from Firebase:", error);
    return [];
  }
};

export const getLatestAssessmentResult = async (): Promise<FirebaseAssessmentResult | null> => {
  const user = getCurrentUser();
  if (!user) {
    console.log("No authenticated user for getting latest assessment result");
    return null;
  }

  try {
    const q = query(
      collection(db, "assessmentResults"),
      where("userId", "==", user.uid),
      orderBy("completedOn", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("📭 No assessment results found in Firebase");
      return null;
    }

    const latestDoc = querySnapshot.docs[0];
    const latest = { id: latestDoc.id, ...latestDoc.data() } as FirebaseAssessmentResult;
    
    console.log("📅 Latest assessment result:", latest);
    return latest;
  } catch (error) {
    console.error("Error getting latest assessment result:", error);
    return null;
  }
};

export default {
  saveChatMessage,
  getChatMessages,
  clearChatHistory,
  saveAssessmentResult,
  getAssessmentResults,
  getLatestAssessmentResult,
};
