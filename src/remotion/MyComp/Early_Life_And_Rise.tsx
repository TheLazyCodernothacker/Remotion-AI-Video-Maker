//AIWASHERE
// This section, "Early_Life_And_Rise", visualizes key career milestones of a public figure
// (implied to be Cristiano Ronaldo) from his early life and initial rise in football.
// It features an animated timeline graphic with sequential slide-in text overlays
// for events like "Born in Madeira", "Sporting CP Debut", and "Manchester United Transfer".
// A simple animated silhouette of a young Ronaldo appears and grows, symbolizing his ascent.
// The design prioritizes a fancy, colorful, sleek, modern, and easy-to-read aesthetic
// using Remotion's animation capabilities and Tailwind CSS for styling.

import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, Img, interpolate, spring, Easing } from 'remotion';

// Define a type for a timeline event
interface Milestone {
  title: string;
  description: string;
  startFrame: number;
  duration: number; // Duration for the text/card animation itself, not how long it stays on screen
}

// --- Data for Milestones ---
// Defining data outside the component avoids re-creation on every render
// and allows it to be used for calculating total video duration.
const MILSTONE_DATA: Milestone[] = [
  {
    title: "Born in Madeira",
    description: "Humble beginnings in Funchal, Portugal, shaping a future legend.",
    startFrame: 90,
    duration: 60,
  },
  {
    title: "Sporting CP Debut",
    description: "Breaking into professional football and showcasing immense potential.",
    startFrame: 200,
    duration: 60,
  },
  {
    title: "Manchester United Transfer",
    description: "A pivotal move to a top European club, signaling his global rise.",
    startFrame: 310,
    duration: 60,
  },
];

// --- Constants for Animation Timing ---
// These constants define the start frames or delays for various animations,
// making the animation choreography easier to understand and adjust.
const TITLE_IN_START_FRAME = 0;
const TITLE_IN_DURATION = 30; // Frames for the title to fully appear

const RONALDO_APPEAR_DELAY = 30; // Frames after section start for Ronaldo to appear
const TIMELINE_DRAW_DELAY = 60; // Frames after section start for timeline to start drawing

const RAPID_ASCENT_TEXT_DELAY_AFTER_LAST_MILESTONE = 30; // Delay before "Rapid Ascent" text appears
const RAPID_ASCENT_TEXT_ANIMATION_DURATION = 60; // Duration for "Rapid Ascent" text spring animation

const END_BUFFER_FRAMES = 30; // Buffer time at the end of the section

// --- Reusable Spring Configurations ---
// Defining common spring configurations for consistent animation feel.
const DEFAULT_SPRING_CONFIG = {
  damping: 20,
  stiffness: 100,
  mass: 0.8,
};

// A slightly different spring for more bouncy or distinct animations (e.g., milestone points)
const BOUNCE_SPRING_CONFIG = {
  damping: 10,
  stiffness: 150,
  mass: 1,
};

export const Early_Life_And_Rise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Use the externally defined milestones data
  const milestones = MILSTONE_DATA;

  // Calculate spring progress values for various animations
  const ronaldoAppearProgress = spring({
    frame: frame - RONALDO_APPEAR_DELAY,
    fps,
    config: DEFAULT_SPRING_CONFIG,
  });

  const timelineDrawProgress = spring({
    frame: frame - TIMELINE_DRAW_DELAY,
    fps,
    config: DEFAULT_SPRING_CONFIG,
  });

  // Calculate the frame when the last milestone's animation completes.
  // This is crucial for timing subsequent animations like the "Rapid Ascent" text.
  const lastMilestone = milestones[milestones.length - 1];
  const lastMilestoneAnimationEndFrame = lastMilestone.startFrame + lastMilestone.duration;

  // Animation for the "Rapid Ascent" text
  const rapidAscentProgress = spring({
    frame: frame - (lastMilestoneAnimationEndFrame + RAPID_ASCENT_TEXT_DELAY_AFTER_LAST_MILESTONE),
    fps,
    config: DEFAULT_SPRING_CONFIG,
  });

  const rapidAscentOpacity = interpolate(
    rapidAscentProgress,
    [0, 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const rapidAscentTranslateY = interpolate(
    rapidAscentProgress,
    [0, 1],
    [50, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Title animation: fades in and slides up from the bottom
  const titleOpacity = interpolate(frame, [TITLE_IN_START_FRAME, TITLE_IN_START_FRAME + TITLE_IN_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
  });
  const titleTranslateY = interpolate(frame, [TITLE_IN_START_FRAME, TITLE_IN_START_FRAME + TITLE_IN_DURATION], [50, 0], {
    extrapolateLeft: "clamp",
  });

  // Subtle background hue shift for a dynamic and modern feel
  const backgroundHueShift = interpolate(
    frame,
    [0, fps * 15], // Hue shift over 15 seconds of video
    [0, 360], // Shift hue by 360 degrees (a full rotation)
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      className="bg-gradient-to-br from-indigo-900 via-purple-800 to-rose-900 text-white font-sans overflow-hidden"
      style={{
        filter: `hue-rotate(${backgroundHueShift}deg)`, // Apply subtle hue shift to the background
      }}
    >
      {/* Young Ronaldo Silhouette */}
      {/* Positioned at the bottom center and scales in. */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[70%] z-10 flex justify-center items-end"
        style={{
          opacity: ronaldoAppearProgress,
          // The -translate-x-1/2 class handles horizontal centering.
          // This transform now only applies the animated scaling from its center.
          transform: `scale(${interpolate(ronaldoAppearProgress, [0, 1], [0.5, 1])})`,
        }}
      >
        <Img
          src="https://th.bing.com/th/id/OIP.2lon7_HZPkZ-Pyxr-7rkoAHaNK?rs=1&pid=ImgDetMain"
          alt="Young Ronaldo"
          className="h-full object-contain filter drop-shadow-2xl" // Added shadow for depth
        />
      </div>

      {/* Main Content Area: holds title, timeline, and milestones */}
      <AbsoluteFill className="relative z-20 p-16 flex flex-col justify-center items-center">
        {/* Section Title */}
        <h1
          className="text-6xl md:text-8xl font-extrabold mb-12 text-center drop-shadow-lg"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          Early Life & Rise
        </h1>

        {/* Timeline Line: Draws from left to right */}
        <div className="relative w-4/5 h-1 bg-white/30 rounded-full my-16">
          <div
            className="absolute top-0 left-0 h-full bg-blue-400 rounded-full shadow-lg" // Added shadow for the timeline
            style={{
              width: `${timelineDrawProgress * 100}%`,
            }}
          />
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
          {milestones.map((milestone, index) => {
            // Spring progress for each milestone's card
            const milestoneProgress = spring({
              frame: frame - milestone.startFrame,
              fps,
              config: DEFAULT_SPRING_CONFIG,
            });

            // Card animation: introduces a slight delay for opacity and transform
            // relative to scale to create a smoother, layered entry.
            const cardOpacity = interpolate(milestoneProgress, [0.1, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const cardTranslateY = interpolate(milestoneProgress, [0.1, 1], [50, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const cardScale = interpolate(milestoneProgress, [0, 1], [0.8, 1], { // Card scales in
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Milestone point (circle) animation: appears with a slight bounce
            // It has its own spring and starts slightly after the card begins animating.
            const pointScaleProgress = spring({
              frame: frame - milestone.startFrame + 10, // Point appears slightly after card
              fps,
              config: BOUNCE_SPRING_CONFIG, // Use the bouncy spring for the point
            });

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl shadow-2xl backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:bg-white/20"
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
                }}
              >
                {/* Milestone Point Circle */}
                <div
                  className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center mb-4 border-2 border-white/50 text-white font-bold shadow-lg" // Added shadow for the point
                  style={{
                    transform: `scale(${interpolate(pointScaleProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" })})`,
                  }}
                >
                  <span className="text-sm">{index + 1}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2 text-teal-300 drop-shadow-md">{milestone.title}</h2>
                <p className="text-lg text-gray-200">{milestone.description}</p>
              </div>
            );
          })}
        </div>

        {/* Rapid Ascent Concluding Text */}
        <p
          className="text-4xl font-semibold text-center mt-20 text-yellow-300 drop-shadow-lg"
          style={{
            opacity: rapidAscentOpacity,
            transform: `translateY(${rapidAscentTranslateY}px)`,
          }}
        >
          A rapid ascent to global stardom!
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Dynamically derive the total duration of the section for better maintainability.
// This calculation ensures the video length matches the end of the last animation, plus a buffer.
export const Early_Life_And_Rise_Duration = (() => {
  const lastMilestone = MILSTONE_DATA[MILSTONE_DATA.length - 1];

  // Calculate the frame when the last milestone's animation finishes.
  const lastMilestoneAnimationEnd = lastMilestone.startFrame + lastMilestone.duration;

  // Calculate the end frame for the "Rapid Ascent" text animation.
  const rapidAscentDisplayEnd =
    lastMilestoneAnimationEnd +
    RAPID_ASCENT_TEXT_DELAY_AFTER_LAST_MILESTONE +
    RAPID_ASCENT_TEXT_ANIMATION_DURATION;

  // Add a final buffer to allow content to linger on screen before the section ends.
  return rapidAscentDisplayEnd + END_BUFFER_FRAMES;
})();

export const Early_Life_And_Rise_Edited = true;
