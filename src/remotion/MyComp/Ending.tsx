// AIWASHERE

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

/**
 * The Ending component for the video.
 * This section provides a sleek, modern, and colorful call to action.
 * It features animated text encouraging viewers to subscribe and avoid "brainrot,"
 * along with subtle, glowing background elements that shift and change opacity
 * throughout the duration, creating a dynamic and engaging visual.
 * All animations are handled using Remotion's `spring` and `interpolate` functions
 * with a custom bezier easing curve for smooth, non-linear transitions.
 * No external images or assets are used, relying solely on native React elements,
 * CSS styling via Tailwind CSS, and Remotion's animation capabilities.
 * The design prioritizes readability and a modern aesthetic.
 */
export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Custom Easing function as requested
  const customEasing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

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

  // Animated background elements (continuous movement throughout the duration)
  // These create a dynamic, blurry, colorful backdrop without using images.
  const bg1Progress = interpolate(frame, [0, Ending_Duration], [0, 1], { easing: customEasing });
  const bg1TranslateX = interpolate(bg1Progress, [0, 1], [-200, 200]); // Moves horizontally
  const bg1TranslateY = interpolate(bg1Progress, [0, 1], [-100, 100]); // Moves vertically
  const bg1Opacity = interpolate(bg1Progress, [0, 0.5, 1], [0.2, 0.5, 0.2]); // Subtle pulse in opacity

  const bg2Progress = interpolate(frame, [0, Ending_Duration], [1, 0], { easing: customEasing }); // Reverse direction for contrasting movement
  const bg2TranslateX = interpolate(bg2Progress, [0, 1], [-150, 150]);
  const bg2TranslateY = interpolate(bg2Progress, [0, 1], [100, -100]);
  const bg2Opacity = interpolate(bg2Progress, [0, 0.5, 1], [0.3, 0.6, 0.3]);

  const bg3Progress = interpolate(frame, [0, Ending_Duration], [0.5, 1.5], { easing: customEasing }); // Offset start/end for unique movement
  const bg3TranslateX = interpolate(bg3Progress, [0, 1], [100, -100]);
  const bg3TranslateY = interpolate(bg3Progress, [0, 1], [-50, 50]);
  const bg3Opacity = interpolate(bg3Progress, [0, 0.5, 1], [0.25, 0.55, 0.25]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-950 flex flex-col items-center justify-center text-white p-4">
      {/* Animated background elements (positioned absolutely behind content) */}
      <div
        style={{
          transform: `translateX(${bg1TranslateX}px) translateY(${bg1TranslateY}px)`,
          opacity: bg1Opacity,
        }}
        className="absolute w-96 h-96 rounded-full bg-violet-600 blur-3xl mix-blend-screen -top-20 -left-20"
      ></div>
      <div
        style={{
          transform: `translateX(${bg2TranslateX}px) translateY(${bg2TranslateY}px)`,
          opacity: bg2Opacity,
        }}
        className="absolute w-80 h-80 rounded-full bg-blue-500 blur-3xl mix-blend-screen top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        style={{
          transform: `translateX(${bg3TranslateX}px) translateY(${bg3TranslateY}px)`,
          opacity: bg3Opacity,
        }}
        className="absolute w-72 h-72 rounded-full bg-pink-500 blur-3xl mix-blend-screen -bottom-10 -right-10"
      ></div>

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
