// firebase.js (or firebase-config.js)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD3HbZOD5E2XtTXvcNvZIvhuTGE2SIvotI",
  authDomain: "handiworksbooking.firebaseapp.com",
  projectId: "handiworksbooking",
  storageBucket: "handiworksbooking.appspot.com",
  messagingSenderId: "386894309703",
  appId: "1:386894309703:web:acd27b9386ad9bdcec8462",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app); // Firestore Database
const auth = getAuth(app); // Firebase Authentication
const storage = getStorage(app); // Firebase Storage

export { db, auth, storage }; // Export for use in your app
