// AIWASHERE
/**
 * Summary Section Component
 *
 * This component provides a concise recap of the video's main points,
 * specifically highlighting key advantages and features of CSS Grid
 * as learned throughout the video. It aims to reinforce information
 * in a clear, digestible, and visually appealing manner.
 *
 * The design is fancy, colorful, sleek, modern, and easy to read,
 * utilizing Tailwind CSS for styling and Remotion's animation capabilities.
 * It features a prominent title and bullet points that animate in
 * sequentially with subtle fade-in and slide-up effects.
 *
 * No images are used, and all animations rely on numerical interpolations
 * to avoid common Remotion errors related to string-based output ranges.
 * The component ensures a smooth user experience by adhering to best practices
 * for performance and visual appeal within the Remotion environment.
 */
import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

export const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Define key points for the summary, based on the prompt's examples
  const summaryPoints = [
    '2D Layout System',
    'Precise Item Placement',
    'Powerful Responsiveness',
    'Streamlined UI Development',
  ];

  // Animation parameters for the section
  const titleAppearStart = 10;
  const titleAppearEnd = 40;
  const pointsStartFrame = 60; // Start frame for the first bullet point's animation
  const pointAnimationDuration = 45; // Duration for each bullet point's individual animation
  const pointStaggerDelay = 30; // Delay between the start of each subsequent bullet point's animation

  // Background color uses Tailwind's gradient classes for a sleek, modern look.
  const backgroundColorClass = "bg-gradient-to-br from-slate-900 to-indigo-900";

  // Title animation: fade in and slight scale up effect
  const titleOpacity = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [0, 1], // Opacity from 0 to 1
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom bezier easing for smooth motion
    }
  );

  const titleScale = interpolate(
    frame,
    [titleAppearStart, titleAppearEnd],
    [0.9, 1], // Scale from 90% to 100%
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${backgroundColorClass} text-white p-8 font-sans`}>
      {/* Summary Title */}
      <h1
        className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-16 text-sky-400 drop-shadow-lg"
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`, // Apply animated scale
        }}
      >
        Summary
      </h1>

      {/* Bullet Points Container */}
      <div className="w-full max-w-4xl px-4">
        {summaryPoints.map((point, index) => {
          // Calculate start and end frames for each bullet point's animation
          const start = pointsStartFrame + index * pointStaggerDelay;
          const end = start + pointAnimationDuration;

          // Animation for bullet point opacity (fade-in)
          const pointOpacity = interpolate(
            frame,
            [start, end],
            [0, 1], // Opacity from 0 to 1
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.42, 0, 0.58, 1), // Ease-in-out
            }
          );

          // Animation for bullet point vertical position (slide-up)
          const pointTranslateY = interpolate(
            frame,
            [start, end],
            [30, 0], // Starts 30px below final position, slides to 0px (original)
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.42, 0, 0.58, 1),
            }
          );

          return (
            <div
              key={point}
              className="flex items-center mb-8 last:mb-0" // Add margin-bottom, remove for last item
              style={{
                opacity: pointOpacity,
                transform: `translateY(${pointTranslateY}px)`, // Apply animated vertical position
              }}
            >
              <span className="text-4xl text-teal-300 mr-6">•</span> {/* Decorative bullet point */}
              <p className="text-4xl md:text-5xl font-semibold text-white">
                {point}
              </p>
            </div>
          );
        })}
      </div>

      {/* Concluding message - simple fade in after all points have appeared */}
      <p
        className="text-2xl mt-16 text-gray-300 italic text-center w-full max-w-3xl"
        style={{
          opacity: interpolate(
            frame,
            [
              pointsStartFrame + (summaryPoints.length - 1) * pointStaggerDelay + pointAnimationDuration + 30, // Start fade-in after last point is fully visible
              pointsStartFrame + (summaryPoints.length - 1) * pointStaggerDelay + pointAnimationDuration + 60, // End fade-in after 30 more frames
            ],
            [0, 1], // Opacity from 0 to 1
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.ease, // Standard ease easing
            }
          ),
        }}
      >
        Reinforcing your understanding for efficient UI design.
      </p>
    </div>
  );
};

export const Summary_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Summary_Edited = true; // Set to true if the section is edited
