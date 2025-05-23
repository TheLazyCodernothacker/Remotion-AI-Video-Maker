export async function GET(request: Request) {
  const res = await fetch("./api/askAI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content:
        'Make one slide intro for a funny video on why java sucks lmao. make it brainrot. use export default function MyComposition(). imports can ONLY be from remotion packages such as "remotion" OR "react" OR material ui. Be careful for <Composition> mounted inside another composition error. Also you can use tailwind classnames and make sure to specify the bg colors. Answer with the code as text ONLY. beware of the error outputRange must contain only numbers and check for it also check for the error <Composition> mounted inside another composition. watch out for this error too: TypeError(0 , remotion__WEBPACK_IMPORTED_MODULE_1__.useRemotionRoot) is not a function watch out for this error too: <Composition> mounted inside another composition DO NOT USE <Compsotion>. Possible imports frmo remotion are AbsoluteFill, AnimatedImage, Artifact, Audio, Composition, Config, Easing, Experimental, Folder, FolderContext, Freeze, IFrame, Img, Internals, Loop, OffthreadVideo, Sequence, Series, Still, VERSION, Video, cancelRender, continueRender, delayRender, getInputProps, getRemotionEnvironment, getStaticFiles, interpolate, interpolateColors, measureSpring, prefetch, random, registerRoot, spring, staticFile, useBufferState, useCurrentFrame, useCurrentScale, useVideoConfig, watchStaticFile',
    }),
  });
  const data = await res.json();
  return new Response(data.text);
}
