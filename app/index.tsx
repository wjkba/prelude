import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="items-center justify-center flex-1">
      <Link href="/search" asChild>
        <Pressable className="items-center justify-center absolute right-16 bottom-20 bg-purple-500 w-16 h-16 rounded-full">
          <Text>X</Text>
        </Pressable>
      </Link>
    </View>
  );
}
