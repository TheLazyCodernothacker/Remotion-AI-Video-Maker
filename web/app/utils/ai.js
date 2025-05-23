import { GoogleGenAI } from "@google/genai";

let AI = null;

async function getAI() {
  if (AI) {
    return AI;
  }
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDZCVe_hmUvAJl2Ra-Y33Jvfr-oOrMvoZ8",
  });
  return ai;
}

export default getAI;
