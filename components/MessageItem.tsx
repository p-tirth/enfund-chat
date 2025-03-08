import { View, Text , StyleSheet } from "react-native"
import type { Message } from "../types"

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
}

export default function MessageItem({ message, isCurrentUser }: MessageItemProps) {
  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.containerRight : styles.containerLeft,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.messageBubbleCurrentUser : styles.messageBubbleOtherUser,
        ]}
      >
        {/* Only show username if it's not the current user */}
        {!isCurrentUser && (
          <Text style={styles.usernameText}>
            {message.username}
          </Text>
        )}

        <Text style={isCurrentUser ? styles.messageTextCurrentUser : styles.messageTextOtherUser}>
          {message.content}
        </Text>

        <Text
          style={[
            styles.timestamp,
            isCurrentUser ? styles.timestampCurrentUser : styles.timestampOtherUser,
          ]}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // tailwind 'mb-4'
    flexDirection: 'row',
  },
  containerRight: {
    justifyContent: 'flex-end', // tailwind 'justify-end'
  },
  containerLeft: {
    justifyContent: 'flex-start', // tailwind 'justify-start'
  },
  messageBubble: {
    paddingHorizontal: 16, // tailwind 'px-4'
    paddingVertical: 8,    // tailwind 'py-2'
    borderRadius: 8,       // tailwind 'rounded-lg'
    maxWidth: '80%',       // tailwind 'max-w-[80%]'
  },
  messageBubbleCurrentUser: {
    backgroundColor: '#3b82f6', // tailwind 'bg-blue-500'
  },
  messageBubbleOtherUser: {
    backgroundColor: '#e5e7eb', // tailwind 'bg-gray-200'
  },
  usernameText: {
    fontSize: 12,        // tailwind 'text-xs'
    fontWeight: 'bold',  // tailwind 'font-bold'
    color: '#374151',     // tailwind 'text-gray-700'
    marginBottom: 4,     // tailwind 'mb-1'
  },
  messageTextCurrentUser: {
    color: '#ffffff', // tailwind 'text-white'
  },
  messageTextOtherUser: {
    color: '#000000', // tailwind 'text-black'
  },
  timestamp: {
    fontSize: 12,   // tailwind 'text-xs'
    marginTop: 4,   // tailwind 'mt-1'
  },
  timestampCurrentUser: {
    color: '#bfdbfe', // tailwind 'text-blue-100'
  },
  timestampOtherUser: {
    color: '#6b7280', // tailwind 'text-gray-500'
  },
});