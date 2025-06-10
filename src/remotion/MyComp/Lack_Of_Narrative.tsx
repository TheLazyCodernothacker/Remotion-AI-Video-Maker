// AIWASHERE
// This component visually represents the "Lack of Narrative" concept as described.
// It uses on-screen text to directly explain the absence of meaningful plot,
// character development, or overarching story arcs in the series.
// To symbolize this narrative void, instances of the provided image are used,
// appearing and moving aimlessly without clear paths or resolutions,
// floating against an expansive empty background to emphasize the absence of structure.
// The design prioritizes a fancy, colorful, sleek, modern, and easy-to-read aesthetic
// through the use of vibrant colors, clean typography, and subtle animations, all
// implemented exclusively with Remotion's core features and Tailwind CSS.
// The specified image is used, replacing previous abstract shapes to symbolize the narrative void.

import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img } from 'remotion'; // Added Img import

export const Lack_Of_Narrative: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Define the image URL as requested
  const skibidiToiletImage = 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/6a049550-6fe8-4c65-b7f8-19c030678238/2093367348/skibidi-toilet-tips-screenshot.png';

  // --- Main Text Animation ---
  const textOpacity = interpolate(
    frame,
    [0, 30, durationInFrames - 60, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom easing for smooth appearance/disappearance
    }
  );

  const textTranslateY = interpolate(
    frame,
    [0, 30, durationInFrames - 60, durationInFrames],
    [50, 0, 0, -50], // Moves up slightly on enter, down slightly on exit
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // --- Image Animations ---
  // Each image instance has independent, non-resolving animations for opacity, position, scale, and rotation.
  // This aims to create a feeling of aimless movement, symbolizing a lack of narrative direction.

  // Image 1 (replaces original Shape 1)
  const image1Opacity = interpolate(
    frame,
    [0, 45, durationInFrames / 2, durationInFrames - 30],
    [0, 0.6, 0.6, 0], // Fades in, stays, fades out
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.7, 0.1, 0.9, 0.5),
    }
  );
  const image1Transform = `
    translateX(${interpolate(frame, [0, 90, 180, 270, durationInFrames], [-200, 100, -50, 200, -300], { easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) })}px)
    translateY(${interpolate(frame, [0, 60, 150, 240, durationInFrames], [200, -100, 50, -200, 100], { easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) })}px)
    scale(${interpolate(frame, [0, 120, 240, durationInFrames], [0.5, 1.2, 0.8, 0.3], { easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) })})
    rotate(${interpolate(frame, [0, durationInFrames], [0, 360], { easing: Easing.linear })}deg)
  `;

  // Image 2 (replaces original Shape 2)
  const image2Opacity = interpolate(
    frame,
    [60, 105, durationInFrames / 2 + 60, durationInFrames],
    [0, 0.7, 0.7, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.7, 0.1, 0.9, 0.5),
    }
  );
  const image2Transform = `
    translateX(${interpolate(frame, [60, 150, 240, 300, durationInFrames], [300, -150, 100, -200, 50], { easing: Easing.bezier(0.645, 0.045, 0.355, 1) })}px)
    translateY(${interpolate(frame, [60, 120, 210, 280, durationInFrames], [-100, 200, -50, 100, -200], { easing: Easing.bezier(0.645, 0.045, 0.355, 1) })}px)
    scale(${interpolate(frame, [60, 180, durationInFrames], [0.7, 1.1, 0.4], { easing: Easing.bezier(0.645, 0.045, 0.355, 1) })})
    rotate(${interpolate(frame, [60, durationInFrames], [0, -270], { easing: Easing.linear })}deg)
  `;

  // Image 3 (replaces original Shape 3)
  const image3Opacity = interpolate(
    frame,
    [120, 165, durationInFrames - 60, durationInFrames - 15],
    [0, 0.5, 0.5, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.7, 0.1, 0.9, 0.5),
    }
  );
  const image3Transform = `
    translateX(${interpolate(frame, [120, 200, 280, durationInFrames], [0, 250, -100, 150], { easing: Easing.bezier(0.895, 0.03, 0.685, 0.22) })}px)
    translateY(${interpolate(frame, [120, 180, 250, durationInFrames], [0, -150, 100, -50], { easing: Easing.bezier(0.895, 0.03, 0.685, 0.22) })}px)
    scale(${interpolate(frame, [120, 240, durationInFrames], [0.6, 1.3, 0.5], { easing: Easing.bezier(0.895, 0.03, 0.685, 0.22) })})
    rotate(${interpolate(frame, [120, durationInFrames], [0, 180], { easing: Easing.linear })}deg)
  `;

  // Image 4 (replaces original Shape 4)
  const image4Opacity = interpolate(frame, [180, 225, durationInFrames - 15], [0, 0.4, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.7, 0.1, 0.9, 0.5) });
  const image4Transform = `
    translateX(${interpolate(frame, [180, durationInFrames], [0, 150])}px)
    translateY(${interpolate(frame, [180, durationInFrames], [0, -100])}px)
    scale(${interpolate(frame, [180, durationInFrames], [0.8, 1.1])})
    rotate(${interpolate(frame, [180, durationInFrames], [0, 90])}deg)
  `;

  // Image 5 (replaces original Shape 5)
  const image5Opacity = interpolate(frame, [240, 285, durationInFrames], [0, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.7, 0.1, 0.9, 0.5) });
  const image5Transform = `
    translateX(${interpolate(frame, [240, durationInFrames], [-100, 50])}px)
    translateY(${interpolate(frame, [240, durationInFrames], [0, 120])}px)
    scale(${interpolate(frame, [240, durationInFrames], [0.9, 1.2])})
    rotate(${interpolate(frame, [240, durationInFrames], [0, -45])}deg)
  `;


  return (
    <div className="w-full h-full bg-neutral-950 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Images: Positioned absolutely for visual interest and narrative void symbolism */}
      {/* Images are given 'object-cover' to ensure they fill their specified dimensions, and 'rounded-md' for a softer look */}
      {/* Dimensions adjusted to reflect a wide rectangular image (width is double the height) */}
      <Img
        src={skibidiToiletImage}
        className="absolute top-1/4 left-1/4 w-64 h-32 object-cover rounded-md" // Changed from w-32 h-32
        style={{
          opacity: image1Opacity,
          transform: image1Transform,
        }}
      />
      <Img
        src={skibidiToiletImage}
        className="absolute bottom-1/4 right-1/4 w-80 h-40 object-cover rounded-md" // Changed from w-40 h-40
        style={{
          opacity: image2Opacity,
          transform: image2Transform,
        }}
      />
      <Img
        src={skibidiToiletImage}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-24 object-cover rounded-md" // Changed from w-24 h-24
        style={{
          opacity: image3Opacity,
          transform: image3Transform,
        }}
      />
      <Img
        src={skibidiToiletImage}
        className="absolute top-1/3 left-1/3 w-40 h-20 object-cover rounded-md" // Changed from w-20 h-20
        style={{
          opacity: image4Opacity,
          transform: image4Transform,
        }}
      />
      <Img
        src={skibidiToiletImage}
        className="absolute bottom-1/3 right-1/3 w-32 h-16 object-cover rounded-md" // Changed from w-16 h-16
        style={{
          opacity: image5Opacity,
          transform: image5Transform,
        }}
      />


      {/* Main Text Content: Centered and animated for focus */}
      <div
        className="text-center max-w-3xl relative z-10" // z-10 ensures text is above images
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
        }}
      >
        <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          A Narrative Void
        </h1>
        <p className="text-3xl text-gray-300 font-light drop-shadow-md">
          This series intentionally lacks a meaningful plot, character development, or overarching story arcs.
          Instances of the provided image, alongside expansive empty space, serve as symbols for this narrative absence,
          reflecting a world without clear progression or ultimate resolution.
        </p>
      </div>
    </div>
  );
};

export const Lack_Of_Narrative_Duration = 360; // Duration in frames (30fps, 12 seconds)
export const Lack_Of_Narrative_Edited = true; // Set to true if the section is edited
