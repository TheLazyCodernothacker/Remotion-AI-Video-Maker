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
  fs.writeFile(filePath, fileContent, (err) => {
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
      fs.unlinkSync(filePath);
    });
    console.log("All files in MyComp directory have been removed.");
    let defaultContent = `export const Main = () => {
      return <div>Hello, World!</div>;
      };
      export const duration = 30; // Duration in frames`;
    createFile(defaultContent, "Main.tsx");
  } else {
    console.log("MyComp directory does not exist.");
    createFile(defaultContent, "Main.tsx");
  }
}
// This code creates a directory called 'output/src' if it doesn't exist and writes an empty file named 'Composition.tsx' in that directory.
// The file is created in the same directory as this script.
// You can modify the fileContent variable to add content to the file.
