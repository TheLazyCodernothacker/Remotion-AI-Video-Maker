// AIWASHERE
import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height, width } = useVideoConfig();
  const durationInFrames = 3 * fps; // 3 seconds animation
  const progress = Math.min(1, frame / durationInFrames);

  const scale = interpolate(progress, [0, 1], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(progress, [0, 1], [height / 4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.easeOut,
  });

  const bgColor = `rgba(59, 130, 246, ${opacity})`; // Indigo color
  const textColor = `rgba(255, 255, 255, ${opacity})`;

  return (
    <AbsoluteFill style={{backgroundColor:bgColor}}>
      <AbsoluteFill style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
      }}>
        <div className="text-center">
          <h1 className="text-6xl font-bold" style={{ color: textColor }}>Welcome to MyComp</h1>
          <p className="text-2xl mt-4" style={{ color: textColor }}>
            A sleek and modern Remotion intro.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Intro_Duration = 90; // Duration in frames 30fps, change this to the duration you want for the section
export const Intro_Edited = true; // Set to true if the section is edited
