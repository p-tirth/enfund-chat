import { View, Text } from "react-native"
import type { Message } from "../types"

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
}

export default function MessageItem({ message, isCurrentUser }: MessageItemProps) {
  return (
    <View className={`mb-4 flex-row ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <View className={`px-4 py-2 rounded-lg max-w-[80%] ${isCurrentUser ? "bg-blue-500" : "bg-gray-200"}`}>
        {!isCurrentUser && <Text className="text-xs font-bold text-gray-700 mb-1">{message.username}</Text>}
        <Text className={isCurrentUser ? "text-white" : "text-black"}>{message.content}</Text>
        <Text className={`text-xs mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}>
          {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    </View>
  )
}

