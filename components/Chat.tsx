import { getChatResponseGemini } from "@/api/gemini";
import { MotiView } from "moti";
import React from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

interface ChatProps {
  title: string;
  releaseYear: string;
}

function Chat({ title, releaseYear }: ChatProps) {
  interface StartPromptProps {
    text: string;
    message: string;
  }

  async function handleSendMessage(message: string) {
    try {
      const response = await getChatResponseGemini(message, title, releaseYear);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function StartPrompt({ text, message }: StartPromptProps) {
    return (
      <Pressable
        onPress={() => handleSendMessage(message)}
        className="rounded-2xl px-3 py-3 bg-surface ml-auto"
      >
        <Text className="text-white ">{text}</Text>
      </Pressable>
    );
  }

  interface MessageProps {
    text: string;
    role: "user" | "assistant";
  }

  function Message({ text, role }: MessageProps) {
    return (
      <View
        className={`${role === "user" ? "bg-surface ml-auto" : "bg-surface mr-auto"} rounded-lg px-3 py-3`}
      >
        <Text className="text-white ">{text}</Text>
      </View>
    );
  }

  return (
    <View className="py-8 relative items-center px-4 h-screen">
      <ScrollView contentContainerStyle={{ gap: 12 }} className="w-full">
        {/* Start prompts */}
        <StartPrompt
          text="🔥 Explain the ending"
          message="Explain the ending"
        />
        <StartPrompt
          text="🌀 Unpack the film’s meaning"
          message="Explain the ending"
        />
        <StartPrompt
          text="🔍 Break down the symbolism"
          message="Explain the ending"
        />
        <Message text="Testing" role="user" />
        <Message text="lorem ipsum dolor sit amet" role="assistant" />

        {/* Loading dot */}
        <MotiView
          from={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.3, opacity: 1 }}
          transition={{
            loop: true,
            type: "timing",
            duration: 900,
          }}
          className="bg-primary ml-2 w-6 h-6 rounded-full"
        />
      </ScrollView>

      {/* Input */}
      <View className="absolute bottom-16 bg-input rounded-xl border border-1 border-border py-1 px-4 flex-row items-center">
        <TextInput
          className="text-white text-lg flex-1"
          // value={query}
          // onChangeText={handleSearch}
          placeholder="Ask..."
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
}

export default Chat;
