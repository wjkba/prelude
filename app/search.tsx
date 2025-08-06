import SearchBar from "@/components/SearchBar";
import { FilmCard } from "@/types";
import { useState } from "react";
import { View } from "react-native";

function SearchScreen() {
  const [displayedFilms, setDisplayedFilms] = useState<FilmCard[]>([]);

  function handleDisplayedFilmsChange(films: FilmCard[]) {
    setDisplayedFilms(films);
  }

  return (
    <View>
      <SearchBar onDisplayedFilmsChange={handleDisplayedFilmsChange} />
    </View>
  );
}

export default SearchScreen;
