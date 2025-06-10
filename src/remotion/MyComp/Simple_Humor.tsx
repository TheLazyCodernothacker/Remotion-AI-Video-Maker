// AIWASHERE
// This section showcases "Simple Humor" as described in the prompt.
// It features animated text phrases appearing sequentially, highlighting the key characteristics:
// "Elementary Toilet Humor", "Simplistic Visual Gags", "Minimalistic Props", "Repetitive Actions", and "No Comedic Depth".
// The visual elements are now actual images of a "toilet" and a "camera".
// These objects perform basic, repetitive movements to underscore the lack of comedic depth.
// The design is fancy, colorful, sleek, and modern, utilizing a vibrant color palette and
// smooth animations driven by Remotion's spring and interpolate functions.
// It strictly avoids the <Composition> element and ensures all interpolate functions output numbers.

import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing, Img } from 'remotion'; // ADDED Img import

export const Simple_Humor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Custom easing function as specified to avoid Easing.easeOut not a function error
  const customBezierEasing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

  // Background animation
  const bgScale = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 100 },
    from: 0.9,
    to: 1,
    durationInFrames: durationInFrames,
  });

  const bgOpacity = interpolate(frame, [0, 30, durationInFrames - 30, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text data with start and end frames for appearance
  const textData = [
    { text: "Elementary Toilet Humor", start: 30, end: 90, color: "text-yellow-300" },
    { text: "Simplistic Visual Gags", start: 90, end: 150, color: "text-cyan-400" },
    { text: "Minimalistic Props", start: 150, end: 210, color: "text-pink-500" },
    { text: "Repetitive Actions", start: 210, end: 270, color: "text-lime-400" },
    { text: "No Comedic Depth", start: 270, end: 330, color: "text-red-400" },
  ];

  // Function to animate text elements
  const getTextAnimation = (textItem: typeof textData[0]) => {
    const fadeInStart = textItem.start;
    const fadeInEnd = textItem.start + 20; // Fade in over 20 frames
    const fadeOutStart = textItem.end - 20; // Fade out 20 frames before end
    const fadeOutEnd = textItem.end;

    const opacity = interpolate(
      frame,
      [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const translateY = interpolate(
      frame,
      [fadeInStart, fadeInEnd],
      [50, 0], // Starts 50px below, moves up
      { easing: customBezierEasing, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const scale = spring({
        frame: frame - fadeInStart, // Start spring animation when text appears
        fps,
        config: { damping: 10, stiffness: 100 },
        from: 0.8, // Starts smaller
        to: 1, // Ends at normal size
        durationInFrames: 30,
    });

    return { opacity, translateY, scale };
  };

  // Toilet object animation (simple repetitive movement)
  const toiletX = interpolate(
    frame,
    [30, 60, 90, 120, 150, 180, 210, 240, 270, 300], // Keyframes for movement
    [-200, 50, -20, 80, -10, 60, -30, 90, -5, 70], // Jiggle/slide across X axis
    { easing: Easing.ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const toiletRotation = interpolate(
    frame,
    [30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
    [0, 5, -5, 0, 5, -5, 0, 5, -5, 0], // Slight wobble rotation
    { easing: Easing.ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Camera object animation (simple repetitive movement)
  const cameraX = interpolate(
    frame,
    [90, 120, 150, 180, 210, 240, 270, 300], // Keyframes for movement
    [200, -50, 0, 50, -20, 30, -10, 40], // Jiggle/slide across X axis
    { easing: Easing.ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cameraScale = interpolate(
    frame,
    [90, 150, 210, 270, 300],
    [1, 1.1, 0.9, 1, 1.05], // Slight zoom in/out
    { easing: Easing.ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Overall opacity for the props (toilet and camera)
  const objectOpacity = interpolate(frame, [0, 90, 330, 360], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // Image URLs provided by the user
  const skibidiToiletImage = "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/5aa007ca-17c1-4896-8040-f88acc774f67/1881255909/skibidi-toilet-z7k-How-to-play-Skibidi-Toilet-android.jpg";
  const cameraManImage = "https://th.bing.com/th/id/OIP.I2Iuchoxsb99WGYfkYVtewHaNK?pid=ImgDet&w=188&h=333&c=7";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        // Modern, sleek background gradient
        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
        transform: `scale(${bgScale})`,
        opacity: bgOpacity,
      }}
    >
      {/* Toilet Prop - Replaced with actual image */}
      <Img
        src={skibidiToiletImage}
        className="absolute object-contain" // object-contain ensures the tall image fits without cropping
        style={{
          width: 'min(30vw, 200px)', // Adjusted width to accommodate the image
          height: 'min(50vh, 300px)', // Adjusted height to accommodate the image's tall aspect ratio
          bottom: '5%', // Position at the bottom
          left: '20%', // Position on the left side
          transform: `translateX(${toiletX}px) rotate(${toiletRotation}deg)`,
          opacity: objectOpacity,
          // Add a subtle shadow for depth
          filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.5))',
        }}
      />

      {/* Camera Prop - Replaced with actual image */}
      <Img
        src={cameraManImage}
        className="absolute object-contain" // object-contain ensures the tall image fits without cropping
        style={{
          width: 'min(25vw, 150px)', // Adjusted width to accommodate the image
          height: 'min(40vh, 250px)', // Adjusted height to accommodate the image's tall aspect ratio
          top: '5%', // Position at the top
          right: '20%', // Position on the right side
          transform: `translateX(${cameraX}px) scale(${cameraScale})`,
          opacity: objectOpacity,
          // Add a subtle shadow for depth
          filter: 'drop-shadow(0px 5px 10px rgba(0,0,0,0.5))',
        }}
      />

      {/* Render each text phrase with its animation */}
      {textData.map((item, index) => {
        const { opacity, translateY, scale } = getTextAnimation(item);
        return (
          <h1
            key={index}
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg text-center ${item.color}`}
            style={{
              position: 'absolute', // Position absolute to stack them
              top: '50%', // Center vertically
              left: '50%', // Center horizontally
              transform: `translate(-50%, -50%) translateY(${translateY}px) scale(${scale})`, // Centering + animation
              opacity,
              fontFamily: 'Arial, sans-serif', // Use a common sans-serif font
              textShadow: '3px 3px 6px rgba(0,0,0,0.6)', // Enhanced text shadow for readability
              whiteSpace: 'nowrap', // Prevent text from wrapping prematurely
            }}
          >
            {item.text}
          </h1>
        );
      })}
    </div>
  );
};

export const Simple_Humor_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Simple_Humor_Edited = true; // Set to true if the section is edited
