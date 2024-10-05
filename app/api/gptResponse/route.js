import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { generateImage } from "@/util/stabilityAI";

// OpenAI 설정
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request) {
  try {
    // 요청에서 데이터 추출
    const { userMessage, chatHistory, isFirstResponse } = await request.json();

    // 세션 정보 가져오기
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("Unauthorized access - No session found");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 데이터베이스 연결
    const client = await connectDB();
    const db = client.db("dream-catcher");

    // 사용자 정보 가져오기 (name, birthdate, gender)
    const userDoc = await db.collection("users").findOne({ email: session.user.email });
    if (!userDoc) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, birth_date: birthdate, gender } = userDoc;
    // name, birthdate, gender 값 출력해서 확인

    const systemMessages = [
      {
        role: "system",
        content: `저는 꿈 해석 전문가입니다. 앞으로 ${name}님의 꿈을 분석하고 해석해드리겠습니다. 
                  ${name}님은 ${birthdate}에 태어나신 ${gender}이시군요. 앞으로 ${name}님과의 대화에서는 항상 존댓말을 사용하고, 
                  '~요'체로 끝맺어 주세요. 또한, 대화 시 ${name}님의 성은 사용하지 않고 이름으로만 불러 주세요.
                  예를 들어 ${name}이 김정곤이면 정곤으로만 불러주세요.
                  이름은 자연스럽게 불러줘. 이름님?식의 질문은 자제해.`,
      },
      {
        role: "assistant",
        content: "안녕하세요! 오늘 꾸신 꿈에 대해 이야기해 주실 수 있나요?",
      },
      {
        role: "system",
        content: `
          다음 지침을 따라 꿈을 분석해 주세요:
          1. 사용자가 꿈을 작성하면, 주요 요소를 내부적으로만 추출해 주세요. 사용자에게는 표시하지 마세요.
          2. 꿈의 유형(자각몽, 반복꿈, 현실적 꿈, 비현실적 꿈)을 파악해 주세요.
          3. 한 번에 하나의 질문만 던져 주세요. 사용자의 답변을 기다린 후 다음 질문으로 넘어가세요.
          4. 다음 순서대로 질문을 진행해 주세요:
             a) 꿈에서 느낀 감정에 대해 물어봐 주세요.
             b) 꿈의 상황과 등장한 요소(사람, 사물 등)에 대해 물어봐 주세요.
             c) 사용자가 생각하는 꿈의 이유에 대해 질문해 주세요.
             d) 꿈 해석과 사용자의 현재 상태를 연결 지어 설명해 주세요.
          5. 충분한 답변을 받은 후, 종합적인 꿈 해석과 현실 생활과의 연관성을 설명해 주세요.
        `,
      },
    ];

    // 메시지에 시스템 메시지 및 사용자 입력 내용 추가
    const messages = [
      ...systemMessages,
      ...chatHistory,
      { role: "user", content: userMessage },
    ];

    // OpenAI를 이용하여 GPT-4 모델로 응답 생성
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });
    const botResponse = completion.choices[0].message.content;

    // 첫 번째 응답일 경우, 다이어리 타이틀 생성 및 이미지 생성 요청
    let diaryTitle = null;
    let diaryId = null;
    if (isFirstResponse) {
      const titleCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system",     
            content: "Create a concise title for the dream that the user dreamt in Korean"},
          ...chatHistory,
          { role: "user", content: userMessage },
        ],
        max_tokens: 50,
      });

      const titleCompletionEnglish = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system",
            content:"Create a concise title for the dream that the user dreamt in English"},
          ...chatHistory,
          { role: "user", content: userMessage },
        ],
        max_tokens: 50,
      });

      diaryTitle = titleCompletion.choices[0].message.content.trim();
      const diaryTitleEnglish = titleCompletionEnglish.choices[0].message.content.trim();

      const diaryResult = await db.collection("diary").insertOne({
        title: diaryTitle,
        content: "",
        created_at: new Date(),
        is_bookmark: false,
        user_email: session.user.email,
      });

      diaryId = diaryResult.insertedId;

      // 백그라운드에서 이미지 생성 요청
      generateImage(diaryTitleEnglish, diaryId)
        .then((imagePath) => {
          console.log("Image generated successfully:", imagePath);
        })
        .catch((error) => {
          console.error("Error generating image or updating the database:", error);
        });
    }

    // 최종 응답 반환
    return NextResponse.json({ botResponse, diaryTitle, diaryId });

  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return NextResponse.json({ error: "Error fetching GPT response" }, { status: 500 });
  }
}
