//write a file in ./output/src/Composition.tsx

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function createFile(
  content,
  fileName = "Main.tsx",
  inputDir = ["../../remotion", "MyComp"], // Default directory structure
) {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const outputDir = path.join(__dirname, ...inputDir);
  const filePath = path.join(outputDir, fileName);
  const fileContent = content || ""; // Default to empty string if no content is provided

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  // Write the file
  fs.writeFileSync(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`File ${fileName} created successfully in ${outputDir}`);
    }
  });
}

export async function addImportsToPage(importList) {
  fs.readFileSync("../page.js", "utf8", (err, data) => {
    console.log(data);
  });
}

export async function reset() {
  // remove all files in MyComp directory
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const outputDir = path.join(__dirname, "../../remotion/MyComp");
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      const filePath = path.join(outputDir, file);
      // Check if it's Main.tx
      if (file === "Main.tsx") {
        // If it's Main.tsx, we don't delete it
        return;
      }
      fs.unlinkSync(filePath);
    });
    console.log("All files in MyComp directory have been removed.");

    await createFile(
      `import { Intro, Intro_Duration } from "./Intro";

let files = [
  {
    name: Intro,
    duration: Intro_Duration,
  },
];
export default files;
`,
      "FILEHANDLER.tsx",
    );
    await createFile(
      `import { interpolate, useCurrentFrame } from "remotion";
    
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
            backgroundPosition: \`\${bgShift}% \${bgShift}%\`,
          }}
        >
          <h1
            className="text-6xl font-bold text-gray-800"
            style={{
              opacity,
              transform: \`scale(\${scale})\`,
            }}
          >
            Welcome to
          </h1>
          <h2
            className="text-4xl mt-4 bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent font-semibold"
            style={{
              opacity,
              transform: \`scale(\${scale})\`,
            }}
          >
            AI Video Maker 🎬✨
          </h2>
        </div>
      );
    };
    
    export const Intro_Duration = 150; // 5 seconds at 30fps
    `,
      "Intro.tsx",
    );
  } else {
    console.log("MyComp directory does not exist.");
    await createFile(defaultContent, "Main.tsx");
  }
}

export async function readFile(fileName) {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const inputDir = path.join(__dirname, "../../remotion/MyComp");
  const filePath = path.join(inputDir, fileName);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    return content;
  }
}
// This code creates a directory called 'output/src' if it doesn't exist and writes an empty file named 'Composition.tsx' in that directory.
// The file is created in the same directory as this script.
// You can modify the fileContent variable to add content to the file.
