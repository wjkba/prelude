import axios from "axios";

const OMDB_API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;

export async function getFilmOMDB(imdbID: string) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        i: imdbID,
        apikey: OMDB_API_KEY,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
