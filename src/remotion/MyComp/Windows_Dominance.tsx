// AIWASHERE
// This section, "Windows_Dominance", visually narrates the evolution of Microsoft's graphical user interface,
// highlighting three pivotal stages: Windows 1.0, Windows 3.1, and Windows 95.
// Each segment features animated text and abstract graphical elements representing the respective OS.
// The animation smoothly transitions between these eras, emphasizing Microsoft's journey to OS market leadership.
// It uses Remotion's interpolation and spring functions for dynamic, sleek movements and a modern aesthetic,
// without relying on external image assets. Tailwind CSS is used for styling.
import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill, spring, Easing } from 'remotion';

export const Windows_Dominance: React.FC = () => {
  const frame = useCurrentFrame();

  // Custom easing function as requested, replacing Easing.easeOut
  const customEasing = Easing.bezier(0.8, 0.22, 0.96, 0.65);

  // --- Scene Duration Configuration ---
  // Decreased scene duration to speed up overall pace
  const sceneDuration = 180; // WAS 350. Each scene will now last 180 frames (approx. 6 seconds at 30fps)
  const fadeInOutDuration = 30; // WAS 70. Decreased fade duration for faster transitions
  const elementEntryDuration = 40; // WAS 80. Duration for elements to animate in, significantly faster
  const elementDelay = 15; // WAS 40. Decreased delay before elements start animating within a scene

  // --- Windows 1.0 Scene Animation Controls ---
  const win1StartFrame = 0;
  const win1EndFrame = win1StartFrame + sceneDuration; // End at frame 180
  const win1Opacity = interpolate(
    frame,
    [win1StartFrame, win1StartFrame + fadeInOutDuration, win1EndFrame - fadeInOutDuration, win1EndFrame],
    [0, 1, 1, 0], // Fade in, stay, fade out
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const win1Scale = interpolate(
    frame,
    [win1StartFrame, win1StartFrame + fadeInOutDuration], // Scale up faster
    [0.9, 1],
    { easing: customEasing, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // --- Windows 3.1 Scene Animation Controls ---
  const win3StartFrame = win1EndFrame; // Starts where previous scene ends (frame 180)
  const win3EndFrame = win3StartFrame + sceneDuration; // End at frame 360
  const win3Opacity = interpolate(
    frame,
    [win3StartFrame, win3StartFrame + fadeInOutDuration, win3EndFrame - fadeInOutDuration, win3EndFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const win3Scale = interpolate(
    frame,
    [win3StartFrame, win3StartFrame + fadeInOutDuration], // Scale up faster
    [0.9, 1],
    { easing: customEasing, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // --- Windows 95 Scene Animation Controls ---
  const win95StartFrame = win3EndFrame; // Starts where previous scene ends (frame 360)
  const win95EndFrame = win95StartFrame + sceneDuration; // Total duration ends here, at frame 540
  const win95Opacity = interpolate(
    frame,
    [win95StartFrame, win95StartFrame + fadeInOutDuration, win95EndFrame - fadeInOutDuration, win95EndFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const win95Scale = interpolate(
    frame,
    [win95StartFrame, win95StartFrame + fadeInOutDuration], // Scale up faster
    [0.9, 1],
    { easing: customEasing, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Interpolate a numeric value to determine the background color dynamically
  const backgroundColorIndex = interpolate(
    frame,
    [0, win1EndFrame - 1, win3StartFrame, win3EndFrame - 1, win95StartFrame, win95EndFrame],
    [0, 0, 1, 1, 2, 2], // 0 for Win1, 1 for Win3, 2 for Win95
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Function to return Tailwind background classes based on the interpolated index
  // This avoids interpolating string values directly.
  const getBackgroundColorClass = (index: number) => {
    if (index < 0.5) return 'bg-gradient-to-br from-blue-900 to-indigo-700'; // Deep blue for Windows 1.0
    if (index < 1.5) return 'bg-gradient-to-br from-cyan-700 to-blue-500';  // Vibrant blue/cyan for Windows 3.1
    if (index < 2.5) return 'bg-gradient-to-br from-teal-600 to-sky-400';   // Fresh teal/sky for Windows 95
    return 'bg-gradient-to-br from-gray-800 to-gray-600'; // Default/End state
  };

  const currentBgClass = getBackgroundColorClass(backgroundColorIndex);

  // Spring animation for title appearance (unchanged config for entrance speed)
  const titleSpring = (startFrame: number) => spring({
    frame: frame - startFrame,
    from: -100, // Starts off-screen above
    to: 0,
    fps: 30,
    config: {
      damping: 200, // Controls how quickly oscillations decay
      mass: 1.5,
      stiffness: 100,
      overshootClamping: false, // Allows for some overshoot
      restSpeedThreshold: 0.1,
      restDisplacementThreshold: 0.1,
    }
  });

  // Spring animation for descriptive text appearance (adjusted delay for faster appearance)
  const textSpring = (startFrame: number) => spring({
    frame: frame - startFrame - 10, // WAS -20. Decreased delay for text to appear sooner
    from: -80, // Starts off-screen above
    to: 0,
    fps: 30,
    config: {
      damping: 200,
      mass: 1.5,
      stiffness: 100,
      overshootClamping: false,
      restSpeedThreshold: 0.1,
      restDisplacementThreshold: 0.1,
    }
  });

  return (
    <AbsoluteFill className={`flex items-center justify-center ${currentBgClass} transition-colors duration-1000 ease-in-out`}>
      {/* Windows 1.0 Scene */}
      <div
        style={{ opacity: win1Opacity, transform: `scale(${win1Scale})` }}
        className="absolute w-full h-full flex flex-col items-center justify-center text-white"
      >
        <h1
          className="text-7xl font-extrabold mb-8 drop-shadow-lg"
          style={{
            transform: `translateY(${titleSpring(win1StartFrame)})px`,
          }}
        >
          Windows 1.0: The Dawn of GUI
        </h1>
        <p
          className="text-3xl text-center max-w-3xl leading-relaxed drop-shadow-md"
          style={{
            transform: `translateY(${textSpring(win1StartFrame)})px`,
          }}
        >
          Introduced in 1985, Windows 1.0 laid the groundwork for graphical interfaces on personal computers.
          A visionary step towards user-friendly computing.
        </p>

        {/* Abstract Windows 1.0 GUI elements (simple, blocky windows) - Repositioned to corners */}
        <div className="absolute top-12 left-12 w-48 h-32 bg-blue-600 border-2 border-blue-400 shadow-xl opacity-80"
             style={{
                transform: `translateX(${interpolate(frame, [win1StartFrame + elementDelay, win1StartFrame + elementDelay + elementEntryDuration], [-200, 0], { easing: customEasing })}px)
                            translateY(${interpolate(frame, [win1StartFrame + elementDelay, win1StartFrame + elementDelay + elementEntryDuration], [-100, 0], { easing: customEasing })}px)`,
                // Ensure opacity follows scene but also animates in, adjusted to new element timing
                opacity: interpolate(frame, [win1StartFrame + elementDelay - 10, win1StartFrame + elementDelay + elementEntryDuration - 10], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
             }}
        >
          <div className="bg-blue-700 h-6 flex items-center px-2 text-sm text-white font-medium">Untitled - Notepad</div>
          <div className="flex-grow p-2 text-xs text-white">C:\&gt; _</div>
        </div>
        <div className="absolute bottom-12 right-12 w-56 h-40 bg-gray-600 border-2 border-gray-400 shadow-xl opacity-70"
             style={{
                transform: `translateX(${interpolate(frame, [win1StartFrame + elementDelay + 20, win1StartFrame + elementDelay + elementEntryDuration + 20], [200, 0], { easing: customEasing })}px)
                            translateY(${interpolate(frame, [win1StartFrame + elementDelay + 20, win1StartFrame + elementDelay + elementEntryDuration + 20], [100, 0], { easing: customEasing })}px)`,
                // Ensure opacity follows scene but also animates in, adjusted to new element timing
                opacity: interpolate(frame, [win1StartFrame + elementDelay + 10, win1StartFrame + elementDelay + elementEntryDuration + 10], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
             }}
        >
          <div className="bg-gray-700 h-6 flex items-center px-2 text-sm text-white font-medium">MS-DOS Executive</div>
          <div className="flex-grow p-2 text-xs text-white">
            <p>A: [ ]</p>
            <p>C: [ ]</p>
            <p>MSAPP.EXE</p>
          </div>
        </div>
      </div>

      {/* Windows 3.1 Scene */}
      <div
        style={{ opacity: win3Opacity, transform: `scale(${win3Scale})` }}
        className="absolute w-full h-full flex flex-col items-center justify-center text-white"
      >
        <h1
          className="text-7xl font-extrabold mb-8 drop-shadow-lg"
          style={{
            transform: `translateY(${titleSpring(win3StartFrame)})px`,
          }}
        >
          Windows 3.1: Desktop Evolution
        </h1>
        <p
          className="text-3xl text-center max-w-3xl leading-relaxed drop-shadow-md"
          style={{
            transform: `translateY(${textSpring(win3StartFrame)})px`,
          }}
        >
          Released in 1992, it brought improved stability, TrueType fonts, and the iconic Program Manager,
          making Windows a more viable desktop environment.
        </p>

        {/* Abstract Windows 3.1 GUI elements (Program Manager like with groups) - Repositioned to corners */}
        <div className="absolute top-12 right-12 w-64 h-48 bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 shadow-xl text-black opacity-80"
             style={{
                transform: `translateX(${interpolate(frame, [win3StartFrame + elementDelay, win3StartFrame + elementDelay + elementEntryDuration], [200, 0], { easing: customEasing })}px)
                            translateY(${interpolate(frame, [win3StartFrame + elementDelay, win3StartFrame + elementDelay + elementEntryDuration], [-100, 0], { easing: customEasing })}px)`,
                // Ensure opacity follows scene but also animates in, adjusted to new element timing
                opacity: interpolate(frame, [win3StartFrame + elementDelay - 10, win3StartFrame + elementDelay + elementEntryDuration - 10], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
             }}
        >
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-6 flex items-center px-2 text-sm text-white font-bold">Program Manager</div>
          <div className="grid grid-cols-3 gap-2 p-4 text-xs">
            <div className="flex flex-col items-center"><div className="w-8 h-8 bg-blue-300 rounded-md mb-1"></div><p>Main</p></div>
            <div className="flex flex-col items-center"><div className="w-8 h-8 bg-green-300 rounded-md mb-1"></div><p>Games</p></div>
            <div className="flex flex-col items-center"><div className="w-8 h-8 bg-red-300 rounded-md mb-1"></div><p>Apps</p></div>
            <div className="flex flex-col items-center"><div className="w-8 h-8 bg-yellow-300 rounded-md mb-1"></div><p>Tools</p></div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 w-56 h-36 bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400 shadow-xl text-black opacity-70"
             style={{
                transform: `translateX(${interpolate(frame, [win3StartFrame + elementDelay + 20, win3StartFrame + elementDelay + elementEntryDuration + 20], [-200, 0], { easing: customEasing })}px)
                            translateY(${interpolate(frame, [win3StartFrame + elementDelay + 20, win3StartFrame + elementDelay + elementEntryDuration + 20], [100, 0], { easing: customEasing })}px)`,
                // Ensure opacity follows scene but also animates in, adjusted to new element timing
                opacity: interpolate(frame, [win3StartFrame + elementDelay + 10, win3StartFrame + elementDelay + elementEntryDuration + 10], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
             }}
        >
          <div className="bg-gradient-to-r from-gray-400 to-gray-600 h-6 flex items-center px-2 text-sm text-white font-bold">File Manager</div>
          <div className="p-2 text-xs font-mono">
            <p className="mb-1">C:\WINDOWS\</p>
            <p className="mb-1">  SYSTEM\</p>
            <p>  TEMP\</p>
          </div>
        </div>
      </div>

      {/* Windows 95 Scene */}
      <div
        style={{ opacity: win95Opacity, transform: `scale(${win95Scale})` }}
        className="absolute w-full h-full flex flex-col items-center justify-center text-white"
      >
        <h1
          className="text-7xl font-extrabold mb-8 drop-shadow-lg"
          style={{
            transform: `translateY(${titleSpring(win95StartFrame)})px`,
          }}
        >
          Windows 95: The OS Revolution
        </h1>
        <p
          className="text-3xl text-center max-w-3xl leading-relaxed drop-shadow-md"
          style={{
            transform: `translateY(${textSpring(win95StartFrame)})px`,
          }}
        >
          A landmark release in 1995, featuring the iconic Start Menu, Taskbar, and Plug and Play,
          ushering in the era of modern user-friendly computing.
        </p>

        {/* Abstract Windows 95 GUI elements (Start Menu/Taskbar simulation) */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-700 border-t-2 border-gray-800 shadow-2xl flex items-center px-4"
             style={{
                transform: `translateY(${interpolate(frame, [win95StartFrame + elementDelay, win95StartFrame + elementDelay + elementEntryDuration], [100, 0], { easing: customEasing })}px)`,
                // Ensure opacity follows scene but also animates in, adjusted to new element timing
                opacity: interpolate(frame, [win95StartFrame + elementDelay - 10, win95StartFrame + elementDelay + elementEntryDuration - 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
            }}
        >
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-black text-2xl font-bold py-2 px-6 rounded shadow-md cursor-pointer flex items-center group"
               style={{ transform: `scaleX(${interpolate(frame, [win95StartFrame + elementDelay + 10, win95StartFrame + elementDelay + elementEntryDuration + 10], [0, 1], { easing: customEasing })})`, transformOrigin: 'left' }}
          >
            <span className="text-red-500 text-3xl font-serif">W</span>
            <span className="text-yellow-500 text-3xl font-serif">i</span>
            <span className="text-green-500 text-3xl font-serif">n</span>
            <span className="text-blue-500 text-3xl font-serif">d</span>
            <span className="text-red-500 text-3xl font-serif">o</span>
            <span className="text-yellow-500 text-3xl font-serif">w</span>
            <span className="text-green-500 text-3xl font-serif">s</span>
            <span className="ml-2 font-bold">95</span>
          </div>
          <div className="flex-grow flex justify-end gap-4 text-white text-sm">
            <div className="bg-gray-600 px-3 py-1 rounded shadow-inner opacity-70">Internet Explorer</div>
            <div className="bg-gray-600 px-3 py-1 rounded shadow-inner opacity-70">My Computer</div>
            <div className="bg-gray-600 px-3 py-1 rounded shadow-inner opacity-70">Recycle Bin</div>
          </div>
        </div>

        {/* A simple window element for Windows 95 feel - Repositioned to top-left */}
        <div className="absolute top-12 left-12 w-80 h-60 bg-gradient-to-br from-blue-300 to-blue-400 border-2 border-blue-600 shadow-xl text-black"
             style={{
                transform: `scale(${interpolate(frame, [win95StartFrame + elementDelay + 20, win95StartFrame + elementDelay + elementEntryDuration + 20], [0.8, 1], { easing: customEasing })})
                            translateX(${interpolate(frame, [win95StartFrame + elementDelay + 20, win95StartFrame + elementDelay + elementEntryDuration + 20], [-200, 0], { easing: customEasing })}px)
                            translateY(${interpolate(frame, [win95StartFrame + elementDelay + 20, win95StartFrame + elementDelay + elementEntryDuration + 20], [-100, 0], { easing: customEasing })}px)`,
                // Ensure opacity follows scene but also animates in, adjusted to new element timing
                opacity: interpolate(frame, [win95StartFrame + elementDelay + 10, win95StartFrame + elementDelay + elementEntryDuration + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
             }}
        >
          <div className="bg-blue-600 h-8 flex items-center px-2 text-white font-bold text-lg">My Computer</div>
          <div className="flex-grow p-4 text-sm bg-gray-100">
            <div className="mb-2 flex items-center"><div className="w-6 h-6 bg-blue-500 mr-2"></div>Local Disk (C:)</div>
            <div className="mb-2 flex items-center"><div className="w-6 h-6 bg-green-500 mr-2"></div>CD-ROM Drive (D:)</div>
            <div className="mb-2 flex items-center"><div className="w-6 h-6 bg-yellow-500 mr-2"></div>Control Panel</div>
            <div className="flex items-center"><div className="w-6 h-6 bg-red-500 mr-2"></div>Printers</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Windows_Dominance_Duration = 540; // WAS 1050. Total duration in frames: 3 scenes * 180 frames/scene = 540 frames (18 seconds at 30fps)
export const Windows_Dominance_Edited = true; // Set to true if the section is edited
