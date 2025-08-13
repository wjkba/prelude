import { storeFilmData } from "@/api/asyncstorage";
import { getFilmInfoAI } from "@/api/openai";
import FilmInfo from "@/components/FilmInfo";
import { filmDataAI } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

function FilmInfoScreen() {
  const { imdbID, title, releaseYear, posterUrl } = useLocalSearchParams<{
    imdbID: string;
    title: string;
    releaseYear: string;
    posterUrl: string;
  }>();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState<filmDataAI | null>(null);

  const handlePress = useCallback(async () => {
    setIsLoading(true);

    const cachedData = await AsyncStorage.getItem(`film_${imdbID}`);
    if (cachedData) {
      const { filmDataAI } = JSON.parse(cachedData);
      setFilmData(filmDataAI);
      setIsLoading(false);
      return;
    }

    try {
      const filmDataAI = await getFilmInfoAI(title, releaseYear);
      console.log("Final result:", filmDataAI);
      setFilmData(filmDataAI);
      if (filmDataAI) {
        storeFilmData(imdbID, title, posterUrl, releaseYear, filmDataAI);
      }
    } catch (error) {
      console.error("Failed to get film info:", error);
    } finally {
      setIsLoading(false);
    }
  }, [imdbID, posterUrl, title, releaseYear]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: title as string,
      headerRight: () => (
        <Pressable
          onPress={handlePress}
          disabled={isLoading}
          className="pl-4 py-2"
        >
          <Text className="text-white font-medium">
            {isLoading ? "Loading..." : "Load data"}
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, title, isLoading, handlePress]);

  // TODO: add info while loading

  return (
    <View className="flex-1 bg-background">
      <FilmInfo
        isLoading={isLoading}
        title={title as string}
        posterUrl={posterUrl as string}
        releaseYear={releaseYear as string}
        filmData={filmData}
      />
    </View>
  );
}

export default FilmInfoScreen;
