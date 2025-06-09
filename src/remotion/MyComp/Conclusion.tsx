// AIWASHERE
// This component serves as the conclusion section of a Remotion video.
// It presents a summary of core arguments (narrative emptiness, repetitiveness,
// and simplistic appeal) as sequential text, followed by a final thought on the
// show's cultural impact versus its creative substance.
// The design is intended to be fancy, colorful, sleek, modern, and easy to read,
// utilizing Tailwind CSS for styling and Remotion's animation primitives for smooth transitions.
// No images are used, and all imports are strictly from 'remotion' or 'react' packages.
import React from 'react';
import { useVideoConfig, useCurrentFrame, spring, interpolate, Easing } from 'remotion';

export const Conclusion: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Define animation delays for each element to appear sequentially
  const titleAnimationStart = 0; // Title starts animating at frame 0

  const points = [
    { text: "Narrative Emptiness: The show often prioritizes spectacle over coherent storytelling, leaving plots underdeveloped.", delay: 40 },
    { text: "Repetitiveness: Recurring plotlines and character arcs can lead to a sense of déjà vu, hindering genuine progression.", delay: 100 },
    { text: "Simplistic Appeal: While accessible, its reliance on surface-level themes can prevent deeper intellectual engagement.", delay: 160 },
    { text: "Cultural Impact vs. Creative Substance: Its widespread popularity undeniably exists, yet it's crucial to distinguish between mere viewership and profound artistic merit.", delay: 220 },
  ];

  // Animation for the main title
  const titleProgress = spring({
    frame: frame - titleAnimationStart,
    fps,
    config: {
      damping: 200, // Controls oscillations, higher for less bounce
      stiffness: 200, // Controls speed, higher for faster animation
      mass: 1.5, // Controls inertia, higher for more "weight"
    },
    durationInFrames: 30, // Title animates in over 1 second (30 frames)
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleTranslateY = interpolate(titleProgress, [0, 1], [40, 0]); // Moves up from 40px below to its position

  // Main background color for a sleek, modern look. This is a static Tailwind gradient.
  // No string interpolation for colors as per requirements.
  const bgColorClass = "bg-gradient-to-br from-indigo-800 to-purple-900";

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-white p-12 ${bgColorClass} font-sans`}>
      <h1
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale}) translateY(${titleTranslateY}px)`,
        }}
        // EDITED: Changed text-6xl to text-5xl and mb-16 to mb-12 for better screen fit
        className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-indigo-300 drop-shadow-lg"
      >
        Conclusion: A Deeper Look
      </h1>

      <div className="space-y-8 max-w-4xl w-full">
        {points.map((point, index) => {
          const pointAnimationDelay = point.delay;
          const pointAnimationDuration = 40; // Each point animates in over ~1.3 seconds

          const pointProgress = spring({
            frame: frame - pointAnimationDelay,
            fps,
            config: {
              damping: 15, // Softer spring for text entry
              stiffness: 100, // Medium stiffness
              mass: 1,
              // Using custom bezier easing as per requirement
              easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
            },
            durationInFrames: pointAnimationDuration,
          });

          const pointOpacity = interpolate(pointProgress, [0, 1], [0, 1]);
          const pointTranslateY = interpolate(pointProgress, [0, 1], [30, 0]); // Moves up from 30px below
          const pointScale = interpolate(pointProgress, [0, 1], [0.95, 1]); // Slightly scales up

          // Interpolating only the alpha value of the background color
          const backgroundAlpha = interpolate(pointProgress, [0, 1], [0, 0.2]);
          // Interpolating blur strength for backdrop-filter
          const blurStrength = interpolate(pointProgress, [0, 1], [0, 4]);
          // Interpolating shadow opacity
          const shadowOpacity1 = interpolate(pointProgress, [0, 1], [0, 0.1]);
          const shadowOpacity2 = interpolate(pointProgress, [0, 1], [0, 0.06]);

          return (
            <p
              key={index}
              style={{
                opacity: pointOpacity,
                transform: `translateY(${pointTranslateY}px) scale(${pointScale})`,
                // Applying subtle background effects that animate with the text
                background: `rgba(0, 0, 0, ${backgroundAlpha})`, // Animates alpha of black background
                borderRadius: '8px',
                padding: '16px 24px',
                backdropFilter: `blur(${blurStrength}px)`, // Animates blur strength
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, ${shadowOpacity1}), 0 2px 4px -1px rgba(0, 0, 0, ${shadowOpacity2})`, // Animates shadow opacity
              }}
              // EDITED: Changed text-3xl to text-2xl for better screen fit
              className="text-2xl text-center leading-relaxed text-gray-100 font-semibold drop-shadow-md"
            >
              {point.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

// Calculate total duration to ensure all animations complete and content is visible for a reasonable time.
// The last point starts at frame 220, animates for 40 frames, so it's fully visible at 260.
// We add a buffer of 100 frames to allow the audience to read the final point.
// Total duration: 220 (last point start) + 40 (point animation) + 100 (read time) = 360 frames.
export const Conclusion_Duration = 360; // Duration in frames (at 30 frames per second, this is 12 seconds)
export const Conclusion_Edited = true; // Set to true to indicate the section has been customized
