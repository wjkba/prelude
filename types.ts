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
    description: string;
  }[];
  culturalContext: string;
  whatToLookOutFor: {
    title: string;
    description: string;
  }[];
};

export interface StoredFilm {
  imdbID: string;
  filmData: filmDataAI;
}
