import getAi from "../../utils/ai";
import { createFile, readFile } from "../../utils/FileSystem";
import files from "../../../remotion/MyComp/FILEHANDLER";

export async function POST(request: Request) {
  const { desc, section, edited } = await request.json();

  // For example, fetch data from your DB here
  const AI = await getAi();
  let content =
    '. use export const function and the given exports. Make the video thats generated fancy, colorful, sleek, modern, easy to read etc. Also try not to use any images if possible. Make sure to not use any files that dont already exist on the users desktop. imports can ONLY be from remotion packages such as "remotion" OR "react". Be careful for <Composition> mounted inside another composition error. DO NOT USE COMPOSITION element. Also you can use tailwind classnames and make sure to specify the bg colors. Answer with the code as text ONLY. beware of the error outputRange must contain only numbers and check for it also check for the error <Composition> mounted inside another composition. watch out for this error too: TypeError(0 , remotion__WEBPACK_IMPORTED_MODULE_1__.useRemotionRoot) is not a function watch out for this error too: <Composition> mounted inside another composition DO NOT USE <Compsotion>. Possible imports frmo remotion are AbsoluteFill, AnimatedImage, Artifact, Audio, Composition, Config, Easing, Experimental, Folder, FolderContext, Freeze, IFrame, Img, Internals, Loop, OffthreadVideo, Sequence, Series, Still, VERSION, Video, cancelRender, continueRender, delayRender, getInputProps, getRemotionEnvironment, getStaticFiles, interpolate, interpolateColors, measureSpring, prefetch, random, registerRoot, spring, staticFile, useBufferState, useCurrentFrame, useCurrentScale, useVideoConfig, watchStaticFile double check for all errors and make sure the code can run first try and make sure it doesnt reset at like a "my comp remotion video" and make sure it actually addreses the user prompt but make sure it doenst cause an error on specific prompts that cause the website to crash. avoid the error <Composition> was mounted inside the `component` that was passed to the <Player>. make sure Error: remotion__WEBPACK_IMPORTED_MODULE_2__.Easing.easeOut is not a function doesnt occur' +
    "it should be a " +
    desc +
    `Here's the template code:
      //add any imports you want to use from remotion or react
      export const ${section}: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-100"> //later edit this div
      <h1 className="">Welcome to MyComp</h1>
      <p className="">
        This is a sample introduction component for your Remotion project. You
        can customize it as needed.
      </p>
    </div>
  );
};

export const ${section}_Duration = 360; // Duration in frames 30fps, change this to the duration you want for the section
export const ${section}_Edited = true; // Set to true if the section is edited
      ` +
    "Make sure to leave a comment AIWASHERE at the top of the file.";
  if (edited == true) {
    readFile(section + ".tsx").then((fileContent) => {

      // console.log(fileContent);
      content = `Edit the follow remotion.js code and ${desc}. Make sure to not change the imports or the name of the section. The file is already created and you can edit it. Here is the code:\n\n` + fileContent;
      console.log(content);
    });
  }
  const response = await AI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
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
