import getAi from "../../utils/ai";
import { createFile } from "../../utils/FileSystem";

export async function POST(request: Request) {
  const AI = await getAi();
  const { text } = await request.json();
  try {
    let prompt =
      "You are creating a video structure for a video. The output should be one line with this format: Intro & 300 & desc | Ending & 240 & desc. The first part is the name of the section snake case capetalized first letter each and the second part is the duration in frames. The third part is a thorough but open description of that part of the video through the limitations of remotionjs. The video will not use other videos and be more text and animation based. The has a frame rate of 30 fps.  Do not include any other text or explanations, just return the structure in the specified format. Don't forget the video has more than two sections most likely. The video is about: " +
      text;
    const data = await AI.models.generateContent({
      model: "gemini-2.0-flash",
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

    let MainContent = `import {Sequence} from 'remotion';\nexport const Main: React.FC = () => {\n`;
    MainContent += `  return (\n<>\n`;
    let sum = 0;
    let imports = `import React from 'react';\n`;
    output.forEach((section, index) => {
      section.name = section.name.trim().replace(/\s+/g, "");
      MainContent += `<Sequence from={${sum}} durationInFrames={${section.duration}}>\n`;
      MainContent += `  <${section.name} />\n`;
      MainContent += `</Sequence>\n`;
      imports += `import { ${section.name} } from './${section.name}';\n`;
      sum += section.duration;
    });
    MainContent += `</>\n`;
    MainContent += `);\n};\n`;
    MainContent += `export const duration = ${sum};`;
    MainContent = imports + MainContent;

    createFile(MainContent, "Main.tsx");
    console.log("File created successfully: Main.tsx");
    output.forEach((section) => {
      let fileContent = `import React from 'react';\n\nexport const ${section.name}: React.FC = () => {\n`;
      fileContent += `  return (\n    <div>\n      <h1>${section.name}</h1>\n      <p>${section.description}</p>\n    </div>\n  );\n};\n`;
      createFile(fileContent, `${section.name}.tsx`);
      console.log(`File created successfully: ${section.name}.tsx`);
    });

    return new Response(JSON.stringify({ output }));
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response("Error generating content", { status: 500 });
  }
}
