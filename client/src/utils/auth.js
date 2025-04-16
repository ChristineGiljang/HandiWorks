import { auth, googleProvider } from "../auth/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

export const signUpWithGoogle = async (userType = "client") => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const payload = {
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      photo: user.photoURL,
      userType,
    };

    console.log("Payload data:", payload);

    await axios.post("http://localhost:5000/api/users/google", payload);

    console.log("User saved to MongoDB");
  } catch (error) {
    console.error("Error signing up with Google: ", error.message);
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
