import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProSignUpForm from "./components/forms/ProSignUpForm";
import LoginPage from "./pages/LoginPage";
import MultiStepForm from "./components/stepper/MultiStepForm";
import ProLanding from "./pages/ProLanding";
import ProDashboard from "./pages/ProDashboard";
import ServiceList from "./layout/ServiceList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/pro" element={<ProSignUpForm />} />
        <Route path="/pro/setup" element={<MultiStepForm />} />
        <Route path="/pro" element={<ProLanding />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/pro/dashboard" element={<ProDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
