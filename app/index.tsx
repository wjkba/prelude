import SearchResult from "@/components/SearchResult";
import { FilmCard } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [recentFilms, setRecentFilms] = useState<null | FilmCard[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadRecentFilms() {
      const allKeys = await AsyncStorage.getAllKeys();
      const filmKeys = allKeys.filter((key) => key.startsWith("film_"));

      const filmPromises = filmKeys.map(async (key) => {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          const parsedData = JSON.parse(data);
          return {
            imdbID: parsedData.imdbID,
            title: parsedData.title,
            posterUrl: parsedData.posterUrl,
            releaseYear: parsedData.releaseYear,
          };
        }
      });

      const loadedFilms = await Promise.all(filmPromises);
      const filteredFilms = loadedFilms.filter((film) => film !== undefined);
      setRecentFilms(filteredFilms);
    }
    loadRecentFilms();
  }, [isFocused]);

  return (
    <View className="px-4 flex-1">
      <ScrollView contentContainerStyle={{ gap: 16 }}>
        {recentFilms && recentFilms.length > 0 ? (
          recentFilms.map((film) => (
            <SearchResult
              key={film.imdbID}
              imdbID={film.imdbID}
              title={film.title}
              imageUrl={film.posterUrl}
              releaseYear={film.releaseYear}
            />
          ))
        ) : (
          <Text className="text-white">No recent films found</Text>
        )}
      </ScrollView>
      <Link href="/search" asChild>
        <Pressable className="items-center justify-center absolute right-16 bottom-20 bg-purple-500 w-16 h-16 rounded-full">
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}
