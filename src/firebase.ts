import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmCp3pLxfv4KLyJkxFcp0kAA3ndaVAHCE",
  authDomain: "estrelladeloriente-e17c7.firebaseapp.com",
  projectId: "estrelladeloriente-e17c7",
  storageBucket: "estrelladeloriente-e17c7.firebasestorage.app",
  messagingSenderId: "856070580416",
  appId: "1:856070580416:web:defca41675f2fa759ba525",
  measurementId: "G-PH8CHKR95Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
