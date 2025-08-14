import { Text, View } from "react-native";

interface ThemeProps {
  emoji: string;
  theme: string;
}

function Theme({ emoji, theme }: ThemeProps) {
  return (
    <View className="bg-surface max-w-[150px] p-4 rounded-lg">
      <Text className="text-3xl mb-6">{emoji}</Text>
      <Text className="text-lg line-clamp-2 font-medium text-white">
        {theme}
      </Text>
    </View>
  );
}

export default Theme;
