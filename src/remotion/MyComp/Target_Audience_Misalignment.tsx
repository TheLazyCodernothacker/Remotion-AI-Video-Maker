// AIWASHERE
// This section, Target_Audience_Misalignment, vividly portrays the jarring dissonance between a series' violent themes and its unexpected popularity among young children.
// It uses a combination of dynamic text overlays to convey the core message and abstract, animated geometric shapes.
// The shapes are designed to symbolize the contrast: some move fluidly with playful, bright colors, while others are sharp, move erratically, and feature dark or jarring hues.
// Animations leverage Remotion's 'interpolate' and 'Easing.bezier' to create smooth and abrupt transitions, enhancing the sense of misalignment.
// The background subtly shifts its lightness, creating a modern and sleek visual experience without relying on images.
// All elements are positioned and animated using Tailwind CSS classes for a clean and responsive design, ensuring no external files are used beyond existing desktop capabilities.

import React from "react";
import { useVideoConfig, useCurrentFrame, interpolate, Easing } from "remotion";

export const Target_Audience_Misalignment: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Background color interpolation for a sleek gradient shift
  // We interpolate a numerical value (lightness for HSL) and use it in a CSS linear-gradient string.
  const gradientLightnessStart = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [65, 80, 65], // Lightness percentage for HSL
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Text messages and their display frames
  const messages = [
    { text: "Violent Themes.", start: 0, end: 90 }, // 0-3 seconds
    { text: "Young Audiences.", start: 60, end: 150 }, // 2-5 seconds
    { text: "A disturbing paradox.", start: 120, end: 240 }, // 4-8 seconds
    { text: "Where playful meets perilous.", start: 210, end: 360 }, // 7-12 seconds
  ];

  // Function to get text opacity
  const getTextOpacity = (msgStart: number, msgEnd: number) => {
    return interpolate(
      frame,
      [msgStart, msgStart + 30, msgEnd - 30, msgEnd],
      [0, 1, 1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom easing for text fade
      }
    );
  };

  // Function to get text Y position (slide in from top)
  const getTextY = (msgStart: number, msgEnd: number) => {
    return interpolate(
      frame,
      [msgStart, msgStart + 30, msgEnd - 30, msgEnd],
      [-50, 0, 0, 50],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom easing for text slide
      }
    );
  };

  // --- Shape Animations ---

  // Playful Square 1
  const playfulSq1X = interpolate(frame, [0, 120, 240, 360], [100, 600, 200, 900], { easing: Easing.ease });
  const playfulSq1Y = interpolate(frame, [0, 120, 240, 360], [50, 400, 100, 500], { easing: Easing.bezier(0.65, 0.05, 0.36, 1) });
  const playfulSq1Scale = interpolate(frame, [0, 60, 180, 300, 360], [0, 1, 0.8, 1.2, 0], { easing: Easing.ease });
  const playfulSq1Rotate = interpolate(frame, [0, 360], [0, 360], { easing: Easing.linear });
  const playfulSq1Opacity = interpolate(frame, [0, 30, 330, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Jarring Triangle 1 (using border hack for triangle shape)
  const jarringTri1X = interpolate(frame, [0, 90, 180, 270, 360], [1200, 700, 1000, 500, -100], { easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }); // erratic movement
  const jarringTri1Y = interpolate(frame, [0, 90, 180, 270, 360], [600, 200, 500, 150, 700], { easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) });
  const jarringTri1Scale = interpolate(frame, [0, 30, 150, 280, 360], [0, 1.5, 0.7, 1.3, 0], { easing: Easing.bezier(0.19, 1, 0.22, 1) });
  const jarringTri1Rotate = interpolate(frame, [0, 360], [0, 720], { easing: Easing.linear });
  const jarringTri1Opacity = interpolate(frame, [0, 30, 330, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Playful Circle 1
  const playfulCir1X = interpolate(frame, [0, 150, 300, 360], [0, 800, 300, 1200], { easing: Easing.ease });
  const playfulCir1Y = interpolate(frame, [0, 150, 300, 360], [800, 100, 600, -100], { easing: Easing.bezier(0.5, 0, 0, 1) });
  const playfulCir1Scale = interpolate(frame, [0, 90, 210, 360], [0, 1.5, 0.9, 0], { easing: Easing.ease });
  const playfulCir1Opacity = interpolate(frame, [0, 30, 330, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Jarring Square 2 (erratic motion and scaling)
  const jarringSq2X = interpolate(frame, [0, 100, 200, 300, 360], [50, 900, 100, 700, -100], { easing: Easing.bezier(0.68, -0.55, 0.27, 1.55) }); // super jarring
  const jarringSq2Y = interpolate(frame, [0, 100, 200, 300, 360], [500, 50, 400, 100, 500], { easing: Easing.bezier(0.68, -0.55, 0.27, 1.55) });
  const jarringSq2Scale = interpolate(frame, [0, 30, 120, 240, 360], [0, 1, 0.5, 1.5, 0], { easing: Easing.bezier(0.42, 0, 0.58, 1) }); // Custom easing
  const jarringSq2Rotate = interpolate(frame, [0, 360], [0, -1080], { easing: Easing.linear });
  const jarringSq2Opacity = interpolate(frame, [0, 30, 330, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Playful Diamond (rotated square)
  const playfulDiamondX = interpolate(frame, [0, 180, 360], [1000, 300, -100], { easing: Easing.ease });
  const playfulDiamondY = interpolate(frame, [0, 180, 360], [100, 500, 200], { easing: Easing.ease });
  const playfulDiamondScale = interpolate(frame, [0, 60, 200, 360], [0, 1, 0.8, 0], { easing: Easing.ease });
  const playfulDiamondRotate = interpolate(frame, [0, 360], [45, 405], { easing: Easing.linear }); // Start at 45 deg for diamond shape
  const playfulDiamondOpacity = interpolate(frame, [0, 30, 330, 360], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        // A sleek, subtle gradient from a muted blue to a soft purple, with dynamic lightness.
        background: `linear-gradient(135deg, hsl(200, 80%, ${gradientLightnessStart}%) 0%, hsl(280, 70%, 70%) 100%)`,
      }}
    >
      {/* Playful Square 1 - Muted Blue */}
      <div
        className="absolute w-40 h-40 bg-blue-300 rounded-lg"
        style={{
          left: playfulSq1X,
          top: playfulSq1Y,
          opacity: playfulSq1Opacity,
          transform: `scale(${playfulSq1Scale}) rotate(${playfulSq1Rotate}deg)`,
        }}
      />

      {/* Jarring Triangle 1 - Dark Red */}
      <div
        className="absolute"
        style={{
          left: jarringTri1X,
          top: jarringTri1Y,
          opacity: jarringTri1Opacity,
          transform: `scale(${jarringTri1Scale}) rotate(${jarringTri1Rotate}deg)`,
          width: 0,
          height: 0,
          borderLeft: "80px solid transparent",
          borderRight: "80px solid transparent",
          borderBottom: "160px solid rgb(128, 0, 0)", // Dark red, jarring
        }}
      />

      {/* Playful Circle 1 - Soft Pink */}
      <div
        className="absolute w-32 h-32 bg-pink-300 rounded-full"
        style={{
          left: playfulCir1X,
          top: playfulCir1Y,
          opacity: playfulCir1Opacity,
          transform: `scale(${playfulCir1Scale})`,
        }}
      />

      {/* Jarring Square 2 - Dark Gray */}
      <div
        className="absolute w-60 h-60 bg-gray-800" // Dark gray, jarring
        style={{
          left: jarringSq2X,
          top: jarringSq2Y,
          opacity: jarringSq2Opacity,
          transform: `scale(${jarringSq2Scale}) rotate(${jarringSq2Rotate}deg)`,
        }}
      />

      {/* Playful Diamond - Warm Yellow */}
      <div
        className="absolute w-48 h-48 bg-yellow-300"
        style={{
          left: playfulDiamondX,
          top: playfulDiamondY,
          opacity: playfulDiamondOpacity,
          transform: `scale(${playfulDiamondScale}) rotate(${playfulDiamondRotate}deg)`,
        }}
      />

      {/* Another Jarring shape (thin, fast-moving rectangle) - Vibrant Lime */}
      <div
        className="absolute w-2 h-40 bg-lime-500" // Bright, almost neon lime, jarring
        style={{
          left: interpolate(frame, [0, 60, 120, 180, 240, 300, 360], [10, 1100, 200, 900, 300, 800, -100], { easing: Easing.bezier(0.16, 1, 0.3, 1.24) }),
          top: interpolate(frame, [0, 60, 120, 180, 240, 300, 360], [700, 50, 600, 100, 500, 200, 700], { easing: Easing.bezier(0.16, 1, 0.3, 1.24) }),
          opacity: interpolate(frame, [0, 10, 350, 360], [0, 1, 1, 0]),
          transform: `rotate(${interpolate(frame, [0, 360], [0, 1080], { easing: Easing.linear })}deg)`,
        }}
      />

      {/* Text Overlays */}
      {messages.map((msg, index) => (
        <h1
          key={index}
          className="absolute w-full text-center font-extrabold text-white"
          style={{
            fontSize: "6rem", // Large, modern font size for impact
            lineHeight: "1.2",
            opacity: getTextOpacity(msg.start, msg.end),
            transform: `translateY(${getTextY(msg.start, msg.end)}px)`,
            textShadow: "4px 4px 8px rgba(0,0,0,0.4)", // Sleek shadow for readability and depth
            top: "35%", // Vertically centered
          }}
        >
          {msg.text}
        </h1>
      ))}
    </div>
  );
};

export const Target_Audience_Misalignment_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Target_Audience_Misalignment_Edited = true; // Set to true if the section is edited
