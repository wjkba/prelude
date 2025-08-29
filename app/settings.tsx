import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Settings() {
  const navigation = useNavigation();
  const [openaiKey, setOpenaiKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [omdbKey, setOmdbKey] = useState("");
  const [tmdbKey, setTmdbKey] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      const openai = await AsyncStorage.getItem("openai_api_key");
      const gemini = await AsyncStorage.getItem("gemini_api_key");
      const omdb = await AsyncStorage.getItem("omdb_api_key");
      const tmdb = await AsyncStorage.getItem("tmdb_read_access_token");

      if (openai) setOpenaiKey(openai);
      if (gemini) setGeminiKey(gemini);
      if (omdb) setOmdbKey(omdb);
      if (tmdb) setTmdbKey(tmdb);
    } catch (error) {
      console.error("Failed to load API keys:", error);
    }
  };

  // TODO: replace AsyncStorage with more secure r

  const saveApiKeys = async () => {
    try {
      if (openaiKey.trim()) {
        await AsyncStorage.setItem("openai_api_key", openaiKey.trim());
      } else {
        await AsyncStorage.removeItem("openai_api_key");
      }

      if (geminiKey.trim()) {
        await AsyncStorage.setItem("gemini_api_key", geminiKey.trim());
      } else {
        await AsyncStorage.removeItem("gemini_api_key");
      }

      if (omdbKey.trim()) {
        await AsyncStorage.setItem("omdb_api_key", omdbKey.trim());
      } else {
        await AsyncStorage.removeItem("omdb_api_key");
      }

      if (tmdbKey.trim()) {
        await AsyncStorage.setItem("tmdb_read_access_token", tmdbKey.trim());
      } else {
        await AsyncStorage.removeItem("tmdb_read_access_token");
      }
    } catch (error) {
      console.error("Failed to save API keys:", error);
    }
  };

  const handleClearStorage = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all saved films? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert("Success", "All data has been cleared.");
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-8">
      <View className="gap-6">
        {/* API Keys Section */}
        <View className="gap-4">
          <Text className="text-white text-lg font-semibold">API Keys</Text>

          {/* OpenAI API Key */}
          <View>
            <Text className="text-stone-300 mb-2">OpenAI API Key</Text>
            <TextInput
              value={openaiKey}
              onChangeText={setOpenaiKey}
              placeholder="Enter OpenAI API key"
              placeholderTextColor="#6B7280"
              className="bg-[#242329] text-white p-4 rounded-xl"
              secureTextEntry
            />
          </View>

          {/* Gemini API Key */}
          <View>
            <Text className="text-stone-300 mb-2">Gemini API Key</Text>
            <TextInput
              value={geminiKey}
              onChangeText={setGeminiKey}
              placeholder="Enter Gemini API key"
              placeholderTextColor="#6B7280"
              className="bg-[#242329] text-white p-4 rounded-xl"
              secureTextEntry
            />
          </View>

          {/* OMDB API Key */}
          <View>
            <Text className="text-stone-300 mb-2">OMDB API Key</Text>
            <TextInput
              value={omdbKey}
              onChangeText={setOmdbKey}
              placeholder="Enter OMDB API key"
              placeholderTextColor="#6B7280"
              className="bg-[#242329] text-white p-4 rounded-xl"
              secureTextEntry
            />
          </View>

          {/* TMDB Read Access Token */}
          <View>
            <Text className="text-stone-300 mb-2">TMDB Read Access Token</Text>
            <TextInput
              value={tmdbKey}
              onChangeText={setTmdbKey}
              placeholder="Enter TMDB Read Access Token"
              placeholderTextColor="#6B7280"
              className="bg-[#242329] text-white p-4 rounded-xl"
              secureTextEntry
            />
          </View>

          {/* Save Button */}
          <Pressable
            onPress={saveApiKeys}
            className="bg-purple-600 p-4 rounded-xl mt-4"
          >
            <Text className="text-white font-semibold text-center">
              Save API Keys
            </Text>
          </Pressable>
        </View>

        {/* Clear Data Section */}
        <View className="gap-4 mt-8">
          <Text className="text-white text-lg font-semibold">
            Data Management
          </Text>
          <Pressable
            onPress={handleClearStorage}
            className="bg-red-600 p-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-center">
              Clear All Data
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
