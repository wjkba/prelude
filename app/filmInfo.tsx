import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

function FilmInfoScreen() {
  const { title, posterUrl } = useLocalSearchParams();

  return (
    <View className="items-center justify-center flex-1">
      <Image
        style={{ height: 300, width: 200 }}
        source={{ uri: posterUrl as string }}
      />
      <Text className="text-xl font-bold mt-4">{title}</Text>
    </View>
  );
}

export default FilmInfoScreen;
