import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

let AI = null;

async function getAI() {
  if (AI) {
    return AI;
  }
  const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY || "",
  });
  return ai;
}

export default getAI;
