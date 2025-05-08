import { useState } from "react";
import Button from "../ui/Button";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../auth/firebase";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const googleLogin = useGoogleLogin();
  const navigate = useNavigate();
  const { user } = useAuth(); // Use the auth context

  // No need for onAuthStateChanged here - we'll use the context instead

  const getUserType = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userType = userData?.userType || "client";
        console.log("✅ User type:", userType);
        return userType;
      } else {
        console.warn("⚠️ User document does not exist. Defaulting to 'client'");
        return "client";
      }
    } catch (error) {
      console.error("🔥 Error fetching user type:", error);
      return "client";
    }
  };

  const handleRedirect = (userType) => {
    console.log("➡️ Redirecting user type:", userType);
    if (userType === "pro") {
      navigate("/pro");
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return; // Prevent multiple submissions

    setLoading(true);
    setIsProcessing(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const userType = await getUserType(uid);
      handleRedirect(userType);
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    if (isProcessing) return; // Prevent multiple clicks

    setLoading(true);
    setIsProcessing(true);

    try {
      // No need to sign out manually first - removed that code

      const result = await googleLogin();

      if (result && result.user) {
        const userType = await getUserType(result.user.uid);
        handleRedirect(userType);
      } else if (result && result.error) {
        console.error("❌ Google login error:", result.error);
        alert("Google login error: " + result.error.message);
      }
    } catch (error) {
      console.error("🔥 Google login error:", error);
      alert("Login failed: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center pt-32 px-6 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white justify-center">
                Login to HandiWorks
              </h1>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                text={loading ? "Logging in..." : "Submit"}
                variant="filledStyles"
                className="w-full py-3"
                disabled={loading || isProcessing}
              />

              <div className="flex items-center gap-2 my-4">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-gray-500 text-sm font-medium">OR</span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition duration-200"
                disabled={loading || isProcessing}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                {loading ? "Logging in..." : "Login with Google"}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
