// AIWASHERE
// This Remotion component generates a sleek, modern, and colorful introduction for a "Limits" section.
// It uses pure text animations, relying on Remotion's interpolation and easing functions for dynamic effects.
// The design prioritizes readability with strong contrasts and a dark background.
// Key elements include a title that scales and fades in, a subtitle that slides up and fades,
// and a concluding message with a subtle bounce. A gentle background color shift adds depth.
// No images or external files are used; all visuals are created with Tailwind CSS and direct styles.
import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from 'remotion';

export const Limits_Introduction: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Animation timings (in frames)
  const titleAppearStart = 0;
  const titleAppearEnd = 45; // 1.5 seconds
  const subtitleAppearStart = 60; // 2 seconds
  const subtitleAppearEnd = 120; // 4 seconds
  const messageAppearStart = 180; // 6 seconds
  const messageAppearEnd = 240; // 8 seconds
  const fadeOutStart = durationInFrames - 60; // Last 2 seconds

  // Title animation: Scale and opacity
  const titleScale = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [0.7, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const titleOpacity = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Subtitle animation: Fade and translateY
  const subtitleOpacity = interpolate(
    frame,
    [subtitleAppearStart, subtitleAppearEnd],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const subtitleTranslateY = interpolate(
    frame,
    [subtitleAppearStart, subtitleAppearEnd],
    [20, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Message animation: Scale and opacity with a subtle bounce
  const messageOpacity = interpolate(
    frame,
    [messageAppearStart, messageAppearEnd],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const messageScale = interpolate(
    frame,
    [messageAppearStart, messageAppearStart + 30, messageAppearEnd],
    [0.9, 1.05, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Overall video fade out
  const overallFadeOutOpacity = interpolate(
    frame,
    [fadeOutStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Subtle background color transition (from dark blue-gray to darker gray)
  const bgHueShift = interpolate(
    frame,
    [0, durationInFrames],
    [220, 240], // Hue from a blue-gray to a more neutral gray
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear,
    }
  );
  const bgLightnessShift = interpolate(
    frame,
    [0, durationInFrames],
    [15, 10], // Lightness from dark to darker
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear,
    }
  );
  const backgroundColor = `hsl(${bgHueShift}, 20%, ${bgLightnessShift}%)`; // Dynamically computed HSL color

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden text-white"
      style={{
        backgroundColor: backgroundColor,
        opacity: overallFadeOutOpacity,
      }}
    >
      {/* Decorative gradient overlay for subtle background depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(78, 56, 128, 0.1) 0%, rgba(20, 27, 46, 0.1) 100%)',
        }}
      />

      {/* Main Title */}
      <h1
        className="text-7xl md:text-8xl font-extrabold mb-6 text-purple-400 leading-tight tracking-tighter"
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          // Custom sleek text shadow for depth and glow
          textShadow: `0px 0px ${titleScale * 15}px rgba(192, 132, 252, ${titleScale * 0.8}),
                        0px 0px ${titleScale * 5}px rgba(192, 132, 252, ${titleScale * 0.4})`,
        }}
      >
        Limits: An Introduction
      </h1>

      {/* Subtitle / Description */}
      <p
        className="text-2xl md:text-3xl font-medium text-gray-200 text-center px-12 leading-relaxed tracking-wide mt-4"
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleTranslateY}px)`,
          textShadow: `0px 0px 10px rgba(255, 255, 255, ${subtitleOpacity * 0.2})`,
        }}
      >
        Exploring the foundational concepts of calculus and continuity.
      </p>

      {/* Concluding Message */}
      <p
        className="text-xl md:text-2xl font-light text-cyan-400 mt-12 text-center px-16 italic"
        style={{
          opacity: messageOpacity,
          transform: `scale(${messageScale})`,
          textShadow: `0px 0px 8px rgba(0, 255, 255, ${messageOpacity * 0.6})`,
        }}
      >
        Prepare to delve into the depths of mathematical precision.
      </p>
    </div>
  );
};

export const Limits_Introduction_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Limits_Introduction_Edited = true; // Set to true if the section is edited
