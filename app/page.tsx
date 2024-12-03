"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from "@/styles/HomeView.module.css";

interface ChatBoxProps {
  isChatExpanded: boolean;
  setIsChatExpanded: (value: boolean) => void;
  fullScreenChatView: () => JSX.Element;
}

function ChatBox({ isChatExpanded, setIsChatExpanded, fullScreenChatView }: ChatBoxProps) {
  return (
    <>
      {!isChatExpanded ? (
        <button onClick={() => setIsChatExpanded(true)} className={styles.chatButton}>
          💬 Chat with me!
        </button>
      ) : (
        fullScreenChatView()
      )}
    </>
  );
}

interface Message {
  text: string;
  sender: 'User' | 'FGCU';
}

interface FullScreenChatViewProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: () => void;
}

function FullScreenChatView({ messages, inputValue, setInputValue, sendMessage }: FullScreenChatViewProps) {
  return (
    <>
      <div className={styles.fullScreenChatView}>
        <h2 className={styles.title}>Caleb Photo Collage :D</h2>
        <div className={styles.imageRow}>
          <Image
            src="/images/cabes.png"
            alt="Caleb"
            width={100} height={100}
            className={styles.caleb}
          />
          <Image
            src="/images/standingCaleb.png"
            alt="Standing Caleb"
            width={100} height={100}
            className={styles.caleb}
          />
          <Image
            src="/images/calebIQ.png"
            alt="Caleb IQ"
            width={100} height={100}
            className={styles.caleb}
          />
          <Image
            src="/images/hotCaleb.png"
            alt="Hot Caleb"
            width={100} height={100}
            className={styles.caleb}
          />
          <Image
            src="/images/grandpaCaleb.png"
            alt="Grandpa Caleb"
            width={100} height={100}
            className={styles.caleb}
          />
          <Image
            src="/images/cakeCabes.png"
            alt="Cake Caleb"
            width={100} height={100}
            className={styles.caleb}
          />
          <Image
            src="/images/daddyCaleb.png"
            alt="Daddy Caleb"
            width={100} height={100}
            className={styles.caleb}
          />
        </div>
        <div className={styles.chatMessages}>
          {messages.length === 0 ? (
            <p className={styles.noMessagesText}>No messages yet. Start chatting!</p>
          ) : (
            messages.map((msg, index) => (
                <div
                key={index}
                className={[
                  styles.messageContainer,
                  msg.sender === 'User' ? styles.userContainer : styles.aiContainer,
                ].join(' ')}
                >
                {msg.sender === 'FGCU' && (
                  <Image
                    src="/images/chad.png" // Chatbot image
                    alt="FGCU Bot"
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                )}
                {msg.sender === 'User' && (
                  <Image
                    src="/images/caleb.png" // User image (or different image if you want)
                    alt="User"
                    width={40}
                    height={40}
                    className={styles.avatar}
                  />
                )}
                <p className={msg.sender === 'User' ? styles.userMessage : styles.aiMessage}>
                  {msg.text}
                </p>
                </div>
            ))
          )}
        </div>

        <div className={styles.messageInputContainer}>
          <input
            className={styles.messageInput}
            placeholder="Ask me a question about FGCU SE/CS..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSubmit={sendMessage}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default behavior of the Enter key
                sendMessage();
              }
            }}
          />
            <button
              className="bg-fgcu px-4 py-2 text-white rounded"
              onClick={sendMessage}
            >
            Send
            </button>
        </div>
      </div>
    </>
  );
}

export default function HomeView() {
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]); // Initialize messages as an empty array
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, sender: 'User' }]);
      setInputValue('');

      try {
        const response = await fetch("/api/chatbot", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userMessage: inputValue }),
        });

        const data = await response.json();

        const botMessage = data.advice.result;
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
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.aiHeader}>FGCU SE/CS Chatbot</h1>
        <p className={styles.aiSubHeader}>Your Personal Academic Advisor</p>
      </div>
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
        <div className={styles.fullScreenOverlay} onClick={() => setIsChatExpanded(true)}>
          <FullScreenChatView
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
}