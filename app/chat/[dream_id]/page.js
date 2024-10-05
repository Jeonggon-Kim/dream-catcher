import { connectDB } from "@/util/database";
import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

export default async function Home(props) {
  const client = await connectDB();
  const db = client.db("dream-catcher");

  // 1. Fetch the diary document
  let result = await db.collection("diary").findOne({
    _id: new ObjectId(props.params.dream_id),
  });

  // 2. Fetch all chat documents referencing the diary_id
  const chatRecords = await db
    .collection("chat")
    .find({ diary_id: new ObjectId(props.params.dream_id) })
    .sort({ timestamp: 1 })
    .toArray();

  // Define the path to the image
  const imagePath = path.join(process.cwd(), "public", "images", `${props.params.dream_id}.webp`);
  const imageExists = fs.existsSync(imagePath); // Check if the image exists
  const imageToUse = imageExists ? `/images/${props.params.dream_id}.webp` : "/images/default_image.webp"; // Fallback to default

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
        border: sender === "assistant" ? "1px solid #444" : "none",
        alignSelf: sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      <span style={{ fontSize: "14px", lineHeight: "1.5" }}>{message}</span>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "0px",
        margin: "0px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#191933",
        padding: "0px",
        margin: "0px",
        maxWidth: "400px",
        height: "1vh",
        minHeight: "100vh",
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
        {/* Diary summary section */}
        <div
          style={{
            padding: "10px",
            margin: "5px 0",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "rgb(224, 224, 224) 0px 2px 4px 0px",
          }}
        >
          <img
            src={imageToUse} // Use the correct image path
            alt="Diary Icon"
            style={{ width: "100%", height: "300px", borderRadius: "12px" }}
          />
          <h2>Diary Summary</h2>
          <p>{result.content}</p>
        </div>
        {/* Chat History */}
        <h3 style={{ textAlign: "center", color: "white" }}>Chat History</h3>
        {chatRecords.map((chat, index) => (
          <ChatMessage key={index} message={chat.content} sender={chat.role} />
        ))}
      </div>
    </div>
  );
}
