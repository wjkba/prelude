export interface FilmCard {
  imdbID: string;
  title: string;
  posterUrl: string;
  releaseYear: string;
}

export type filmDataAI = {
  openingSentence: string;
  moodTags: string[];
  genreAndStyle: string;
  themes: {
    emoji: string;
    name: string;
  }[];
  culturalContext: string;
  whatToLookOutFor: {
    emoji: string;
    title: string;
    description: string;
  }[];
};

export type FilmMetadata = {
  director: string | null;
  releaseYear: string;
  runtime: string;
};
