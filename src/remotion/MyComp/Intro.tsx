import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import React from "react";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: {
      damping: 8,
      stiffness: 100,
    },
  });

  // Paragraph animation
  const paragraphOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });

  const paragraphTranslateY = interpolate(frame, [15, 35], [20, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div className="w-full h-full bg-gradient-to-r from-blue-600 via-white to-red-600 flex flex-col items-center justify-center text-center px-10">
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
        className="bg-black/50 px-6 py-4 rounded-lg backdrop-blur-sm shadow-xl"
      >
        <h1 className="text-6xl font-extrabold text-white tracking-wide">
          Why America is Great
        </h1>
      </div>

      <div
        style={{
          opacity: paragraphOpacity,
          transform: `translateY(${paragraphTranslateY}px)`,
        }}
        className="mt-8 bg-black/40 px-8 py-6 rounded-lg max-w-3xl backdrop-blur-sm shadow-lg"
      >
        <p className="text-2xl text-white leading-relaxed">
          From the boundless freedom to dream, to the rich tapestry of cultures
          that strengthen our nation — America thrives on innovation,
          resilience, and the unwavering belief in liberty and opportunity for
          all.
        </p>
      </div>
    </div>
  );
};

export const duration = 180; // 6 seconds at 30fps
