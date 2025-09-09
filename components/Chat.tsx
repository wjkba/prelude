import { getChatResponseOpenAI } from "@/api/openai";
import { useHeaderHeight } from "@react-navigation/elements";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";

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
  const [input, setInput] = useState("");
  const headerHeight = useHeaderHeight();

  interface StartPromptProps {
    text: string;
    message: string;
  }

  async function handleSendMessage(message: string) {
    if (!message.trim()) return;
    setInput("");

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
    if (role === "user") {
      return (
        <View className={"bg-surface ml-auto rounded-lg p-3"}>
          <Text className="text-white ">{text}</Text>
        </View>
      );
    }

    return (
      <View className="mr-auto">
        <Markdown
          style={{
            body: { color: "#e7e5e4", fontSize: 18 },
            // Add other element styles as needed
            paragraph: { color: "#e7e5e4", fontSize: 18, marginBottom: 24 },
            text: { color: "#e7e5e4", fontSize: 18 },
          }}
        >
          {text}
        </Markdown>
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
          message="Unpack the film's meaning"
        />
        <StartPrompt
          text="🔍 Break down the symbolism"
          message="Break down the symbolism"
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      {/* Chat container */}

      <View className="flex-1 px-4 pt-8">
        {/* Start prompts */}
        {renderStartPrompts(hasStarted)}

        {/* Messages container with scroll */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item, idx) => (
            <Message key={idx} text={item.text} role={item.role} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <MotiView
              from={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.3, opacity: 1 }}
              transition={{
                loop: true,
                type: "timing",
                duration: 900,
              }}
              className="bg-primary ml-2 w-6 h-6 rounded-full mb-4"
            />
          )}
        </ScrollView>
      </View>

      {/* Input container - fixed at bottom */}
      <View className="px-4 pb-8">
        <View className="bg-input rounded-xl border border-border py-2 px-4 flex-row items-center">
          <TextInput
            className="text-white text-lg flex-1"
            value={input}
            onChangeText={setInput}
            placeholder="Ask..."
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
          />
          {/* Optional send button */}
          <Pressable
            onPress={() => handleSendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="ml-2 p-2"
          >
            <Text className="text-blue-400 font-semibold">Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Chat;
