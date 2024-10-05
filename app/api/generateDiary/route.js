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

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Answer always in Korean, but in maximum 400 Korean letters. Create a deep analysis on the users dream based on the conversation. 
          Following is the user information.
          name: ${session.user}
          birth_date: ${session.user.birth_date}
          gender: ${session.user.gender}
          job: ${session.user.occupation}
          Make sure you emphathize with the user and relate the dream to the user's personal experience.
          `
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
