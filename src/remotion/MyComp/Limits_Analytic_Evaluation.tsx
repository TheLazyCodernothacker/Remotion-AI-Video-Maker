//AIWASHERE
// This section, "Limits_Analytic_Evaluation", is designed to be a sleek, modern, and engaging introduction to a complex mathematical topic.
// It uses vibrant colors and smooth animations to present key concepts and benefits of understanding Limits and Analytic Evaluation.
// The video progresses through several animated text elements, each appearing sequentially to guide the viewer's attention.
// No images are used to maintain a clean aesthetic and minimize external dependencies.
// All animations leverage Remotion's `interpolate` and `Easing.bezier` for a fluid user experience,
// with careful consideration for readability and pacing, ensuring text is visible for ample time.

import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const Limits_Analytic_Evaluation: React.FC = () => {
  const frame = useCurrentFrame();

  // Define timings for each text animation in frames
  const titleStart = 0;
  const titleEnd = 60; // 2 seconds
  const subtitleStart = 45;
  const subtitleEnd = 105; // 2 seconds
  const conceptsStart = 90;
  const conceptsEnd = 180; // 3 seconds
  const visualizeStart = 150;
  const visualizeEnd = 240; // 3 seconds
  const masterStart = 210;
  const masterEnd = 300; // 3 seconds

  // Custom easing function for smooth animations (ease-in-out)
  const smoothEase = Easing.bezier(0.42, 0, 0.58, 1);

  // Animation properties for "Limits & Analytic Evaluation"
  const titleOpacity = interpolate(frame,
    [titleStart, titleStart + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );
  const titleScale = interpolate(frame,
    [titleStart, titleStart + 30],
    [0.8, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );
  const titleY = interpolate(frame,
    [titleStart, titleStart + 30],
    [30, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );

  // Animation properties for "Unlocking Advanced Calculus Concepts"
  const subtitleOpacity = interpolate(frame,
    [subtitleStart, subtitleStart + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );
  const subtitleY = interpolate(frame,
    [subtitleStart, subtitleStart + 30],
    [50, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );

  // Animation properties for "Explore Continuity, Derivatives, and Integrals"
  const conceptsOpacity = interpolate(frame,
    [conceptsStart, conceptsStart + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );
  const conceptsX = interpolate(frame,
    [conceptsStart, conceptsStart + 30],
    [-100, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );

  // Animation properties for "Visualize Complex Functions with Clarity"
  const visualizeOpacity = interpolate(frame,
    [visualizeStart, visualizeStart + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );
  const visualizeScale = interpolate(frame,
    [visualizeStart, visualizeStart + 30],
    [0.7, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );

  // Animation properties for "Master Essential Mathematical Tools"
  const masterOpacity = interpolate(frame,
    [masterStart, masterStart + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );
  const masterY = interpolate(frame,
    [masterStart, masterStart + 30],
    [50, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );

  // Background color gradient animation for a dynamic feel
  const gradientShift = interpolate(frame,
    [0, 360], // Over the entire video duration
    [0, 100], // Shifts percentage for the gradient
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: smoothEase,
    }
  );

  // Define the background gradient with animating stops
  const bgColor = `linear-gradient(45deg, #2a006c ${gradientShift}%, #4a148c ${100 - gradientShift}%)`;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center font-sans text-white p-8"
      style={{
        background: bgColor, // Dynamic background gradient
      }}
    >
      <h1
        className="text-6xl font-extrabold mb-4 text-center leading-tight tracking-wide"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          textShadow: '0px 0px 15px rgba(128,222,234,0.8)', // Subtle glow for main title
          color: '#80deea', // Light Blue/Aqua
        }}
      >
        Limits & Analytic Evaluation
      </h1>

      <p
        className="text-3xl font-light mb-6 text-center max-w-2xl"
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          color: '#e91e63', // Bright Pink
        }}
      >
        Unlocking Advanced Calculus Concepts
      </p>

      <p
        className="text-2xl font-normal mb-6 text-center max-w-2xl"
        style={{
          opacity: conceptsOpacity,
          transform: `translateX(${conceptsX}px)`,
          color: '#fff', // White
        }}
      >
        Explore Continuity, Derivatives, and Integrals
      </p>

      <p
        className="text-2xl font-normal mb-6 text-center max-w-2xl"
        style={{
          opacity: visualizeOpacity,
          transform: `scale(${visualizeScale})`,
          color: '#ffee58', // Vibrant Yellow
        }}
      >
        Visualize Complex Functions with Clarity
      </p>

      <p
        className="text-3xl font-semibold text-center max-w-2xl"
        style={{
          opacity: masterOpacity,
          transform: `translateY(${masterY}px)`,
          color: '#fff', // White
        }}
      >
        Master Essential Mathematical Tools
      </p>
    </div>
  );
};

export const Limits_Analytic_Evaluation_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Limits_Analytic_Evaluation_Edited = true; // Set to true if the section is edited
