import Chat from "@/components/Chat";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";

function ChatScreen() {
  const { title, releaseYear } = useLocalSearchParams<{
    title: string;
    releaseYear: string;
  }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title,
    });
  }, [navigation, title]);

  return (
    <View className="bg-background">
      <Chat title={title} releaseYear={releaseYear} />
    </View>
  );
}

export default ChatScreen;
