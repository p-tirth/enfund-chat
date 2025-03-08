# Chat App

A real-time chat application built using React Native and Expo Router.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

This chat application allows users to join chat rooms, send messages, and see system notifications (e.g., when a user joins or leaves a room). The project is built with React Native, leveraging Expo for a streamlined development process and Expo Router for navigation.

## Features

- **Real-time Chat:** Send and receive messages instantly.
- **Multiple Chat Rooms:** Browse and join different chat rooms.
- **User Notifications:** System messages for users joining or leaving chat rooms.
- **Responsive UI:** Clean and responsive interface optimized for mobile devices.

## Technologies Used

- **React Native:** For building the mobile app interface.
- **Expo Router:** For managing navigation between screens.
- **Expo:** To simplify development and build processes.
- **JavaScript/TypeScript:** Core programming languages used in the project.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/your-chat-app.git
   cd your-chat-app
   ```

2. **Install Dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

## Usage

To start the development server, run:

```bash
npm run start
```

This will launch the Expo development server. You can then use the Expo Go app on your mobile device or an emulator to view the application.

## Project Structure

Here's a brief overview of the project structure:

```
/your-chat-app
├── /components         # Reusable components (e.g., ChatMessageItem, RoomItem, Header)
├── /screens            # Screen components for different views (e.g., RoomsListScreen, ChatScreen)
├── /services           # API and service files
├── /types              # TypeScript type definitions
├── App.tsx             # Entry point for the app
└── package.json        # Project configuration and scripts
```

Feel free to modify the structure as your project evolves.

## Contributing

Contributions are welcome! If you have suggestions, improvements, or bug fixes, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push your branch.
4. Open a pull request describing your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
