import { connectDB } from "@/util/database";
import { MongoClient, ObjectId } from "mongodb";

export default async function Home(props) {
  const client = await connectDB;
  const db = client.db("dream-catcher");

  // 1. 해당 diary 문서 가져오기
  let result = await db.collection('diary').findOne({ _id: new ObjectId(props.params.dream_id) });

  // 2. 해당 diary_id를 참조하는 모든 chat 문서 가져오기
  const chatRecords = await db.collection('chat')
    .find({ diary_id: new ObjectId(props.params.dream_id) })
    .sort({ timestamp: 1 }) // timestamp 순으로 정렬 (옵션)
    .toArray();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh",
        width: "400px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "rgb(249, 250, 255)",
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
          <h2>Diary Summary</h2>
          <p>{result.content}</p>
        </div>

        {/* Chat History */}
        <h3 style={{ textAlign: "center" }}>Chat History</h3>
        {chatRecords.map((chat, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              margin: "5px 0",
              backgroundColor: chat.role === "user" ? "#d1f7c4" : "#f1f1f1",
              alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
              borderRadius: "10px",
              maxWidth: "70%",
            }}
          >
            <strong>{chat.role === "user" ? "User" : "Assistant"}: </strong>
            {chat.content}
          </div>
        ))}
      </div>
    </div>
  );
}
