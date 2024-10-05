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
    // Extract the request data, including the new isFirstResponse flag
    const { userMessage, chatHistory, isFirstResponse } = await request.json();
    const session = await getServerSession(authOptions);

    // Initialize variables to be used later
    let diaryTitle = null;
    let diaryId = null;

    // Initialize the system messages
    const systemMessages = [
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
    ];

    // Combine system messages with chat history
    const messages = [
      ...systemMessages,
      ...chatHistory,
      { role: "user", content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });
    const botResponse = completion.choices[0].message.content;

    // If it's the first response, handle the diary and image generation
    if (isFirstResponse) {
      console.log('first response')
      const titleCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Create a concise title for the dream that the user dreamt in Korean",
          },
          ...chatHistory,
          {
            role: "user",
            content: "Create a concise title for the dream that the user dreamt in Korean",
          },
        ],
        max_tokens: 50,
      });

      const titleCompletionEnglish = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Create a concise title for the dream that the user dreamt",
          },
          ...chatHistory,
          {
            role: "user",
            content: "Create a concise title for the dream that the user dreamt",
          },
        ],
        max_tokens: 50,
      });

      diaryTitle = titleCompletion.choices[0].message.content.trim();
      const diaryTitleEnglish = titleCompletionEnglish.choices[0].message.content.trim();

      console.log(diaryTitle)
      console.log(diaryTitleEnglish)

      const client = await connectDB();
      const db = client.db("dream-catcher");
      const diaryCollection = db.collection("diary");

      const diaryResult = await diaryCollection.insertOne({
        title: diaryTitle,
        content: "",
        created_at: new Date(),
        is_bookmark: false,
        user_email: session.user.email,
      });

      diaryId = diaryResult.insertedId;
      // Generate image in the background
      generateImage(diaryTitleEnglish, diaryId)
        .then((imagePath) => {
          console.log(imagePath);
        })
        .catch((error) => {
          console.error("Error generating image or updating the database:", error);
        });
    }

    // Return botResponse and optionally diary info (if first response)
    return NextResponse.json({ botResponse, diaryTitle, diaryId });
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return NextResponse.json(
      { error: "Error fetching GPT response" },
      { status: 500 }
    );
  }
}
