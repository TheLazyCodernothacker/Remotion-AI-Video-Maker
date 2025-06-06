//AIWASHERE
// This Outro component provides a sleek, modern, and engaging conclusion to a video.
// It features a vibrant, dark background with bright, readable text for calls to action.
// Elements animate in smoothly using bezier easing, including a main call-to-action
// for subscription, a subtle "Explore More" button, and social media handles.
// The component is designed to be fully customizable with Tailwind CSS classes
// and Remotion's animation utilities, ensuring no external files or images are used.
// The outro concludes with a smooth fade to a dark background, signaling the end of content.

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  // Define color palette using Tailwind CSS class names
  const primaryBgColor = "bg-gradient-to-br from-purple-800 to-indigo-900"; // Deep, modern background gradient
  const textColor = "text-white"; // Bright white text for contrast
  const accentColor = "bg-green-500"; // Vibrant green for the button

  // Animation for the main call to action (CTA) text
  const ctaOpacity = interpolate(
    frame,
    [0, 30], // Starts fading in at frame 0, fully visible by frame 30
    [0, 1], // Goes from fully transparent to fully opaque
    {
      extrapolateLeft: "clamp", // Prevents values from going below 0
      extrapolateRight: "clamp", // Prevents values from going above 1
      easing: Easing.bezier(0.65, 0.05, 0.36, 1), // A strong ease-out bezier curve
    }
  );

  const ctaTranslateY = interpolate(
    frame,
    [0, 30],
    [50, 0], // Moves up from 50 pixels below its final position
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0.05, 0.36, 1),
    }
  );

  // Animation for the "Explore More" button
  const buttonOpacity = interpolate(
    frame,
    [45, 75], // Appears after the main CTA text (starts at frame 45, visible by 75)
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0.05, 0.36, 1),
    }
  );

  const buttonScale = interpolate(
    frame,
    [45, 75, 90, 105], // Subtle bounce effect after appearing
    [0.8, 1.1, 1, 1.05], // Scales up, then slightly down, then slightly up again
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0.05, 0.36, 1),
    }
  );

  // Animation for social media handles
  const socialOpacity = interpolate(
    frame,
    [90, 120], // Appears after the button animation (starts at frame 90, visible by 120)
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0.05, 0.36, 1),
    }
  );

  const socialTranslateY = interpolate(
    frame,
    [90, 120],
    [30, 0], // Moves up from 30 pixels below its final position
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0.05, 0.36, 1),
    }
  );

  // Final fade to black overlay
  const fadeToBlackOpacity = interpolate(
    frame,
    [Outro_Duration - 60, Outro_Duration], // Starts fading 60 frames before the end of the Outro_Duration
    [0, 1], // Fades from fully transparent to fully opaque (black)
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // A smooth, gentle ease-out fade
    }
  );

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden ${primaryBgColor}`}
    >
      {/* Main Call to Action Text */}
      <h1
        className={`text-5xl md:text-7xl font-extrabold mb-8 text-center ${textColor}`}
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaTranslateY}px)`,
          // Subtle glow effect for text using text-shadow
          textShadow: "0px 0px 15px rgba(0,255,255,0.7)",
        }}
      >
        Subscribe for Web Dev Content
      </h1>

      {/* "Explore More" Button */}
      <button
        className={`px-8 py-4 rounded-full font-bold text-xl md:text-2xl transition-all duration-300 transform cursor-pointer
        ${accentColor} text-white hover:scale-105 hover:shadow-lg`}
        style={{
          opacity: buttonOpacity,
          transform: `scale(${buttonScale})`,
          // Subtle glow effect for button using box-shadow
          boxShadow: "0px 0px 20px rgba(0,255,100,0.5)",
        }}
      >
        Explore More Tutorials
      </button>

      {/* Social Media Handles Section */}
      <div
        className={`flex flex-col items-center mt-12 space-y-4 ${textColor}`}
        style={{
          opacity: socialOpacity,
          transform: `translateY(${socialTranslateY}px)`,
        }}
      >
        <p className="text-xl md:text-2xl font-semibold">Connect with us:</p>
        <div className="flex space-x-6">
          <span className="text-lg md:text-xl font-medium">
            <span className="text-blue-400">@</span>YourChannel
          </span>
          <span className="text-lg md:text-xl font-medium">
            <span className="text-pink-400">/</span>YourWebsite.com
          </span>
          <span className="text-lg md:text-xl font-medium">
            <span className="text-purple-400">#</span>WebDevLearn
          </span>
        </div>
      </div>

      {/* Overlay for smooth fade to black at the end */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: fadeToBlackOpacity,
        }}
      />
    </div>
  );
};

export const Outro_Duration = 360; // Duration in frames (e.g., 360 frames = 12 seconds at 30fps)
export const Outro_Edited = true; // Set to true if this section has been customized
