import { Text, View } from "react-native";

interface MoodTagProps {
  text: string;
}

function MoodTag({ text }: MoodTagProps) {
  return (
    <View className="bg-surface rounded-lg p-2">
      <Text className="text-white text-lg">
        {text[0].toUpperCase()}
        {text.slice(1)}
      </Text>
    </View>
  );
}

export default MoodTag;
