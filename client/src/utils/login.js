import { auth } from "../auth/firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const res = await fetch("http://localhost:5000/api/users/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
        userType: "client", // <-- Add this!
      }),
    });

    const data = await res.json();
    console.log("Google Login Success:", data);
  } catch (err) {
    console.error("Google Login Error:", err);
  }
};
