import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHPf2oE7wYYt6o6-xkfRcFpS5GxP-XoPI",
  authDomain: "ei-and-cc.firebaseapp.com",
  projectId: "ei-and-cc",
  storageBucket: "ei-and-cc.appspot.com",
  messagingSenderId: "33848295097",
  appId: "1:33848295097:web:cc039fab1a5ea5c1b5e568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Ensure auth is properly initialized
const storage = getStorage(app);
const db = getFirestore(app);

// Function to sign in anonymously (optional)
const signInAnonymousUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log("Anonymous user signed in:", user.uid);
    return user;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error; // Throw error for handling in your component
  }
};

export { auth, storage, signInAnonymousUser, db };
