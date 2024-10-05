import { NextResponse } from "next/server";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import OpenAI from "openai";
import { ObjectId } from "mongodb";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request) {
  try {
    const { chatHistory, diaryId } = await request.json();

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

    // Connect to MongoDB
    const client = await connectDB();
    const db = client.db("dream-catcher");
    const diaryCollection = db.collection("diary");

    // Update the diary with the new content using the provided diaryId
    const updateResult = await diaryCollection.updateOne(
      { _id: new ObjectId(diaryId) }, // Use the passed diaryId
      { $set: { content: diarySummary } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: "Diary not found" },
        { status: 404 }
      );
    }

    // Save chat history
    const chatCollection = db.collection("chat");
    for (const chat of chatHistory) {
      await chatCollection.insertOne({
        role: chat.role === "user" ? "user" : "assistant",
        content: chat.content,
        diary_id: new ObjectId(diaryId),
      });
    }

    // Respond immediately with the updated diary details
    return NextResponse.json({
      message: "Diary updated successfully",
      content: diarySummary,
      diaryId: diaryId,
    });
  } catch (error) {
    console.error("Error updating diary content:", error);
    return NextResponse.json(
      { error: "Error updating diary content" },
      { status: 500 }
    );
  }
}
