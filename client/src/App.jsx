import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CleanerForm from "./components/CleanerForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CleanerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
