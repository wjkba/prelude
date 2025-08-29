import Chat from "@/components/Chat";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";

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

  return <Chat title={title} releaseYear={releaseYear} />;
}

export default ChatScreen;
