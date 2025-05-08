import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProSignUpForm from "./components/forms/ProSignUpForm";
import LoginPage from "./pages/LoginPage";
import MultiStepForm from "./components/stepper/MultiStepForm";
import ProLanding from "./pages/ProLanding";
import ProDashboard from "./pages/ProDashboard";
import ServiceList from "./layout/ServiceList";
import CleanerProfile from "./components/BookingFlow/CleanerProfile";
import AddressModal from "./components/booking/AddressModal";
import { useAuth } from "./context/AuthContext"; // Assuming you have an auth context
import ForgotPassword from "./components/forms/ForgotPassword";

// Improved PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Get authentication state from your auth context

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Protected route for professional users
const ProRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth(); // Get auth state and user data

  // Check if user is logged in and has pro role
  return isLoggedIn && user?.userType === "pro" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup/pro" element={<ProSignUpForm />} />
        <Route path="/pro" element={<ProLanding />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/profile/:id" element={<CleanerProfile />} />

        {/* Authentication required routes */}
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <AddressModal />
            </PrivateRoute>
          }
        />
        <Route
          path="/pro/dashboard"
          element={
            <ProRoute>
              <ProDashboard />
            </ProRoute>
          }
        />

        <Route
          path="/pro/setup"
          element={
            <ProRoute>
              <MultiStepForm />
            </ProRoute>
          }
        />
        {/* Catch-all route for non-matching paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
