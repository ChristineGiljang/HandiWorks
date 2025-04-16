import { useState } from "react";
import { signUpWithEmail } from "../utils/auth"; // Adjust the path to where your auth function is located

const useSignUp = () => {
  const [error, setError] = useState(""); // Stores error messages
  const [loading, setLoading] = useState(false); // Track loading state for form submission

  const handleSubmit = async (
    email,
    password,
    confirmPassword,
    userType = "client"
  ) => {
    setError(""); // Reset the error before submitting the form
    setLoading(true); // Start loading

    if (password !== confirmPassword) {
      setError("Passwords do not match!"); // Early exit if passwords don't match
      setLoading(false);
      return;
    }

    try {
      const user = await signUpWithEmail(email, password); // Sign up with email/password

      console.log("User created:", user);

      // Send user data to backend API to store in MongoDB
      const response = await fetch("http://127.0.0.1:5000/api/users/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          userType,
          // Add more user data here if needed
        }),
      });

      if (!response.ok) {
        // Check if the response is OK (200-299 range)
        throw new Error("Failed to save user data to backend.");
      }

      const data = await response.json(); // Assuming the response is valid JSON
      console.log("User saved in MongoDB:", data);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect or perform any other action after successful signup
      // Example: history.push("/dashboard");
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message || "Failed to create account"); // Set error message from catch block
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return {
    handleSubmit,
    error,
    loading, // Expose loading state to manage UI feedback (like disabling button)
  };
};

export default useSignUp;
