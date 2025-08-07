import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

interface FilmInfoProps {
  title: string;
  posterUrl: string;
  releaseYear: string;
}

interface MoodTagProps {
  text: string;
}

interface HeadingProps {
  children: React.ReactNode;
}

function MoodTag({ text }: MoodTagProps) {
  return (
    <View className="bg-surface rounded-lg p-2">
      <Text className="text-white">{text}</Text>
    </View>
  );
}

function Heading({ children }: HeadingProps) {
  return <Text className="mb-4 font-bold text-white text-xl">{children}</Text>;
}

function FilmInfo({ title, posterUrl, releaseYear }: FilmInfoProps) {
  return (
    <View className="bg-background overflow-hidden flex-1 w-full">
      <LinearGradient
        colors={["white", "#1B181E"]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.8 }}
        className="mb-6 items-center justify-end h-[280px] w-full"
      >
        <Image
          style={{ height: 200, aspectRatio: 2 / 3 }}
          source={{ uri: posterUrl as string }}
        />
      </LinearGradient>
      <View className="mb-8 justify-center items-center">
        <Text className="text-white text-3xl mb-2 font-bold">{title}</Text>
        <Text className="text-stone-300 ">{releaseYear}</Text>
      </View>
      <View className="mx-4">
        <View className="mb-12">
          <Text className="text-white text-lg mb-2">
            “To see without touching. To listen without changing. To ache
            without being known.”
          </Text>
          <View className="flex-row gap-2">
            <MoodTag text="test" />
            <MoodTag text="test" />
            <MoodTag text="test" />
            <MoodTag text="test" />
            <MoodTag text="test" />
          </View>
        </View>
        <View className="gap-12">
          <View>
            <Heading>Genre & Style</Heading>
            <Text className="text-white">
              Intimate drama with dreamlike pacing, blending poetic realism and
              ethereal fantasy through floating black-and-white cinematography
              that occasionally bursts into color.
            </Text>
          </View>
          <View>
            <Heading>Cultural Context</Heading>
            <Text className="text-white">
              A divided Berlin hums beneath angel wings — cold streets, warm
              radios, whispered memories of a city caught between worlds.
            </Text>
          </View>
          <View>
            <Heading>What to look out for</Heading>
            <Text className="text-white">
              Watch how silence speaks louder than words. Notice the careful
              framing of hands and reflections — doorways between the visible
              and invisible. Pay attention to moments when color seeps in,
              signaling shifts from the eternal to the earthly.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default FilmInfo;
