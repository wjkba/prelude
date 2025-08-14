import axios from "axios";

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN;

export async function getFilmTMDB(imdbID: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/find/${imdbID}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
        params: {
          external_source: "imdb_id",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
