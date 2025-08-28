import { getChatResponseOpenAI } from "@/api/openai";
import { MotiView, ScrollView } from "moti";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface ChatProps {
  title: string;
  releaseYear: string;
}

interface Message {
  text: string;
  role: "user" | "assistant";
}

function Chat({ title, releaseYear }: ChatProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponseId, setLastResponseId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  interface StartPromptProps {
    text: string;
    message: string;
  }

  async function handleSendMessage(message: string) {
    if (!message.trim()) return;

    setIsLoading(true);
    setHasStarted(true);

    setMessages((prev) => [...prev, { text: message, role: "user" }]);

    try {
      const response = await getChatResponseOpenAI(
        message,
        title,
        releaseYear,
        lastResponseId
      );
      console.log(response);
      setLastResponseId(response.id);
      setMessages((prev) => [
        ...prev,
        { text: response.output_text, role: "assistant" },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  function renderStartPrompts(hasStarted: boolean) {
    if (hasStarted) {
      return;
    }

    return (
      <View className="gap-3">
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
      </View>
    );
  }

  return (
    <View className="py-8 relative px-4 h-screen">
      <ScrollView>
        {/* Start prompts */}
        {renderStartPrompts(hasStarted)}

        {/* Messages */}
        <View style={{ width: "100%" }}>
          {messages.map((item, idx) => (
            <Message key={idx} text={item.text} role={item.role} />
          ))}
        </View>

        {/* Loading dot */}
        {isLoading && (
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
        )}
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
