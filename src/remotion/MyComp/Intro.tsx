// AIWASHERE
// This Intro component creates a dynamic and modern title card animation for the video
// 'Introduction to CSS Grid: Mastering Modern Layouts'.
// It features a sleek dark background with subtle animating background shapes,
// and uses a fade-in and scale-up effect for the title and subtitle texts.
// All animations are carefully timed using Remotion's `useCurrentFrame` and `interpolate`
// with `Easing.bezier` for smooth transitions.
// The design prioritizes readability, elegance, and a professional look without using any images.

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Animation timings for text
  const titleStart = 0;
  const titleEnd = 40; // Title fully visible by frame 40 (approx 1.3 seconds)

  const subtitleStart = 20; // Subtitle starts animating after title begins
  const subtitleEnd = 60; // Subtitle fully visible by frame 60 (approx 2 seconds)

  // Animation timings for background shapes
  const bgShapeStart = 0;
  const bgShapeFadeInEnd = 80; // Shapes fade in
  const bgShapeScaleEnd = durationInFrames; // Shapes continuously scale and rotate

  // Interpolation for Title: Opacity, Scale, and slight vertical translation
  const titleOpacity = interpolate(
    frame,
    [titleStart, titleEnd],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom smooth easing
    }
  );

  const titleScale = interpolate(
    frame,
    [titleStart, titleEnd],
    [0.8, 1], // Starts smaller, scales up
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  const titleTranslateY = interpolate(
    frame,
    [titleStart, titleEnd],
    [30, 0], // Starts 30px below final position, moves up
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Interpolation for Subtitle: Opacity and Scale
  const subtitleOpacity = interpolate(
    frame,
    [subtitleStart, subtitleEnd],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  const subtitleScale = interpolate(
    frame,
    [subtitleStart, subtitleEnd],
    [0.9, 1], // Starts slightly smaller, scales up
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Interpolation for Background Shapes: Opacity, Scale, and Rotation
  const bgShapeOpacity = interpolate(
    frame,
    [bgShapeStart, bgShapeFadeInEnd],
    [0, 0.3], // Fades in to a subtle opacity
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  const bgShapeScale = interpolate(
    frame,
    [bgShapeStart, bgShapeScaleEnd],
    [0.5, 1.2], // Continuously scales larger throughout the video
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear, // Smooth, consistent growth
    }
  );

  const bgShapeRotate = interpolate(
    frame,
    [bgShapeStart, durationInFrames],
    [0, 360], // Rotates a full circle throughout the duration
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.linear, // Consistent rotation speed
    }
  );

  return (
    // Main container with a sleek, dark gradient background
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden font-sans"
      style={{
        background: 'linear-gradient(135deg, #0A0A2A 0%, #1A0F3A 50%, #0A0A2A 100%)', // Deep indigo/purple gradient
      }}
    >
      {/* Subtle animating background shape 1 (Purple glow) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(100,50,200,0.4) 0%, rgba(100,50,200,0) 70%)',
          opacity: bgShapeOpacity,
          transform: `translate(calc(-50% + ${bgShapeScale * 10}px), calc(-50% - ${bgShapeScale * 20}px)) scale(${bgShapeScale}) rotate(${bgShapeRotate}deg)`,
          top: '20%',
          left: '10%',
          zIndex: 0,
        }}
      />
      {/* Subtle animating background shape 2 (Teal glow) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(50,200,150,0.3) 0%, rgba(50,200,150,0) 70%)',
          opacity: bgShapeOpacity,
          transform: `translate(calc(-50% - ${bgShapeScale * 15}px), calc(-50% + ${bgShapeScale * 10}px)) scale(${bgShapeScale * 0.8}) rotate(-${bgShapeRotate * 0.5}deg)`,
          bottom: '10%',
          right: '10%',
          zIndex: 0,
        }}
      />

      {/* Content wrapper for title and subtitle, ensuring they are above background elements */}
      <div className="relative z-10 text-center p-4 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1
          className="text-6xl md:text-8xl font-extrabold text-white leading-tight mb-4 tracking-tight"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translateY(${titleTranslateY}px)`,
            textShadow: '0 0 15px rgba(255,255,255,0.2), 0 0 30px rgba(100,50,200,0.3)', // Subtle text glow
          }}
        >
          Introduction to CSS Grid
        </h1>
        {/* Subtitle */}
        <p
          className="text-2xl md:text-4xl text-teal-300 font-light tracking-wide px-4"
          style={{
            opacity: subtitleOpacity,
            transform: `scale(${subtitleScale})`,
            textShadow: '0 0 10px rgba(50,200,150,0.2)', // Subtle text glow
          }}
        >
          Mastering Modern Layouts
        </p>
      </div>
    </div>
  );
};

export const Intro_Duration = 360; // Duration in frames (30fps implies 12 seconds)
export const Intro_Edited = true; // Set to true to indicate this section has been customized
