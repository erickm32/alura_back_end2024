import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function generatePosterAltDescriptionWithGemini(filepath, mimeType) {
  const prompt =
    "Generate a description of the given image to be used as an alt text on img tags on HTML. Keep it short but descriptive. Give me just one answer, not several options on the response.";

  try {
    const buffer = fs.readFileSync(filepath);
    const image = {
      inlineData: {
        data: buffer.toString("base64"),
        mimeType: mimeType
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text not available.";
  } catch (e) {
    console.error("Failed to generate alt-text:", e.message, e);
    throw new Error("Failed to get alt-text from Gemini.");
  }
}