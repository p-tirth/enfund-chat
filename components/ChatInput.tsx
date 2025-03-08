"use client"

import { useState } from "react"
import { View, TextInput, TouchableOpacity,Text, StyleSheet } from "react-native"
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Send size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',      // tailwind: flex-row
    alignItems: 'center',      // tailwind: items-center
    padding: 8,                // tailwind: p-2
    borderTopWidth: 1,         // tailwind: border-t
    borderTopColor: '#E5E7EB', // tailwind: border-gray-200
    backgroundColor: '#FFFFFF' // tailwind: bg-white
  },
  input: {
    flex: 1,                   // tailwind: flex-1
    backgroundColor: '#F3F4F6',// tailwind: bg-gray-100
    borderRadius: 9999,        // tailwind: rounded-full
    paddingHorizontal: 16,     // tailwind: px-4
    paddingVertical: 8,        // tailwind: py-2
    marginRight: 8,            // tailwind: mr-2
  },
  sendButton: {
    width: 40,                 // tailwind: w-10
    height: 40,                // tailwind: h-10
    borderRadius: 9999,        // tailwind: rounded-full
    backgroundColor: '#3B82F6',// tailwind: bg-blue-500
    alignItems: 'center',      // tailwind: items-center
    justifyContent: 'center',  // tailwind: justify-center
  },
});