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
    // OpenAI에 보낼 메시지 구조 생성
    const messages = [
      {
        role: "system",
        content: "당신은 꿈 해석 전문가입니다. 다음 지침을 따라 사용자의 꿈을 분석하고 해석해주세요.",
      },
      {
        role: "assistant",
        content: "안녕하세요. 혹시 오늘 무슨 꿈을 꾸셨나요?",
      },
      {
        role: "system",
        content: `
          1. 사용자가 꿈을 작성하면, 주요 요소를 내부적으로만 추출하세요. 절대 사용자에게 표시하지 마세요.
          2. 꿈의 유형(자각몽, 반복꿈, 현실적 꿈, 비현실적 꿈)을 내부적으로 파악하세요.
          3. 한 번에 하나의 질문만 하세요. 사용자의 답변을 기다린 후 다음 질문으로 넘어가세요.
          4. 다음 순서로 질문을 진행하세요:
             a) 꿈에서 느낀 감정에 대한 질문
             b) 꿈의 상황과 등장한 요소(사람, 사물 등)에 대한 상세한 질문
             c) 사용자가 생각하는 꿈의 이유에 대한 질문
             d) 꿈 해석과 사용자의 현재 상태를 연결짓는 질문
          5. 질문에 대한 충분한 답변을 받은 후, 종합적인 꿈 해석과 현실 생활과의 연관성을 설명해주세요.
        `,
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
