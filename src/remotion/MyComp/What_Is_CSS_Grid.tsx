// AIWASHERE
// This section thoroughly explains "What is CSS Grid?" in a visually engaging and modern way.
// It uses animated text and abstract geometric shapes to represent the grid concept, avoiding images.
// The animation progresses from an introduction of the term, to showing a conceptual grid structure forming,
// and finally demonstrating how items can be placed within it.
// All animations are sleek, colorful, and designed for readability and impact.
// It strictly adheres to Remotion best practices, using hooks for animation and Tailwind for styling.
import React from "react";
import { useVideoConfig, useCurrentFrame, interpolate, Easing } from "remotion";

export const What_Is_CSS_Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- Animation Timings (in frames) ---
  const fadeInStart = 10;
  const fadeInEnd = 40;
  const definitionStart = 50;
  const definitionEnd = 150;
  const gridContainerStart = 160;
  const gridContainerEnd = 200;
  const gridLinesStart = 220;
  const gridLinesEnd = 270;
  const gridItemsStart = 280;
  const gridItemsEnd = 330;

  // --- Title Animation ---
  const titleOpacity = interpolate(
    frame,
    [fadeInStart, fadeInEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom bezier for sleekness
    }
  );
  const titleScale = interpolate(
    frame,
    [fadeInStart, fadeInEnd],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const titleTranslateY = interpolate(
    frame,
    [fadeInStart, fadeInEnd],
    [50, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // --- Definition Animation ---
  const definitionOpacity = interpolate(
    frame,
    [definitionStart, definitionEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const definitionTranslateX = interpolate(
    frame,
    [definitionStart, definitionEnd],
    [-50, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // --- Grid Container Animation ---
  const gridContainerOpacity = interpolate(
    frame,
    [gridContainerStart, gridContainerEnd],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  const gridContainerScale = interpolate(
    frame,
    [gridContainerStart, gridContainerEnd],
    [0.7, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );

  // --- Grid Lines Animation ---
  // Horizontal line slides from left to right
  const horizontalLineTranslateX = interpolate(
    frame,
    [gridLinesStart, gridLinesEnd],
    [-width / 2, 0], // Start off-screen left, end at 0 translation
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
  // Vertical lines slide from top to bottom
  const verticalLineTranslateY = interpolate(
    frame,
    [gridLinesStart, gridLinesEnd],
    [-height / 2, 0], // Start off-screen top, end at 0 translation
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
    }
  );
    // General opacity for grid lines
    const gridLineOpacity = interpolate(
        frame,
        [gridLinesStart, gridLinesEnd],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
        }
      );

  // --- Grid Items Animation (pop in) ---
  const gridItemScale = (delay: number) =>
    interpolate(
      frame,
      [gridItemsStart + delay, gridItemsStart + delay + 20],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      }
    );
  const gridItemOpacity = (delay: number) =>
    interpolate(
      frame,
      [gridItemsStart + delay, gridItemsStart + delay + 20],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
      }
    );

  const gridCellColors = [
    "bg-rose-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-fuchsia-500",
    "bg-cyan-500",
  ];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative p-8"
      style={{
        background: `linear-gradient(135deg, #4A00E0 0%, #8E2DE2 50%, #4625A9 100%)`, // Deep purple gradient
        overflow: "hidden", // Hide any overflow from animations
      }}
    >
      {/* Background Orbs/Blobs for modern feel */}
      <div
        className="absolute w-64 h-64 bg-purple-600 rounded-full mix-blend-lighten filter blur-3xl opacity-50"
        style={{
          top: "10%",
          left: "5%",
          transform: `translateY(${Math.sin(frame * 0.05) * 20}px)`,
        }}
      />
      <div
        className="absolute w-72 h-72 bg-blue-600 rounded-full mix-blend-lighten filter blur-3xl opacity-50"
        style={{
          bottom: "15%",
          right: "10%",
          transform: `translateX(${Math.cos(frame * 0.04) * 25}px)`,
        }}
      />
      <div
        className="absolute w-56 h-56 bg-pink-600 rounded-full mix-blend-lighten filter blur-3xl opacity-50"
        style={{
          top: "60%",
          left: "20%",
          transform: `translateY(${Math.sin(frame * 0.06) * 15}px)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1
          className="text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translateY(${titleTranslateY}px)`,
          }}
        >
          What is{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(45deg, #FFD700, #FFA500)`, // Gold/Orange Gradient
            }}
          >
            CSS Grid
          </span>
          ?
        </h1>
        <p
          className="text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto font-light drop-shadow-md"
          style={{
            opacity: definitionOpacity,
            transform: `translateX(${definitionTranslateX}px)`,
          }}
        >
          A powerful CSS layout system that allows you to design complex
          responsive web layouts more easily. It's a 2-dimensional system,
          meaning it can handle both columns and rows.
        </p>

        {/* CSS Grid Visualization */}
        <div
          className="relative w-[600px] h-[400px] mt-16 p-2 rounded-xl border-4 border-indigo-300 shadow-2xl flex flex-col"
          style={{
            opacity: gridContainerOpacity,
            transform: `scale(${gridContainerScale})`,
            background: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`, // Slightly transparent background
            backdropFilter: 'blur(5px)', // Subtle blur for modern glass effect
            overflow: "hidden",
            // The display property switches to grid when lines appear to enable grid-item positioning
            display: frame >= gridItemsStart ? 'grid' : 'block', // Use 'block' initially to allow grid lines to slide in independently
            gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
            gridTemplateRows: 'repeat(2, 1fr)', // 2 rows
            gap: '8px', // Gap between grid items
          }}
        >
          {/* Grid lines (rendered as separate divs to allow independent animation before grid items) */}
          {/* Horizontal line */}
          <div
            className="absolute h-[4px] w-full bg-indigo-400 rounded-full"
            style={{
              top: '50%', left: 0, marginTop: '-2px', // Centered vertically
              opacity: gridLineOpacity,
              transform: `translateX(${horizontalLineTranslateX}px)`,
              display: frame >= gridLinesStart && frame < gridItemsStart ? 'block' : 'none'
            }}
          ></div>
          {/* Vertical lines */}
          <div
            className="absolute w-[4px] h-full bg-indigo-400 rounded-full"
            style={{
              left: '33.33%', top: 0, marginLeft: '-2px', // First vertical line
              opacity: gridLineOpacity,
              transform: `translateY(${verticalLineTranslateY}px)`,
              display: frame >= gridLinesStart && frame < gridItemsStart ? 'block' : 'none'
            }}
          ></div>
          <div
            className="absolute w-[4px] h-full bg-indigo-400 rounded-full"
            style={{
              left: '66.66%', top: 0, marginLeft: '-2px', // Second vertical line
              opacity: gridLineOpacity,
              transform: `translateY(${verticalLineTranslateY}px)`,
              display: frame >= gridLinesStart && frame < gridItemsStart ? 'block' : 'none'
            }}
          ></div>

          {/* Grid Items - These are only shown when the grid container itself is a grid display, and after lines have appeared */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-lg shadow-md ${gridCellColors[i % gridCellColors.length]}`}
              style={{
                width: '100%',
                height: '100%',
                opacity: gridItemOpacity(i * 10),
                transform: `scale(${gridItemScale(i * 10)})`,
                // Items only display after gridItemsStart frame and if the parent is set to grid.
                display: frame >= gridItemsStart ? 'flex' : 'none',
                gridColumn: i === 0 ? '1' : i === 1 ? '2' : i === 2 ? '3' : i === 3 ? '1' : i === 4 ? '2' : '3',
                gridRow: i < 3 ? '1' : '2',
              }}
            >
              <span className="text-white font-bold text-xl">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const What_Is_CSS_Grid_Duration = 360; // Duration in frames at 30fps (12 seconds)
export const What_Is_CSS_Grid_Edited = true; // Set to true if the section is edited
