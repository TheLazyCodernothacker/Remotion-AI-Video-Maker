import getAi from "../../utils/ai";

export async function POST(request: Request) {
  const AI = await getAi();
  const { text } = await request.json();
  try {
    let prompt =
      "You are creating a video structure for a video. The output should be one line with this format: Intro & 300 & desc | Ending & 240 & desc. The first part is the name of the section and the second part is the duration in frames. The third part is a thorough but open description of that part of the video through the limitations of remotionjs. The video will not use other videos and be more text and animation based. The has a frame rate of 30 fps.  Do not include any other text or explanations, just return the structure in the specified format. Don't forget the video has more than two sections most likely. The video is about: " +
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
    output.forEach((section, index) => {
      MainContent += `<Sequence from={${sum}} durationInFrames={${section.duration}}>\n`;
      MainContent += `  <${section.name} />\n`;
      MainContent += `</Sequence>\n`;
      sum += section.duration;
    });
    MainContent += `</>\n`;
    MainContent += `);\n};\n`;
    console.log("Generated Main.tsx content:", MainContent);

    return new Response(JSON.stringify({ output }));
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response("Error generating content", { status: 500 });
  }
}
