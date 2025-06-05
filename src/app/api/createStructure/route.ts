import getAi from "../../utils/ai";
import { createFile, reset } from "../../utils/FileSystem";

export async function POST(request: Request) {
  const AI = await getAi();
  const { text } = await request.json();
  try {
    let prompt =
      "You are creating a video structure for a video. The output should be one line with this format: Intro & 300 & desc | Ending & 240 & desc. The first part is the name of the section snake case capetalized first letter (letters only in the title) each and the second part is the duration in frames. The third part is a thorough but open description of that part of the video through the limitations of remotionjs. The video will not use other videos and be more text and animation based. The description for each section should be specific so it can be independent from others. Don't do something like \"Introducing the main topic\" instead specify what the main topic would be. The has a frame rate of 30 fps.  Do not include any other text or explanations, just return the structure in the specified format. Don't forget the video has more than two sections most likely. Make sure each section of the video doesn't end with thanks for watching unless it is the conclusion. Make sure the timings are all correct, each text being up for enough time but not too long, and showcasing every element. Make sure the information of the video is also factually accurate " +
      text;
    const data = await AI.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: prompt,
    });
    let output = [];
    data.text.split("|").forEach((section: string) => {
      const [name, duration, description] = section
        .split("&")
        .map((s) => s.trim());
      output.push({
        name,
        duration: parseInt(duration, 10),
        description,
      });
    });

    let imports = `import React from 'react';\n`;
    output.forEach((section, index) => {
      section.name = section.name.trim().replace(/\s+/g, "");
      imports += `import { ${section.name}, ${section.name}_Duration, ${section.name}_Edited } from './${section.name}';\n`;
    });
    let FileHandlerCode = imports;

    let declaration = `let files = [${output.map((section) => `{name: ${section.name}, duration: ${section.name}_Duration, edited: ${section.name}_Edited }`).join(", ")}];\n`;
    FileHandlerCode += declaration;
    FileHandlerCode += "export default files;\n";

    let a = await reset();
    await createFile(FileHandlerCode, "FILEHANDLER.tsx");

    console.log("File created successfully: Main.tsx");
    output.forEach((section) => {
      let fileContent = `import React from 'react';\n\nexport const ${section.name}: React.FC = () => {\n`;
      fileContent += `  return (\n    <div>\n      <h1>${section.name}</h1>\n      <p>${section.description}</p>\n    </div>\n  );\n};\n`;
      fileContent += `\nexport const ${section.name}_Duration = ${section.duration};\n`;
      fileContent += `export const ${section.name}_Edited = false;`;
      createFile(fileContent, `${section.name}.tsx`);
      console.log(`File created successfully: ${section.name}.tsx`);
    });

    return new Response(JSON.stringify({ output }));
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response("Error generating content", { status: 500 });
  }
}
