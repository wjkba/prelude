import axios from "axios";

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN;

export async function getFilmTMDB(imdbID: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/find/?external_source=IMDb&external_id=${imdbID}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
  }
}
