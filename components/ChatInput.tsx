"use client"

import { useState } from "react"
import { View, TextInput, TouchableOpacity,Text } from "react-native"
import { Send } from "lucide-react-native"

interface ChatInputProps {
  onSend: (message: string) => void
}

export default function ChatInput({  onSend }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim())
      setMessage("")
    }
  }

  return (
    <View className="flex-row items-center p-2 border-t border-gray-200 bg-white">
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity onPress={handleSend} className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center">
        <Send size={20} color="#fff" />
        <Text>bob</Text>
      </TouchableOpacity>
    </View>
  )
}

