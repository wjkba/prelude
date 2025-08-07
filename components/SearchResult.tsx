import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface SearchResultProps {
  imdbID: string;
  title: string;
  imageUrl: string;
  releaseYear: string;
}

function SearchResult({
  imdbID,
  title,
  imageUrl,
  releaseYear,
}: SearchResultProps) {
  return (
    <Link
      href={{
        pathname: "/FilmInfoScreen",
        params: { imdbID, title, releaseYear, posterUrl: imageUrl },
      }}
      asChild
    >
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        className="flex-row gap-6 border-border border rounded-md overflow-hidden bg-surface items-center"
        android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
      >
        <Image
          style={{ height: 120, aspectRatio: 2 / 3 }}
          source={{ uri: imageUrl }}
        />
        <View className="flex-1 mr-6 justify-center">
          <Text numberOfLines={2} className="text-lg  text-white font-bold">
            {title}
          </Text>
          <Text className="text-stone-200 text-sm">{releaseYear}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default SearchResult;
