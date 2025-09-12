import { storeFilmData } from "@/api/asyncstorage";
import { getFilmInfoGemini } from "@/api/gemini";
import { getFilmOMDB } from "@/api/omdb";
import { getFilmTMDB } from "@/api/tmdb";
import FilmInfo from "@/components/FilmInfo";
import { filmDataAI, FilmMetadata } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";

function FilmInfoScreen() {
  const { imdbID, title, releaseYear, posterUrl } = useLocalSearchParams<{
    imdbID: string;
    title: string;
    releaseYear: string;
    posterUrl: string;
  }>();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [filmData, setFilmData] = useState<filmDataAI | null>(null);
  const [filmMetadata, setFilmMetadata] = useState<FilmMetadata | null>(null);
  const [backdropPath, setBackdropPath] = useState<string | null>(null);

  const clearFilmData = useCallback(async () => {
    Alert.alert("Clear Data", "Clear cached data for this film?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem(`film_${imdbID}`);
          navigation.goBack();
        },
      },
    ]);
  }, [imdbID, navigation]);

  useEffect(() => {
    async function loadFilmData() {
      setIsLoading(true);

      const cachedData = await AsyncStorage.getItem(`film_${imdbID}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const {
          filmDataAI,
          backdropPath: cachedBackdrop,
          filmMetadata: cachedMetadata,
        } = parsedData;
        setFilmData(filmDataAI);
        if (cachedBackdrop) setBackdropPath(cachedBackdrop);
        if (cachedMetadata) setFilmMetadata(cachedMetadata);

        // Update viewedAt timestamp for cached films
        await storeFilmData(
          imdbID,
          title as string,
          posterUrl as string,
          releaseYear as string,
          filmDataAI,
          cachedBackdrop,
          cachedMetadata
        );

        setIsLoading(false);
        return;
      }

      try {
        const filmDataTMDB = await getFilmTMDB(imdbID);
        const backdrop = filmDataTMDB?.movie_results?.[0]?.backdrop_path || "";
        setBackdropPath(backdrop);

        const { Director, Runtime } = await getFilmOMDB(imdbID);

        const metadata = {
          director: Director === "N/A" ? null : Director.split(",")[0].trim(),
          releaseYear,
          runtime: Runtime,
        };
        setFilmMetadata(metadata);

        // const filmDataAI = await getFilmInfoOpenAI(title, releaseYear);
        const filmDataAI = await getFilmInfoGemini(title, releaseYear);

        console.log("🚀 ~ loadFilmData ~ filmDataAI:", filmDataAI);
        setFilmData(filmDataAI);

        if (filmDataAI) {
          await storeFilmData(
            imdbID,
            title as string,
            posterUrl as string,
            releaseYear as string,
            filmDataAI,
            backdrop,
            metadata
          );
        }
      } catch (error) {
        console.error("Failed to get film info:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFilmData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imdbID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerRight: () => (
        <Pressable onPress={clearFilmData} className="pl-4">
          <Ionicons name="ellipsis-vertical" size={20} color="white" />
        </Pressable>
      ),
    });
  }, [navigation, title, clearFilmData]);

  // TODO: add info while loading

  return (
    <View className="flex-1 bg-background">
      <FilmInfo
        isLoading={isLoading}
        title={title as string}
        backdropPath={backdropPath || ""}
        posterUrl={posterUrl as string}
        releaseYear={releaseYear as string}
        filmData={filmData}
        filmMetadata={filmMetadata}
      />
    </View>
  );
}

export default FilmInfoScreen;
