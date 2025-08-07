import { getFilmInfoAI } from "@/api/openai";
import FilmInfo from "@/components/FilmInfo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, title]);

  async function handlePress() {
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
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <View className="flex-1">
        <Pressable onPress={handlePress} className="bg-pink-800 p-4">
          <Text>Load data</Text>
        </Pressable>
        <FilmInfo
          isLoading={isLoading}
          title={title as string}
          posterUrl={posterUrl as string}
          releaseYear={releaseYear as string}
          filmData={filmData}
        />
      </View>
    </SafeAreaView>
  );
}

export default FilmInfoScreen;
