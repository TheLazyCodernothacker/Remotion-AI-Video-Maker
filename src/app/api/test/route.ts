import getAi from "../../utils/ai";
import { createFile } from "../../utils/FileCreator";

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const AI = await getAi();
  const response = await AI.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      'Make one slide intro for a funny video on why java sucks lmao. make it brainrot. use export const function Main(). imports can ONLY be from remotion packages such as "remotion" OR "react" OR material ui. Be careful for <Composition> mounted inside another composition error. Also you can use tailwind classnames and make sure to specify the bg colors. Answer with the code as text ONLY. beware of the error outputRange must contain only numbers and check for it also check for the error <Composition> mounted inside another composition. watch out for this error too: TypeError(0 , remotion__WEBPACK_IMPORTED_MODULE_1__.useRemotionRoot) is not a function watch out for this error too: <Composition> mounted inside another composition DO NOT USE <Compsotion>. Possible imports frmo remotion are AbsoluteFill, AnimatedImage, Artifact, Audio, Composition, Config, Easing, Experimental, Folder, FolderContext, Freeze, IFrame, Img, Internals, Loop, OffthreadVideo, Sequence, Series, Still, VERSION, Video, cancelRender, continueRender, delayRender, getInputProps, getRemotionEnvironment, getStaticFiles, interpolate, interpolateColors, measureSpring, prefetch, random, registerRoot, spring, staticFile, useBufferState, useCurrentFrame, useCurrentScale, useVideoConfig, watchStaticFile',
  });
  let fileContent = response.text.split("```")[1].split("\n");
  fileContent.shift();
  fileContent = fileContent.join("\n");
  try {
    await createFile(fileContent, "Main.tsx");
  } catch (error) {
    console.error("Error creating file:", error);
    return new Response("Error creating file", { status: 500 });
  }

  return new Response(fileContent, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
