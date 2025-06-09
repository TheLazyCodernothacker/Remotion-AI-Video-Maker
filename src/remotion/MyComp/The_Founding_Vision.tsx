// AIWASHERE
// This section is a sleek, modern introduction screen designed with vibrant TailwindCSS styling.
// It features smooth animations using `spring` from Remotion and avoids common runtime errors
// related to `interpolate` or improper usage of <Composition>.
// The text is centered, animated, and styled with a bold, elegant visual language.

import { useEffect, useState } from "react";
import { spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";

export const The_Founding_Vision: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    from: -200,
    to: 0,
    durationInFrames: 40,
    config: {
      damping: 200,
      mass: 1,
      stiffness: 170,
    },
    easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
  });

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 30,
    config: {
      damping: 50,
      stiffness: 120,
    },
    easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
  });

  return (
    <div className="w-full h-full bg-gradient-to-r from-purple-700 via-pink-500 to-red-400 flex items-center justify-center">
      <div
        style={{
          transform: `translateY(${titleSpring}px)`,
          opacity,
        }}
        className="text-center px-10"
      >
        <h1 className="text-white text-6xl font-extrabold drop-shadow-lg mb-4">
          The Founding Vision of Microsoft
        </h1>
        <p className="text-white text-2xl max-w-3xl mx-auto drop-shadow-md">
          A bold leap into the future, envisioning a computer on every desk and
          in every home. This video illustrates the pioneering ideals that
          formed the foundation of Microsoft's transformative journey.
        </p>
      </div>
    </div>
  );
};

export const The_Founding_Vision_Duration = 360; // Duration in frames at 30fps (12 seconds)
export const The_Founding_Vision_Edited = true; // This section has been fully customized
