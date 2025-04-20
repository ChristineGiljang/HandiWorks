// import { auth, googleProvider } from "../auth/firebase.js";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { signInWithPopup } from "firebase/auth";
// import axios from "axios";

// export const signUpWithGoogle = async (userType = "client") => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     const payload = {
//       email: user.email,
//       name: user.displayName,
//       uid: user.uid,
//       photo: user.photoURL,
//       userType,
//     };

//     console.log("Payload data:", payload);

//     await axios.post("http://localhost:5000/api/users/google", payload);

//     console.log("User saved to MongoDB");
//   } catch (error) {
//     console.error("Error signing up with Google: ", error.message);
//   }
// };
// export const signUpWithEmail = async (email, password, userType) => {
//   try {
//     // Step 1: Create user in Firebase
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Optional: set a default display name if not set
//     const name = email.split("@")[0]; // Or collect from input if available

//     if (!user.displayName) {
//       await updateProfile(user, { displayName: name });
//     }

//     // Step 2: Send user data to your backend
//     const res = await fetch("http://localhost:5000/api/users/email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: user.email,
//         name: user.displayName || name,
//         uid: user.uid,
//         photo: user.photoURL || "", // can be empty for now
//         userType,
//       }),
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Backend signup failed");
//     }

//     return await res.json();
//   } catch (err) {
//     console.error("Error in signUpWithEmail:", err);
//     throw err;
//   }
// };
