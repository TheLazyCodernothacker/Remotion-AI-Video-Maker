import getAi from "../../utils/ai";

export async function POST(request: Request) {
  const { content } = await request.json();
  const AI = await getAi();
  const response = await AI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
  });
  return new Response(response.text, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
