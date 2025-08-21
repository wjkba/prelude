import AsyncStorage from "@react-native-async-storage/async-storage";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

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

const PROMPTv4 = `You are an assistant that generates detailed, spoiler-free introductions and insights for films using up-to-date web information.

First, research the requested film from multiple reputable sources, including critical reviews, interviews, cinematography analyses, and cultural commentary. Do not copy or cite directly from any source. Instead, synthesize the information in your own words to ensure originality and avoid plagiarism.

All writing must be clear, engaging, and easy to read on a mobile screen. Avoid overly complex sentences. Never include the film's plot, ending, or any spoilers.

Generate the film information with the following fields:
- **openingSentence**: A short poetic sentence that sets the mood and invites the user into the experience without spoilers. Do not include the film's title or plot details.
- **moodTags**: An array of 5 to 7 mood words describing the emotional tone.
- **genreAndStyle**: A paragraph of the genre and artistic style of the film.
- **themes**: An array of exactly 3 objects, each with:
    - "emoji": A single emoji representing the theme.
    - "name": The theme name.
- **culturalContext**: A paragraph explaining the cultural, historical, or social background relevant to the film.
- **whatToLookOutFor**: An array of 4 to 6 objects, each with:
    - "emoji": A single emoji representing the point.
    - "title": A short title.
    - "description": The description should be a sharp, spoiler-free insight into a **specific** piece of cinematic craft (a visual motif, sound design choice, camera technique). Go beyond the obvious: connect the detail to the film's mood or themes. No spoilers allowed. **Avoid generic genre conventions.**

Write in a stylistically engaging, thoughtful, and evocative manner, but keep all fields succinct and mobile-friendly. Avoid repetition and do not include any external references or citations.`;

export async function getFilmInfoAI(filmTitle: string, releaseYear: string) {
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
