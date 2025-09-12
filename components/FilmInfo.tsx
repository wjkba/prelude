import { filmDataAI, FilmMetadata } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Accordion from "./FilmInfo/Accordion";
import MoodTag from "./FilmInfo/MoodTag";
import Theme from "./FilmInfo/Theme";

interface FilmInfoProps {
  title: string;
  backdropPath: string;
  posterUrl: string;
  releaseYear: string;
  isLoading: boolean;
  filmData: filmDataAI | null;
  filmMetadata: FilmMetadata | null;
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
    <Text className={`text-stone-200 text-lg ${className}`}>{children}</Text>
  );
}

function renderMoodTags(moodTags: string[]) {
  const moodColors = [
    "#A63C71", // Luminous Magenta (primary tie-in)
    "#8E486E", // Plum Dust
    "#7A4F79", // Violet Fade
    "#6B5A85", // Lavender Smoke
    "#5C6A8F", // Hazy Indigo
    "#587D86", // Mist Teal
    "#5F7E72", // Deep Sage
  ];

  const sortedMoodTags = [...moodTags].sort((a, b) => b.length - a.length);

  const shuffledColors = [...moodColors].sort(() => Math.random() - 0.5);

  return sortedMoodTags.map((tag, index) => (
    <MoodTag
      key={index}
      text={tag}
      color={shuffledColors[index % shuffledColors.length]}
    />
  ));
}

function renderFilmInfoAI(filmData: FilmInfoProps["filmData"]) {
  if (!filmData) {
    return <></>;
  }

  return (
    <View className="mx-4">
      {/* Opening sentence */}
      <View className="mb-12">
        <BodyText className="text-xl text-white mb-4">
          &quot;{filmData.openingSentence}&quot;
        </Text>
        <View className="flex-row gap-2  flex-wrap">
          {renderMoodTags(filmData.moodTags)}
        </View>
      </View>

      {/* Genre & Style */}
      <View className="gap-12">
        <View>
          <Heading>Genre & Style</Heading>
          <BodyText>{filmData.genreAndStyle}</BodyText>
        </View>
        <View>
          <Heading>Themes</Heading>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={8}
            decelerationRate={"fast"}
            snapToAlignment="start"
            contentContainerStyle={{ gap: 12, paddingRight: 64 }}
          >
            {filmData.themes.map((theme, index) => (
              <Theme key={index} emoji={theme.emoji} theme={theme.name} />
            ))}
          </ScrollView>
        </View>

        {/* Cultural Context */}
        <View>
          <Heading>Cultural Context</Heading>
          <BodyText>{filmData.culturalContext}</BodyText>
        </View>

        {/* What to look out for */}
        <View>
          <Heading>What to look out for</Heading>
          <View className="gap-3">
            {filmData.whatToLookOutFor.map((item, index) => (
              <Accordion
                key={index}
                emoji={item.emoji}
                theme={item.title}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function FilmInfo({
  title,
  backdropPath,
  posterUrl,
  releaseYear,
  isLoading,
  filmData,
  filmMetadata,
}: FilmInfoProps) {
  return (
    <ScrollView
      className="bg-background overflow-hidden flex-1 w-full"
      contentContainerStyle={{ paddingBottom: 0 }}
    >
      {/* Poster & Backdrop */}
      <View className="mb-6 h-[250px] relative">
        {/* Backdrop Image */}
        <Image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
          source={{ uri: `https://image.tmdb.org/t/p/w780${backdropPath}` }}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "#1B181E"]}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0, y: 0.8 }}
          className="absolute inset-0 items-center justify-end"
        >
          {/* Poster Image */}
          <Image
            style={{
              height: 200,
              aspectRatio: 2 / 3,
            }}
            source={{ uri: posterUrl as string }}
          />
        </LinearGradient>
      </View>

      {/* Title and metadata info below poster */}
      <View className="mb-8 mx-4 gap-2 justify-center items-center">
        <Text className="text-white text-3xl font-bold text-center">
          {title}
        </Text>
        <Text className="text-stone-200 text-center text-lg">
          {filmMetadata &&
            `${filmMetadata?.director} · ${releaseYear} · ${filmMetadata?.runtime} `}
        </Text>
      </View>

      {isLoading ? (
        <View className="mt-4 p-4 flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <>
          {renderFilmInfoAI(filmData)}

          {/* Chat */}
          <LinearGradient
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0, y: 1.2 }}
            colors={["transparent", "#8c325f"]}
            className="mt-24 justify-center items-center  min-h-[200px]"
          >
            <Link
              href={{
                pathname: "/ChatScreen",
                params: { title, releaseYear },
              }}
              asChild
            >
              <Pressable className="bg-surface px-4 py-3 rounded-lg">
                <Text className="text-white text-lg">Open chat</Text>
              </Pressable>
            </Link>
          </LinearGradient>
        </>
      )}
    </ScrollView>
  );
}

export default FilmInfo;
