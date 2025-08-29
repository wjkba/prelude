import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { PROMPTv4 } from "./prompts";

const getOpenAIClient = async () => {
  const apiKey =
    (await AsyncStorage.getItem("openai_api_key")) ||
    process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  return new OpenAI({
    apiKey: apiKey,
  });
};

const filmAISchema = z.object({
  openingSentence: z.string(),
  moodTags: z.array(z.string()).min(5).max(7),
  genreAndStyle: z.string(),
  themes: z
    .array(
      z.object({
        emoji: z.string(),
        name: z.string(),
      })
    )
    .length(3),
  culturalContext: z.string(),
  whatToLookOutFor: z
    .array(
      z.object({
        emoji: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .min(4)
    .max(6),
});

export async function getFilmInfoOpenAI(
  filmTitle: string,
  releaseYear: string
) {
  try {
    const client = await getOpenAIClient();
    const response = await client.responses.parse({
      model: "gpt-4o-mini",
      max_output_tokens: 1000,
      input: [
        {
          role: "system",
          content: PROMPTv4,
        },
        {
          role: "user",
          content: `Search the web and generate analysis for the film: "${filmTitle}" (${releaseYear})`,
        },
      ],
      text: {
        format: zodTextFormat(filmAISchema, "filmInfoAI"),
      },
      tools: [{ type: "web_search_preview" }],
    });

    return response.output_parsed;
  } catch (error: unknown) {
    console.error("API Error:", error);

    throw error;
  }
}

export async function getChatResponseOpenAI(
  message: string,
  filmTitle: string,
  releaseYear: string,
  previousResponseId: string | null
) {
  try {
    const client = await getOpenAIClient();
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      max_output_tokens: 300,
      ...(previousResponseId && { previous_response_id: previousResponseId }),
      input: [
        {
          role: "system",
          content: `You are a thoughtful film companion who helps viewers reflect on a movie after watching it. You are talking about ${filmTitle} from ${releaseYear}`,
        },
        {
          role: "user",
          content: `${message}`,
        },
      ],
    });
    return response;
  } catch (error) {
    console.error(error);
    throw Error;
  }
}
