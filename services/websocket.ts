import type { Message } from "../types"
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

type MessageCallback = (message: Message) => void

class WebSocketService {
  private socket: WebSocket | null = null
  private messageCallback: MessageCallback | null = null
  private reconnectTimeout: NodeJS.Timeout | null = null

  connect(roomId: string, username: string) {
    // Close any existing connection
    this.disconnect()

    // Create the WebSocket URL
    const wsUrl = `wss://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`
    console.log(wsUrl)
    console.log("Connecting to WebSocket:", wsUrl)

    try {
      // Create a new WebSocket connection
      this.socket = new WebSocket(wsUrl)
      // console.log(this.socket)

      this.socket.onopen = () => {
        console.log("WebSocket connection established")
      }

      this.socket.onmessage = (event) => {
        try {
          console.log("WebSocket message received:", event.data)
          const message = JSON.parse(event.data) as Message
          if (this.messageCallback) {
            this.messageCallback(message)
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error)
        }
      }

    } catch (error) {
      console.error("Error creating WebSocket:", error)
    }
  }

  disconnect() {
    // Clear any pending reconnect timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    // Close the socket if it exists
    if (this.socket) {
      try {
        // Only close if the connection is open or connecting
        if (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING) {
          this.socket.close(1000, "Normal closure")
        }
      } catch (error) {
        console.error("Error closing WebSocket:", error)
      }
      this.socket = null
    }
  }

  sendMessage(content: string) {
    if (!this.socket) {
      console.error("WebSocket is not initialized")
      return
    }

    try {
      console.log("Sending message:", content)
      this.socket.send(JSON.stringify({ content }))
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  onMessage(callback: MessageCallback) {
    this.messageCallback = callback
  }


  // Check if the WebSocket is connected
  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN
  }
}



export const webSocketService = new WebSocketService()

