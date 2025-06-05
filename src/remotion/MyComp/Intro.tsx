// AIWASHERE
// This Intro component provides a modern, sleek, and colorful introduction for the "AP Calculus AB - Unit 1: Limits" video.
// It features animated text elements appearing sequentially with smooth transitions and custom easing.
// The background has subtle animating light elements that add color and dynamism without using images.
// The primary background color subtly shifts, achieved by interpolating numerical RGB values.
// Text elements scale, fade, and translate into view, making the information easy to read and visually engaging.
// All animations rely on Remotion's useCurrentFrame, interpolate, and Easing.bezier for precise control.
// No images or external assets are used, relying solely on CSS (Tailwind) and Remotion's animation capabilities.

import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Animation timings (in frames)
  const titleFadeInStart = 10;
  const titleFadeInEnd = 40;
  const titleMoveUpStart = 40;
  const titleMoveUpEnd = 80;

  const lineFadeInStart = 60;
  const lineFadeInEnd = 90;
  const lineScaleXStart = 70;
  const lineScaleXEnd = 120; // Longer duration for the line to fully scale

  const subtitleFadeInStart = 80;
  const subtitleFadeInEnd = 110;
  const subtitleMoveUpStart = 110;
  const subtitleMoveUpEnd = 150;

  // Opacity for "AP Calculus AB"
  const opacityTitle = interpolate(
    frame,
    [titleFadeInStart, titleFadeInEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.42, 0, 0.58, 1) } // Ease-in-out
  );

  // Vertical movement for "AP Calculus AB" (starts lower, moves up)
  const translateYTitle = interpolate(
    frame,
    [titleMoveUpStart, titleMoveUpEnd],
    [50, 0], // Starts 50px down, moves to 0px
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.68, -0.55, 0.265, 1.55) } // Bouncy effect
  );

  // Opacity for the dividing line
  const opacityLine = interpolate(
    frame,
    [lineFadeInStart, lineFadeInEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.42, 0, 0.58, 1) }
  );

  // Horizontal scale for the dividing line (grows from center)
  const scaleXLine = interpolate(
    frame,
    [lineScaleXStart, lineScaleXEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.68, -0.55, 0.265, 1.55) }
  );

  // Opacity for "Unit 1: Limits"
  const opacitySubtitle = interpolate(
    frame,
    [subtitleFadeInStart, subtitleFadeInEnd],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.42, 0, 0.58, 1) }
  );

  // Vertical movement for "Unit 1: Limits" (starts lower, moves up)
  const translateYSubtitle = interpolate(
    frame,
    [subtitleMoveUpStart, subtitleMoveUpEnd],
    [50, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.68, -0.55, 0.265, 1.55) }
  );

  // Subtle background color interpolation (animating RGB values)
  const bgRed = interpolate(frame, [0, Intro_Duration], [10, 15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bgGreen = interpolate(frame, [0, Intro_Duration], [10, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bgBlue = interpolate(frame, [0, Intro_Duration], [25, 35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Subtle pulse/scale effect on the entire container
  const containerScale = interpolate(
    frame,
    [0, Intro_Duration / 2, Intro_Duration],
    [1, 1.005, 1], // Subtle scale up and back down
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.42, 0, 0.58, 1) }
  );

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: `rgb(${bgRed}, ${bgGreen}, ${bgBlue})`, // Dark blue-gray background
        transform: `scale(${containerScale})`,
      }}
    >
      {/* Dynamic colorful abstract shapes - No images, pure CSS shapes with blur and blend modes */}
      <div
        className="absolute w-72 h-72 bg-blue-500 rounded-full mix-blend-lighten opacity-20 blur-3xl"
        style={{
          top: `${interpolate(frame, [0, Intro_Duration], [20, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          left: `${interpolate(frame, [0, Intro_Duration], [10, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, Intro_Duration], [0.8, 1.2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
        }}
      />
      <div
        className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-lighten opacity-20 blur-3xl"
        style={{
          bottom: `${interpolate(frame, [0, Intro_Duration], [20, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          right: `${interpolate(frame, [0, Intro_Duration], [10, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          transform: `translate(50%, 50%) scale(${interpolate(frame, [0, Intro_Duration], [1.2, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
        }}
      />
      <div
        className="absolute w-80 h-80 bg-pink-500 rounded-full mix-blend-lighten opacity-20 blur-3xl"
        style={{
          top: `${interpolate(frame, [0, Intro_Duration], [80, 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          left: `${interpolate(frame, [0, Intro_Duration], [80, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`,
          transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, Intro_Duration], [0.9, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
        }}
      />

      {/* Main content layer, ensures text is above abstract shapes */}
      <div className="z-10 text-center">
        <h1
          className="text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg"
          style={{
            opacity: opacityTitle,
            transform: `translateY(${translateYTitle}px)`,
          }}
        >
          AP Calculus AB
        </h1>

        <div
          className="w-2/3 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto my-6 rounded-full"
          style={{
            opacity: opacityLine,
            transform: `scaleX(${scaleXLine})`,
          }}
        ></div>

        <p
          className="text-4xl font-semibold text-gray-200"
          style={{
            opacity: opacitySubtitle,
            transform: `translateY(${translateYSubtitle}px)`,
          }}
        >
          Unit 1: Limits
        </p>
      </div>
    </div>
  );
};

export const Intro_Duration = 240; // Duration in frames (8 seconds at 30fps)
export const Intro_Edited = true; // Set to true if the section is edited
