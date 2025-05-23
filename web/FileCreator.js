//write a file in ./output/src/Composition.tsx

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function createFile(content, fileName = "Composition.tsx") {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const outputDir = path.join(__dirname, "../src");
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

// This code creates a directory called 'output/src' if it doesn't exist and writes an empty file named 'Composition.tsx' in that directory.
// The file is created in the same directory as this script.
// You can modify the fileContent variable to add content to the file.
