import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Reason_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 6,
      stiffness: 100,
      mass: 1,
    },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div className="w-full h-full bg-gradient-to-r from-pink-200 via-yellow-100 to-purple-200 flex flex-col items-center justify-center px-10 text-center">
      <h1
        style={{
          transform: `scale(${bounce}) rotate(${(1 - bounce) * 10}deg)`,
          opacity,
        }}
        className="text-5xl font-extrabold text-red-600 drop-shadow-lg animate-bounce"
      >
        ♻️ Reason I Don’t Recycle 😬
      </h1>

      <div
        style={{
          opacity,
          transform: `translateY(${(1 - bounce) * 40}px)`,
        }}
        className="mt-10 bg-white/70 p-8 rounded-xl shadow-xl max-w-2xl backdrop-blur-sm text-lg sm:text-xl font-medium text-neutral-800 space-y-4"
      >
        <p>
          1. I never know which bin is which. Is this plastic? Is it paper? Is
          it emotional baggage?
        </p>
        <p>
          2. The bins are outside... and sometimes it’s raining... and I’m
          fragile.
        </p>
        <p>
          3. I meant to, I really did! But then the pizza box had cheese grease
          and now it’s “contaminated.”
        </p>
        <p className="italic text-pink-600">
          I promise I’ll do better someday (probably)! 😅
        </p>
      </div>
    </div>
  );
};

export const duration = 180; // 6 seconds at 30fps
