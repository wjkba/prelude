import { Text, View } from "react-native";

interface MoodTagProps {
  text: string;
  color: string;
}

function MoodTag({ text, color }: MoodTagProps) {
  return (
    <View
      style={{ borderWidth: 2, borderColor: color }}
      className={"rounded-xl p-2 bg-surface"}
    >
      <Text className="text-white text-lg">
        {text[0].toUpperCase()}
        {text.slice(1)}
      </Text>
    </View>
  );
}

export default MoodTag;
