import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

const signUpWithEmail = async (email, password, userType = "client") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // ✅ Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      userType, // from the form: 'cleaner' or 'client'
      createdAt: serverTimestamp(),
      hasBusinessSetup: false,
    });

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default signUpWithEmail;
