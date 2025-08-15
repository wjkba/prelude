import SearchResult from "@/components/SearchResult";
import { FilmCard } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [recentFilms, setRecentFilms] = useState<null | FilmCard[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const handleClearStorage = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all saved films? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            setRecentFilms([]);
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleClearStorage} className="p-2">
          <Ionicons name="trash-outline" size={20} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);

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
            viewedAt: parsedData.viewedAt || 0,
          };
        }
      });

      const loadedFilms = await Promise.all(filmPromises);
      const filteredFilms = loadedFilms.filter((film) => film !== undefined);

      // Sort by most recent first
      const sortedFilms = filteredFilms.sort((a, b) => b.viewedAt - a.viewedAt);
      setRecentFilms(sortedFilms);
    }
    loadRecentFilms();
  }, [isFocused]);

  function RecentFilmsView() {
    return (
      <>
        <Text className="text-white text-2xl mb-4 font-bold">
          Recently Viewed
        </Text>

        {recentFilms && recentFilms.length > 0 ? (
          <ScrollView contentContainerStyle={{ gap: 12 }}>
            {recentFilms.slice(0, 3).map((film) => (
              <SearchResult
                key={film.imdbID}
                imdbID={film.imdbID}
                title={film.title}
                imageUrl={film.posterUrl}
                releaseYear={film.releaseYear}
              />
            ))}
          </ScrollView>
        ) : (
          <View className="bg-[#242329] justify-center items-center rounded-xl p-10">
            <Text className="text-stone-300">
              Search for films to get started
            </Text>
          </View>
        )}
      </>
    );
  }

  return (
    <View className="px-4 flex-1">
      <RecentFilmsView />
      <Link href="/search" asChild>
        <Pressable className="items-center justify-center absolute right-16 bottom-20 bg-purple-500 w-16 h-16 rounded-full">
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}
