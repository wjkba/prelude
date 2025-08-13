import { Stack } from "expo-router";
import { View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1B181E" }}>
      <Stack
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1B181E",
          },
          contentStyle: {
            backgroundColor: "#1B181E",
          },
          animation: "fade",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="search" options={{ title: "" }} />
        <Stack.Screen name="FilmInfoScreen" />
      </Stack>
    </View>
  );
}
