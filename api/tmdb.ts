import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function getFilmTMDB(imdbID: string) {
  try {
    const readAccessToken =
      (await AsyncStorage.getItem("tmdb_read_access_token")) ||
      process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN;
    const response = await axios.get(
      `https://api.themoviedb.org/3/find/${imdbID}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${readAccessToken}`,
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
