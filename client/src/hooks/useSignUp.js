import { useState } from "react";
import { signUpWithEmail } from "../utils/signin";

const useSignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    email,
    password,
    confirmPassword,
    userType = "client"
  ) => {
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password, userType);

      console.log("User created and saved to MongoDB:", user);

      localStorage.setItem("user", JSON.stringify(user));

      // Optional: redirect or other actions
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    error,
    loading,
  };
};

export default useSignUp;
