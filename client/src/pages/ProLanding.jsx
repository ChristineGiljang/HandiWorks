import { useEffect, useState } from "react";
import { db, auth } from "../auth/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const ProLanding = () => {
  const [user, loadingAuth] = useAuthState(auth);
  const [checkingService, setCheckingService] = useState(true);
  const [hasService, setHasService] = useState(null); // null while loading

  useEffect(() => {
    const checkUserService = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "services"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setHasService(!querySnapshot.empty);
      } catch (err) {
        console.error("Error checking user services:", err.message);
        setHasService(false);
      } finally {
        setCheckingService(false);
      }
    };

    if (!loadingAuth && user) {
      checkUserService();
    }
  }, [user, loadingAuth]);

  if (loadingAuth || checkingService) {
    return <div>Loading...</div>; // Optional: Replace with a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return hasService ? (
    <Navigate to="/pro/dashboard" replace />
  ) : (
    <Navigate to="/pro/setup" replace />
  );
};

export default ProLanding;
