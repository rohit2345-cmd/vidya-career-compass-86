
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC42iutGPoTEK6xA4jzfPJTbjicTffzN0k",
  authDomain: "major-project-6a256.firebaseapp.com",
  projectId: "major-project-6a256",
  storageBucket: "major-project-6a256.firebasestorage.app",
  messagingSenderId: "1090104512156",
  appId: "1:1090104512156:web:c912842c1b68ffb25ee759",
  measurementId: "G-J3DL1CP5G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
