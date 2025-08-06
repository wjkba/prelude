import { Stack } from "expo-router";
import { View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1B181E" }}>
      <Stack
        screenOptions={{
          headerTintColor: "#FCE4EC",
          headerStyle: {
            backgroundColor: "#1B181E",
          },
          contentStyle: {
            backgroundColor: "#1B181E",
          },
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="search" />
        <Stack.Screen name="filmInfo" />
      </Stack>
    </View>
  );
}
