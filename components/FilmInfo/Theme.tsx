import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ThemeProps {
  emoji: string;
  theme: string;
  description: string;
}

function Theme({ emoji, theme, description }: ThemeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="bg-surface rounded-lg overflow-hidden">
      <Pressable
        className="p-4 flex-row justify-between items-center"
        onPress={toggleExpanded}
      >
        <View className="flex-row gap-3 flex-1">
          <Text className="text-xl">{emoji}</Text>
          <Text className="text-white text-xl font-medium">{theme}</Text>
        </View>
        <Text className="text-white text-lg">{isExpanded ? "−" : "+"}</Text>
      </Pressable>
      {isExpanded && (
        <View className="px-4 pb-4">
          <Text className="text-gray-100 text-lg">{description}</Text>
        </View>
      )}
    </View>
  );
}

export default Theme;
