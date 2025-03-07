import type { User, Room, Message } from "../types"

const API_URL = "https://chat-api-k4vi.onrender.com/chat"

export const registerUsername = async (username: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })

    if (!response.ok) {
      throw new Error("Failed to register username")
    }

    return await response.json()
  } catch (error) {
    console.error("Error registering username:", error)
    throw error
  }
}

export const getRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${API_URL}/rooms`)

    if (!response.ok) {
      throw new Error("Failed to fetch rooms")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching rooms:", error)
    throw error
  }
}

export const createRoom = async (name: string): Promise<Room> => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })

    if (!response.ok) {
      throw new Error("Failed to create room")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating room:", error)
    throw error
  }
}

export const getRoomDetails = async (roomId: string): Promise<Room> => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomId}`)

    if (!response.ok) {
      throw new Error("Failed to fetch room details")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching room details:", error)
    throw error
  }
}

export const getRoomMessages = async (roomId: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_URL}/rooms/${roomId}/messages`)

    if (!response.ok) {
      throw new Error("Failed to fetch room messages")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching room messages:", error)
    throw error
  }
}

