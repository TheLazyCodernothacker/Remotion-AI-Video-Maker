// AIWASHERE
// This component, Goal_Scoring_Prowess, is designed to dynamically display a player's goal-scoring achievements
// in a sleek, modern, and engaging way using Remotion. It features:
// - A vibrant, colorful gradient background.
// - Animated title revealing.
// - Three key statistical displays ("800+ Career Goals", "Most International Goals (Men's)", "Most Champions League Goals")
//   that appear sequentially with animated number counters and text pop-ins.
// All animations leverage Remotion's useCurrentFrame and interpolate functions with custom bezier easing
// for a smooth, professional feel, adhering to the requirement of not using string interpolations for colors
// and avoiding direct image usage. Tailwind CSS is used for styling.

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const Goal_Scoring_Prowess: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define animation durations and offsets
  const titleAppearStart = 0;
  const titleAppearEnd = 30; // 1 second
  const stat1AppearStart = 45;
  const stat1AppearEnd = 90;
  const stat2AppearStart = 105;
  const stat2AppearEnd = 150;
  const stat3AppearStart = 165;
  const stat3AppearEnd = 210;
  // Removed: goalTypesAppearStart and goalTypesStagger as the diverse goal types part is removed.

  // Title animation
  const titleOpacity = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom easing
    }
  );
  const titleScale = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [0.8, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const titleTranslateY = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [50, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Statistic animation helper function
  const createStatAnimation = (startFrame: number, endFrame: number, finalNumber: number) => {
    const opacity = interpolate(
      frame,
      [startFrame, startFrame + 15, endFrame],
      [0, 1, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      }
    );
    const translateY = interpolate(
      frame,
      [startFrame, startFrame + 15],
      [50, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      }
    );
    const animatedNumber = interpolate(
      frame,
      [startFrame + 15, endFrame - 15], // Number counting animation duration
      [0, finalNumber],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.ease), // Smooth easing for number count
      }
    );
    return { opacity, translateY, animatedNumber: Math.floor(animatedNumber) };
  };

  const stat1 = createStatAnimation(stat1AppearStart, stat1AppearEnd, 800);
  const stat2 = createStatAnimation(stat2AppearStart, stat2AppearEnd, 118); // Example: Most International Goals (Men's)
  const stat3 = createStatAnimation(stat3AppearStart, stat3AppearEnd, 140); // Example: Most Champions League Goals

  // Removed: Goal Types animation helper function (createGoalTypeAnimation) and goalTypes array

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-pink-900 text-white font-sans overflow-hidden">
      {/* Main Title */}
      <h1
        className="text-6xl font-extrabold mb-12 text-yellow-300 drop-shadow-lg"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px) scale(${titleScale})`,
        }}
      >
        Goal Scoring Prowess
      </h1>

      {/* Statistical Displays */}
      <div className="space-y-6 text-center">
        {/* Stat 1: 800+ Career Goals */}
        <div
          className="text-5xl font-bold flex flex-col items-center justify-center"
          style={{
            opacity: stat1.opacity,
            transform: `translateY(${stat1.translateY}px)`,
          }}
        >
          <span className="text-emerald-400">
            {stat1.animatedNumber}
            {stat1.animatedNumber === 800 ? '+' : ''}
          </span>
          <span className="text-3xl text-white mt-2">Career Goals</span>
        </div>

        {/* Stat 2: Most International Goals (Men's) */}
        <div
          className="text-5xl font-bold flex flex-col items-center justify-center"
          style={{
            opacity: stat2.opacity,
            transform: `translateY(${stat2.translateY}px)`,
          }}
        >
          <span className="text-cyan-400">
            {stat2.animatedNumber}
            {stat2.animatedNumber === 118 ? '+' : ''}
          </span>
          <span className="text-3xl text-white mt-2">Most International Goals (Men's)</span>
        </div>

        {/* Stat 3: Most Champions League Goals */}
        <div
          className="text-5xl font-bold flex flex-col items-center justify-center"
          style={{
            opacity: stat3.opacity,
            transform: `translateY(${stat3.translateY}px)`,
          }}
        >
          <span className="text-red-400">
            {stat3.animatedNumber}
            {stat3.animatedNumber === 140 ? '+' : ''}
          </span>
          <span className="text-3xl text-white mt-2">Most Champions League Goals</span>
        </div>
      </div>

      {/* Removed: Goal Types Section */}
    </div>
  );
};

export const Goal_Scoring_Prowess_Duration = 360; // Duration in frames (12 seconds at 30fps) - Kept as is.
export const Goal_Scoring_Prowess_Edited = true; // Set to true if the section is edited
