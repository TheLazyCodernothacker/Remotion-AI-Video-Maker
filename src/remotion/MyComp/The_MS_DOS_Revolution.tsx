// AIWASHERE
// This Remotion component visualizes "The MS-DOS Revolution," a pivotal moment in computing history.
// It narrates the strategic partnership between Microsoft and IBM, highlighting the licensing of MS-DOS
// and its subsequent establishment as the foundational operating system for personal computers.
// The animation uses sleek, modern design elements, vibrant colors, and smooth transitions
// to emphasize widespread adoption and the monumental impact of this deal, without relying on images.
// All animations are carefully crafted using Remotion's `useCurrentFrame` and `interpolate` functions
// with custom bezier easing for a dynamic and engaging visual experience.
// The design leverages Tailwind CSS for styling and ensures all Remotion best practices are followed
// to prevent common errors related to interpolation, easing, and component structure.

import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, Easing } from 'remotion';

export const The_MS_DOS_Revolution: React.FC = () => {
  const frame = useCurrentFrame();

  // Define keyframes for various elements' appearance and disappearance
  const titleAppearStart = 0;
  const titleAppearEnd = 90; // Title visible for 3 seconds

  const microsoftIbmTransitionStart = 120;
  const microsoftIbmTransitionEnd = 300; // Microsoft/IBM scene visible

  const msDosLicensingStart = 330;
  const msDosLicensingEnd = 540; // MS-DOS Licensing scene visible

  const foundationalOsStart = 570;
  const foundationalOsEnd = 780; // Foundational OS scene visible

  const impactStart = 810;
  const impactEnd = 900; // Impact scene visible until the end

  // -- Animations --

  // Title "The MS-DOS Revolution"
  const titleOpacity = interpolate(
    frame,
    [titleAppearStart, titleAppearStart + 30, titleAppearEnd - 30, titleAppearEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom bezier easing for sleekness
    }
  );
  const titleScale = interpolate(
    frame,
    [titleAppearStart, titleAppearStart + 30],
    [0.8, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Microsoft and IBM elements
  const microsoftOffset = interpolate(
    frame,
    [microsoftIbmTransitionStart, microsoftIbmTransitionStart + 60],
    [-200, 0], // Moves from left to center
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const ibmOffset = interpolate(
    frame,
    [microsoftIbmTransitionStart, microsoftIbmTransitionStart + 60],
    [200, 0], // Moves from right to center
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const partnershipTextOpacity = interpolate(
    frame,
    [microsoftIbmTransitionStart + 60, microsoftIbmTransitionStart + 90, microsoftIbmTransitionEnd - 30, microsoftIbmTransitionEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // MS-DOS Licensing
  const msDosLicensingOpacity = interpolate(
    frame,
    [msDosLicensingStart, msDosLicensingStart + 30, msDosLicensingEnd - 30, msDosLicensingEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const msDosLicensingScale = interpolate(
    frame,
    [msDosLicensingStart, msDosLicensingStart + 30],
    [0.9, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Foundational OS
  const foundationalTextOpacity = interpolate(
    frame,
    [foundationalOsStart, foundationalOsStart + 30, foundationalOsEnd - 30, foundationalOsEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Dynamic bar fill for "Widespread Adoption"
  const barWidth = interpolate(
    frame,
    [foundationalOsStart + 60, foundationalOsStart + 180],
    [0, 100], // 0% to 100% width
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Impact/Conclusion
  const impactTextOpacity = interpolate(
    frame,
    [impactStart, impactStart + 30, impactEnd - 30, impactEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const impactTextScale = interpolate(
    frame,
    [impactStart, impactStart + 30],
    [0.95, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // Background color interpolation (from dark tech blue to a slightly lighter blue over time)
  // Ensures outputRange contains only numbers for each RGB channel
  const bgColorR = interpolate(frame, [0, 900], [20, 25], { extrapolateRight: 'clamp' });
  const bgColorG = interpolate(frame, [0, 900], [20, 30], { extrapolateRight: 'clamp' });
  const bgColorB = interpolate(frame, [0, 900], [40, 50], { extrapolateRight: 'clamp' });
  const dynamicBgColor = `rgb(${bgColorR}, ${bgColorG}, ${bgColorB})`;

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center p-8 font-sans" style={{ backgroundColor: dynamicBgColor }}>
      {/* Global background gradient overlay for depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at center, rgba(30,30,50,0.8) 0%, rgba(10,10,20,0.9) 100%)`,
        }}
      ></div>

      {/* Title Scene - Text is centered via 'top-1/2 left-1/2' and 'transform: translate(-50%, -50%)' */}
      <div
        className="absolute top-1/2 left-1/2 text-center" // Removed redundant translate classes
        style={{
          opacity: titleOpacity,
          transform: `translate(-50%, -50%) scale(${titleScale})`, // Handles centering
          // Conditionally render to optimize performance when not visible
          display: frame < titleAppearStart || frame >= titleAppearEnd ? 'none' : 'block',
        }}
      >
        <h1 className="text-6xl font-extrabold text-teal-400 drop-shadow-lg leading-tight tracking-wide">
          The MS-DOS Revolution
        </h1>
        <p className="text-2xl text-blue-300 mt-4 font-light italic">
          A Visual Narrative
        </p>
      </div>

      {/* Microsoft & IBM Partnership Scene - Content is centered via 'flex items-center justify-center' on the container */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-8"
        style={{
          opacity: partnershipTextOpacity, // Controls overall scene opacity
          display: frame < microsoftIbmTransitionStart || frame >= microsoftIbmTransitionEnd ? 'none' : 'flex',
        }}
      >
        <div
          className="p-8 bg-blue-700 bg-opacity-70 rounded-xl shadow-2xl flex items-center justify-center transform"
          style={{ transform: `translateX(${microsoftOffset}px)` }}
        >
          <span className="text-5xl font-bold text-white">Microsoft</span>
        </div>
        <div
          className="text-7xl font-bold text-purple-400 drop-shadow-md"
          style={{ opacity: interpolate(frame, [microsoftIbmTransitionStart + 60, microsoftIbmTransitionStart + 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.8, 0.22, 0.96, 0.65) }) }}
        >
          🤝
        </div>
        <div
          className="p-8 bg-indigo-700 bg-opacity-70 rounded-xl shadow-2xl flex items-center justify-center transform"
          style={{ transform: `translateX(${ibmOffset}px)` }}
        >
          <span className="text-5xl font-bold text-white">IBM</span>
        </div>
      </div>

      {/* MS-DOS Licensing Scene - Text is centered via 'top-1/2 left-1/2' and 'transform: translate(-50%, -50%)' */}
      <div
        className="absolute top-1/2 left-1/2 text-center" // Removed redundant translate classes
        style={{
          opacity: msDosLicensingOpacity,
          transform: `translate(-50%, -50%) scale(${msDosLicensingScale})`, // Handles centering
          display: frame < msDosLicensingStart || frame >= msDosLicensingEnd ? 'none' : 'block',
        }}
      >
        <div className="p-10 bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl shadow-glow">
          <p className="text-4xl text-white mb-4 font-semibold italic">The pivotal deal:</p>
          <h2 className="text-7xl font-extrabold text-yellow-300 leading-tight">
            MS-DOS
          </h2>
          <p className="text-5xl text-blue-200 mt-2 font-medium">
            Licensed to IBM
          </p>
          <p className="text-3xl text-gray-100 mt-6 font-light">
            A foundational step for personal computing.
          </p>
        </div>
      </div>

      {/* Foundational OS Scene - Content is centered via 'flex flex-col items-center justify-center' on the container */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-8"
        style={{
          opacity: foundationalTextOpacity,
          display: frame < foundationalOsStart || frame >= foundationalOsEnd ? 'none' : 'flex',
        }}
      >
        <h2 className="text-5xl font-bold text-pink-400 mb-8 drop-shadow-lg">
          Establishing the Foundation
        </h2>
        <div className="flex flex-col gap-6 items-center w-3/4 max-w-4xl">
          <div className="text-3xl text-gray-200 font-medium w-full text-center">
            Rapid Widespread Adoption
          </div>
          <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${barWidth}%` }} // Bar width controlled by interpolation
            ></div>
          </div>
          <p className="text-2xl text-blue-300 mt-4 text-center max-w-2xl">
            MS-DOS became the bedrock for millions of personal computers, paving the way for software innovation.
          </p>
        </div>
      </div>

      {/* Impact/Conclusion Scene - Text is centered via 'top-1/2 left-1/2' and 'transform: translate(-50%, -50%)' */}
      <div
        className="absolute top-1/2 left-1/2 text-center" // Removed redundant translate classes
        style={{
          opacity: impactTextOpacity,
          transform: `translate(-50%, -50%) scale(${impactTextScale})`, // Handles centering
          display: frame < impactStart || frame >= impactEnd ? 'none' : 'block',
        }}
      >
        <h2 className="text-6xl font-extrabold text-lime-400 leading-tight drop-shadow-lg">
          The PC Era Unlocked
        </h2>
        <p className="text-3xl text-cyan-300 mt-4 font-light italic max-w-3xl">
          Microsoft's strategic move defined the operating system standard for decades.
        </p>
        <p className="text-xl text-gray-200 mt-8 font-light">
          A legacy of innovation and accessibility.
        </p>
      </div>

      {/* Decorative particles/glow for fancy look (subtle movement) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle at ${interpolate(frame, [0, 900], [20, 80], { extrapolateRight: 'clamp' })}% ${interpolate(frame, [0, 900], [20, 80], { extrapolateRight: 'clamp' })}%, rgba(0,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at ${interpolate(frame, [0, 900], [80, 20], { extrapolateRight: 'clamp' })}% ${interpolate(frame, [0, 900], [80, 20], { extrapolateRight: 'clamp' })}%, rgba(255,0,255,0.05) 0%, transparent 50%)
          `,
        }}
      ></div>
    </AbsoluteFill>
  );
};

export const The_MS_DOS_Revolution_Duration = 900; // Duration in frames (30 seconds at 30fps)
export const The_MS_DOS_Revolution_Edited = true; // Set to true if the section is edited
