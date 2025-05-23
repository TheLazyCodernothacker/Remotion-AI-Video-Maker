import getAi from "../../utils/ai";
import { createFile } from "../../../FileCreator";

export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const AI = await getAi();
  const response = await AI.models.generateContent({
    model: "gemini-2.0-flash",
    contents:
      'Make a video about why Java is the worst language ever. use export default function MyComposition(). imports can ONLY be from remotion packages such as "remotion" OR "react" OR material ui. Be careful for <Composition> mounted inside another composition error. Also you can use tailwind classnames and make sure to specify the bg colors. Answer with the code as text ONLY. ',
  });
  let fileContent = response.text.split("```")[1].split("\n");
  fileContent.shift();
  fileContent = fileContent.join("\n");
  try {
    await createFile(fileContent, "Composition.tsx");
  } catch (error) {
    console.error("Error creating file:", error);
    return new Response("Error creating file", { status: 500 });
  }

  return new Response(fileContent, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
