import React from "react";
import { useNavigate } from "react-router-dom";
import "./Top.css";
import image from "../assets/all.png"; // Update the path to your image

const PatientNotes: React.FC = () => {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate("/summarizer");
  };

  return (
    <div className="patient-notes-container">
      <header className="patient-notes-header">
        <h1>Patient Notes</h1>
      </header>

      <main className="patient-notes-main">
        <div className="patient-notes-content">
          <h2>
            Let AI write your clinical notes so you can focus on your patients
          </h2>
          <p>
            PatientNotes is a clinical note-taking tool that uses AI to write
            clinical notes, patient summaries, and medical letters. It is
            designed to save you time and improve the quality of your notes.
            With a focus on privacy and security, PatientNotes is a safe and
            secure way to start leveraging AI in your work today.
          </p>
          <button className="trial-button" onClick={handleTryNowClick}>
            Try Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default PatientNotes;
