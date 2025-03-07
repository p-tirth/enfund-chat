"use client"
import { TouchableOpacity, Text, View } from "react-native"
import { useRouter } from "expo-router"
import type { Room } from "../types"
import { MessageSquare } from "lucide-react-native"

interface RoomItemProps {
  room: Room
}

export default function RoomItem({ room }: RoomItemProps) {
  const router = useRouter()

  const handlePress = () => {
    router.push(`/rooms/${room.id}`)
  }

  return (
    <TouchableOpacity onPress={handlePress} className="flex-row items-center p-4 border-b border-gray-200">
      <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
        <MessageSquare size={20} color="#3b82f6" />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-medium">{room.name}</Text>
        <Text className="text-gray-500 text-sm">Created: {new Date(room.created_at).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  )
}

