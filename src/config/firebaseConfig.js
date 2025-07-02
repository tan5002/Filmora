import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvNZwEUThjcUQ-w-5cihq6FpQkTbf-ahk",
  authDomain: "filmore-d4a9a.firebaseapp.com",
  projectId: "filmore-d4a9a",
  storageBucket: "filmore-d4a9a.firebasestorage.app",
  messagingSenderId: "388339799077",
  appId: "1:388339799077:web:5c830ced2e4be558ae9bcc",
  measurementId: "G-QSK30GC4PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();