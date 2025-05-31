"use client";

import { Player } from "@remotion/player";
import { Main, duration } from "../remotion/MyComp/Main";
import { useEffect, useRef, useState } from "react";
import files from "../remotion/MyComp/FILEHANDLER";

export default function Home() {
  const [inputState, setInputState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [subText, setSubText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    files.forEach((file) => {
      if (file.name && file.duration) {
        setInputState((prev) => ({
          ...prev,
          [file.name.name]: {
            input: "",
          },
        }));
      }
    });
    console.log(inputState);
  }, []);

  const messages = [
    "Cooking up your vision...",
    "Sharpening the cinematic edge...",
    "Assembling your masterpiece...",
    "Pulling visuals from the void...",
    "Warming up the creativity engines...",
    "Plotting scenes and story arcs...",
    "Summoning pixels with purpose...",
    "Designing dreams, hang tight...",
    "Engineering elegance in motion...",
    "Manifesting your idea into visuals...",
    "Cooking up in the lab...",
    "Being approved by Mr. Nhan...",
    "All great things come from patience...",
  ];

  const subTexts = [
    "Chill for a sec. We got this.",
    "Take five — we're on it.",
    "Magic's happening behind the curtain.",
    "Grab a coffee. We'll handle the rest.",
    "Good things take a moment.",
    "You're one click away from brilliance.",
    "Pixels are aligning. Stay cool.",
    "It's all coming together.",
    "Trust the process. It's clean.",
    "Almost cinematic. Almost.",
    "Getting ready for greatness.",
    "3..2..1.. Blast Off!",
    "Let us handle the dirty work.",
  ];

  async function handle() {
    const input = inputRef.current.value;
    if (!input) {
      alert("Please enter a video idea.");
      return;
    }

    if (localStorage.getItem("hasVideo")) {
      let a = confirm(
        "Are you sure you want to generate a video outline? This will overwrite your current video structure.",
      );
      if (!a) return;
    }

    localStorage.removeItem("hasVideo");

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomSub = subTexts[Math.floor(Math.random() * subTexts.length)];
    setLoadingMessage(randomMessage);
    setSubText(randomSub);
    setIsLoading(true);

    try {
      const response = await fetch("/api/createStructure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error("Failed to generate outline");

      localStorage.setItem("hasVideo", true);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating the outline.");
      setIsLoading(false);
    }
  }

  async function editSection(name) {
    const input = inputState[name]?.input;
    if (!input) {
      alert("Please enter a description for this section.");
      return;
    }
    const file = files.find((f) => f.name.name === name);
    if (!file) {
      alert("Section not found.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Updating section...");
    setSubText("Hang tight, we're refining your video...");

    try {
      const response = await fetch("/api/createSection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section: name, desc: input }),
      });

      if (!response.ok) throw new Error("Failed to edit section");

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while editing the section.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-6 animate-fade-in-up">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-2xl font-semibold tracking-wide text-gray-800">
              {loadingMessage}
            </h2>
            <p className="text-gray-500 text-md italic text-center max-w-md px-4">
              {subText}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center space-y-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-center">
          Videos Without The Hassle
        </h1>

        <div className="flex justify-start ">
          <Player
            component={Main}
            compositionWidth={1280}
            compositionHeight={720}
            durationInFrames={duration}
            fps={30}
            controls
            loop
            className="scale-80 rounded-xl border border-gray-300 shadow-md transition-all duration-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.4)]"
            autoPlay
          />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          What's your vision?
        </h2>

        <input
          className="w-full max-w-xl p-4 text-gray-900 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Describe your video idea here..."
          ref={inputRef}
        />

        <button
          onClick={handle}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Generate Outline
        </button>
        {files.length > 0 && (
          <div className="w-full space-y-12 pt-8">
            {files.map((file, index) => (
              <div className="flex items-center flex-col w-full" key={index}>
                <Player
                  component={file.name}
                  compositionWidth={1280}
                  compositionHeight={720}
                  durationInFrames={file.duration}
                  fps={30}
                  controls
                  loop
                  className="scale-80"
                />
                <textarea
                  className="w-full max-w-lg p-2 text-gray-900 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder={`Edit ${file.name.name} section... (or give suggestions)`}
                  value={inputState[file.name.name]?.input || ""}
                  onChange={(e) =>
                    setInputState((prev) => ({
                      ...prev,
                      [file.name.name]: {
                        input: e.target.value,
                      },
                    }))
                  }
                />
                <button
                  onClick={() => editSection(file.name.name)}
                  className="w-full max-w-lg mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}
