// AIWASHERE
// This section highlights Microsoft's strategic efforts to expand beyond its core Windows business.
// It visually presents key diversification initiatives such as the launch of the Xbox gaming console,
// the development of the Bing search engine, and the company's challenges and limited success in the mobile phone market.
// The latter part of the section dramatically marks the significant transition of leadership from Steve Ballmer to Satya Nadella in 2014,
// emphasizing the dawn of a new era for Microsoft. Animations are sleek, modern, and easy to read,
// utilizing opacity, scale, and translation transforms to introduce elements.

import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

export const Diversification_And_New_Leadership: React.FC = () => {
  const frame = useCurrentFrame();

  // Define animation timing for different sections
  // All durations have been extended to make text stay on screen longer.
  // Original total duration: 360 frames (12 seconds at 30fps)
  // New total duration: 660 frames (22 seconds at 30fps)

  const sectionTitleIn = 0;
  // Increased duration for main title (from 1.5s to 3s)
  const sectionTitleOut = 90; // Section title fades out after 3 seconds

  const xboxIn = sectionTitleOut; // Starts immediately after main title fades out
  // Increased duration for content blocks (from ~2.2s to 4s)
  const xboxOut = xboxIn + 120; // Xbox content appears for 4 seconds

  const bingIn = xboxOut; // Starts immediately after Xbox fades out
  const bingOut = bingIn + 120; // Bing content appears for 4 seconds

  const mobileIn = bingOut; // Starts immediately after Bing fades out
  const mobileOut = mobileIn + 120; // Mobile content appears for 4 seconds

  const leadershipTransitionIn = mobileOut; // Starts immediately after Mobile fades out
  // Increased duration for leadership change (from ~2.3s to 3s)
  const leadershipTransitionOut = leadershipTransitionIn + 90; // Leadership change animation visible for 3 seconds

  const nadellaEraIn = leadershipTransitionOut; // Starts immediately after leadership transition fades out
  // Increased duration for Nadella era title (from ~1.6s to 4s)
  const nadellaEraOut = nadellaEraIn + 120; // Nadella era title visible for 4 seconds then fades out

  // Animation for the main section title
  const titleOpacity = interpolate(frame,
    [sectionTitleIn, sectionTitleIn + 15, sectionTitleOut - 15, sectionTitleOut],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const titleScale = interpolate(frame,
    [sectionTitleIn, sectionTitleIn + 15],
    [0.9, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.8, 0.22, 0.96, 0.65) }
  );

  // Helper function for animating content blocks (fade in/out and slide up)
  const animateContentBlock = (startFrame: number, endFrame: number) => {
    const opacity = interpolate(frame,
      [startFrame, startFrame + 20, endFrame - 20, endFrame], // Fade in over 20 frames, fade out over 20 frames
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    const translateY = interpolate(frame,
      [startFrame, startFrame + 30], // Slide up over 30 frames
      [50, 0], // Starts 50px lower, slides up to its position
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.8, 0.22, 0.96, 0.65) }
    );
    return { opacity, translateY };
  };

  const xboxAnim = animateContentBlock(xboxIn, xboxOut);
  const bingAnim = animateContentBlock(bingIn, bingOut);
  const mobileAnim = animateContentBlock(mobileIn, mobileOut);
  const nadellaEraAnim = animateContentBlock(nadellaEraIn, nadellaEraOut);

  // Leadership transition specific animation (Ballmer slides out, Nadella slides in)
  // The opacity for the whole section is still interpolated.
  const leadershipOpacity = interpolate(frame,
    [leadershipTransitionIn, leadershipTransitionIn + 15, leadershipTransitionOut - 15, leadershipTransitionOut],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // --- CHANGES START HERE ---

  // Removed Ballmer and Nadella slide animations. They will now appear statically
  // and be controlled only by the parent's opacity.

  // --- CHANGES END HERE ---

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white font-sans overflow-hidden relative">

      {/* Main Section Title - Always present but fades in/out */}
      {/* Added text-center to ensure the text within the h1 is centered */}
      <h1
        className="text-6xl font-extrabold mb-12 drop-shadow-lg text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ opacity: titleOpacity, transform: `scale(${titleScale})` }}
      >
        Diversification & New Leadership
      </h1>

      {/* Xbox Section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-4xl bg-gray-800 rounded-xl p-8 shadow-2xl flex flex-col items-center justify-center text-center border-b-4 border-green-600"
        style={{ opacity: xboxAnim.opacity, transform: `translateY(${xboxAnim.translateY}px)` }}
      >
        <div className="text-5xl font-bold mb-4 text-green-500">Xbox Gaming Console</div>
        <div className="text-xl text-gray-300 mb-8 max-w-2xl">
          Microsoft's bold entry into the gaming market,
          challenging established players and building a new entertainment ecosystem.
        </div>
        {/* Abstract Xbox-like shape (no image) */}
        <div className="relative w-40 h-20 bg-green-700 rounded-xl transform skew-x-[-20deg] flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow-inner">
                <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
        </div>
      </div>

      {/* Bing Section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-4xl bg-gray-800 rounded-xl p-8 shadow-2xl flex flex-col items-center justify-center text-center border-b-4 border-amber-500"
        style={{ opacity: bingAnim.opacity, transform: `translateY(${bingAnim.translateY}px)` }}
      >
        <div className="text-5xl font-bold mb-4 text-amber-400">Bing Search Engine</div>
        <div className="text-xl text-gray-300 mb-8 max-w-2xl">
          Microsoft's ambitious venture into the search engine arena,
          aiming to compete with Google and offering a distinct web experience.
        </div>
        {/* Abstract Bing-like shape (no image) */}
        <div className="flex space-x-3 items-center justify-center shadow-lg rounded-full overflow-hidden">
            <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
            <div className="w-12 h-12 bg-green-500 rounded-full"></div>
            <div className="w-12 h-12 bg-amber-500 rounded-full"></div>
            <div className="w-12 h-12 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Mobile Challenges Section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-4xl bg-gray-800 rounded-xl p-8 shadow-2xl flex flex-col items-center justify-center text-center border-b-4 border-red-600"
        style={{ opacity: mobileAnim.opacity, transform: `translateY(${mobileAnim.translateY}px)` }}
      >
        <div className="text-5xl font-bold mb-4 text-red-500">Challenges in Mobile</div>
        <div className="text-xl text-gray-300 max-w-2xl">
          Despite significant investment, Microsoft faced an uphill battle
          and limited success in the rapidly evolving mobile phone market,
          leading to strategic shifts.
        </div>
      </div>

      {/* Leadership Transition Section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-5xl bg-gray-700 rounded-xl p-12 shadow-2xl flex flex-col items-center justify-center text-center border-b-4 border-purple-500"
        style={{ opacity: leadershipOpacity }}
      >
        <div className="text-6xl font-extrabold mb-8 text-purple-400">
          A New Era: Leadership Transition
        </div>
        <div className="flex items-center justify-center w-full space-x-8"> {/* Adjusted space-x for arrow */}
          <div
            className="text-5xl font-semibold text-gray-300 whitespace-nowrap px-4"
            // Removed style={{ transform: `translateX(${ballmerSlideOut}px)` }}
          >
            Steve Ballmer
          </div>
          {/* Re-added the arrow pointing to the new leader */}
          <div className="text-6xl font-extrabold text-blue-300 mx-4"> &rarr; </div>
          <div
            className="text-5xl font-semibold text-blue-300 whitespace-nowrap px-4"
            // Removed style={{ transform: `translateX(${nadellaSlideIn}px)` }}
          >
            Satya Nadella
          </div>
        </div>
        <div className="text-4xl font-medium mt-6 text-gray-400">(2014)</div>
      </div>

      {/* Satya Nadella Era Title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-4xl rounded-xl p-8 shadow-2xl flex flex-col items-center justify-center text-center"
        style={{ opacity: nadellaEraAnim.opacity, transform: `translateY(${nadellaEraAnim.translateY}px)` }}
      >
        <div className="text-6xl font-extrabold mb-4 text-blue-400">
          The Satya Nadella Era Begins
        </div>
        <div className="text-2xl text-gray-300 max-w-3xl">
          Pivoting Microsoft towards cloud computing, artificial intelligence,
          and a new culture of innovation and collaboration.
        </div>
      </div>
    </div>
  );
};

// Update the total duration based on the new extended timings
export const Diversification_And_New_Leadership_Duration = 660; // Duration in frames (22 seconds at 30fps)
export const Diversification_And_New_Leadership_Edited = true; // Set to true if the section is edited
