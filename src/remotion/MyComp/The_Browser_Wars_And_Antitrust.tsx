// AIWASHERE
// This section animates the historical "Browser Wars" between Internet Explorer and Netscape Navigator,
// transitioning into the significant antitrust challenges Microsoft faced.
// It uses sleek, modern, and colorful animations with text and simple shapes (represented by div elements)
// to convey the narrative without using any images.
// All animations are carefully timed and use specific bezier easing as requested.
// The background is a dark, modern gradient, and text elements use complementary colors
// like white, yellow, and red for visual impact and readability.
import React, { useMemo } from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  Easing
} from 'remotion';

// Centralized Timing Constants for better readability and easier adjustment
const TIMINGS = {
  // Browser Wars Title animation frames
  // Modified to include disappearStart and disappearEnd for fade-out
  browserWarsTitle: { fadeIn: 0, fadeOut: 30, disappearStart: 160, disappearEnd: 190 },
  // Internet Explorer & Netscape Navigator appearance/disappearance frames
  browserEnter: 45,
  browserPeak: 90,
  browserExitStart: 150,
  browserExitEnd: 180,
  // "VS" text animation frames
  vsText: { appearStart: 100, appearEnd: 130, exitStart: 150, exitEnd: 180 },
  // "And Antitrust" transition text frames
  andAntitrust: { fadeIn: 150, fadeOut: 180, displayEnd: 210 },
  // Antitrust Challenges Title animation frames
  antitrustTitle: { fadeIn: 190, fadeOut: 220 },
  // Antitrust Details text sequential appearance frames
  detail1: { fadeIn: 230, fadeOut: 260 },
  detail2: { fadeIn: 270, fadeOut: 300 },
  detail3: { fadeIn: 310, fadeOut: 340 },
};

// Define colors for consistency and easier modification
const COLORS = {
  internetExplorer: '29, 78, 216', // Tailwind blue-700 equivalent RGB
  netscapeNavigator: '234, 88, 12', // Tailwind orange-600 equivalent RGB
  vsText: 'rgb(250, 204, 21)', // Tailwind yellow-400
  antitrustTitle: 'rgb(239, 68, 68)', // Tailwind red-500
  white: 'rgb(255, 255, 255)',
  gray: 'rgb(209, 213, 219)', // Tailwind gray-300
  darkGray: 'rgb(229, 231, 235)', // Tailwind gray-200
};

// Custom Easing function constant, used universally across interpolations
const CUSTOM_BEZIER_EASING = Easing.bezier(0.8, 0.22, 0.96, 0.65);

/**
 * Helper function to simplify common interpolate patterns with custom easing.
 * Ensures consistent extrapolation and applies the custom easing.
 * @param currentFrame - The current frame number.
 * @param inputRange - Array of input frames.
 * @param outputRange - Array of output values corresponding to input frames.
 * @param options - Additional options for interpolate.
 */
const getInterpolatedValue = (
  currentFrame: number,
  inputRange: number[],
  outputRange: number[],
  options?: object
) => {
  return interpolate(currentFrame, inputRange, outputRange, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: CUSTOM_BEZIER_EASING,
    ...options,
  });
};

// --- Reusable Components for better organization and reduced clutter ---

interface AnimatedTitleProps {
  text: string;
  // Updated timing interface to include optional disappear frames
  timing: {
    fadeIn: number;
    fadeOut: number; // This now represents the end of the fade-in (full opacity)
    disappearStart?: number; // New: optional frame to start fade-out
    disappearEnd?: number;   // New: optional frame to end fade-out (fully hidden)
  };
  color: string;
  className?: string;
  verticalPosition?: string; // e.g., '25%', '50%'
  transformOffset?: string; // e.g., 'translateY(-150px)'
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  timing,
  color,
  className = '',
  verticalPosition = '50%',
  transformOffset = '',
}) => {
  const frame = useCurrentFrame();

  const styles = useMemo(() => {
    let opacity: number;
    // Check if disappear frames are provided for full fade-in/fade-out
    if (timing.disappearStart !== undefined && timing.disappearEnd !== undefined) {
      opacity = getInterpolatedValue(
        frame,
        [timing.fadeIn, timing.fadeOut, timing.disappearStart, timing.disappearEnd],
        [0, 1, 1, 0] // Fade in (0 to 1), stay at 1, then fade out (1 to 0)
      );
    } else {
      // Original behavior: only fade-in
      opacity = getInterpolatedValue(frame, [timing.fadeIn, timing.fadeOut], [0, 1]);
    }

    const scale = getInterpolatedValue(frame, [timing.fadeIn, timing.fadeOut], [0.8, 1]);
    return {
      opacity,
      transform: `translate(-50%, -50%) scale(${scale}) ${transformOffset}`,
      top: verticalPosition,
      left: '50%',
      color: color,
    };
  }, [frame, timing, color, verticalPosition, transformOffset]);

  return (
    <h1
      className={`absolute text-6xl md:text-7xl font-extrabold text-center drop-shadow-lg ${className}`}
      style={styles}
    >
      {text}
    </h1>
  );
};

interface BrowserShapeProps {
  text: string;
  timing: { enter: number; peak: number; exitStart: number; exitEnd: number };
  baseColor: string; // e.g., '29, 78, 216'
  direction: 'left' | 'right';
}

const BrowserShape: React.FC<BrowserShapeProps> = ({
  text,
  timing,
  baseColor,
  direction,
}) => {
  const frame = useCurrentFrame();

  const styles = useMemo(() => {
    // Adjusted these values to provide more space and ensure they come from further off-screen.
    const startTranslate = direction === 'left' ? -600 : 600; // Increased from 400
    const peakTranslate = direction === 'left' ? -250 : 250; // Increased from 100 to avoid collision with 'VS'

    const translateX = getInterpolatedValue(
      frame,
      [timing.enter, timing.peak],
      [startTranslate, peakTranslate]
    );
    const opacity = getInterpolatedValue(
      frame,
      [timing.enter, timing.enter + 15, timing.exitStart, timing.exitEnd],
      [0, 1, 1, 0]
    );

    const backgroundColor = `rgba(${baseColor}, ${opacity})`;

    return {
      backgroundColor: backgroundColor,
      left: '50%',
      top: '45%',
      transform: `translate(calc(-50% + ${translateX}px), -50%)`,
      opacity: opacity,
    };
  }, [frame, timing, baseColor, direction]);

  return (
    <div
      className="absolute flex items-center justify-center p-6 rounded-2xl shadow-xl max-w-sm"
      style={styles}
    >
      <span className="text-3xl font-bold text-white tracking-wide text-center"> {/* Changed text-4xl to text-3xl, added text-center */}
        {text}
      </span>
    </div>
  );
};

interface VsTextProps {
  timing: { appearStart: number; appearEnd: number; exitStart: number; exitEnd: number };
  color: string;
}

const VsText: React.FC<VsTextProps> = ({ timing, color }) => {
  const frame = useCurrentFrame();

  const styles = useMemo(() => {
    const scale = spring({
      frame: frame - timing.appearStart,
      fps: 30,
      config: {
        damping: 200,
        stiffness: 100,
        mass: 0.5,
      },
      durationInFrames: 30,
    });
    const opacity = getInterpolatedValue(
      frame,
      [timing.appearStart, timing.appearEnd, timing.exitStart, timing.exitEnd],
      [0, 1, 1, 0]
    );
    return {
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: opacity,
      top: '45%',
      left: '50%',
      color: color,
    };
  }, [frame, timing, color]);

  return (
    <div
      className="absolute text-7xl font-extrabold drop-shadow-md z-10"
      style={styles}
    >
      VS
    </div>
  );
};

interface TransitionTextProps {
  text: string;
  timing: { fadeIn: number; fadeOut: number; displayEnd: number };
  color: string;
}

const TransitionText: React.FC<TransitionTextProps> = ({ text, timing, color }) => {
  const frame = useCurrentFrame();

  const styles = useMemo(() => {
    const opacity = getInterpolatedValue(
      frame,
      [timing.fadeIn, timing.fadeOut, timing.displayEnd, timing.displayEnd + 30],
      [0, 1, 1, 0]
    );
    const translateY = getInterpolatedValue(
      frame,
      [timing.fadeIn, timing.fadeOut],
      [50, 0]
    );
    return {
      opacity,
      transform: `translate(-50%, calc(-50% + ${translateY}px))`,
      top: '45%',
      left: '50%',
      color: color,
    };
  }, [frame, timing, color]);

  return (
    <p
      className="absolute text-5xl font-semibold text-center leading-relaxed"
      style={styles}
    >
      {text}
    </p>
  );
};

interface DetailTextProps {
  text: string;
  timing: { fadeIn: number; fadeOut: number };
  color: string;
  topPosition: string; // e.g., '45%', '60%'
}

const DetailText: React.FC<DetailTextProps> = ({
  text,
  timing,
  color,
  topPosition,
}) => {
  const frame = useCurrentFrame();

  const styles = useMemo(() => {
    const opacity = getInterpolatedValue(frame, [timing.fadeIn, timing.fadeOut], [0, 1]);
    const translateY = getInterpolatedValue(frame, [timing.fadeIn, timing.fadeOut], [20, 0]);
    return {
      opacity,
      transform: `translateX(-50%) translateY(${translateY}px)`,
      top: topPosition,
      left: '50%',
      color: color,
    };
  }, [frame, timing, color, topPosition]);

  return (
    <p
      className="absolute text-3xl md:text-4xl text-center max-w-4xl leading-relaxed"
      style={styles}
    >
      {text}
    </p>
  );
};


// --- Main Component ---
export const The_Browser_Wars_And_Antitrust: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950 text-white p-8 font-sans overflow-hidden relative">
      {/* "The Browser Wars" Title */}
      <AnimatedTitle
        text="The Browser Wars"
        timing={TIMINGS.browserWarsTitle} // This now includes disappear frames
        color={COLORS.white}
        verticalPosition="25%"
      />

      {/* Internet Explorer Representation */}
      <BrowserShape
        text="Internet Explorer"
        timing={{
          enter: TIMINGS.browserEnter,
          peak: TIMINGS.browserPeak,
          exitStart: TIMINGS.browserExitStart,
          exitEnd: TIMINGS.browserExitEnd,
        }}
        baseColor={COLORS.internetExplorer}
        direction="left"
      />

      {/* Netscape Navigator Representation */}
      <BrowserShape
        text="Netscape Navigator"
        timing={{
          enter: TIMINGS.browserEnter,
          peak: TIMINGS.browserPeak,
          exitStart: TIMINGS.browserExitStart,
          exitEnd: TIMINGS.browserExitEnd,
        }}
        baseColor={COLORS.netscapeNavigator}
        direction="right"
      />

      {/* VS text between browsers */}
      <VsText timing={TIMINGS.vsText} color={COLORS.vsText} />

      {/* "And Antitrust" Transition text */}
      <TransitionText
        text="And Antitrust"
        timing={TIMINGS.andAntitrust}
        color={COLORS.gray}
      />

      {/* Antitrust Challenges Title */}
      <AnimatedTitle
        text="Antitrust Challenges"
        timing={TIMINGS.antitrustTitle} // This uses the original fadeIn/fadeOut which means it only fades in
        color={COLORS.antitrustTitle}
        verticalPosition="25%"
        // Removed transformOffset="translateY(-150px)" to prevent title from being off-screen
      />

      {/* Antitrust Details Text (sequential appearance) */}
      <DetailText
        text="Microsoft faced intense legal scrutiny"
        timing={TIMINGS.detail1}
        color={COLORS.darkGray}
        topPosition="45%"
      />
      <DetailText
        text="Accusations of monopolistic practices and unfair competition"
        timing={TIMINGS.detail2}
        color={COLORS.darkGray}
        topPosition="60%"
      />
      <DetailText
        text="Shaping the future of software regulation"
        timing={TIMINGS.detail3}
        color={COLORS.darkGray}
        topPosition="75%"
      />
    </div>
  );
};

export const The_Browser_Wars_And_Antitrust_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const The_Browser_Wars_And_Antitrust_Edited = true; // Set to true if the section is edited
