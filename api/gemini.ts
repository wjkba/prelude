import { filmDataAI } from "@/types";
import { GoogleGenAI, Type } from "@google/genai";
import { PROMPTv4_GEMINI } from "./prompts";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function getFilmInfoGemini(
  filmTitle: string,
  releaseYear: string
): Promise<filmDataAI> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `Generate analysis for the film: "${filmTitle}" (${releaseYear}`,
      config: {
        systemInstruction: PROMPTv4_GEMINI,
        // tools: [{ googleSearch: {} }], // Google search doesn't seem to work with structured output
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            openingSentence: {
              type: Type.STRING,
            },
            moodTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            genreAndStyle: {
              type: Type.STRING,
            },
            themes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  emoji: { type: Type.STRING },
                  name: { type: Type.STRING },
                },
                propertyOrdering: ["emoji", "name"],
              },
            },
            culturalContext: {
              type: Type.STRING,
            },
            whatToLookOutFor: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  emoji: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                propertyOrdering: ["emoji", "title", "description"],
              },
            },
          },
          propertyOrdering: [
            "openingSentence",
            "moodTags",
            "genreAndStyle",
            "themes",
            "culturalContext",
            "whatToLookOutFor",
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini API");
    }

    return JSON.parse(response.text) as filmDataAI;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type GeminiChatHistoryPart = { text: string };

export type GeminiChatHistoryItem = {
  role: "user" | "model";
  parts: GeminiChatHistoryPart[];
};

export async function getChatResponseGemini(
  message: string,
  filmTitle: string,
  releaseYear: string,
  history?: GeminiChatHistoryItem[]
) {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history ?? [],
      config: {
        systemInstruction: `You are a thoughtful film companion who helps viewers reflect on a movie after watching it. You are talking about ${filmTitle} from ${releaseYear}`,
      },
    });

    const response = await chat.sendMessage({
      message,
    });

    return response.text;
  } catch (error) {
    console.error(error);
  }
}
