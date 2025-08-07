import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

interface FilmInfoProps {
  title: string;
  posterUrl: string;
  releaseYear: string;
  isLoading: boolean;
  filmData: {
    openingSentence: string;
    moodTags: string[];
    genreAndStyle: string;
    themes: {
      emoji: string;
      name: string;
      description: string;
    }[];
    culturalContext: string;
    whatToLookOutFor: {
      title: string;
      description: string;
    }[];
  } | null;
}

interface MoodTagProps {
  text: string;
}

interface HeadingProps {
  children: React.ReactNode;
}

interface ThemeProps {
  emoji: string;
  theme: string;
  description: string;
}

function MoodTag({ text }: MoodTagProps) {
  return (
    <View className="bg-surface rounded-lg p-2">
      <Text className="text-white">{text}</Text>
    </View>
  );
}

function Heading({ children }: HeadingProps) {
  return <Text className="mb-3 font-bold text-white text-xl">{children}</Text>;
}

function Theme({ emoji, theme, description }: ThemeProps) {
  return (
    <View className="p-4 bg-surface flex-row justify-between">
      <View className="flex-row gap-3">
        <Text className="text-2xl">{emoji}</Text>
        <Text className="text-white text-lg">{theme}</Text>
      </View>
      <Text>\/</Text>
    </View>
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
        <Text className="text-white text-xl mb-4">
          &quot;{filmData.openingSentence}&quot;
        </Text>
        <View className="flex-row gap-2 flex-wrap">
          {filmData.moodTags.map((tag, index) => (
            <MoodTag key={index} text={tag} />
          ))}
        </View>
      </View>
      <View className="gap-12">
        <View>
          <Heading>Genre & Style</Heading>
          <Text className="text-white">{filmData.genreAndStyle}</Text>
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
          <Text className="text-white">{filmData.culturalContext}</Text>
        </View>
        <View>
          <Heading>What to look out for</Heading>
          <View className="gap-4">
            {filmData.whatToLookOutFor.map((item, index) => (
              <View key={index}>
                <Text className="text-white font-bold text-lg mb-1">
                  {item.title}
                </Text>
                <Text className="text-white">{item.description}</Text>
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
        className="mb-6 items-center justify-end h-[280px] w-full"
      >
        <Image
          style={{ height: 200, aspectRatio: 2 / 3 }}
          source={{ uri: posterUrl as string }}
        />
      </LinearGradient>
      <View className="mb-8 justify-center items-center">
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
