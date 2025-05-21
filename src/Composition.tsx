import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";

const reasons = [
  "🧱 Java is *absurdly* verbose.",
  "📜 Writing getters and setters feels like a punishment.",
  "🧓 It was designed in 1995 and sometimes still feels like it.",
  "📦 `NullPointerException` – every Java dev's jump scare.",
  "🔁 No good reason to need `public static void main` every time.",
  "🔧 Dependency injection? More like dependency confusion.",
  "🛠 XML configs. Enough said.",
  "🧬 Generics: `<T extends Comparable<? super T>>` 😵",
  "💼 Java: The language of 'Enterprise Solutions™'.",
  "😴 Boilerplate. Boilerplate everywhere.",
];

const framesPerReason = 300; // 10 seconds at 30fps

export default function MyComposition() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-white text-black flex items-center justify-center">
      {/* Title - first 3 seconds (90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <div className="text-center p-20">
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              opacity: interpolate(frame, [0, 30], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            Why Java is the Worst Language Ever*
          </h1>
          <p className="text-xl text-gray-600">
            *Don’t take this too seriously 😅
          </p>
        </div>
      </Sequence>

      {/* Reasons (300 frames each = 10 seconds) */}
      {reasons.map((reason, index) => (
        <Sequence
          key={index}
          from={90 + index * framesPerReason}
          durationInFrames={framesPerReason}
        >
          <div className="text-center p-20">
            <h2
              className="text-5xl font-semibold"
              style={{
                opacity: interpolate(
                  frame - (90 + index * framesPerReason),
                  [0, 30, framesPerReason - 30, framesPerReason],
                  [0, 1, 1, 0],
                  { extrapolateRight: "clamp" },
                ),
              }}
            >
              {reason}
            </h2>
          </div>
        </Sequence>
      ))}

      {/* Conclusion - last 510 frames (17 seconds) */}
      <Sequence from={3090} durationInFrames={510}>
        <div className="text-center p-20">
          <h2 className="text-5xl font-bold text-red-600 mb-4">
            In Conclusion:
          </h2>
          <p className="text-3xl max-w-3xl">
            Java isn’t <em>that</em> bad… but we all deserve less boilerplate.
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
}
