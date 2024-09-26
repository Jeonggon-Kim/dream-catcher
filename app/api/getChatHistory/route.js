import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


const dbName = "dream-catcher"; // MongoDB 데이터베이스 이름
const collectionName = "chat"; // 콜렉션 이름

export async function GET() {
  try {
    // MongoDB 연결
    const client = await connectDB;
    const db = client.db(dbName);
    const chatCollection = db.collection(collectionName);

    // 채팅 기록 가져오기 (최신순으로 가져옴)
    const chatHistory = await chatCollection.find().sort({ _id: 1 }).toArray();

    return NextResponse.json({ chatHistory });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Error fetching chat history" }, { status: 500 });
  }
}
