import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../auth/firebase"; // Adjust the import path as necessary

const provider = new GoogleAuthProvider();

/**
 * Custom hook for handling Google login
 * @returns {Function} Function to trigger Google login
 */
const useGoogleLogin = () => {
  const [error, setError] = useState(null);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // If user doesn't exist in our database, add them
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          userType: "client", // Default to client
          createdAt: serverTimestamp(),
        });
      }

      return { user };
    } catch (error) {
      console.error("Google login error:", error);
      setError(error);
      return { error };
    }
  };

  return googleLogin;
};

export default useGoogleLogin;
