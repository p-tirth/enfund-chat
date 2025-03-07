import type { Message } from "../types";

type MessageCallback = (message: Message) => void;

let socket: WebSocket | null = null;
let messageCallback: MessageCallback | null = null;
let reconnectTimeout: NodeJS.Timeout | null = null;

export const connect = (roomId: string, username: string) => {
  // Close any existing connection
  disconnect();

  // Create the WebSocket URL
  const wsUrl = `wss://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`;
  console.log("Connecting to WebSocket:", wsUrl);

  try {
    // Create a new WebSocket connection
    socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        console.log("WebSocket message received:", event.data);
        const message = JSON.parse(event.data) as Message;
        if (messageCallback) {
          messageCallback(message);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = (event) => {
      console.log(
        "WebSocket connection closed:",
        `code=${event.code}`,
        `reason=${event.reason}`
      );
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  } catch (error) {
    console.error("Error creating WebSocket:", error);
  }
};

export const disconnect = () => {
  // Clear any pending reconnect timeout
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }

  // Close the socket if it exists
  if (socket) {
    try {
      // Only close if the connection is open or connecting
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        console.log("Closing WebSocket connection...");
        socket.close(1000, "Normal closure");
      }
    } catch (error) {
      console.error("Error closing WebSocket:", error);
    }
    socket = null;
    console.log("Socket has been set to null.");
  } else {
    console.log("No active WebSocket connection to disconnect.");
  }
};

export const sendMessage = (content: string) => {
  if (!socket) {
    console.error("WebSocket is not initialized");
    return;
  }

  try {
    console.log("Sending message:", content);
    const messagePayload = {
      event: "message",
      content: content,
    };
    socket.send(JSON.stringify(messagePayload));
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const onMessage = (callback: MessageCallback) => {
  messageCallback = callback;
};

export const isConnected = (): boolean => {
  return socket !== null && socket.readyState === WebSocket.OPEN;
};

export const webSocketService = {
  connect,
  disconnect,
  sendMessage,
  onMessage,
  isConnected,
};
