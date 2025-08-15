import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function searchFilmsOMDB(searchQuery: string) {
  try {
    const apiKey =
      (await AsyncStorage.getItem("omdb_api_key")) ||
      process.env.EXPO_PUBLIC_OMDB_API_KEY;
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        s: searchQuery,
        apikey: apiKey,
        type: "movie",
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getFilmOMDB(imdbID: string) {
  try {
    const apiKey =
      (await AsyncStorage.getItem("omdb_api_key")) ||
      process.env.EXPO_PUBLIC_OMDB_API_KEY;
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        i: imdbID,
        apikey: apiKey,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
