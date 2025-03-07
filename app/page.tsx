import { View, Text } from "react-native"

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">Welcome to Chat App!</Text>
      <Text className="text-gray-500 mt-2">Please sign in or register.</Text>
    </View>
  )
}

