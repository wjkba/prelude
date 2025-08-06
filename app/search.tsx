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
      <View className="mb-8">
        <SearchBar onDisplayedFilmsChange={handleDisplayedFilmsChange} />
      </View>
      <FlatList
        data={displayedFilms}
        renderItem={({ item }) => (
          <View className="mb-4">
            <SearchResult
              title={item.title}
              imageUrl={item.posterUrl}
              releaseYear={item.releaseYear}
            />
          </View>
        )}
        keyExtractor={(item, index) => `${item.imdbID}-${index}`}
      />
    </View>
  );
}

export default SearchScreen;
