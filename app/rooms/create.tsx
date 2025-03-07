"use client"

import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { createRoom } from "../../services/api"
import Header from "../../components/Header"
import { useUser } from "../_layout"

export default function RoomCreationScreen() {
  const [roomName, setRoomName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  // Redirect to username setup if no user
  React.useEffect(() => {
    if (!user) {
      router.replace("/")
    }
  }, [user, router])

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert("Error", "Please enter a room name")
      return
    }

    setIsLoading(true)
    try {
      const room = await createRoom(roomName.trim())
      router.push(`/rooms/${room.id}`)
    } catch (error) {
      Alert.alert("Error", "Failed to create room. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Create Room" showBackButton />

      <View className="flex-1 p-6">
        <Text className="text-lg font-medium mb-2">Room Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6"
          placeholder="Enter room name"
          value={roomName}
          onChangeText={setRoomName}
        />

        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-3 items-center"
          onPress={handleCreateRoom}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-medium">Create Room</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

