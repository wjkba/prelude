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
      const omdb = await AsyncStorage.getItem("omdb_api_key");
      const tmdb = await AsyncStorage.getItem("tmdb_api_key");

      if (openai) setOpenaiKey(openai);
      if (omdb) setOmdbKey(omdb);
      if (tmdb) setTmdbKey(tmdb);
    } catch (error) {
      console.error("Failed to load API keys:", error);
    }
  };

  // TODO: replace AsyncStorage with more secure option

  const saveApiKey = async (key: string, value: string) => {
    try {
      if (value.trim()) {
        await AsyncStorage.setItem(key, value.trim());
        Alert.alert("Success", "API key saved successfully");
      } else {
        await AsyncStorage.removeItem(key);
        Alert.alert("Success", "API key removed");
      }
    } catch (error) {
      console.error("Failed to save API key:", error);
      Alert.alert("Error", "Failed to save API key");
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
              onBlur={() => saveApiKey("openai_api_key", openaiKey)}
              placeholder="Enter OpenAI API key"
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
              onBlur={() => saveApiKey("omdb_api_key", omdbKey)}
              placeholder="Enter OMDB API key"
              placeholderTextColor="#6B7280"
              className="bg-[#242329] text-white p-4 rounded-xl"
              secureTextEntry
            />
          </View>

          {/* TMDB API Key */}
          <View>
            <Text className="text-stone-300 mb-2">TMDB API Key</Text>
            <TextInput
              value={tmdbKey}
              onChangeText={setTmdbKey}
              onBlur={() => saveApiKey("tmdb_api_key", tmdbKey)}
              placeholder="Enter TMDB API key"
              placeholderTextColor="#6B7280"
              className="bg-[#242329] text-white p-4 rounded-xl"
              secureTextEntry
            />
          </View>
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
