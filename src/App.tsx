import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PatientNotes from "./components/Top";
import ComplianceSection from "./components/ComplianceSection";
import TestimonialsGrid from "./components/TestimonialGrid";
import SpeechToTextSummarizer from "./components/SpeechToTextSummarizer";
import ThemeSwitcher from "./components/ThemeSwitcher"; // Import the ThemeSwitcher

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeSwitcher /> {/* Add the ThemeSwitcher component */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <PatientNotes />
                <ComplianceSection />
                <TestimonialsGrid />
              </div>
            }
          />
          <Route path="/summarizer" element={<SpeechToTextSummarizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
