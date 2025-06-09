// AIWASHERE
// This Intro component sets the stage for a critical look at "Skibidi Toilet".
// It features a dynamic title reveal with glitch effects, emphasizing a disruptive and
// slightly unsettling tone. A countdown timer builds anticipation for the arguments
// to follow. The design is sleek, modern, and uses a vibrant, contrasting color palette
// to create a visually striking and easy-to-read experience without relying on images.
// Animations are carefully crafted using Remotion's interpolate and spring functions
// to ensure a smooth yet impactful visual flow, while specifically avoiding common
// interpolation errors with string values or incorrect Easing functions.
import React from 'react';
import { useCurrentFrame, interpolate, Easing, spring, AbsoluteFill } from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const backgroundColor = 'bg-gray-950'; // Very dark, almost black, for a modern, sleek look

  // Title reveal animation using spring for a natural, bouncy entry
  const titleSpring = spring({
    frame: frame,
    from: 0,
    to: 1,
    fps: 30,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1], {
    extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleTranslateY = interpolate(titleSpring, [0, 1], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Glitch effect parameters for the title, applied in specific time windows
  // The glitch is designed to be subtle and rapid, creating a digital distortion feel.
  const glitchOffset = interpolate(
    frame,
    [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60], // Input frames for a burst of glitches
    [0, 5, -5, 10, -10, 5, -5, 0, 5, -5, 0], // Output: X-offset in pixels
    {
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom easing for sharp, non-linear movement
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const glitchSkew = interpolate(
    frame,
    [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    [0, 2, -3, 4, -5, 3, -2, 0, 1, -1, 0], // Output: SkewY in degrees
    {
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const glitchOpacityFlicker = interpolate(
    frame,
    [12, 13, 14, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54],
    [1, 0.2, 1, 1, 0.3, 1, 1, 0.1, 1, 1, 0.4, 1, 1, 0.25, 1], // Output: Opacity values for flicker
    {
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Countdown timer logic and animation
  const countdownStartFrame = 120; // Frame when countdown begins to appear
  const countdownEndFrame = 300;   // Frame when countdown finishes and disappears

  const countdownValue = interpolate(
    frame,
    [countdownStartFrame, countdownEndFrame],
    [5, 0], // Counts down from 5 to 0
    {
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const displayedCountdown = Math.ceil(countdownValue); // Round up to show integer countdown (e.g., 5, 4, 3, 2, 1)

  const countdownOpacity = interpolate(
    frame,
    [countdownStartFrame - 30, countdownStartFrame, countdownEndFrame - 30, countdownEndFrame],
    [0, 1, 1, 0], // Fades in, stays, then fades out
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Text color for the main title, chosen for impact and contrast
  const textColor = 'text-red-500'; // A bold, critical red

  return (
    <AbsoluteFill className={`${backgroundColor} flex flex-col items-center justify-center font-sans overflow-hidden`}>
      {/* Dynamic Title Card */}
      <h1
        className={`text-7xl md:text-8xl lg:text-9xl font-extrabold ${textColor} text-center leading-tight tracking-tighter`}
        style={{
          // Apply reveal and glitch transformations
          transform: `scale(${titleScale}) translateY(${titleTranslateY}px) translateX(${glitchOffset}px) skewY(${glitchSkew}deg)`,
          opacity: titleOpacity * glitchOpacityFlicker,
          // Simulate a neon glow effect using multiple text shadows, interpolating alpha for animation
          filter: `drop-shadow(0 0 10px rgba(255, 0, 0, ${titleOpacity})) drop-shadow(0 0 20px rgba(255, 0, 0, ${titleOpacity * 0.5}))`,
        }}
      >
        WHY SKIBIDI TOILET SUCKS
      </h1>

      {/* Subtitle/Teaser to build anticipation */}
      <p
        className="text-white text-3xl md:text-4xl mt-8 font-mono tracking-wide"
        style={{
          opacity: interpolate(frame, [60, 90], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          transform: `translateY(${interpolate(frame, [60, 90], [20, 0])}px)`,
        }}
      >
        Critical analysis incoming...
      </p>

      {/* Countdown Timer */}
      {displayedCountdown > 0 && ( // Only render if countdown is positive
        <div
          className="text-red-500 text-8xl md:text-9xl lg:text-[10rem] font-bold mt-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full w-48 h-48 md:w-64 md:h-64 flex items-center justify-center shadow-lg"
          style={{
            opacity: countdownOpacity,
            // Scale animation for a subtle pulse effect
            transform: `scale(${interpolate(frame, [countdownStartFrame, countdownEndFrame], [1.2, 0.8], { easing: Easing.bezier(0.8, 0.22, 0.96, 0.65) })})`,
            // Dynamic box shadow for a pulsating glow effect, using interpolated numeric alpha
            boxShadow: `0 0 20px 5px rgba(255, 0, 0, ${interpolate(frame % 30, [0, 15, 30], [0.3, 0.8, 0.3], { extrapolateRight: 'clamp' })})`,
          }}
        >
          {displayedCountdown}
        </div>
      )}

      {/* Subtle decorative lines for a sleek, modern touch */}
      <div
        className="absolute bottom-10 left-10 w-24 h-1 bg-red-500 rounded-full"
        style={{
          opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateX(${interpolate(frame, [90, 120], [-100, 0])}px)`,
        }}
      ></div>
      <div
        className="absolute top-10 right-10 w-24 h-1 bg-red-500 rounded-full"
        style={{
          opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateX(${interpolate(frame, [90, 120], [100, 0])}px)`,
        }}
      ></div>
    </AbsoluteFill>
  );
};

export const Intro_Duration = 360; // Duration in frames (30 frames per second, so 12 seconds)
export const Intro_Edited = true; // Set to true if the section is edited
