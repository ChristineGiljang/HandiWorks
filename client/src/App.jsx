import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProSignUpForm from "./components/forms/ProSignUpForm";
import LoginPage from "./pages/LoginPage";
import MultiStepForm from "./components/stepper/MultiStepForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/pro" element={<ProSignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
