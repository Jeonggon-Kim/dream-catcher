"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeartAnimation from "../components/jeonggon/Animation";

const ChatMessage = ({ message, sender }) => (
  <div
    style={{
      padding: "15px",
      margin: "8px 0",
      backgroundColor: sender === "user" ? "#3e3c61" : "transparent",
      color: sender === "user" ? "#ffffff" : "#9e9e9e",
      borderRadius: "15px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "80%",
      border: sender === "bot" ? "1px solid #444" : "none",
      alignSelf: sender === "user" ? "flex-end" : "flex-start",
    }}
  >
    <span style={{ fontSize: "14px", lineHeight: "1.5" }}>{message}</span>
  </div>
);

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFirstResponse, setIsFirstResponse] = useState(true); // Track if this is the first GPT response
  const [diaryId, setDiaryId] = useState(null); // State to store diaryId
  const [diaryTitle, setDiaryTitle] = useState(""); // State to store diaryTitle
  const [imageSrc, setImageSrc] = useState("/images/default_image.webp"); // Image source
  const [displayedTitle, setDisplayedTitle] = useState("제목: "); // State for title animation
  const router = useRouter();

  // 타이핑 애니메이션 (제목)
  useEffect(() => {
    if (diaryTitle) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        setDisplayedTitle((prev) => prev + diaryTitle[currentIndex]);
        currentIndex++;
        if (currentIndex === diaryTitle.length - 2 ) { // 마지막 글자까지 포함
          clearInterval(intervalId); 
        }
      }, 100); // 100ms마다 한 글자씩 추가
      return () => clearInterval(intervalId); // Cleanup
    }
  }, [diaryTitle]);


  // SpeechRecognition setup
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
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
          body: JSON.stringify({
            userMessage: inputValue.trim(),
            chatHistory,
            isFirstResponse, // Pass the first response flag
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const botResponseText = data.botResponse;
          const botResponse = { sender: "bot", text: botResponseText };
          setMessages((prevMessages) => [...prevMessages, botResponse]);

          if (isFirstResponse) {
            if (data.diaryId) {
              setDiaryId(data.diaryId); // Save diaryId for later use
            }
            if (data.diaryTitle) {
              setDiaryTitle(data.diaryTitle); // Update the chat title with diaryTitle
            }
            setIsFirstResponse(false); // Mark as no longer the first response
          }
        } else {
          const errorMessage = {
            sender: "bot",
            text: "Sorry, I couldn't understand that.",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        console.error("Error fetching bot response:", error);
        const errorMessage = {
          sender: "bot",
          text: "Something went wrong. Please try again.",
        };
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
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsRecording(!isRecording);
  };

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    setInputValue(speechResult);
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
        // Include the diaryId in the body when ending the chat
        body: JSON.stringify({ chatHistory, diaryId }),
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

  // Check for the image every 3 seconds once diaryId is set
  useEffect(() => {
    const checkImageExists = () => {
      if (diaryId) {
        const img = new Image();
        img.src = `/images/${diaryId}.webp`;
        img.onload = () => setImageSrc(img.src); // If the image is found, set it
        img.onerror = () => setImageSrc("/images/default_image.webp"); // If not, keep the loading image
      }
    };

    const intervalId = setInterval(checkImageExists, 3000);

    return () => clearInterval(intervalId); // Cleanup the interval when component unmounts
  }, [diaryId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90vh",
        width: "100%",
        maxWidth: "380px",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#191933",
        padding: "10px",
        margin: "0px",
        minHeight: "1vh",
      }}
    >
      <p style={{ textAlign: "center", color: "#ffffff", fontSize: "18px" }}>
        {displayedTitle} {/* Display the diary title dynamically, but prevent undefined */}
      </p>


      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        {diaryId && (
          <img
            src={imageSrc}
            alt="Diary Icon"
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "12px",
              animation: "fadeIn 1s ease-in-out",
            }}
          />
        )}
        <ChatMessage
          message="안녕하세요. 혹시 오늘 무슨 꿈을 꾸셨나요?"
          sender="bot"
        />
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} sender={message.sender} />
        ))}
      </div>

      {/* Input and Send Button Area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handleVoiceInput}
          style={{
            position: "absolute",
            top: "-35px",
            left: "0",
            border: "none",
            width: "90px",
            height: "30px",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
          disabled={loading}
        >
          {!isRecording ? (
            <i
              style={{
                color: "white",
                position: "absolute",
                right: "57px",
                bottom: "3px",
              }}
              className="material-icons"
            >
              mic
            </i>
          ) : (
            <HeartAnimation />
          )}
        </button>

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{
              width: "100%",
              padding: "12px 60px 12px 12px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              backgroundColor: "#2e2e48",
              color: "#fff",
              boxSizing: "border-box",
            }}
            disabled={loading}
          />

          <button
            onClick={handleSend}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "10px 15px",
              backgroundColor: "#6c5ce7",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* End Chat Button */}
      <button
        onClick={handleEndChat}
        style={{
          padding: "12px",
          background: "linear-gradient(90deg, #f44336, #ff7961)",
          color: "white",
          border: "none",
          borderRadius: "24px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background 0.3s ease",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onMouseEnter={(e) =>
          (e.target.style.background =
            "linear-gradient(90deg, #ff7961, #f44336)")
        }
        onMouseLeave={(e) =>
          (e.target.style.background =
            "linear-gradient(90deg, #f44336, #ff7961)")
        }
      >
        일기 생성
      </button>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <ChatUI />
    </div>
  );
};
