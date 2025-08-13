import { filmDataAI } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import MoodTag from "./FilmInfo/MoodTag";
import Theme from "./FilmInfo/Theme";

interface FilmInfoProps {
  title: string;
  posterUrl: string;
  releaseYear: string;
  isLoading: boolean;
  filmData: filmDataAI | null;
}

interface HeadingProps {
  children: React.ReactNode;
}

function Heading({ children }: HeadingProps) {
  return <Text className="mb-3 font-bold text-white text-xl">{children}</Text>;
}

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
}

function BodyText({ children, className = "" }: BodyTextProps) {
  return (
    <Text className={`text-stone-100 text-lg ${className}`}>{children}</Text>
  );
}

function renderFilmInfoAI(filmData: FilmInfoProps["filmData"]) {
  if (!filmData) {
    return (
      <View className="mx-4 flex-1 justify-center items-center">
        <Text className="text-gray-400 text-lg">
          Press &quot;Load data&quot; to get AI analysis
        </Text>
      </View>
    );
  }

  return (
    <View className="mx-4">
      <View className="mb-12">
        <BodyText className="text-xl text-center mb-8">
          &quot;{filmData.openingSentence}&quot;
        </BodyText>
        <View className="flex-row gap-2 flex-wrap">
          {filmData.moodTags.map((tag, index) => (
            <MoodTag key={index} text={tag} />
          ))}
        </View>
      </View>
      <View className="gap-12">
        <View>
          <Heading>Genre & Style</Heading>
          <BodyText>{filmData.genreAndStyle}</BodyText>
        </View>
        <View>
          <Heading>Themes</Heading>
          <View className="gap-3">
            {filmData.themes.map((theme, index) => (
              <Theme
                key={index}
                emoji={theme.emoji}
                theme={theme.name}
                description={theme.description}
              />
            ))}
          </View>
        </View>
        <View>
          <Heading>Cultural Context</Heading>
          <BodyText>{filmData.culturalContext}</BodyText>
        </View>
        <View>
          <Heading>What to look out for</Heading>
          <View className="gap-4">
            {filmData.whatToLookOutFor.map((item, index) => (
              <View key={index}>
                <BodyText className="font-medium mb-1">{item.title}</BodyText>
                <BodyText>{item.description}</BodyText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function FilmInfo({
  title,
  posterUrl,
  releaseYear,
  isLoading,
  filmData,
}: FilmInfoProps) {
  return (
    <ScrollView
      className="bg-background overflow-hidden flex-1 w-full"
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <LinearGradient
        colors={["transparent", "#1B181E"]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.8 }}
        className="mb-6 items-center justify-end h-[240px] w-full"
      >
        <Image
          style={{ height: 200, aspectRatio: 2 / 3 }}
          source={{ uri: posterUrl as string }}
        />
      </LinearGradient>
      <View className="mb-6 justify-center items-center">
        <Text className="text-white text-3xl mb-2 font-bold text-center">
          {title}
        </Text>
        {/* <Text className="text-stone-300 text-lg">{releaseYear}</Text> */}
      </View>
      {isLoading ? (
        <View className="mt-4 flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        renderFilmInfoAI(filmData)
      )}
    </ScrollView>
  );
}

export default FilmInfo;
