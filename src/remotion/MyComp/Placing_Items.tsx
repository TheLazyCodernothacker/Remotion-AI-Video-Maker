// AIWASHERE
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const Placing_Items: React.FC = () => {
  const frame = useCurrentFrame();
  const customEasing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

  const colStart = interpolate(
    frame,
    [0, 30, 60, 90, 150, 180, 210, 270, 300, 360],
    [1, 1, 2, 2, 1, 1, 1, 1, 2, 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: customEasing,
    },
  );

  const colEnd = interpolate(
    frame,
    [0, 30, 60, 90, 150, 180, 210, 270, 300, 360],
    [2, 2, 3, 4, 2, 2, 2, 2, 4, 4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: customEasing,
    },
  );

  const rowStart = interpolate(
    frame,
    [0, 30, 60, 90, 150, 180, 210, 270, 300, 360],
    [1, 1, 1, 1, 1, 2, 2, 1, 2, 2],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: customEasing,
    },
  );

  const rowEnd = interpolate(
    frame,
    [0, 30, 60, 90, 150, 180, 210, 270, 300, 360],
    [2, 2, 2, 2, 2, 3, 4, 2, 4, 4],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: customEasing,
    },
  );

  let title = "Placing Items in CSS Grid";
  let subtitle = "Mastering `grid-column`, `grid-row`, and `grid-area`";
  let explanation = "";
  let codeSnippet = "";

  if (frame < 30) {
    explanation =
      "Learn how to precisely position items within a CSS Grid layout.";
  } else if (frame < 60) {
    explanation = "Use `grid-column` to place an item in a specific column.";
    codeSnippet = `<div style={{ gridColumn: '1' }}> Grid Item </div>`;
  } else if (frame < 90) {
    explanation = "Move the item to another column using `grid-column`.";
    codeSnippet = `<div style={{ gridColumn: '2' }}> Grid Item </div>`;
  } else if (frame < 150) {
    explanation =
      "Span multiple columns using `grid-column: span N` or line numbers.";
    codeSnippet = `<div style={{ gridColumn: '2 / span 2' }}> Grid Item </div>`;
  } else if (frame < 180) {
    explanation =
      "Now, let's explore `grid-row` to control vertical placement.";
    codeSnippet = `<div style={{ gridRow: '1' }}> Grid Item </div>`;
  } else if (frame < 210) {
    explanation = "Position the item in a specific row using `grid-row`.";
    codeSnippet = `<div style={{ gridRow: '2' }}> Grid Item </div>`;
  } else if (frame < 270) {
    explanation =
      "Span multiple rows using `grid-row: span N` or line numbers.";
    codeSnippet = `<div style={{ gridRow: '2 / span 2' }}> Grid Item </div>`;
  } else if (frame < 300) {
    explanation = "Simplify placement with `grid-area` using named grid areas.";
    codeSnippet = `/* Grid container */\n.grid-container {\n  display: grid;\n  grid-template-areas:\n    "header header header"\n    "main main sidebar"\n    "footer footer footer";\n}`;
  } else {
    explanation = "Place an item directly into a named area using `grid-area`.";
    codeSnippet = `<div style={{ gridArea: 'main' }}> Grid Item </div>`;
  }

  const contentOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const itemOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans flex flex-col items-center justify-center px-4 py-6 overflow-hidden"
      style={{ opacity: contentOpacity }}
    >
      <div className="text-center mb-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-2 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">{subtitle}</p>
        <p className="text-md md:text-lg text-indigo-300 font-medium">
          {explanation}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full max-w-7xl">
        {/* Code Block */}
        <div className="w-full lg:w-1/2 bg-gray-800 rounded-xl p-5 shadow-2xl">
          <h3 className="text-xl font-bold text-yellow-300 mb-3">CSS Code:</h3>
          <pre className="text-sm font-mono bg-gray-900 p-4 rounded-lg whitespace-pre-wrap leading-relaxed text-green-400 overflow-x-auto">
            <code>{codeSnippet}</code>
          </pre>
        </div>

        {/* Grid Area */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full max-w-[480px] aspect-square p-2 border-2 border-indigo-500 rounded-xl bg-gray-700 shadow-2xl">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-600/50 border border-gray-500 rounded-md flex items-center justify-center text-gray-400 text-sm relative"
              >
                <span className="text-xs absolute bottom-1 right-2">{`R${Math.floor(i / 3) + 1} C${(i % 3) + 1}`}</span>
                {frame > 270 && (
                  <>
                    {i <= 2 && (
                      <span className="absolute top-1 left-2 text-yellow-300 font-bold">
                        header
                      </span>
                    )}
                    {(i === 3 || i === 4) && (
                      <span className="absolute top-1 left-2 text-yellow-300 font-bold">
                        main
                      </span>
                    )}
                    {i === 5 && (
                      <span className="absolute top-1 left-2 text-yellow-300 font-bold">
                        sidebar
                      </span>
                    )}
                    {i >= 6 && (
                      <span className="absolute top-1 left-2 text-yellow-300 font-bold">
                        footer
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Animated Grid Item */}
            <div
              className="bg-blue-500 rounded-lg flex items-center justify-center text-base md:text-xl font-bold shadow-xl"
              style={{
                gridColumnStart: colStart,
                gridColumnEnd: colEnd,
                gridRowStart: rowStart,
                gridRowEnd: rowEnd,
                opacity: itemOpacity,
              }}
            >
              Grid Item
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Placing_Items_Duration = 360;
export const Placing_Items_Edited = true;
