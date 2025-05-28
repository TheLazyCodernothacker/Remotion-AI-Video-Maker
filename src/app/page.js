"use client";

import { Player } from "@remotion/player";
import { Main, duration } from "../remotion/MyComp/Main";
import { useRef } from "react";

export default function Home() {
  async function handle() {
    const input = inputRef.current.value;
    if (!input) {
      alert("Please enter a video idea.");
      return;
    }
    try {
      const response = await fetch("/api/createStructure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate outline");
      }
      window.location.reload(); // Reload the page to reflect changes
      // Here you can handle the AI response, e.g., update the video outline
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating the outline.");
    }
  }
  const inputRef = useRef(null);
  return (
    <div className="relative">
      {/* <dialog
        open
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="bg-neutral-900 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold text-white">Centered Item</h1>
      </dialog> */}
      <div className="py-10 flex flex-col items-center">
        <h1 className="text-blue-500 text-7xl font-extrabold special ">
          Videos Without The Hassle
        </h1>
        <div className="shadow-lg shadow-white  scale-80">
          <Player
            component={Main}
            compositionWidth={1280}
            compositionHeight={720}
            durationInFrames={duration}
            fps={30}
            controls
            loop
          />
        </div>
        <h1 className="text-4xl text-white  font-bold">What's your vision?</h1>
        <input
          className="w-1/2 p-4 mt-4 text-white rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Describe your video idea here..."
          ref={inputRef}
        ></input>
        <button
          onClick={handle}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
        >
          <span className="text-white text-xl">Generate Outline</span>
        </button>
      </div>
    </div>
  );
}
