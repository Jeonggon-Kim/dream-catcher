import { NextResponse } from "next/server";
import OpenAI from "openai";
// import { connectDB } from "@/util/database"; // MongoDB 연결 함수 가져오기
// import { ObjectId } from "mongodb";

// OpenAI 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request) {
  try {
    const { userMessage, chatHistory } = await request.json();

    console.log(chatHistory)
    // OpenAI에 보낼 메시지 구조 생성
    const messages = [
      {
        role: "system",
        content: "너는 꿈 해몽을 해주는 사람이야. 유저에게 오늘 꾼 꿈을 물어보고, 그 사람이 꿈에 대해 설명하면, 너가 그 사람이 꿈에 대해 현실과 비교할 수 있게 역질문을해",
      },
      {
        role: "assistant",
        content: "안녕하세요. 혹시 오늘 무슨 꿈을 꾸셨나요?",
      },
      ...chatHistory,
      { role: "user", content: userMessage },
    ];

    // OpenAI에 API 요청 보내기
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    const botResponse = completion.choices[0].message.content;

    // MongoDB 연결
    // const client = await connectDB;
    // const db = client.db("dream-catcher"); // 데이터베이스 이름
    // const chatCollection = db.collection("chat"); // 컬렉션 이름
    // // MongoDB에 새로운 채팅 기록 추가
    // await chatCollection.insertOne({
    //   user: userMessage,
    //   assistant: botResponse,
    //   timestamp: new Date(), // 저장 시각 추가 (옵션)
    // });

    return NextResponse.json({ botResponse });
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return NextResponse.json(
      { error: "Error fetching GPT response" },
      { status: 500 }
    );
  }
}
