// Thorough description of the section:
// This section, "Basic_Concepts", visually explains fundamental CSS Grid concepts.
// It animates through 'Grid Container', 'Grid Items', 'Grid Lines', and 'Grid Tracks'.
// Each concept is introduced with its name and a concise definition, followed by
// a sleek, colorful, and modern visual demonstration using animated div elements
// and CSS Grid properties. The design emphasizes clarity, ease of reading, and
// smooth transitions using Remotion's animation primitives like spring and interpolate,
// ensuring no image assets are used and adhering strictly to specified import constraints.
// AIWASHERE
import React from 'react';
import { useCurrentFrame, interpolate, spring, Easing } from 'remotion';

export const Basic_Concepts: React.FC = () => {
  const frame = useCurrentFrame();

  const sectionDuration = 360; // Total duration for Basic_Concepts (12 seconds at 30fps)
  const conceptDuration = sectionDuration / 4; // 90 frames per concept (3 seconds per concept)

  // --- Animation timings for each concept ---
  const gridContainerStart = 0;
  const gridItemsStart = conceptDuration;
  const gridLinesStart = conceptDuration * 2;
  const gridTracksStart = conceptDuration * 3;

  // Helper for text entrance animation (fade in and slight slide up)
  const getTextEntranceProps = (startFrame: number) => {
    const textOpacity = interpolate(
      frame,
      [startFrame + 10, startFrame + 30], // Text starts appearing 10 frames into the concept, fully visible by frame 30
      [0, 1],
      { extrapolateRight: 'clamp' }
    );
    const textTranslateY = interpolate(
      frame,
      [startFrame + 10, startFrame + 30],
      [20, 0],
      { extrapolateRight: 'clamp' }
    );
    return { opacity: textOpacity, translateY: textTranslateY };
  };

  // Helper for visual element entrance animation (spring effect for opacity and scale)
  const getSpringProps = (startFrame: number, duration: number = 30) => {
    const opacity = spring({
      frame: frame - startFrame,
      from: 0,
      to: 1,
      fps: 30,
      config: {
        damping: 10,
        stiffness: 100,
        mass: 1,
        overshootClamping: false,
      },
      durationInFrames: duration,
    });
    const scale = spring({
      frame: frame - startFrame,
      from: 0.8,
      to: 1,
      fps: 30,
      config: {
        damping: 10,
        stiffness: 100,
        mass: 1,
        overshootClamping: false,
      },
      durationInFrames: duration,
    });
    return { opacity, scale };
  };

  // --- Concept 1: Grid Container animations ---
  const containerTextProps = getTextEntranceProps(gridContainerStart);
  const containerVisualProps = getSpringProps(gridContainerStart + 30); // Visual appears after text

  // --- Concept 2: Grid Items animations ---
  const itemsTextProps = getTextEntranceProps(gridItemsStart);
  const itemsVisualProps = getSpringProps(gridItemsStart + 30);

  // --- Concept 3: Grid Lines animations ---
  const linesTextProps = getTextEntranceProps(gridLinesStart);
  const linesVisualProps = getSpringProps(gridLinesStart + 30);

  // Line drawing animation progress
  const lineDrawingProgress = interpolate(
    frame,
    [gridLinesStart + 40, gridLinesStart + 70], // Starts after text/container visible, completes in 30 frames
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.8, 0.22, 0.96, 0.65), // Custom easing for sleek animation
    }
  );
  const lineLengthScale = interpolate(lineDrawingProgress, [0, 1], [0, 1]); // Scale from 0 to 1

  // --- Concept 4: Grid Tracks animations ---
  const tracksTextProps = getTextEntranceProps(gridTracksStart);
  const tracksVisualProps = getSpringProps(gridTracksStart + 30);

  // Track highlight animation
  const trackHighlightOpacity = interpolate(
    frame,
    [gridTracksStart + 40, gridTracksStart + 60], // Highlight fades in
    [0, 0.6], // Max opacity for highlight
    { extrapolateRight: 'clamp' }
  );

  const trackHighlightScale = (delay: number) =>
    interpolate(
      frame,
      [gridTracksStart + 40 + delay, gridTracksStart + 60 + delay], // Staggered reveal
      [0, 1],
      { extrapolateRight: 'clamp' }
    );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-8 font-sans overflow-hidden">
      {/* Concept 1: Grid Container */}
      <div
        className="absolute w-full h-full flex flex-col items-center justify-center transition-opacity duration-300"
        style={{
          // Fade out this concept before the next one starts
          opacity: interpolate(
            frame,
            [gridContainerStart, gridContainerStart + conceptDuration - 10],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
          // Only display when active to prevent layout issues
          display: frame >= gridContainerStart && frame < gridContainerStart + conceptDuration ? 'flex' : 'none',
        }}
      >
        <h1
          className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          style={{ opacity: containerTextProps.opacity, transform: `translateY(${containerTextProps.translateY}px)` }}
        >
          Grid Container
        </h1>
        <p
          className="text-2xl text-gray-300 text-center max-w-2xl"
          style={{ opacity: containerTextProps.opacity, transform: `translateY(${containerTextProps.translateY}px)` }}
        >
          The element that holds all grid items.
        </p>
        <div
          className="relative w-96 h-64 border-4 border-purple-500 rounded-lg mt-12 flex items-center justify-center text-xl text-purple-200"
          style={{
            opacity: containerVisualProps.opacity,
            transform: `scale(${containerVisualProps.scale})`,
            boxShadow: '0 0 40px rgba(128, 90, 213, 0.5)', // purple-500 shadow
          }}
        >
          Grid Container
        </div>
      </div>

      {/* Concept 2: Grid Items */}
      <div
        className="absolute w-full h-full flex flex-col items-center justify-center transition-opacity duration-300"
        style={{
          opacity: interpolate(
            frame,
            [gridItemsStart, gridItemsStart + conceptDuration - 10],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
          display: frame >= gridItemsStart && frame < gridItemsStart + conceptDuration ? 'flex' : 'none',
        }}
      >
        <h1
          className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400"
          style={{ opacity: itemsTextProps.opacity, transform: `translateY(${itemsTextProps.translateY}px)` }}
        >
          Grid Items
        </h1>
        <p
          className="text-2xl text-gray-300 text-center max-w-2xl"
          style={{ opacity: itemsTextProps.opacity, transform: `translateY(${itemsTextProps.translateY}px)` }}
        >
          The direct children of the grid container, placed within the grid cells.
        </p>
        <div
          className="relative w-96 h-64 border-4 border-pink-500 rounded-lg mt-12 grid grid-cols-2 grid-rows-2 gap-4 p-4"
          style={{
            opacity: itemsVisualProps.opacity,
            transform: `scale(${itemsVisualProps.scale})`,
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.5)', // pink-500 shadow
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-md text-lg text-white font-semibold transition-opacity duration-300 ease-out`}
              style={{
                opacity: interpolate(frame, [gridItemsStart + 40 + i * 5, gridItemsStart + 60 + i * 5], [0, 1], { extrapolateRight: 'clamp' }),
                transform: `scale(${interpolate(frame, [gridItemsStart + 40 + i * 5, gridItemsStart + 60 + i * 5], [0.8, 1], { extrapolateRight: 'clamp' })})`,
                backgroundColor:
                  i === 0 ? '#FB923C' : i === 1 ? '#FDE047' : i === 2 ? '#84CC16' : '#22D3EE', // Orange-400, Yellow-300, Lime-500, Cyan-400
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Concept 3: Grid Lines */}
      <div
        className="absolute w-full h-full flex flex-col items-center justify-center transition-opacity duration-300"
        style={{
          opacity: interpolate(
            frame,
            [gridLinesStart, gridLinesStart + conceptDuration - 10],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
          display: frame >= gridLinesStart && frame < gridLinesStart + conceptDuration ? 'flex' : 'none',
        }}
      >
        <h1
          className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-green-400"
          style={{ opacity: linesTextProps.opacity, transform: `translateY(${linesTextProps.translateY}px)` }}
        >
          Grid Lines
        </h1>
        <p
          className="text-2xl text-gray-300 text-center max-w-2xl"
          style={{ opacity: linesTextProps.opacity, transform: `translateY(${linesTextProps.translateY}px)` }}
        >
          The horizontal and vertical dividing lines that make up the grid structure.
        </p>
        <div
          className="relative w-96 h-64 border-4 border-green-500 rounded-lg mt-12 p-4 grid grid-cols-2 grid-rows-2 gap-4"
          style={{
            opacity: linesVisualProps.opacity,
            transform: `scale(${linesVisualProps.scale})`,
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)', // green-500 shadow
          }}
        >
          {/* Grid items for context */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-md text-lg text-white font-semibold`}
              style={{
                backgroundColor:
                  i === 0 ? '#FB923C' : i === 1 ? '#FDE047' : i === 2 ? '#84CC16' : '#22D3EE',
              }}
            >
              Item {i + 1}
            </div>
          ))}
          {/* Vertical Lines */}
          <div
            className="absolute top-0 bottom-0 left-[33.33%] w-1 bg-gradient-to-b from-teal-400 to-green-400 rounded-full"
            style={{ transform: `scaleY(${lineLengthScale})`, transformOrigin: 'top', opacity: lineDrawingProgress }}
          />
          <div
            className="absolute top-0 bottom-0 left-[66.66%] w-1 bg-gradient-to-b from-teal-400 to-green-400 rounded-full"
            style={{ transform: `scaleY(${lineLengthScale})`, transformOrigin: 'top', opacity: lineDrawingProgress }}
          />
          {/* Horizontal Lines */}
          <div
            className="absolute left-0 right-0 top-[33.33%] h-1 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"
            style={{ transform: `scaleX(${lineLengthScale})`, transformOrigin: 'left', opacity: lineDrawingProgress }}
          />
          <div
            className="absolute left-0 right-0 top-[66.66%] h-1 bg-gradient-to-r from-teal-400 to-green-400 rounded-full"
            style={{ transform: `scaleX(${lineLengthScale})`, transformOrigin: 'left', opacity: lineDrawingProgress }}
          />
        </div>
      </div>

      {/* Concept 4: Grid Tracks */}
      <div
        className="absolute w-full h-full flex flex-col items-center justify-center transition-opacity duration-300"
        style={{
          opacity: interpolate(
            frame,
            [gridTracksStart, gridTracksStart + conceptDuration - 10],
            [1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
          display: frame >= gridTracksStart && frame < gridTracksStart + conceptDuration ? 'flex' : 'none',
        }}
      >
        <h1
          className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400"
          style={{ opacity: tracksTextProps.opacity, transform: `translateY(${tracksTextProps.translateY}px)` }}
        >
          Grid Tracks
        </h1>
        <p
          className="text-2xl text-gray-300 text-center max-w-2xl"
          style={{ opacity: tracksTextProps.opacity, transform: `translateY(${tracksTextProps.translateY}px)` }}
        >
          The space between two grid lines, where grid items are placed.
        </p>
        <div
          className="relative w-96 h-64 border-4 border-blue-500 rounded-lg mt-12 p-4 grid grid-cols-2 grid-rows-2 gap-4"
          style={{
            opacity: tracksVisualProps.opacity,
            transform: `scale(${tracksVisualProps.scale})`,
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)', // blue-500 shadow
          }}
        >
          {/* Grid items for context */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-md text-lg text-white font-semibold`}
              style={{
                backgroundColor:
                  i === 0 ? '#FB923C' : i === 1 ? '#FDE047' : i === 2 ? '#84CC16' : '#22D3EE',
              }}
            >
              Item {i + 1}
            </div>
          ))}

          {/* Highlight Tracks - positioned relative to the grid container, covering the tracks */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-l-lg"
            style={{
              opacity: trackHighlightOpacity,
              transform: `scaleX(${trackHighlightScale(0)})`,
              transformOrigin: 'left',
              zIndex: 1, // Ensure highlight is above grid items
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-sky-500 rounded-r-lg"
            style={{
              opacity: trackHighlightOpacity,
              transform: `scaleX(${trackHighlightScale(5)})`,
              transformOrigin: 'right',
              zIndex: 1,
            }}
          />
          <div
            className="absolute top-0 left-0 h-1/2 w-full bg-teal-500 rounded-t-lg"
            style={{
              opacity: trackHighlightOpacity,
              transform: `scaleY(${trackHighlightScale(10)})`,
              transformOrigin: 'top',
              zIndex: 1,
            }}
          />
          <div
            className="absolute bottom-0 left-0 h-1/2 w-full bg-cyan-500 rounded-b-lg"
            style={{
              opacity: trackHighlightOpacity,
              transform: `scaleY(${trackHighlightScale(15)})`,
              transformOrigin: 'bottom',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Basic_Concepts_Duration = 360; // Duration in frames (30fps)
export const Basic_Concepts_Edited = true; // Set to true if the section is edited
