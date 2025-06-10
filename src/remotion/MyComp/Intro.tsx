// AIWASHERE
// This Intro section dynamically introduces the question "Why Cristiano Ronaldo is the GOAT?"
// It now features the provided Cristiano Ronaldo image as the main background,
// with a subtle zoom animation. The text "Why Cristiano Ronaldo is the GOAT?" animates word by word,
// with "GOAT" specifically stylized and scaling/fading in prominently.
// A dark overlay is applied over the background image to ensure text readability.
// The design is sleek, modern, and uses colorful accents with a focus on readability and visual flair.
import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, AbsoluteFill, useVideoConfig } from 'remotion';

/**
 * A helper function to animate words individually using Remotion's spring and interpolate.
 * Each word will animate in with a slight delay.
 */
const splitAndAnimateWords = (
  text: string,
  frame: number,
  initialDelay: number,
  delayPerWord: number,
  fps: number
) => {
  const words = text.split(' ');
  return words.map((word, i) => {
    const startFrame = initialDelay + i * delayPerWord;

    // Use spring for natural entry animation for each word
    const wordSpringProgress = spring({
      frame: frame - startFrame,
      from: 0,
      to: 1,
      fps: fps,
      config: {
        damping: 200,
        stiffness: 100,
        mass: 0.5,
      },
    });

    // Interpolate opacity based on spring progress
    const opacity = interpolate(
      wordSpringProgress,
      [0, 1],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );

    // Interpolate translateY for a subtle "pop-up" effect
    const translateY = interpolate(
      wordSpringProgress,
      [0, 1],
      [50, 0], // Starts 50px below and moves up
      { extrapolateRight: 'clamp' }
    );

    return (
      <span
        key={i}
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          display: 'inline-block', // Crucial for transform to apply correctly to spans
        }}
        className="mr-4" // Tailwind for spacing between words
      >
        {word}
      </span>
    );
  });
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // Get frames per second from video config

  // Ronaldo image scale animation for the main background
  const ronaldoScale = interpolate(
    frame,
    [0, 360],
    [1.0, 1.05], // Subtle zoom effect over time for the background image
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // GOAT text animation (scale and opacity)
  const goatScale = spring({
    frame: frame - 120, // Start GOAT animation after 120 frames
    from: 0,
    to: 1,
    fps: fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const goatOpacity = interpolate(
    frame,
    [120, 150, 300, 330], // Fade in quickly, then fade out towards the end
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Dark overlay opacity animation for text readability
  const overlayOpacity = interpolate(
    frame,
    [0, 60],
    [0.4, 0.8], // Starts subtly, becomes more opaque for text readability
    { extrapolateRight: 'clamp' }
  );

  return (
    // Base AbsoluteFill. Removed previous background gradient as the image will cover it.
    <AbsoluteFill className="bg-black overflow-hidden relative">

      {/* Cristiano Ronaldo Image as the main background */}
      <div
        className="absolute inset-0 z-0" // Set z-index to z-0 to make it the absolute background
        style={{
          backgroundImage: `url(https://assets.khelnow.com/news/uploads/2024/10/Cristiano-Ronaldo-Al-Nassr-scaled.jpg)`,
          backgroundSize: 'cover', // Ensures the image covers the entire area
          backgroundPosition: 'center', // Centers the image
          opacity: 1, // Full opacity for the main background image
          transform: `scale(${ronaldoScale})`, // Apply subtle zoom animation
        }}
      />

      {/* Dark overlay to ensure text readability on top of the image */}
      <div
        className="absolute inset-0 z-20 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Main content container for text */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center p-8">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl font-extrabold text-white leading-tight drop-shadow-lg flex flex-wrap justify-center"
        >
          {/* Animate each word of the initial phrase */}
          {splitAndAnimateWords("Why Cristiano Ronaldo is the", frame, 60, 10, fps)}
        </h1>

        <h2
          className="text-8xl md:text-9xl lg:text-10xl font-black text-yellow-400 mt-8 drop-shadow-2xl"
          style={{
            opacity: goatOpacity,
            transform: `scale(${goatScale})`,
            // Add a subtle glow/outline effect dynamically for the GOAT text
            textShadow: `0 0 15px rgba(255, 255, 0, ${goatOpacity * 0.7})`
          }}
        >
          GOAT?
        </h2>
      </div>
    </AbsoluteFill>
  );
};

export const Intro_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Intro_Edited = true; // Set to true if the section is edited
