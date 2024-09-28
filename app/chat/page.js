"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ChatMessage = ({ message, sender }) => (
  <div
    style={{
      padding: "10px",
      margin: "5px 0",
      backgroundColor: sender === "user" ? "#d1f7c4" : "#f1f1f1",
      alignSelf: sender === "user" ? "flex-end" : "flex-start",
      borderRadius: "10px",
      maxWidth: "70%",
    }}
  >
    <strong>{sender === "user" ? "You" : "Bot"}: </strong>
    {message}
  </div>
);

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter(); 

  // SpeechRecognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.lang = "ko-KR"; // 한국어 설정
    recognition.interimResults = false; // 중간 결과를 보여줄지 여부
    recognition.maxAlternatives = 1; // 최대 대안 단어 수
  }

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessage = { sender: "user", text: inputValue.trim() };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setLoading(true);
  
      try {
        const chatHistory = [...messages, newMessage].map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));
  
        const response = await fetch("/api/gptResponse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMessage: inputValue.trim(), chatHistory }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const botResponseText = data.botResponse;
          const botResponse = { sender: "bot", text: botResponseText };
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        } else {
          const errorMessage = { sender: "bot", text: "Sorry, I couldn't understand that." };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        console.error("Error fetching bot response:", error);
        const errorMessage = { sender: "bot", text: "Something went wrong. Please try again." };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
  
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
  
    if (isRecording) {
      recognition.stop(); // 현재 녹음 중이면 음성 인식 종료
    } else {
      recognition.start(); // 녹음 중이 아니면 음성 인식 시작
    }
  
      setIsRecording(!isRecording);
  };


  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    setInputValue(speechResult); // 인식된 텍스트를 inputValue에 설정
  };
  
  const handleEndChat = async () => {
    try {
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));
  
      const response = await fetch("/api/generateDiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatHistory }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Chat Summary: " + data.summary);
      } else {
        console.error("Failed to generate chat summary.");
      }
    } catch (error) {
      console.error("Error generating chat summary:", error);
    }
    
    router.push("/"); 
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <ChatMessage message="안녕하세요. 혹시 오늘 무슨 꿈을 꾸셨나요?" sender='bot' />
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} sender={message.sender} />
        ))}
      </div>

      {/* 버튼 영역 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={handleEndChat}
          style={{
            padding: "10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          End Chat
        </button>

        {/* 입력 및 전송 버튼 영역 */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {/* 음성 입력 버튼 추가 */}
          <button
            onClick={handleVoiceInput}
            style={{
              padding: "10px 20px",
              backgroundColor: isRecording ? "#f44336" : "#2196f3", // 녹음 중일 때 빨간색, 아닐 때 파란색
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {isRecording ? "Stop 🎤" : "Start 🎤"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Chat UI</h1>
      <ChatUI />
    </div>
  );
}



asdfasdfasdf