import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import { FilmCard } from "@/types";
import { useState } from "react";
import { FlatList, View } from "react-native";

function SearchScreen() {
  const [displayedFilms, setDisplayedFilms] = useState<FilmCard[]>([]);

  function handleDisplayedFilmsChange(films: FilmCard[]) {
    setDisplayedFilms(films);
  }

  return (
    <View className="m-4">
      <SearchBar onDisplayedFilmsChange={handleDisplayedFilmsChange} />
      <FlatList
        data={displayedFilms}
        renderItem={({ item }) => (
          <View className="mb-2">
            <SearchResult title={item.title} imageUrl={item.posterUrl} />
          </View>
        )}
        keyExtractor={(item, index) => `${item.imdbID}-${index}`}
      />
    </View>
  );
}

export default SearchScreen;
