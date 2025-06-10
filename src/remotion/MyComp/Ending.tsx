// AIWASHERE

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Img } from 'remotion'; // Img import remains as per instructions

/**
 * The Ending component for the video.
 * This section provides a sleek, modern, and colorful call to action.
 * It features animated text encouraging viewers to subscribe and avoid "brainrot."
 * All animations are handled using Remotion's `spring` and `interpolate` functions
 * with a custom bezier easing curve for smooth, non-linear transitions.
 * The design prioritizes readability and a modern aesthetic.
 */
export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Custom Easing function as requested
  const customEasing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

  // Removed: imageUrl definition
  // Removed: Animation variables for the background image (bgProgress, bgTranslateX, bgTranslateY, bgOpacity)

  // Animation for "Don't get brainrot."
  const title1Spring = spring({
    frame: frame - 15, // Starts animating at frame 15
    fps,
    config: {
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  });
  const title1Scale = interpolate(title1Spring, [0, 1], [0.7, 1]);
  const title1Opacity = interpolate(title1Spring, [0, 1], [0, 1]);
  const title1Y = interpolate(title1Spring, [0, 1], [50, 0]); // Slide up effect

  // Animation for "Subscribe Now!"
  const title2Spring = spring({
    frame: frame - 45, // Starts animating at frame 45 (delayed after title1)
    fps,
    config: {
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  });
  const title2Scale = interpolate(title2Spring, [0, 1], [0.7, 1]);
  const title2Opacity = interpolate(title2Spring, [0, 1], [0, 1]);
  const title2Y = interpolate(title2Spring, [0, 1], [50, 0]); // Slide up effect

  // Animation for "Like, Share, & Hit the Bell!" (Call to Action)
  const ctaOpacity = interpolate(
    frame,
    [75, 105], // Fades in between frame 75 and 105
    [0, 1],
    { easing: customEasing }
  );

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-950 flex flex-col items-center justify-center text-white p-4">
      {/* Removed: Animated background image (Img component) */}

      {/* Main Content - rendered above the background elements using z-index */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1
          style={{
            transform: `translateY(${title1Y}px) scale(${title1Scale})`,
            opacity: title1Opacity,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-center drop-shadow-lg text-amber-400 px-4"
        >
          Don't get brainrot.
        </h1>

        <p
          style={{
            transform: `translateY(${title2Y}px) scale(${title2Scale})`,
            opacity: title2Opacity,
          }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-center drop-shadow-lg text-violet-400 px-4"
        >
          Subscribe Now!
        </p>

        <p
          style={{ opacity: ctaOpacity }}
          className="text-xl md:text-2xl lg:text-3xl text-center text-gray-300 font-medium tracking-wide px-4"
        >
          Like, Share, & Hit the Bell!
        </p>
      </div>
    </div>
  );
};

export const Ending_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Ending_Edited = true; // Set to true if the section is edited
