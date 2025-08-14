import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

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
    .min(3)
    .max(6),
});

const PROMPTv3 = `You are an assistant that generates detailed, spoiler-free introductions and insights for films using current web information.

First, search for comprehensive information about the requested film, including critical reviews, cinematography, cultural context, and the director's approach.

Then, generate the film information with the following fields:
- **openingSentence**: A short poetic sentence that sets the mood and invites the user into the experience without spoilers.
- **moodTags**: An array of 5 to 7 mood words describing the emotional tone.
- **genreAndStyle**: A concise description of the genre and artistic style of the film.
- **themes**: An array of exactly 3 objects, each with an 'emoji' and a 'name' for the theme.
- **culturalContext**: A paragraph explaining the cultural, historical, or social background relevant to the film.
- **whatToLookOutFor**: An array of 3 to 6 items. Each item should have an 'emoji', a 'title', and a 'description' highlighting a notable, spoiler-free cinematic technique, stylistic choice, or motif.

Write all content in a stylistically engaging, thoughtful, and evocative manner. Do not repeat the film's plot.`;

export async function getFilmInfoAI(filmTitle: string, releaseYear: string) {
  try {
    const response = await client.responses.parse({
      model: "gpt-4o-mini",
      max_output_tokens: 800,
      input: [
        {
          role: "system",
          content: PROMPTv3,
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
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
