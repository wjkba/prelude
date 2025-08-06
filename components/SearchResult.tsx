import { Image, Text, View } from "react-native";

interface SearchResultProps {
  title: string;
  imageUrl: string;
}

function SearchResult({ title, imageUrl }: SearchResultProps) {
  return (
    <View className="gap-4 p-4 border border-red-500 bg-slate-300 flex-row">
      <Image
        style={{ height: 80, aspectRatio: 2 / 3 }}
        source={{
          uri: imageUrl,
        }}
      />
      <Text className="font-bold flex-1">{title}</Text>
    </View>
  );
}

export default SearchResult;
