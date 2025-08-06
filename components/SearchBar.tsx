import { FilmCard } from "@/types";
import axios from "axios";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  onDisplayedFilmsChange: (films: FilmCard[]) => void;
}

function SearchBar({ onDisplayedFilmsChange }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const OMDB_API_KEY = process.env.EXPO_PUBLIC_OMDB_API_KEY;

  async function searchFilms(text: string) {
    console.log(OMDB_API_KEY);
    console.log("CLICKED");

    if (!text.trim()) {
      onDisplayedFilmsChange([]);
      return;
    }

    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: { s: text, apikey: OMDB_API_KEY },
      });
      const receivedFilms = response.data.Search;
      const films: FilmCard[] = receivedFilms.map((film: any) => ({
        imdbID: film.imdbID,
        title: film.Title,
        posterUrl: film.Poster,
      }));
      console.log("🚀 ~ searchFilms ~ films:", films);

      onDisplayedFilmsChange(films);
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedSearch = useCallback(debounce(searchFilms, 500), []);

  function handleSearch(text: string) {
    setQuery(text);
    debouncedSearch(text);
    console.log(query);
  }

  return (
    <View className=" bg-white border border-1 p-2">
      <TextInput value={query} onChangeText={handleSearch} />
    </View>
  );
}

export default SearchBar;
