import React from "react";
import { useCurrentFrame, interpolate, useVideoConfig, spring } from "remotion";

export const Reason_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated bounce-in for each item
  const delays = [0, 15, 30];
  const getStyle = (index: number) => {
    const scale = spring({
      frame: frame - delays[index],
      fps,
      from: 0.5,
      to: 1,
      config: {
        damping: 8,
        stiffness: 120,
      },
    });

    const opacity = interpolate(
      frame,
      [delays[index], delays[index] + 10],
      [0, 1],
      {
        extrapolateRight: "clamp",
      },
    );

    return {
      opacity,
      transform: `scale(${scale})`,
    };
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-sky-200 to-yellow-200 flex flex-col justify-center items-center text-center px-8">
      <h1 className="text-5xl font-extrabold text-pink-600 mb-10 drop-shadow-xl animate-pulse">
        🎉 3 Reasons Bellevue is the GOAT 🐐
      </h1>

      <ol className="space-y-6 text-left text-xl sm:text-2xl max-w-2xl font-semibold text-neutral-800">
        <li
          style={getStyle(0)}
          className="bg-white/80 rounded-xl p-5 shadow-lg border-l-4 border-green-500"
        >
          <span className="text-3xl mr-2">🌲</span>
          <span className="text-green-800 font-bold">Nature:</span> It's like
          living inside Animal Crossing, but with real squirrels.
        </li>

        <li
          style={getStyle(1)}
          className="bg-white/80 rounded-xl p-5 shadow-lg border-l-4 border-blue-500"
        >
          <span className="text-3xl mr-2">🛡️</span>
          <span className="text-blue-800 font-bold">Safe:</span> I can drop my
          donut and pick it up without fear. (Still don’t eat it though.)
        </li>

        <li
          style={getStyle(2)}
          className="bg-white/80 rounded-xl p-5 shadow-lg border-l-4 border-yellow-500"
        >
          <span className="text-3xl mr-2">🧼</span>
          <span className="text-yellow-800 font-bold">Clean:</span> Even the
          raccoons here recycle. ✨
        </li>
      </ol>
    </div>
  );
};

export const duration = 180; // 6 seconds at 30fps
