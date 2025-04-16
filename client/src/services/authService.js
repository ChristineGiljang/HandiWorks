import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase.js";

export const handleSignup = async (email, password) => {
  try {
    // Create user using Firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Return the user object if successful
  } catch (error) {
    throw new Error(error.message); // Throw error if signup fails
  }
};
