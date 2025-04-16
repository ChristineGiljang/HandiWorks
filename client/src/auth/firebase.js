import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG_ShCelji1WVrhXq-506Z3whWpMgo1SI",
  authDomain: "handiworks-f630d.firebaseapp.com",
  projectId: "handiworks-f630d",
  storageBucket: "handiworks-f630d.appspot.com",
  messagingSenderId: "27060755686",
  appId: "1:27060755686:web:db08a620cad6881bf52f27",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
