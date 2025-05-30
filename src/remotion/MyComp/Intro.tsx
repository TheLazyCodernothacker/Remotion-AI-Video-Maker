// AIWASHERE
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();

  const fadeInDuration = fps;
  const fadeOutDuration = fps;

  const opacity = interpolate(
    frame,
    [0, fadeInDuration, Intro_Duration - fadeOutDuration, Intro_Duration],
    [0, 1, 1, 0],
    {
      easing: Easing.easeInOut,
    }
  );

  const translateY = interpolate(
    frame,
    [0, fadeInDuration],
    [50, 0],
    {
      easing: Easing.easeOut,
    }
  );

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-blue-200"
      style={{ opacity: opacity }}
    >
      <h1
        className="text-4xl font-bold text-blue-800 mb-4"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        1 + 1 = ?
      </h1>
      <p className="text-2xl text-blue-600">
        Let's find out! (It's 2, by the way 😉)
      </p>
    </div>
  );
};

export const Intro_Duration = 360; // Duration in frames at 30fps
