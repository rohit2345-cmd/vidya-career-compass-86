
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "../config/firebase";

export const registerUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  onAuthStateChange,
};
