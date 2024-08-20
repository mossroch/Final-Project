import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./SpeechToTextSummarizer.css";

const SpeechToTextSummarizer: React.FC = () => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [patientName, setPatientName] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!consent) {
      resetTranscript();
    }
  }, [consent]);

  const handleSpeechRecognition = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);

    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Summarize the provided text.",
        },
        { role: "user", content: transcript },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setSummary(result.choices[0].message.content.trim());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Summarizer</h2>
      <div className="form-group">
        <label htmlFor="patientName">Patient Name:</label>
        <input
          type="text"
          id="patientName"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter patient name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="consent">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          Patient Consent Given
        </label>
      </div>
      <div className="button-group">
        <button onClick={handleSpeechRecognition} disabled={!consent}>
          Start Listening
        </button>
        <button onClick={handleStopListening} disabled={!consent}>
          Stop Listening
        </button>
      </div>
      <textarea
        value={transcript}
        placeholder="Your speech will appear here in real-time..."
        rows={10}
        cols={50}
        disabled={!consent}
        readOnly
      />
      <div className="button-group">
        <button
          onClick={handleSummarize}
          disabled={loading || !consent || !transcript}
        >
          Summarize Text
        </button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      <textarea
        value={summary}
        readOnly
        placeholder="The summary will appear here..."
        rows={10}
        cols={50}
        className="summary-box"
      />
    </div>
  );
};

export default SpeechToTextSummarizer;
