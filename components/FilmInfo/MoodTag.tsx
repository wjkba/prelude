import { Text, View } from "react-native";

interface MoodTagProps {
  text: string;
  color: string;
}

function MoodTag({ text, color }: MoodTagProps) {
  return (
    <View style={{ backgroundColor: color }} className={"rounded-lg p-2"}>
      <Text className="text-white text-lg">
        {text[0].toUpperCase()}
        {text.slice(1)}
      </Text>
    </View>
  );
}

export default MoodTag;
