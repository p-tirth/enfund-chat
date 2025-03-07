"use client"

import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "../types"

import "../global.css"

// Create a context to manage user state
type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const useUser = () => useContext(UserContext)

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from AsyncStorage on app start
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user")
        if (userJson) {
          setUser(JSON.parse(userJson))
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // Save user to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user))
        } else {
          await AsyncStorage.removeItem("user")
        }
      } catch (error) {
        console.error("Failed to save user to storage:", error)
      }
    }

    saveUser()
  }, [user])

  if (isLoading) {
    return null // Or a loading screen
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        />
      </SafeAreaProvider>
    </UserContext.Provider>
  )
}

