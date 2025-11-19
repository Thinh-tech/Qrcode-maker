import { GoogleGenAI, Type } from "@google/genai";
import { ThemeResponse } from "../types";

// Initialize Gemini Client
// IMPORTANT: Using process.env.API_KEY as strictly required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelFlash = 'gemini-2.5-flash';

/**
 * Generates a color theme for the QR code based on a text description.
 */
export const generateTheme = async (prompt: string): Promise<ThemeResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: modelFlash,
      contents: `Generate a high-contrast, scannable 2-color palette (foreground, background) for a QR code based on this theme or vibe: "${prompt}".
      The background should usually be lighter and foreground darker, or vice-versa, but they MUST have high contrast for QR readability.
      Return JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fgColor: { type: Type.STRING, description: "Hex color code for the QR dots (foreground)" },
            bgColor: { type: Type.STRING, description: "Hex color code for the background" },
            reasoning: { type: Type.STRING, description: "Short explanation of the color choice" },
          },
          required: ["fgColor", "bgColor"],
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    const data = JSON.parse(jsonText) as ThemeResponse;
    return data;
  } catch (error) {
    console.error("Gemini Theme Error:", error);
    // Fallback default
    return { fgColor: "#000000", bgColor: "#ffffff", reasoning: "Lỗi kết nối, dùng màu mặc định" };
  }
};