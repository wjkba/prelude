import { getFilmInfoAI } from "@/api/openai";
import FilmInfo from "@/components/FilmInfo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface FilmAIData {
  openingSentence: string;
  moodTags: string[];
  genreAndStyle: string;
  themes: {
    emoji: string;
    name: string;
    description: string;
  }[];
  culturalContext: string;
  whatToLookOutFor: {
    title: string;
    description: string;
  }[];
}

function FilmInfoScreen() {
  const { imdbID, title, releaseYear, posterUrl } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [filmData, setFilmData] = useState<FilmAIData | null>(null);

  const handlePress = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getFilmInfoAI(title as string);
      console.log("Final result:", result);
      setFilmData(result);
    } catch (error) {
      console.error("Failed to get film info:", error);
    } finally {
      setIsLoading(false);
    }
  }, [title]);

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
