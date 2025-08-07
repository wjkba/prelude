import { getFilmInfo } from "@/api/openai";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function FilmInfoScreen() {
  const { title, posterUrl } = useLocalSearchParams();
  const navigation = useNavigation();

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
    <SafeAreaView edges={["top"]} className="bg-pink-700 flex-1">
      <View className="items-center justify-center flex-1 bg-pink-700 px-4 py-5">
        <View className="items-center bg-black rounded-3xl overflow-hidden flex-1 w-full">
          <View className="items-center justify-end h-[300px] w-full bg-green-300">
            <Image
              style={{ height: 200, aspectRatio: 2 / 3 }}
              source={{ uri: posterUrl as string }}
            />
          </View>

          <Text className="text-white text-xl font-bold mt-4">{title}</Text>
          <Pressable onPress={handlePress} className="p-4 bg-red-500">
            <Text>PRESS</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default FilmInfoScreen;
