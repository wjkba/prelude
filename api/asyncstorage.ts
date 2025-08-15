import { filmDataAI, FilmMetadata } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeFilmData(
  imdbID: string,
  title: string,
  posterUrl: string,
  releaseYear: string,
  filmDataAI: filmDataAI,
  backdropPath?: string,
  filmMetadata?: FilmMetadata
) {
  try {
    const jsonData = JSON.stringify({
      imdbID,
      title,
      posterUrl,
      releaseYear,
      filmDataAI: filmDataAI,
      lastUpdated: Date.now(),
      viewedAt: Date.now(),
      backdropPath,
      filmMetadata,
    });
    await AsyncStorage.setItem(`film_${imdbID}`, jsonData);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
