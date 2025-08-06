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
    console.log(query);
  }

  return (
    <View>
      <TextInput value={query} onChangeText={handleSearch} />
      <Pressable onPress={() => searchFilms(query)}>
        <Text>SEARCH</Text>
      </Pressable>
    </View>
  );
}

export default SearchBar;
