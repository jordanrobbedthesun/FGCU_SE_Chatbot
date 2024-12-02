import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, TextInput, Button, Image } from 'react-native';
import axios from 'axios';

// Constants for API
const API_URL = 'http://localhost:3000/home/chatbot'; // Replace with your backend IP

// ChatBox Component
const ChatBox = ({ isChatExpanded, setIsChatExpanded, fullScreenChatView }) => (
  <View style={styles.chatbotContainer}>
    {!isChatExpanded ? (
      <TouchableOpacity style={styles.chatButton} onPress={() => setIsChatExpanded(true)}>
        <Text style={styles.chatButtonText}>💬 Chat with me!</Text>
      </TouchableOpacity>
    ) : (
      fullScreenChatView()
    )}
  </View>
);

// FullScreenChatView Component
const FullScreenChatView = ({ messages, inputValue, setInputValue, sendMessage }) => {
  // Check if messages is an array
  if (!messages || !Array.isArray(messages)) {
    return <Text>Loading messages...</Text>; // Display a loading message or handle empty state
  }

  return (
    <View style={styles.fullScreenChatView}>

      <Text style={styles.caleb}>Caleb Photo Collage :D</Text>
      <View style={styles.imageRow}>
        <Image
          source={require('../../assets/images/cabes.png')}
          style={styles.caleb}
        />
        <Image
          source={require('../../assets/images/standingCaleb.png')}
          style={styles.caleb}
        />
        <Image
          source={require('../../assets/images/calebIQ.png')}
          style={styles.caleb}
        />
        <Image
          source={require('../../assets/images/hotCaleb.png')}
          style={styles.caleb}
        />
      </View>
      <ScrollView style={styles.chatMessages} keyboardShouldPersistTaps="handled">
        {messages.length === 0 ? (
          <Text style={styles.noMessagesText}>No messages yet. Start chatting!</Text>
        ) : (
          messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.sender === 'User' ? styles.userContainer : styles.aiContainer,
              ]}
            >
              {msg.sender === 'FGCU' && (
                <Image
                  source={require('../../assets/images/chad.png')} // Chatbot image
                  style={styles.avatar}
                />
              )}
              {msg.sender === 'User' && (
                <Image
                  source={require('../../assets/images/caleb.png')} // User image (or different image if you want)
                  style={styles.avatar}
                />
              )}
              <Text style={msg.sender === 'User' ? styles.userMessage : styles.aiMessage}>
                {msg.text}
              </Text>
            </View>
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
          onSubmitEditing={sendMessage}
        />
        <Button title="Send" color="#004785" onPress={sendMessage} />
      </View>
    </View>
  );
};

// Main HomeView Component
const HomeView = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [messages, setMessages] = useState([]); // Initialize messages as an empty array
  const [inputValue, setInputValue] = useState('');
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

    bounce.start();
    return () => bounce.stop();
  }, [bounceAnimation]);

  const sendMessage = async () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: 'User' }]);
      setInputValue('');

      try {
        const response = await axios.post(API_URL, {
          userMessage: inputValue,
        });

        const botMessage = response.data.advice.result;
        if (botMessage) {
          setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: 'FGCU' }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'No advice received from server.', sender: 'FGCU' }]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Error getting advice. Please try again.', sender: 'FGCU' }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.aiHeader}>FGCU SE/CS Chatbot</Text>
        <Text style={styles.aiSubHeader}>Your Personal Academic Advisor</Text>
      </View>
      {!isChatExpanded ? (
        <ChatBox
          isChatExpanded={isChatExpanded}
          setIsChatExpanded={setIsChatExpanded}
          fullScreenChatView={() => (
            <FullScreenChatView
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              sendMessage={sendMessage}
            />
          )}
        />
      ) : (
        <TouchableOpacity style={styles.fullScreenOverlay} onPress={() => setIsChatExpanded(true)}>
          <FullScreenChatView
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sendMessage={sendMessage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004785',
    padding: 20,
  },
  hero: {
    marginBottom: 20,
    alignItems: 'center',
  },
  aiHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  aiSubHeader: {
    fontSize: 16,
    color: 'white',
  },
  chatbotContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chatButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  chatButtonText: {
    fontSize: 18,
    color: '#004785',
  },
  fullScreenChatView: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
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
    padding: 15,
    marginRight: 10,
    height: 50,
  },
  userMessage: {
    backgroundColor: '#a0e1a0',
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
    maxWidth: '70%',
  },
  aiMessage: {
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    marginVertical: 2,
    maxWidth: '70%',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse', // This makes user messages align on the right side
  },
  aiContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row', // AI messages align on the left side
  },
  fullScreenOverlay: {
    flex: 1,
  },
  imageRow: {
    flexDirection: 'row',  // Align children horizontally
    justifyContent: 'center', // Add spacing between images (or use 'center')
    alignItems: 'center',  // Vertically align the images
    marginVertical: 10,    // Optional margin for spacing above and below
  },
  caleb: {
    width: 100,            // Set a fixed width for images
    height: 100,           // Set a fixed height for images
    marginHorizontal: 5,   // Add space between the images
  },

});

export default HomeView;
