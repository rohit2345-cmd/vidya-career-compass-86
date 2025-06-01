
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getCurrentUser } from "./authService";

export interface FirebaseAssessmentResult {
  id?: string;
  userId: string;
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
}

export const saveAssessmentResultToFirebase = async (
  result: Omit<FirebaseAssessmentResult, "id" | "userId">
): Promise<string> => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("User must be authenticated to save to Firebase");
  }

  try {
    const docRef = await addDoc(collection(db, "assessmentResults"), {
      ...result,
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
    
    console.log("Assessment result saved to Firebase with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving assessment result to Firebase:", error);
    throw error;
  }
};

export const getUserAssessmentResults = async (): Promise<FirebaseAssessmentResult[]> => {
  const user = getCurrentUser();
  if (!user) {
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
      results.push({
        id: doc.id,
        ...doc.data()
      } as FirebaseAssessmentResult);
    });
    
    return results;
  } catch (error) {
    console.error("Error fetching user assessment results:", error);
    return [];
  }
};
