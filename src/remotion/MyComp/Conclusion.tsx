// AIWASHERE
// This Conclusion component serves as a final segment for a video about Microsoft's journey.
// It simplifies the narrative, focusing on the company's evolution from a startup to a global leader,
// and highlights its ongoing commitment to innovation. The component now features a clean, concise
// text presentation and visually incorporates a minimalist Microsoft logo using CSS, in line with
// the principle of avoiding external image assets. It uses Remotion's animation capabilities
// (interpolate, useCurrentFrame) with custom bezier easing for smooth transitions, and Tailwind CSS
// for a modern, colorful, and easy-to-read design.

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Define animation timings
  const totalDuration = durationInFrames; // 360 frames as per Conclusion_Duration
  const fadeInDuration = 30; // General fade-in duration for elements
  const staggerAmount = 15; // Delay between elements appearing

  // Custom easing function
  const customEasing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

  // Function to generate *appear* animations for elements
  const getAppearAnimation = (startTime: number) => {
    const opacity = interpolate(
      frame,
      [startTime, startTime + fadeInDuration],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: customEasing }
    );
    const translateY = interpolate(
      frame,
      [startTime, startTime + fadeInDuration],
      [40, 0], // Elements slide up slightly
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: customEasing }
    );
    const scale = interpolate(
        frame,
        [startTime, startTime + fadeInDuration],
        [0.9, 1], // Elements scale up slightly
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: customEasing }
    );
    // Apply blur for a softer entrance effect
    const blur = interpolate(frame, [startTime, startTime + 10], [5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return { opacity, translateY, scale, blur };
  };

  // --- Animation timings and properties for each element ---

  // Title Animation
  const titleAppearStart = 0;
  const titleAnim = getAppearAnimation(titleAppearStart);

  // Microsoft Logo Animation
  const logoAppearStart = titleAppearStart + fadeInDuration + staggerAmount;
  const logoAnim = getAppearAnimation(logoAppearStart);

  // Main Text Block 1 Animation
  const text1AppearStart = logoAppearStart + fadeInDuration + staggerAmount;
  const text1Anim = getAppearAnimation(text1AppearStart);

  // Main Text Block 2 Animation
  const text2AppearStart = text1AppearStart + fadeInDuration + staggerAmount;
  const text2Anim = getAppearAnimation(text2AppearStart);

  // Final scene fade out (applied to the entire container)
  const finalFadeOutStart = totalDuration - fadeInDuration;
  const finalFadeOutOpacity = interpolate(
    frame,
    [finalFadeOutStart, totalDuration],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: customEasing }
  );

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-10 font-sans"
      style={{
        backgroundColor: '#1E1E2F', // Dark sleek background
        opacity: finalFadeOutOpacity, // Controls overall scene fade out
      }}
    >
      {/* Title */}
      <h1
        className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-12 text-center drop-shadow-lg"
        style={{
          opacity: titleAnim.opacity,
          transform: `translateY(${titleAnim.translateY}px) scale(${titleAnim.scale})`,
          textShadow: '0 0 20px rgba(71, 145, 255, 0.7)', // Subtle blue glow
          filter: `blur(${titleAnim.blur}px)`
        }}
      >
        Microsoft: A Legacy of Innovation
      </h1>

      {/* Microsoft Logo (using CSS divs for the classic four-square design) */}
      <div
        className="flex flex-wrap w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-12" // Responsive size for the logo
        style={{
          opacity: logoAnim.opacity,
          transform: `translateY(${logoAnim.translateY}px) scale(${logoAnim.scale})`,
          filter: `blur(${logoAnim.blur}px)`
        }}
      >
        <div className="w-1/2 h-1/2 bg-red-500"></div>
        <div className="w-1/2 h-1/2 bg-green-500"></div>
        <div className="w-1/2 h-1/2 bg-blue-500"></div>
        <div className="w-1/2 h-1/2 bg-yellow-500"></div>
      </div>

      {/* Main Text Block 1 - Simplified */}
      <p
        className="text-lg md:text-xl lg:text-2xl text-sky-200 text-center max-w-4xl mb-6 leading-relaxed"
        style={{
          opacity: text1Anim.opacity,
          transform: `translateY(${text1Anim.translateY}px) scale(${text1Anim.scale})`,
          filter: `blur(${text1Anim.blur}px)`
        }}
      >
        From a bold startup to a global leader, Microsoft has continuously shaped our digital world, transforming lives with relentless innovation.
      </p>

      {/* Main Text Block 2 - Simplified */}
      <p
        className="text-lg md:text-xl lg:text-2xl text-purple-200 text-center max-w-4xl leading-relaxed"
        style={{
          opacity: text2Anim.opacity,
          transform: `translateY(${text2Anim.translateY}px) scale(${text2Anim.scale})`,
          filter: `blur(${text2Anim.blur}px)`
        }}
      >
        Today, its influence spans cloud, gaming, and productivity. The future promises new possibilities with AI and advanced technologies.
      </p>
    </div>
  );
};

export const Conclusion_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Conclusion_Edited = true; // Set to true if the section is edited
