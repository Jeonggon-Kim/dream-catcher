import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/util/database";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request) {
  try {
    const { chatHistory } = await request.json();

    // 채팅 기록을 바탕으로 요약 생성
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "무조건 한국말로. 사용자와의 대화를 자연스럽게 이어가며, 꿈에 대한 깊이 있는 해석을 제공하세요.",
        },
        ...chatHistory,
      ],
      max_tokens: 500, // 요약본의 최대 길이를 설정합니다.
    });

    const diarySummary = completion.choices[0].message.content;

    // 생성된 요약본을 기반으로 제목 생성
    const titleCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "무조건 한국말로. 유저가 꾼 꿈에 대해 간결한 제목을 달아줘",
        },
        ...chatHistory,
        {
          role: "user",
          content: "무조건 한국말로. 내가 꾼 꿈에 대해 간결한 제목을 달아줘",
        },
      ],
      max_tokens: 50, // 제목의 최대 길이를 설정합니다.
    });

    const diaryTitle = titleCompletion.choices[0].message.content.trim();

    // MongoDB 연결
    const client = await connectDB;
    const db = client.db("dream-catcher");
    const diaryCollection = db.collection("diary");

    // 요약본을 title, content, created_at 형식으로 MongoDB에 저장
    const diaryResult = await diaryCollection.insertOne({
      title: diaryTitle,
      content: diarySummary,
      created_at: new Date(),
      is_bookmark: false,
    });
    
    // 새로 생성된 diary 문서의 _id를 저장
    const diaryId = diaryResult.insertedId; 

    const chatCollection = db.collection("chat"); 
    for (const chat of chatHistory) {
      await chatCollection.insertOne({
        role: chat.role === "user" ? "user" : "assistant", // 사용자 또는 어시스턴트로 역할 구분
        content: chat.content,
        diary_id: diaryId,
      });
    }

    return NextResponse.json({ title: diaryTitle, content: diarySummary });
  } catch (error) {
    console.error("Error generating diary summary:", error);
    return NextResponse.json(
      { error: "Error generating diary summary" },
      { status: 500 }
    );
  }
}
