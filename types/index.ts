export interface User {
    id: string
    username: string
    created_at: string
    expires_at: string
  }
  
  export interface Room {
    id: string
    name: string
    created_at: string
    expires_at: string
  }
  
  export interface Message {
    id: string
    content: string
    created_at: string
    room_id: string
    user_id: string
    username: string
  }
  
  