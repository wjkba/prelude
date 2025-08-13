import { filmDataAI } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeFilmData(imdbID: string, filmData: filmDataAI) {
  try {
    const jsonData = JSON.stringify({
      filmData: filmData,
      lastUpdated: Date.now(),
    });
    await AsyncStorage.setItem(`film_${imdbID}`, jsonData);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
