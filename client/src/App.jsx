import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/navbar/NavBar";
import HomePage from "./pages/HomePage";
import SignUpForm from "./components/forms/SignUpForm";
import ServiceCard from "./components/cards/ServiceCard";
import ServiceList from "./layout/ServiceList";
import SignUpPage from "./pages/SignUpPage";
import BusinessForm from "./components/forms/BusinessForm";
import WhyJoin from "./components/sections/WhyJoin";
import ProSignUpForm from "./components/forms/ProSignUpForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/pro" element={<ProSignUpForm />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
