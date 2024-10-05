import { NextResponse } from "next/server";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { generateImage } from "@/util/stabilityAI";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request) {
  try {
    const { chatHistory } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Generate a summary of the chat history
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "무조건 한국말로. 사용자와의 대화를 자연스럽게 이어가며, 꿈에 대한 깊이 있는 해석을 제공하세요.",
        },
        ...chatHistory,
      ],
      max_tokens: 500,
    });

    const diarySummary = completion.choices[0].message.content;

    // Generate a title based on the summary
    const titleCompletion = await openai.chat.completions.create({
      model: "gpt-4",
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

    const diaryTitle = titleCompletion.choices[0].message.content.trim();
    const diaryTitleEnglish = titleCompletionEnglish.choices[0].message.content.trim();

    // Connect to MongoDB
    const client = await connectDB();
    const db = client.db("dream-catcher");
    const diaryCollection = db.collection("diary");

    // Save the diary summary
    const diaryResult = await diaryCollection.insertOne({
      title: diaryTitle,
      content: diarySummary,
      created_at: new Date(),
      is_bookmark: false,
      user_email: session.user.email,
    });

    const diaryId = diaryResult.insertedId;

    // Save chat history
    const chatCollection = db.collection("chat");
    for (const chat of chatHistory) {
      await chatCollection.insertOne({
        role: chat.role === "user" ? "user" : "assistant",
        content: chat.content,
        diary_id: diaryId,
      });
    }

    // Image generation and database update in the background (no await)
    generateImage(diaryTitleEnglish, diaryId)
      .then((imagePath) => {
        console.log(imagePath);

        // Update the diary entry with the image path in the background
        return diaryCollection.updateOne(
          { _id: diaryId },
          { $set: { image_path: imagePath } }
        );
      })
      .catch((error) => {
        console.error("Error generating image or updating the database:", error);
      });

    // Respond immediately without waiting for image generation or update
    return NextResponse.json({
      title: diaryTitle,
      content: diarySummary,
      message: "Diary created. Image is being generated.",
    });
  } catch (error) {
    console.error("Error generating diary summary or image:", error);
    return NextResponse.json(
      { error: "Error generating diary summary or image" },
      { status: 500 }
    );
  }
}
