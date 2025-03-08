import { View, Text, StyleSheet } from "react-native"
import type { Message } from "../types"

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
}

export default function MessageItem({ message, isCurrentUser }: MessageItemProps) {
  // Check if the message is a system event (e.g., join/leave)
  if (message.event) {
    let systemText = ""
    if (message.event === "join") {
      systemText = `${message.username} joined the chat`
    } else if (message.event === "leave") {
      systemText = `${message.username} left the chat`
    } else {
      systemText = `${message.username} performed an action`
    }

    return (
      <View style={styles.systemMessageContainer}>
        <Text style={styles.systemMessageText}>{systemText}</Text>
      </View>
    )
  }

  // Regular chat messages
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
        {/* Only show the username for messages from others */}
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
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, // Tailwind 'mb-4'
    flexDirection: 'row',
  },
  containerRight: {
    justifyContent: 'flex-end', // Tailwind 'justify-end'
  },
  containerLeft: {
    justifyContent: 'flex-start', // Tailwind 'justify-start'
  },
  messageBubble: {
    paddingHorizontal: 16, // Tailwind 'px-4'
    paddingVertical: 8,    // Tailwind 'py-2'
    borderRadius: 8,       // Tailwind 'rounded-lg'
    maxWidth: '80%',       // Tailwind 'max-w-[80%]'
  },
  messageBubbleCurrentUser: {
    backgroundColor: '#3b82f6', // Tailwind 'bg-blue-500'
  },
  messageBubbleOtherUser: {
    backgroundColor: '#e5e7eb', // Tailwind 'bg-gray-200'
  },
  usernameText: {
    fontSize: 12,        // Tailwind 'text-xs'
    fontWeight: 'bold',  // Tailwind 'font-bold'
    color: '#374151',     // Tailwind 'text-gray-700'
    marginBottom: 4,     // Tailwind 'mb-1'
  },
  messageTextCurrentUser: {
    color: '#ffffff', // Tailwind 'text-white'
  },
  messageTextOtherUser: {
    color: '#000000', // Tailwind 'text-black'
  },
  timestamp: {
    fontSize: 12,   // Tailwind 'text-xs'
    marginTop: 4,   // Tailwind 'mt-1'
  },
  timestampCurrentUser: {
    color: '#bfdbfe', // Tailwind 'text-blue-100'
  },
  timestampOtherUser: {
    color: '#6b7280', // Tailwind 'text-gray-500'
  },
  systemMessageContainer: {
    marginVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  systemMessageText: {
    fontSize: 12,
    color: '#6b7280',  // A subtle gray for system messages
    fontStyle: 'italic',
  }
});
