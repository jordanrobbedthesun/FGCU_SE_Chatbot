# FGCU SE/CS Chatbot

A web-based chatbot application that serves as a personal academic advisor for students in the FGCU Software Engineering (SE) and Computer Science (CS) programs. The application provides answers to academic-related questions via a chatbot powered by a backend API.

## Features

- Chat with the FGCU chatbot, which provides academic advice.
- Displays messages in a conversational format, with user and AI messages differentiated.
- Easy-to-use interface with a chat popup that expands into a full-screen chat view.

## Installation

### Backend Setup

1. Clone the repository to your local machine:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install the backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Install Expo CLI if you don't have it installed:
   ```bash
   npm install -g expo-cli
   ```

2. Install the frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the frontend application:
   ```bash
   npx expo start
   ```

4. Open the app in your browser. The default URL will be `http://localhost:19006`.

## Usage

Once both the frontend and backend are running, you can:

- Chat with the chatbot by typing questions related to the FGCU SE/CS programs.
- The chatbot will respond with academic advice and information.
  
The frontend sends requests to the backend, which processes them and returns the relevant information for the user.

## Development

- For local development, make sure the backend and frontend are running simultaneously.
- The backend should be running on port 3000, and the frontend should be accessible at `http://localhost:19006`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have improvements or bug fixes.

## License

This project is licensed under the MIT License.
