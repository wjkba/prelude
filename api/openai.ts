import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

const filmAISchema = z.object({
  openingSentence: z.string(),
  moodTags: z.array(z.string()),
  genreAndStyle: z.string(),
  themes: z.array(
    z.object({
      emoji: z.string(),
      name: z.string(),
      description: z.string(),
    })
  ),
  culturalContext: z.string(),
  whatToLookOutFor: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

const PROMPT = `You are an assistant that generates detailed, spoiler-free introductions and insights for films.
Output a strict JSON object matching exactly this structure and types (no extra text, no explanations):

{
  "openingSentence": "A short poetic sentence that sets the mood and invites the user into the experience without spoilers.",
  "moodTags": ["list", "of", "mood", "words", "describing", "the", "emotional", "tone"],
  "genreAndStyle": "A concise description of the genre and artistic style of the film.",
  "themes": [
    {
      "emoji": "A single emoji that represents the theme",
      "name": "The theme name",
      "description": "A short, poetic explanation of what the theme means in the context of the film."
    }
  ],
  "culturalContext": "A paragraph explaining the cultural, historical, or social background relevant to the film.",
  "whatToLookOutFor": [
    {
      "title": "Optional short title for this point",
      "description": "A spoiler-free insight about important elements, motifs, or moments to pay attention to."
    }
  ]
}

Write all fields in a stylistically engaging, thoughtful, and evocative manner. Do not repeat the film's plot. Generate ONLY the JSON object, nothing else.`;

export async function getFilmInfoAI(filmTitle: string, releaseYear: string) {
  try {
    console.log("Starting API call...");

    // TODO: add internet search

    const response = await client.responses.parse({
      model: "gpt-4.1-nano",
      max_output_tokens: 500,
      input: [
        {
          role: "system",
          content: PROMPT,
        },
        {
          role: "user",
          content: `Generate analysis for the film: ${filmTitle} - ${releaseYear}`,
        },
      ],
      text: {
        format: zodTextFormat(filmAISchema, "filmInfoAI"),
      },
    });

    console.log("Parsed output:", response.output_parsed);

    return response.output_parsed;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
