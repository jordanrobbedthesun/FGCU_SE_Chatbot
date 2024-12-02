import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, TextInput, Button } from 'react-native';
import axios from 'axios';

// Constants for API
const API_URL = 'http://localhost:3000/home/chatbot'; // Replace with your backend IP

const HomeView = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const [inputValue, setInputValue] = useState(''); // State to hold user input
  const bounceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: -5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    // Start bouncing animation
    bounce.start();

    // Stop animation when chat is expanded
    return () => bounce.stop();
  }, [bounceAnimation]);

  const sendMessage = async () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage = inputValue;
      setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'User' }]);
      setInputValue(''); // Clear input

      try {
        // Make API call to the backend
        const response = await axios.post(API_URL, {
          userMessage: userMessage,
        });

        console.log("Response from server:", response.data); // Log the full response

        // Check if advice is an object and extract the relevant text
        const advice = response.data.advice.result; // Assuming 'result' is the key you want to display
        if (advice) {
          // Add AI response to the chat
          setMessages((prevMessages) => [...prevMessages, { text: advice, sender: 'FGCU SE Chatbot' }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'No advice received from server.', sender: 'FGCU SE Chatbot' }]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Error getting advice. Please try again.', sender: 'FGCU SE Chatbot' }]);
      }
    }
  };

  const ChatBox = () => (
    <TouchableOpacity style={styles.chatBox} onPress={() => setIsChatExpanded(true)}>
      <Animated.View style={{ transform: [{ translateY: bounceAnimation }] }}>
        <View style={styles.chatBubble}>
          <Text style={styles.chatEmoji}>💬</Text>
        </View>
        <Text style={styles.chatText}>Ask me a question...</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  const FullScreenChatView = () => (
    <View style={styles.fullScreenChatView}>
      <ScrollView style={styles.chatMessages}>
        {messages.length === 0 ? (
          <Text style={styles.noMessagesText}>No messages yet. Start chatting!</Text>
        ) : (
          messages.map((msg, index) => (
            <Text key={index} style={msg.sender === 'User' ? styles.userMessage : styles.aiMessage}>
              {msg.sender}: {msg.text}
            </Text>
          ))
        )}
      </ScrollView>

      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Ask me a question about FGCU SE/CS..."
          placeholderTextColor="#666"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={sendMessage} // Send message on enter key press
        />
        <Button title="Send" color="#004785" onPress={sendMessage} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.aiHeader}>FGCU SE Chatbot</Text>
        <Text style={styles.aiSubHeader}>Your Personal Academic Advisor</Text>
      </View>
      {!isChatExpanded ? (
        <ChatBox />
      ) : (
        <TouchableOpacity style={styles.fullScreenOverlay} onPress={() => setIsChatExpanded(true)}>
          <FullScreenChatView />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004785', // Classic blue background
    padding: 20,
  },
  hero: {
    marginBottom: 20,
    alignItems: 'center',
  },
  aiHeader: {
    fontSize: 30, // Increased font size for header
    fontWeight: 'bold', // Bold for header
    color: 'white', // White text color for header
  },
  aiSubHeader: {
    fontSize: 16, // Decreased font size for subheader
    fontWeight: 'normal', // Unbolded subheader
    color: 'white', // White text color for subheader
  },
  chatBox: {
    backgroundColor: 'white', // White background for chat box
    borderRadius: 10,
    padding: 20, // Increased padding for a bigger touchable area
    alignItems: 'center',
    marginTop: 20, // Add some margin to separate from header
    elevation: 5, // Added elevation for shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatBubble: {
    backgroundColor: '#e1e1e1', // Light gray for chat bubble
    borderRadius: 15,
    padding: 10,
  },
  chatEmoji: {
    fontSize: 30,
  },
  chatText: {
    marginTop: 5,
    fontSize: 14,
  },
  fullScreenChatView: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 40, // Increase margin top for spacing
  },
  chatMessages: {
    flex: 1,
    marginBottom: 10,
  },
  noMessagesText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15, // Increased padding for better touch experience
    marginRight: 10,
    height: 50, // Increased height for the input
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#a0e1a0',
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
  },
  fullScreenOverlay: {
    flex: 1,
  },
});

export default HomeView;