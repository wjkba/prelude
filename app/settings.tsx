import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function Settings() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerShown: true,
    });
  }, [navigation]);

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
    <View className="flex-1 bg-background px-4 pt-8">
      <Pressable
        onPress={handleClearStorage}
        className="bg-red-600 p-4 rounded-xl"
      >
        <Text className="text-white font-semibold text-center">
          Clear All Data
        </Text>
      </Pressable>
    </View>
  );
}
