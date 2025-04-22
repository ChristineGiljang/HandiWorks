import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../auth/firebase";
import { doc, getDoc, setDoc, enableNetwork } from "firebase/firestore";

const useGoogleLogin = () => {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await enableNetwork(db); // ensure Firestore is online

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          userType: "client",
        });
      }

      console.log("✅ Google Login Success:", user);
      return { user, error: null };
    } catch (error) {
      console.error("❌ Google Login Error:", error.message);
      return { user: null, error };
    }
  };

  return login;
};

export default useGoogleLogin;
