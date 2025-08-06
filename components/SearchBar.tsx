import { FilmCard } from "@/types";
import axios from "axios";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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
        releaseYear: film.Year,
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

  function clearSearch() {
    setQuery("");
    onDisplayedFilmsChange([]);
  }

  return (
    <View className="bg-input rounded-xl border border-1 border-border py-2 px-4 flex-row items-center">
      <TextInput
        className="text-white text-lg flex-1"
        value={query}
        onChangeText={handleSearch}
        placeholder="Search..."
        placeholderTextColor="#9CA3AF"
      />
      {query.length > 0 && (
        <Pressable onPress={clearSearch} className="ml-2 p-1">
          <Text className="text-gray-400 text-lg">✕</Text>
        </Pressable>
      )}
    </View>
  );
}

export default SearchBar;
