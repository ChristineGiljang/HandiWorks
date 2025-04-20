import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";

const useGoogleLogin = () => {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Login success:", user);
      return { user, error: null };
    } catch (error) {
      console.error("Google Login Error:", error.message);
      return { user: null, error };
    }
  };

  return login;
};

export default useGoogleLogin;
