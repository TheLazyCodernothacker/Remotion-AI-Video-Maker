import { interpolate, useCurrentFrame } from "remotion";
    
    export const Intro: React.FC = () => {
      const frame = useCurrentFrame();
    
      // Animate text scale and opacity
      const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp",
      });
      const scale = interpolate(frame, [0, 20], [0.95, 1], {
        extrapolateRight: "clamp",
      });
    
      // Animate background position for gradient movement
      const bgShift = interpolate(frame, [0, 150], [0, 100]);
    
      return (
        <div
          className="w-full h-full flex flex-col justify-center items-center"
          style={{
            backgroundImage: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
            backgroundSize: "200% 200%",
            backgroundPosition: `${bgShift}% ${bgShift}%`,
          }}
        >
          <h1
            className="text-6xl font-bold text-gray-800"
            style={{
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            Welcome to
          </h1>
          <h2
            className="text-4xl mt-4 bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent font-semibold"
            style={{
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            AI Video Maker 🎬✨
          </h2>
        </div>
      );
    };
    
    export const Intro_Duration = 150; // 5 seconds at 30fps
    