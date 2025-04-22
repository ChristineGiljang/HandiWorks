import React, { useState } from "react";
import Button from "../ui/Button";
import signUpWithEmail from "../../hooks/signUpWithEmail"; // Import the signUpWithEmail function
import { useLocation } from "react-router-dom";
import useGoogleLogin from "../../hooks/useGoogleLogin"; // Assuming you have a custom Google login hook

const SignUpForm = (props) => {
  const { userType = "client" } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const locationUserType = location.state?.userType;
  const finalUserType = locationUserType || userType;

  // Use the custom Google login hook
  const googleLogin = useGoogleLogin();

  const handleGoogleSignUp = async () => {
    console.log("User type from form:", userType);
    const { user, error } = await googleLogin(); // Call the Google login function

    if (user) {
      // Handle any actions after successful login here, like redirecting to dashboard
      console.log("User logged in with Google:", user);
    } else {
      // Handle any error if login fails
      if (error.code === "auth/account-exists-with-different-credential") {
        setError(
          "This email is already associated with a different account. Please use the email/password login method."
        );
      } else {
        setError("An error occurred during Google login. Please try again.");
      }
      console.error("Google login error:", error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      // Call signUpWithEmail directly
      const user = await signUpWithEmail(email, password, finalUserType);
      if (user) {
        console.log("User signed up successfully:", user);
        // Redirect or update UI after successful sign-up
      }
    } catch (err) {
      // Handle Firebase error codes and set custom error messages
      if (err.code === "auth/email-already-in-use") {
        setError(
          "This email is already in use. Please try with a different email."
        );
      } else if (err.code === "auth/weak-password") {
        setError("Your password is too weak. Please use a stronger password.");
      } else {
        setError("An error occurred during sign-up. Please try again.");
      }
      console.error("Sign-up error:", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleFormSubmit}
            >
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="filledStyles"
                text={isSubmitting ? "Creating..." : "Create an Account"}
                className="w-full py-3"
                disabled={isSubmitting}
              />

              <div className="flex items-center gap-2 my-4">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-gray-500 text-sm font-medium">OR</span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              {/* Google Sign Up Button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
