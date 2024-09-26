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
  const router = useRouter(); 

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


  const handleEndChat = async () => {
    try {
      // 채팅 기록을 "role"과 "content" 형식으로 변환
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));
  
      // 요약본 생성 API 호출
      const response = await fetch("/api/generateDiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatHistory }), // 채팅 기록을 API에 전달
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Chat Summary: " + data.summary); // 요약본을 사용자에게 알림 (필요에 따라 변경 가능)
      } else {
        console.error("Failed to generate chat summary.");
      }
    } catch (error) {
      console.error("Error generating chat summary:", error);
    }
    
    // 메인 페이지로 이동
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
        {/* 채팅 끝내기 버튼 */}
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
