// AIWASHERE

import React from "react";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  Sequence,
  interpolate,
} from "remotion";

// This section visually teaches CSS Grid concepts using animated code and a responsive grid visualization.

export const Defining_Rows_And_Columns: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridWidth = 800;
  const gridHeight = 500;

  const baseStart = 0;
  const duration = 100;
  const transition = 30;
  const segments = [
    {
      codeLines: ["grid-template-columns:", "1fr 1fr 1fr;"],
      columns: "1fr 1fr 1fr",
      rows: "1fr",
      showFr: true,
    },
    {
      codeLines: ["grid-template-columns:", "1fr 2fr 1fr;"],
      columns: "1fr 2fr 1fr",
      rows: "1fr",
    },
    {
      codeLines: ["grid-template-rows:", "1fr 1fr;"],
      columns: "1fr 1fr 1fr",
      rows: "1fr 1fr",
    },
    {
      codeLines: [
        "Shorthand with repeat():",
        "grid-template-columns: repeat(4, 1fr);",
      ],
      columns: "1fr 1fr 1fr 1fr",
      rows: "1fr",
    },
  ];

  const AnimatedCodeLine = ({
    code,
    startFrame,
    delayPerChar = 1,
    fontSize = "text-4xl",
    className = "",
  }: {
    code: string;
    startFrame: number;
    delayPerChar?: number;
    fontSize?: string;
    className?: string;
  }) => {
    const chars = code.split("");
    return (
      <div className={`font-mono text-blue-300 ${fontSize} ${className}`}>
        {chars.map((char, i) => {
          const progress = spring({
            frame: frame - (startFrame + i * delayPerChar),
            fps,
          });
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const translateY = interpolate(progress, [0, 1], [10, 0]);
          return (
            <span
              key={i}
              style={{
                opacity,
                display: "inline-block",
                transform: `translateY(${translateY}px)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  const GridVisualizer = ({
    templateColumns,
    templateRows,
    startFrame,
    width,
    height,
    showFrExplanation,
  }: {
    templateColumns: string;
    templateRows: string;
    startFrame: number;
    width: number;
    height: number;
    showFrExplanation?: boolean;
  }) => {
    const progress = spring({ frame: frame - startFrame, fps });

    const parse = (template: string, total: number) => {
      const parts = template.split(" ").filter(Boolean);
      const totalFr = parts.reduce(
        (sum, val) => sum + (val.endsWith("fr") ? parseFloat(val) : 0),
        0,
      );
      let pos = 0;
      return parts.map((part) => {
        const size = part.endsWith("fr")
          ? (parseFloat(part) / totalFr) * total
          : total / parts.length;
        const start = pos;
        pos += size;
        return { unit: part, size, start };
      });
    };

    const cols = parse(templateColumns, width);
    const rows = parse(templateRows, height);

    const scale = interpolate(progress, [0, 1], [0.8, 1]);
    const opacity = interpolate(progress, [0, 1], [0, 1]);

    return (
      <div
        className="relative border-4 border-emerald-500 rounded-lg shadow-xl"
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          opacity,
          backgroundColor: "rgba(30,30,45,0.8)",
        }}
      >
        <svg className="absolute inset-0" width={width} height={height}>
          {cols.slice(0, -1).map((c, i) => (
            <line
              key={i}
              x1={c.start + c.size}
              y1={0}
              x2={c.start + c.size}
              y2={height}
              stroke="white"
              strokeOpacity={0.5}
              strokeWidth={2}
            />
          ))}
          {rows.slice(0, -1).map((r, i) => (
            <line
              key={i}
              x1={0}
              y1={r.start + r.size}
              x2={width}
              y2={r.start + r.size}
              stroke="white"
              strokeOpacity={0.5}
              strokeWidth={2}
            />
          ))}
        </svg>
        {showFrExplanation && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 p-2 bg-yellow-600 text-white rounded text-sm">
            `fr` = Fractional Unit (Distributes remaining space)
          </div>
        )}
        {cols.map((c, i) => (
          <div
            key={i}
            className="absolute text-white text-lg font-bold"
            style={{
              left: c.start + c.size / 2,
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity,
            }}
          >
            {c.unit}
          </div>
        ))}
        {rows.length > 1 &&
          rows.map((r, i) => (
            <div
              key={i}
              className="absolute text-white text-lg font-bold"
              style={{
                top: r.start + r.size / 2,
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity,
              }}
            >
              {r.unit}
            </div>
          ))}
      </div>
    );
  };

  return (
    <AbsoluteFill className="bg-gradient-to-br from-indigo-900 to-purple-950 items-center justify-center">
      {/* Title */}
      <Sequence from={0} durationInFrames={90}>
        <div
          className="text-white text-6xl font-bold"
          style={{
            opacity: interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0]),
            transform: `translateY(${interpolate(frame, [0, 30, 60, 90], [-50, 0, 0, -50])}px)`,
          }}
        >
          CSS Grid: Defining Rows & Columns
        </div>
      </Sequence>

      {/* Segments */}
      {segments.map((seg, i) => {
        const start = baseStart + 90 + i * (duration + transition);
        return (
          <Sequence
            key={i}
            from={start}
            durationInFrames={duration + transition}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{
                opacity: interpolate(
                  frame,
                  [
                    start,
                    start + transition,
                    start + duration,
                    start + duration + transition,
                  ],
                  [0, 1, 1, 0],
                ),
                transform: `translateY(${interpolate(frame, [start, start + transition, start + duration, start + duration + transition], [50, 0, 0, -50])}px)`,
              }}
            >
              <AnimatedCodeLine code={seg.codeLines[0]} startFrame={start} />
              <AnimatedCodeLine
                code={seg.codeLines[1]}
                startFrame={start + 15}
                fontSize="text-5xl"
                className="mt-2"
              />
              <div className="mt-8">
                <GridVisualizer
                  templateColumns={seg.columns}
                  templateRows={seg.rows}
                  startFrame={start + 30}
                  width={gridWidth}
                  height={gridHeight}
                  showFrExplanation={seg.showFr}
                />
              </div>
            </div>
          </Sequence>
        );
      })}

      {/* Outro */}
      <Sequence
        from={90 + segments.length * (duration + transition)}
        durationInFrames={60}
      >
        <div
          className="absolute bottom-10 text-white text-4xl font-semibold"
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
          }}
        >
          Mastering Grid Layouts!
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

export const Defining_Rows_And_Columns_Duration = 600;
export const Defining_Rows_And_Columns_Edited = true;
