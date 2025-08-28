import React from "react";
import { Text, TextInput, View } from "react-native";

function Chat() {
  type StartPromptProps = {
    text: string;
    prompt: string;
  };

  function StartPrompt({ text, prompt }: StartPromptProps) {
    return (
      <View className="rounded-2xl px-3 py-3 bg-surface ml-auto">
        <Text className="text-white ">{text}</Text>
      </View>
    );
  }

  return (
    <View className="py-8 relative items-center px-4 h-screen">
      {/* Start prompts */}
      <View className="gap-3 w-full">
        <StartPrompt text="🔥 Explain the ending" prompt="Explain the ending" />
        <StartPrompt
          text="🌀 Unpack the film’s meaning"
          prompt="Explain the ending"
        />
        <StartPrompt
          text="🔍 Break down the symbolism"
          prompt="Explain the ending"
        />
      </View>

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
