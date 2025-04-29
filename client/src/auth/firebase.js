// firebase.js (or firebase-config.js)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAZ_xmTYFsL56F6ysj32RIAvSEiz5Gkwo8",
  authDomain: "handiworks-f3a84.firebaseapp.com",
  projectId: "handiworks-f3a84",
  storageBucket: "handiworks-f3a84.appspot.com",
  messagingSenderId: "328307279846",
  appId: "1:328307279846:web:b3f7078447b5934fb1b827",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app); // Firestore Database
const auth = getAuth(app); // Firebase Authentication
const storage = getStorage(app); // Firebase Storage
const googleProvider = new GoogleAuthProvider(); // Google Auth Provider

export { db, auth, storage, googleProvider }; // Export for use in your app
