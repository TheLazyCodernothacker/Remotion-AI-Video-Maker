import getAi from "../../utils/ai";
import { createFile } from "../../utils/FileSystem";
import files from "../../../remotion/MyComp/FILEHANDLER";

export async function POST(request: Request) {
  const { desc, section } = await request.json();

  // For example, fetch data from your DB here
  const AI = await getAi();
  const response = await AI.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      desc +
      '. use export const function and the given exports. imports can ONLY be from remotion packages such as "remotion" OR "react". Be careful for <Composition> mounted inside another composition error. Also you can use tailwind classnames and make sure to specify the bg colors. Answer with the code as text ONLY. beware of the error outputRange must contain only numbers and check for it also check for the error <Composition> mounted inside another composition. watch out for this error too: TypeError(0 , remotion__WEBPACK_IMPORTED_MODULE_1__.useRemotionRoot) is not a function watch out for this error too: <Composition> mounted inside another composition DO NOT USE <Compsotion>. Possible imports frmo remotion are AbsoluteFill, AnimatedImage, Artifact, Audio, Composition, Config, Easing, Experimental, Folder, FolderContext, Freeze, IFrame, Img, Internals, Loop, OffthreadVideo, Sequence, Series, Still, VERSION, Video, cancelRender, continueRender, delayRender, getInputProps, getRemotionEnvironment, getStaticFiles, interpolate, interpolateColors, measureSpring, prefetch, random, registerRoot, spring, staticFile, useBufferState, useCurrentFrame, useCurrentScale, useVideoConfig, watchStaticFile' +
      `Here's the example code:
      export const ${section}: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-100">
      <h1 className="">Welcome to MyComp</h1>
      <p className="">
        This is a sample introduction component for your Remotion project. You
        can customize it as needed.
      </p>
    </div>
  );
};

export const ${section}_Duration = 360; // Duration in frames 30fps

      ` +
      "Make sure to leave a comment AIWASHERE at the top of the file.",
  });
  let fileContent = response.text.split("```")[1].split("\n");
  fileContent.shift();
  fileContent = fileContent.join("\n");
  try {
    await createFile(fileContent, section + ".tsx");
  } catch (error) {
    console.error("Error creating file:", error);
    return new Response("Error creating file", { status: 500 });
  }

  return new Response(fileContent, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
