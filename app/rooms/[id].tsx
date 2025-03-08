"use client"

import { useEffect, useState, useRef } from "react"
import { View, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { getRoomDetails, getRoomMessages } from "../../services/api"
import type { Message, Room } from "../../types"
import MessageItem from "../../components/MessageItem"
import ChatInput from "../../components/ChatInput"
import Header from "../../components/Header"
import { useUser } from "../_layout"
import { webSocketService } from "../../services/websocket"

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [room, setRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const flatListRef = useRef<FlatList>(null)
  const router = useRouter()
  const { user } = useUser()

  // Redirect to username setup if no user
  useEffect(() => {
    if (!user) {
      router.replace("/")
      return
    }

    // Fetch room details and messages
    const fetchRoomData = async () => {
      try {
        const [roomData, messagesData] = await Promise.all([getRoomDetails(id), getRoomMessages(id)])

        setRoom(roomData)
        setMessages(messagesData) // Reverse to show newest at the bottom
      } catch (error) {
        console.error("Error fetching room data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoomData()

    // Setup WebSocket connection
    if (user) {
      console.log("Setting up WebSocket connection for room:", id)
      console.log("User details:", user.username)

      try {
        webSocketService.connect(id, user.username)

        webSocketService.onMessage((newMessage) => {
          setMessages((prevMessages) => [newMessage, ...prevMessages])
        })
      } catch (error) {
        console.error("Error setting up WebSocket:", error)
      }
    }

    // Cleanup WebSocket on unmount
  }, [id, user, router])

  const handleSendMessage = (content: string) => {
    if (!webSocketService.isConnected()) {
      console.log("WebSocket not connected, attempting to reconnect...")
      if (user) {
        webSocketService.connect(id, user.username)
        // Add a small delay before sending the message
        setTimeout(() => {
          webSocketService.sendMessage(content)
        }, 500)
      }
    } else {
      webSocketService.sendMessage(content)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title={room?.name || "Chat"} showBackButton />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageItem message={item} isCurrentUser={item.username === user?.username} />}
            inverted // Display newest messages at the bottom
            contentContainerStyle={{ padding: 16 }}
          />
        )}

        <ChatInput onSend={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

