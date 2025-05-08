import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../auth/firebase";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    // Reset states
    setError(null);
    setMessage(null);
    setIsProcessing(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      // Clear the email field after successful submission
      setEmail("");
    } catch (error) {
      console.error("Error sending password reset email:", error);

      // Handle different error codes with user-friendly messages
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send reset email. " + error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center pt-32 px-6 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Your Password
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            {message && (
              <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                {message}
              </div>
            )}

            {error && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                {error}
              </div>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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

              <Button
                type="submit"
                text={isProcessing ? "Sending..." : "Reset Password"}
                variant="filledStyles"
                className="w-full py-3"
                disabled={isProcessing}
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
