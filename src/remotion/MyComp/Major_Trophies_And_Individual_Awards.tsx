// AIWASHERE
// This section showcases Cristiano Ronaldo's major trophies and individual awards with a sleek, modern, and celebratory animation.
// It features dynamically appearing simulated trophy icons with burst effects,
// and sequentially animating text overlays detailing his achievements, complete with a golden shimmer effect.
// The overall theme is luxurious and impactful, emphasizing his legendary status.

import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

// Helper component for animating text with golden shimmer
interface ShimmerTextProps {
  children: React.ReactNode;
  delayFrames: number;
  durationFrames: number;
  startShimmerAt: number;
}

const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  delayFrames,
  durationFrames,
  startShimmerAt,
}) => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(
    frame,
    [delayFrames, delayFrames + 30], // Fade in over 1 second (30 frames)
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Animate the background position for the shimmer effect
  const shimmerPosition = interpolate(
    frame,
    [startShimmerAt, startShimmerAt + 90], // Shimmer moves over 3 seconds (90 frames)
    [-100, 100], // Adjust these values based on text length and desired shimmer speed
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <p
      className="font-extrabold text-5xl md:text-6xl lg:text-7xl mb-4"
      style={{
        opacity: textOpacity,
        // The magic for golden shimmer using linear-gradient as background-image
        // Enhanced gradient for richer golden shimmer, making the "off" parts of the text look more like dark gold/bronze
        backgroundImage: `linear-gradient(90deg, #302000 0%, #706040 ${shimmerPosition - 10}%, #FFD700 ${shimmerPosition}%, #706040 ${shimmerPosition + 10}%, #302000 100%)`,
        WebkitBackgroundClip: "text", // Clip the background to the text shape
        WebkitTextFillColor: "transparent", // Make the text color transparent so background shows through
        backgroundSize: "200% 100%", // Make gradient wider than text for movement
        backgroundPositionX: `${-shimmerPosition}%`, // Animate background position (negative value makes it move left to right)
      }}
    >
      {children}
    </p>
  );
};

// Helper component for animating a trophy icon (using SVG for simplicity)
// Note: These are simplified SVG paths for conceptual representation, not exact trophy replicas.
interface TrophyIconProps {
  type: "champions-league" | "league" | "ballon-dor";
  delayFrames: number;
}

const TrophyIcon: React.FC<TrophyIconProps> = ({ type, delayFrames }) => {
  const frame = useCurrentFrame();

  const popIn = spring({
    frame: frame - delayFrames,
    fps: 30,
    config: {
      damping: 15, // Less bounce
      stiffness: 150, // Faster
      mass: 0.8, // Lighter
    },
  });

  // Burst effect: a quick glow and brightness increase
  const burstEffect = interpolate(
    frame,
    [delayFrames, delayFrames + 10, delayFrames + 30], // Burst quickly (10 frames), then fade out (20 frames)
    [0, 1, 0], // Scale burst from 0 to 1 then back to 0 (opacity for glow)
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  let iconPath: string;
  let fillColor: string;
  let glowColor: string;
  let ariaLabel: string;

  switch (type) {
    case "champions-league":
      // Simple cup shape SVG path
      iconPath =
        "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z";
      fillColor = "#FFD700"; // Gold
      glowColor = "#FFEB3B"; // Lighter gold for burst
      ariaLabel = "Champions League Trophy Icon";
      break;
    case "league":
      // Simple shield/award shape SVG path
      iconPath =
        "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.22L19.24 6 12 9.78 4.76 6 12 3.22zm0 16.5c-3.5-1.46-6-4.81-6-8.72V7.12l6-2.58 6 2.58v4.88c0 3.91-2.5 7.26-6 8.72z";
      fillColor = "#C0C0C0"; // Silver
      glowColor = "#E0E0E0"; // Lighter silver for burst
      ariaLabel = "League Trophy Icon";
      break;
    case "ballon-dor":
      // Simple star shape SVG path (representing Ballon d'Or)
      iconPath =
        "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
      fillColor = "#FFD700"; // Gold
      glowColor = "#FFEB3B"; // Lighter gold for burst
      ariaLabel = "Ballon d'Or Icon";
      break;
    default:
      iconPath = "";
      fillColor = "black";
      glowColor = "white";
      ariaLabel = "Unknown Trophy Icon";
  }

  return (
    <svg
      className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 absolute top-0 left-1/2 -translate-x-1/2" // Positions and centers the icon
      viewBox="0 0 24 24"
      fill={fillColor}
      aria-label={ariaLabel}
      style={{
        transform: `scale(${popIn})`,
        opacity: popIn,
        filter: `drop-shadow(0 0 ${burstEffect * 20}px ${glowColor}) brightness(${ // Creates a glowing shadow and brightness increase
          1 + burstEffect * 0.5
        })`,
      }}
    >
      <path d={iconPath} />
    </svg>
  );
};

export const Major_Trophies_And_Individual_Awards: React.FC = () => {
  // Define animation timings for sequential appearance
  const clTrophyDelay = 45; // Champions League Trophy appears at 1.5 seconds
  const clTextDelay = clTrophyDelay + 30; // CL Text appears 1 second after trophy

  const leagueTrophyDelay = 135; // League Trophy appears at 4.5 seconds
  const leagueTextDelay = leagueTrophyDelay + 30; // League Text appears 1 second after trophy

  const ballonDorTrophyDelay = 225; // Ballon d'Or Trophy appears at 7.5 seconds
  const ballonDorTextDelay = ballonDorTrophyDelay + 30; // Ballon d'Or Text appears 1 second after trophy

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{
        // Modern, sleek and deeper gradient background for better contrast and luxury feel
        background: "linear-gradient(135deg, #1C0030 0%, #3B006B 50%, #57009A 100%)",
      }}
    >
      {/* Main content area for trophies and text */}
      {/* Increased vertical spacing between sections for better fit on screen after removing image */}
      <div className="flex flex-col items-center justify-center text-center text-white z-20 space-y-24 lg:space-y-32">
        {/* Champions League Award Section */}
        <div className="relative w-full flex flex-col items-center">
          <TrophyIcon type="champions-league" delayFrames={clTrophyDelay} />
          {/* Margin to push text down below the absolutely positioned icon */}
          <div className="mt-24 sm:mt-32 lg:mt-40">
            <ShimmerText
              delayFrames={clTextDelay}
              durationFrames={90}
              startShimmerAt={clTextDelay}
            >
              5x Champions League Winner
            </ShimmerText>
          </div>
        </div>

        {/* League Titles Award Section */}
        <div className="relative w-full flex flex-col items-center">
          <TrophyIcon type="league" delayFrames={leagueTrophyDelay} />
          <div className="mt-24 sm:mt-32 lg:mt-40">
            <ShimmerText
              delayFrames={leagueTextDelay}
              durationFrames={90}
              startShimmerAt={leagueTextDelay}
            >
              7x League Titles (PL, La Liga, Serie A)
            </ShimmerText>
          </div>
        </div>

        {/* Ballon d'Or Award Section */}
        <div className="relative w-full flex flex-col items-center">
          <TrophyIcon type="ballon-dor" delayFrames={ballonDorTrophyDelay} />
          <div className="mt-24 sm:mt-32 lg:mt-40">
            <ShimmerText
              delayFrames={ballonDorTextDelay}
              durationFrames={90}
              startShimmerAt={ballonDorTextDelay}
            >
              5x Ballon d'Or Winner
            </ShimmerText>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Major_Trophies_And_Individual_Awards_Duration = 360; // Duration in frames (12 seconds at 30fps)
export const Major_Trophies_And_Individual_Awards_Edited = true; // Set to true if the section is edited
