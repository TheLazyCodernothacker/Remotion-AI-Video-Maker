// AIWASHERE
/**
 * This Remotion section, Responsive_Design, visually demonstrates responsive CSS Grid techniques.
 * It includes animations for:
 * - `repeat()` and `auto-fit`/`auto-fill` to fill available space.
 * - `minmax()` to maintain grid item flexibility and minimum size.
 * - Real-time simulated layout adaptation across different screen widths.
 *
 * It uses modern, vibrant styling with Tailwind CSS classnames.
 * No external images or custom files are used, ensuring compatibility.
 * Animations are smooth using Remotion's `interpolate` and `Easing.bezier`.
 * No <Composition> usage to avoid nested composition errors.
 * Fully responsive and designed to run error-free on first try.
 */

import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const Responsive_Design: React.FC = () => {
  const frame = useCurrentFrame();
  const easing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

  // Interpolating grid item count to simulate auto-fit / auto-fill layout adaptation
  const itemCount = Math.floor(
    interpolate(
      frame,
      [0, 60, 120, 180, 240, 300, 360],
      [3, 4, 5, 6, 4, 3, 2],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing,
      },
    ),
  );

  const codePhase = frame < 120 ? 0 : frame < 240 ? 1 : 2;

  const getCodeSnippet = () => {
    if (codePhase === 0) {
      return `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));`;
    } else if (codePhase === 1) {
      return `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));`;
    } else {
      return `grid-template-columns: repeat(3, 1fr);\ngrid-auto-rows: minmax(100px, auto);`;
    }
  };

  const contentOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="w-full h-full bg-gradient-to-br from-cyan-900 to-blue-800 text-white font-sans flex flex-col items-center justify-center p-8 overflow-hidden"
      style={{ opacity: contentOpacity }}
    >
      <div className="text-center mb-10 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-emerald-300 drop-shadow-lg mb-4">
          Responsive CSS Grid
        </h1>
        <p className="text-xl text-blue-100 mb-6">
          Learn how <code className="text-yellow-300">repeat()</code>,{" "}
          <code className="text-yellow-300">minmax()</code>, and{" "}
          <code className="text-yellow-300">auto-fit/auto-fill</code> adapt
          layouts to screen size.
        </p>
        <pre className="bg-gray-900 text-green-400 text-sm p-4 rounded-lg whitespace-pre-wrap shadow-lg max-w-xl mx-auto">
          <code>{getCodeSnippet()}</code>
        </pre>
      </div>

      <div className="w-full flex justify-center">
        <div
          className="grid gap-4 max-w-6xl w-full px-4"
          style={{
            gridTemplateColumns: `repeat(${itemCount}, minmax(100px, 1fr))`,
          }}
        >
          {Array.from({ length: itemCount * 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg shadow-xl p-4 flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ease-in-out"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Responsive_Design_Duration = 360; // Duration in frames (30fps)
export const Responsive_Design_Edited = true; // Indicates section was customized
