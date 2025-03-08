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
    <TouchableOpacity
      onPress={handlePress}
      className=" border p-2"
      style={{display:"flex", flexDirection:"row",padding:5,margin:4,gap:5,borderRadius:10}}
    >
      {/* Icon container */}
      <View className="rounded-full bg-blue-100 mr-3" style={{paddingTop:2}}>
        <MessageSquare size={20} color="#3b82f6" />
      </View>

      {/* Text container */}
      <View className="bg-white text-2xl">
        {/* Truncate if the name is too long */}
        <Text
          className="font-medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {room.name}
        </Text>

        {/* Add a little spacing and style for the date */}
        <Text className="text-gray-500 text-sm mt-1">
          Created: {new Date(room.created_at).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

