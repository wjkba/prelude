import { getFilmInfo } from "@/api/openai";
import FilmInfo from "@/components/FilmInfo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function FilmInfoScreen() {
  const { imdbID, title, releaseYear, posterUrl } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation, title]);

  async function handlePress() {
    try {
      const result = await getFilmInfo(title as string);
      console.log("Final result:", result);
    } catch (error) {
      console.error("Failed to get film info:", error);
    }
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <View className="flex-1">
        <FilmInfo
          title={title as string}
          posterUrl={posterUrl as string}
          releaseYear={releaseYear as string}
        />
      </View>
    </SafeAreaView>
  );
}

export default FilmInfoScreen;
