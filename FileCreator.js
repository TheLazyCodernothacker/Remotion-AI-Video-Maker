//write a file in ./output/src/Composition.tsx

const fs = require("fs");
const path = require("path");

export async function createFile(fs, path) {
  const outputDir = path.join(__dirname, "output", "src");
  const fileName = "Composition.tsx";
  const filePath = path.join(outputDir, fileName);
  const fileContent = "";

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
