
import { GoogleGenAI, Type } from "@google/genai";
import { Ingredient, CookingMethod } from "../types";

export async function combineIngredients(
  ingredients: Ingredient[], 
  method: CookingMethod
): Promise<{ name: string; emoji: string; description: string; sourceUrl?: string; sourceTitle?: string } | null> {
  // Always initialize GoogleGenAI inside the function scope
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const names = ingredients.map(i => i.name).join(' and ');
  
  // Removed googleSearch because SDK guidelines state the response might not be in JSON format when used.
  const prompt = `Find a common culinary dish or food preparation that results from combining ${names} using the technique: ${method}.
  
  Format your response as a JSON object with:
  1. name: The common name of the dish.
  2. emoji: A relevant food emoji.
  3. description: A one-sentence explanation of why these ingredients work together with this method.
  
  Provide only the JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            emoji: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["name", "emoji", "description"]
        }
      }
    });

    // The response.text property directly returns the extracted string output.
    const jsonStr = response.text;
    if (!jsonStr) return null;
    
    const result = JSON.parse(jsonStr.trim());
    return result;
  } catch (error) {
    console.error("Gemini combination error:", error);
    return null;
  }
}
