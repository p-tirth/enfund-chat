"use client"
import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"

interface HeaderProps {
  title: string
  showBackButton?: boolean
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const router = useRouter()

  return (
    <View className="h-16 flex-row items-center px-4 bg-white border-b border-gray-200">
      {showBackButton && (
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
      )}
      <Text className="text-xl font-bold">{title}</Text>
    </View>
  )
}

