"use client"

import { useEffect, useState } from "react"
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, RefreshControl, TextInput } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getRooms } from "../../services/api"
import type { Room } from "../../types"
import RoomItem from "../../components/RoomItem"
import Header from "../../components/Header"
import { useUser } from "../_layout"
import { Plus } from "lucide-react-native"

export default function RoomsListScreen() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { user } = useUser()

  // Redirect to username setup if no user
  useEffect(() => {
    if (!user) {
      router.replace("/")
    }
  }, [user, router])

  const fetchRooms = async () => {
    try {
      const roomsData = await getRooms()
      setRooms(roomsData)
    } catch (error) {
      console.error("Error fetching rooms:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchRooms()
  }

  // Filter rooms based on the search query (case-insensitive)
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <Header title="Chat Rooms" />

      {/* Search Input */}
      <View className="p-2">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search rooms..."
          className="bg-gray-100 rounded-full px-4 py-2"
        />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : (
        <>
          <FlatList
            className="p-2"
            data={filteredRooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RoomItem room={item} />}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
            }
            // Add bottom padding so the last item doesn't get hidden under the FAB
            contentContainerStyle={{ paddingBottom: 80 }}
            ListEmptyComponent={
              <View className="p-10">
                <Text className="text-gray-500 text-center">
                  No rooms available. Create a new room to get started.
                </Text>
              </View>
            }
          />

          {/* Floating action button */}
          <TouchableOpacity
            className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
            onPress={() => router.push("/rooms/create")}
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  )
}
