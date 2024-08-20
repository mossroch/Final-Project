import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Delete from "../assets/hipaa.svg";

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Check if the browser supports the Web Speech API
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
    }
    fetchLocalStorage();
  }, [browserSupportsSpeechRecognition]);

  const fetchLocalStorage = () => {
    const result = localStorage.getItem("summary");
    if (result) {
      setData(JSON.parse(result).reverse());
    }
  };

  const handlesubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        prompt: value + `\n\nTl;dr`,
        temperature: 0.1,
        max_tokens: Math.floor(value.length / 2),
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.5,
        stop: ['"""'],
      }),
    };

    fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      requestOptions
    )
      .then((response) => response.json())
      .then((dt) => {
        const text = dt.choices[0].text;
        setSubmitting(false);
        const newData = data.length > 0 ? [...data, text] : [text];
        localStorage.setItem("summary", JSON.stringify(newData));
        setData(newData);
      })
      .catch((error) => {
        setSubmitting(false);
        console.error(error);
      });
  };

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt).then(() => {
      setIsCopy(true);
      setTimeout(() => setIsCopy(false), 1500);
    });
  };

  const handleDelete = (txt: string) => {
    const filtered = data.filter((d) => d !== txt);
    setData(filtered);
    localStorage.setItem("summary", JSON.stringify(filtered));
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setValue(transcript); // Allow editing after recording
  };

  return (
    <div className="w-full bg-[#0f172a] h-full min-h-[100vh] py-4 px-4 md:px-20">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center w-full h-10 px-5 2xl:px-40">
          <h3 className="cursor-pointer text-3xl font-bold text-cyan-600">
            Summary!
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 p-4">
          <h1 className="text-3xl text-white text-center leading-10 font-semibold">
            Summarizer with
            <br />
            <span className="text-5xl font-bold text-cyan-500">OpenAI GPT</span>
          </h1>
          <p className="mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl">
            Simply upload your document and get a quick summary using OpenAI GPT
            Summarizer
          </p>
        </div>

        <div className="flex flex-col w-full items-center justify-center mt-5">
          <textarea
            placeholder="Paste or speak content here ..."
            rows={6}
            value={value}
            className="block w-full md:w-[650px] rounded-md border border-slate-700 bg-slate-800 p-2 text-sm shadow-lg font-medium text-white focus:border-gray-500 focus:outline-none focus:ring-0"
            onChange={(e) => setValue(e.target.value)}
          ></textarea>

          {value.length > 0 &&
            (submitting ? (
              <p className="text-md text-cyan-500 mt-5">Please wait ....</p>
            ) : (
              <button
                className="mt-5 bg-blue-500 px-5 py-2 text-white text-md cursor-pointer rounded-md"
                onClick={handlesubmit}
              >
                Submit
              </button>
            ))}

          {!submitting && (
            <div className="mt-5">
              <button
                className="mr-2 bg-green-500 px-5 py-2 text-white text-md cursor-pointer rounded-md"
                onClick={startListening}
              >
                Start Listening
              </button>
              <button
                className="bg-red-500 px-5 py-2 text-white text-md cursor-pointer rounded-md"
                onClick={stopListening}
              >
                Stop Listening
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full mt-10 flex flex-col gap-5 shadow-md items-center justify-center">
        {data.length > 0 && (
          <>
            <p className="text-white font-semibold text-lg">Summary History</p>
            {data.map((d, index) => (
              <div
                key={index}
                className="max-w-2xl bg-slate-800 p-3 rounded-md"
              >
                <p className="text-gray-400 text-lg">{d}</p>
                <div className="flex gap-5 items-center justify-end mt-2">
                  <p
                    className="text-gray-500 font-semibold cursor-pointer"
                    onClick={() => handleCopy(d)}
                  >
                    {isCopy ? "Copied" : "Copy"}
                  </p>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDelete(d)}
                  >
                    <img src={Delete} className="w-6 h-6" alt="Delete" />
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
