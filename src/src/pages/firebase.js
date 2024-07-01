import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCH5qjs8nhJU4QQwOxqORJJypWGjUvxHgw",
  authDomain: "emotional-intelligence-researc.firebaseapp.com",
  projectId: "emotional-intelligence-researc",
  storageBucket: "emotional-intelligence-researc.appspot.com",
  messagingSenderId: "651453407952",
  appId: "1:651453407952:web:9924e69f90fa66e81eb4d5",
  measurementId: "G-TMK5H39JTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Ensure auth is properly initialized
const storage = getStorage(app);

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

export { auth, storage, signInAnonymousUser };
