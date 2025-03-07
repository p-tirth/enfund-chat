"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { useRouter } from "expo-router"
import { registerUsername } from "../services/api"
import { useUser } from "./_layout"
import { SafeAreaView } from "react-native-safe-area-context"

export default function UsernameSetupScreen() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useUser()

  const handleSubmit = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Please enter a username")
      return
    }

    setIsLoading(true)
    try {
      const user = await registerUsername(username.trim())
      setUser(user)
      router.replace("/rooms")
    } catch (error) {
      Alert.alert("Error", "Failed to register username. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center p-6">
        <View className="items-center mb-10">
          <Text className="text-3xl font-bold text-blue-500 mb-2">Chat App</Text>
          <Text className="text-gray-500 text-center">Enter a username to get started</Text>
        </View>

        <View className="bg-white rounded-lg p-6 shadow-md">
          <Text className="text-lg font-medium mb-2">Username</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 items-center"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-medium">Continue</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

