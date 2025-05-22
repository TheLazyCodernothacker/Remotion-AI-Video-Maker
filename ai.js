const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
  apiKey: "AIzaSyDZCVe_hmUvAJl2Ra-Y33Jvfr-oOrMvoZ8",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "how to do 4*4",
  });
  console.log(response.text);
}

main();
