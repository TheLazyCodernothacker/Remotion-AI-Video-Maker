import React from 'react';
import { useVideoConfig, useCurrentFrame, spring, interpolate } from 'remotion';

export const The_Cloud_First_Era: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // --- Animation timings and values ---

  // Title animation
  const titleSpring = spring({
    frame: frame - 10, // Start slightly after the beginning
    fps,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  const titleTranslateY = interpolate(titleSpring, [0, 1], [50, 0]);

  // Paragraph animation
  const paragraphDelay = 30; // frames after start
  const paragraphSpring = spring({
    frame: frame - paragraphDelay,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    },
  });
  const paragraphOpacity = interpolate(paragraphSpring, [0, 1], [0, 1]);
  const paragraphTranslateX = interpolate(paragraphSpring, [0, 1], [-100, 0]);

  // Cloud emoji animation
  const cloudDelay = 50; // frames after start
  const cloudSpring = spring({
    frame: frame - cloudDelay,
    fps,
    config: {
      damping: 10,
      stiffness: 70,
      mass: 0.8,
    },
  });
  const cloudOpacity = interpolate(cloudSpring, [0, 1], [0, 1]);
  const cloudScale = interpolate(cloudSpring, [0, 1], [0.5, 1]);

  // Floating effect for the main cloud emoji
  const cloudFloatY = interpolate(
    Math.sin(frame / 15), // Slower oscillation
    [-1, 1],
    [-15, 15] // Float up and down by 15px
  );
  const cloudFloatX = interpolate(
    Math.cos(frame / 20), // Different oscillation speed
    [-1, 1],
    [-10, 10] // Float left and right by 10px
  );

  // Background gradient animation
  const backgroundHueShift = interpolate(
    frame,
    [0, durationInFrames],
    [200, 220], // Shift hue slightly from light blue to a slightly different light blue
    { extrapolateRight: 'clamp' }
  );
  const backgroundLightnessShift = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [95, 90, 95], // Subtle pulse in lightness
    { extrapolateRight: 'clamp' }
  );

  // Animated background cloud shapes (more advanced)
  const renderBackgroundClouds = () => {
    const clouds = [];
    const numClouds = 6;
    const cloudStyles = [
      { size: 100, startFrame: 0, endFrame: 200, startX: -100, endX: 1200, top: '10%' },
      { size: 150, startFrame: 50, endFrame: 250, startX: 1200, endX: -100, top: '25%' },
      { size: 80, startFrame: 100, endFrame: 300, startX: -50, endX: 1100, top: '40%' },
      { size: 120, startFrame: 150, endFrame: 350, startX: 1100, endX: -50, top: '55%' },
      { size: 90, startFrame: 200, endFrame: 400, startX: -70, endX: 1150, top: '70%' },
      { size: 130, startFrame: 250, endFrame: 450, startX: 1150, endX: -70, top: '85%' },
    ];

    for (let i = 0; i < numClouds; i++) {
      const { size, startFrame, endFrame, startX, endX, top } = cloudStyles[i];
      const cloudMovement = interpolate(
        frame,
        [startFrame, endFrame],
        [startX, endX],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      const cloudOpacityFade = interpolate(
        frame,
        [startFrame, startFrame + 30, endFrame - 30, endFrame],
        [0, 0.7, 0.7, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      const cloudScalePulse = interpolate(
        Math.sin((frame + i * 10) / 30),
        [-1, 1],
        [0.9, 1.1]
      );

      clouds.push(
        <div
          key={`bg-cloud-${i}`}
          style={{
            position: 'absolute',
            width: size,
            height: size / 2,
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0', // Simpler cloud shape
            background: 'linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.9))',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            filter: 'blur(3px)',
            opacity: cloudOpacityFade,
            left: cloudMovement,
            top: top,
            transform: `scale(${cloudScalePulse})`,
            zIndex: 0, // Ensure it's behind text
          }}
        />
      );
      // Add a second, slightly smaller puff for a more complex cloud shape
      clouds.push(
        <div
          key={`bg-cloud-puff-${i}`}
          style={{
            position: 'absolute',
            width: size * 0.7,
            height: size * 0.4,
            borderRadius: '50%',
            background: 'linear-gradient(to top, rgba(255,255,255,0.7), rgba(255,255,255,1))',
            filter: 'blur(2px)',
            opacity: cloudOpacityFade,
            left: cloudMovement + size * 0.4, // Position relative to main cloud
            top: `calc(${top} + ${size * 0.15}px)`,
            transform: `scale(${cloudScalePulse})`,
            zIndex: 0,
          }}
        />
      );
    }
    return clouds;
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        background: `linear-gradient(135deg, hsl(${backgroundHueShift}, 100%, ${backgroundLightnessShift}%), hsl(${backgroundHueShift + 20}, 80%, ${backgroundLightnessShift + 5}%))`,
        color: '#263238',
        fontFamily: 'Roboto, sans-serif', // Changed font for a modern feel
        textAlign: 'center',
        padding: '40px',
        boxSizing: 'border-box',
        position: 'relative', // For absolute positioning of background clouds
        overflow: 'hidden', // Crucial to hide elements moving off screen
      }}
    >
      {/* Animated background clouds */}
      {renderBackgroundClouds()}

      <h1
        style={{
          fontSize: '5em',
          fontWeight: 'bold',
          color: '#0288d1',
          marginBottom: '0.4em',
          textShadow: '2px 2px 4px rgba(0,0,0,0.15)',
          opacity: titleOpacity,
          transform: `scale(${titleScale}) translateY(${titleTranslateY}px)`,
          zIndex: 1, // Ensure text is above background clouds
        }}
      >
        The Cloud First Era
      </h1>
      <p
        style={{
          fontSize: '1.8em',
          maxWidth: '800px',
          lineHeight: '1.5',
          margin: '0 auto 2em auto',
          color: '#455a64',
          opacity: paragraphOpacity,
          transform: `translateX(${paragraphTranslateX}px)`,
          zIndex: 1,
        }}
      >
        A transformative shift towards cloud computing as the primary platform for delivering services, applications, and infrastructure.
        It signifies a move away from traditional on-premises solutions to scalable, flexible, and cost-effective cloud-based systems.
      </p>
      <div
        style={{
          fontSize: '8em',
          color: '#81d4fa',
          opacity: cloudOpacity,
          transform: `scale(${cloudScale}) translateX(${cloudFloatX}px) translateY(${cloudFloatY}px)`,
          zIndex: 1,
          filter: `drop-shadow(0px 5px 10px rgba(0,0,0,0.1))` // Add a subtle shadow to the emoji
        }}
      >
        ☁️
      </div>
    </div>
  );
};

export const The_Cloud_First_Era_Duration = 360; // Duration in frames at 30fps (12 seconds)
export const The_Cloud_First_Era_Edited = true; // This section has been fully customized
export const The_Cloud_First_Era_Description = `The Cloud First Era represents a transformative shift in how we approach technology and innovation. This era is characterized by the adoption of cloud computing as the primary platform for delivering services, applications, and infrastructure. It signifies a move away from traditional on-premises solutions to scalable, flexible, and cost-effective cloud-based systems.`;
