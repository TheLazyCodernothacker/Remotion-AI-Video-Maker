// AIWASHERE
// This section visually demonstrates the concept of repetitive structures in media,
// specifically predictable fight sequences and character actions.
// It uses looping animations of two abstract figures engaged in a "battle,"
// highlighting predictable outcomes and actions with clear, animated text overlays.
// The design is sleek, modern, and colorful, using only Remotion and React
// capabilities along with Tailwind CSS for styling, avoiding external images
// and ensuring all animations are numeric and smooth.

import React from 'react';
import { useCurrentFrame, spring, interpolate, Easing } from 'remotion';

export const Repetitive_Structure: React.FC = () => {
    const frame = useCurrentFrame();

    // Define animation timing parameters
    const introDuration = 90; // Frames for initial intro text
    const transitionDuration = 30; // Frames to transition from intro to main content
    const outroDuration = 30; // Frames for outro text
    const fightCycleDuration = 120; // Frames per single combat cycle - INCREASED FOR TEXT DURATION
    const numberOfCycles = 3; // How many times the combat sequence repeats

    // Calculate total duration based on segments
    const totalActionFrames = fightCycleDuration * numberOfCycles; // 3 * 120 = 360 frames for core action
    const totalDuration = introDuration + transitionDuration + totalActionFrames + outroDuration; // 90 + 30 + 360 + 30 = 510 frames

    // Calculate frame relative to the start of the combat cycles
    const relativeFrame = frame - (introDuration + transitionDuration);

    // currentCycleFrame will loop from 0 to fightCycleDuration - 1 for each combat sequence
    const currentCycleFrame = Math.max(0, relativeFrame % fightCycleDuration);

    // currentCycleIndex determines which text to show based on which cycle is active
    const currentCycleIndex = Math.floor(Math.max(0, relativeFrame) / fightCycleDuration);

    // --- Introduction Text Animation ---
    const introTextOpacity = interpolate(frame,
        [0, 30, introDuration, introDuration + transitionDuration],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const introTextScale = spring({
        frame: frame - 15,
        from: 0.8,
        to: 1,
        fps: 30,
        config: { damping: 10, mass: 0.8, stiffness: 100 }
    });

    // --- Main Title Animation (appears after intro, fades out at end) ---
    const mainTitleOpacity = interpolate(frame,
        [introDuration, introDuration + transitionDuration, totalDuration - outroDuration - 30, totalDuration - outroDuration],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const mainTitleTranslateY = interpolate(frame,
        [introDuration, introDuration + transitionDuration],
        [50, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // --- Combat Elements Visibility (fade in/out with the combat cycles) ---
    const combatOpacity = interpolate(frame,
        [introDuration + transitionDuration - 10, introDuration + transitionDuration + 10, totalDuration - outroDuration - 10, totalDuration - outroDuration + 10],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // --- Character Animations (Hero - left) ---
    const char1EnterSpring = spring({
        frame: currentCycleFrame - 10, // Start entering 10 frames into cycle
        from: -150,
        to: 0,
        fps: 30,
        config: { damping: 12, mass: 1, stiffness: 100 },
    });
    const char1PunchSpring = spring({
        frame: currentCycleFrame - 30, // Start punch animation 30 frames into cycle
        from: 0,
        to: 30, // Moves 30px to the right for punch
        fps: 30,
        config: { damping: 6, mass: 0.5, stiffness: 100 },
    });
    const char1X = interpolate(currentCycleFrame,
        [0, 20, 40, 50, fightCycleDuration], // Keyframes within the 120-frame cycle
        [char1EnterSpring, 0, char1PunchSpring, char1PunchSpring, 0], // Enter, neutral, punch, hold punch, return to neutral
        { easing: Easing.bezier(0.65, 0.05, 0.36, 1) } // Custom easing for smooth movement
    );

    // --- Character Animations (Villain - right) ---
    const char2EnterSpring = spring({
        frame: currentCycleFrame - 15, // Start entering 15 frames into cycle
        from: 150,
        to: 0,
        fps: 30,
        config: { damping: 12, mass: 1, stiffness: 100 },
    });
    const char2ReactSpring = spring({
        frame: currentCycleFrame - 45, // Start reaction 45 frames into cycle (after char1's punch)
        from: 0,
        to: -20, // Moves 20px to the left as if recoiling
        fps: 30,
        config: { damping: 5, mass: 0.4, stiffness: 100 },
    });
    const char2X = interpolate(currentCycleFrame,
        [0, 20, 40, 55, fightCycleDuration], // Keyframes within the 120-frame cycle
        [char2EnterSpring, 0, 0, char2ReactSpring, 0], // Enter, neutral, neutral (during char1 punch), react, return to neutral
        { easing: Easing.bezier(0.65, 0.05, 0.36, 1) }
    );

    // --- Dynamic Text for each Cycle ---
    const cycleTexts = [
        { main: "PREDICTABLE ENGAGEMENT", sub: "The hero always wins the first skirmish." },
        { main: "INEVITABLE CLIFFHANGER", sub: "The villain reveals a new power, hero stunned." },
        { main: "FOREGONE CONCLUSION", sub: "The hero finds a weakness, prepares for final blow." },
    ];
    // Select text based on current cycle index, looping if more cycles than texts
    const textToShow = cycleTexts[currentCycleIndex % cycleTexts.length];

    // --- Action Text Animation (appears during the fight) ---
    // MODIFIED: Adjusted timing for text to stay on screen much longer and be more readable.
    const actionTextOpacity = interpolate(currentCycleFrame,
        [40, 50, 90, 100], // Text fades in (40-50), stays fully visible (50-90), then fades out (90-100)
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const actionTextScale = spring({
        frame: currentCycleFrame - 40, // Trigger spring when text starts appearing
        from: 0.8,
        to: 1,
        fps: 30,
        config: { damping: 10, mass: 0.8, stiffness: 100 }
    });
    const actionTextTranslateY = interpolate(currentCycleFrame,
        [40, 50],
        [20, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // --- Outro Text Animation ---
    const outroTextOpacity = interpolate(frame,
        [totalDuration - outroDuration, totalDuration - 10],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const outroTextScale = spring({
        frame: frame - (totalDuration - outroDuration + 10),
        from: 0.9,
        to: 1,
        fps: 30,
        config: { damping: 10, mass: 0.8, stiffness: 100 }
    });

    return (
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center relative overflow-hidden font-sans">
            {/* Abstract Background Shapes for visual interest */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-20 transform -skew-y-12"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-purple-700 opacity-10 transform skew-y-12"></div>

            {/* Introduction Text */}
            <h1
                className="text-white text-6xl font-extrabold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center drop-shadow-lg leading-tight"
                style={{
                    opacity: introTextOpacity,
                    transform: `translate(-50%, -50%) scale(${introTextScale})`
                }}
            >
                Unveiling the <span className="text-sky-400">Repetitive</span>
                <br />Structure
            </h1>

            {/* Main Title for the combat sequence */}
            <h2
                className="text-white text-5xl font-extrabold mb-12 text-center drop-shadow-lg"
                style={{
                    opacity: mainTitleOpacity,
                    transform: `translateY(${mainTitleTranslateY}px)`
                }}
            >
                <span className="text-pink-400">Predictable</span> Narratives
            </h2>

            {/* Combat Arena and Characters */}
            <div
                className="flex items-center justify-center w-full max-w-4xl h-80 relative"
                style={{ opacity: combatOpacity }}
            >
                {/* Character 1 (Hero - Left) */}
                <div
                    className="w-28 h-56 bg-emerald-500 rounded-lg shadow-xl relative z-10 mr-12"
                    style={{
                        transform: `translateX(calc(-200px + ${char1X}px))`, // -200px initial offset for left positioning
                        transition: 'transform 0.1s ease-out', // Added for smooth reset at cycle end if any interpolate jumps
                    }}
                >
                    <div className="w-16 h-16 bg-emerald-400 rounded-full absolute -top-8 left-1/2 -translate-x-1/2 shadow-inner"></div> {/* Head */}
                    <div className="w-20 h-6 bg-emerald-400 rounded-full absolute bottom-8 left-1/2 -translate-x-1/2 -rotate-12 shadow-inner"></div> {/* Arm hint */}
                </div>

                {/* Impact/Action Text */}
                <div
                    className="absolute z-20 text-center"
                    style={{
                        opacity: actionTextOpacity,
                        transform: `scale(${actionTextScale}) translateY(${actionTextTranslateY}px)`
                    }}
                >
                    <p className="text-sky-300 text-4xl font-extrabold mb-2 drop-shadow-lg">{textToShow.main}</p>
                    <p className="text-gray-200 text-xl font-medium px-8 drop-shadow-md">{textToShow.sub}</p>
                </div>

                {/* Character 2 (Villain - Right) */}
                <div
                    className="w-28 h-56 bg-rose-600 rounded-lg shadow-xl relative z-10 ml-12"
                    style={{
                        transform: `translateX(calc(200px + ${char2X}px))`, // 200px initial offset for right positioning
                        transition: 'transform 0.1s ease-out', // Added for smooth reset at cycle end if any interpolate jumps
                    }}
                >
                    <div className="w-16 h-16 bg-rose-500 rounded-full absolute -top-8 left-1/2 -translate-x-1/2 shadow-inner"></div> {/* Head */}
                    <div className="w-20 h-6 bg-rose-500 rounded-full absolute bottom-8 left-1/2 -translate-x-1/2 rotate-12 shadow-inner"></div> {/* Arm hint */}
                </div>
            </div>

            {/* Outro text */}
            <div
                className="text-white text-3xl font-bold mt-12 text-center leading-relaxed"
                style={{
                    opacity: outroTextOpacity,
                    transform: `scale(${outroTextScale})`
                }}
            >
                <p>Observe the Patterns.</p>
                <p className="text-lg text-gray-400 mt-2">Uncover the Formula.</p>
            </div>
        </div>
    );
};

// UPDATED: Duration to reflect the changes in fightCycleDuration
export const Repetitive_Structure_Duration = 510; // Duration in frames (17 seconds at 30fps)
export const Repetitive_Structure_Edited = true; // Set to true if the section is edited
