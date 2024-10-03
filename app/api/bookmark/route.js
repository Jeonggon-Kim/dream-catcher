// app/api/bookmark/route.js

import connectDB from "@/util/database";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  try {
    const client = await connectDB();
    const db = client.db("dream-catcher");
    const { diaryId, isBookmark } = await req.json(); // req.body 대신 req.json 사용

    if (!ObjectId.isValid(diaryId)) {
      return new Response(JSON.stringify({ message: 'Invalid diary ID' }), { status: 400 });
    }

    await db.collection('diary').updateOne(
      { _id: new ObjectId(diaryId) },
      { $set: { is_bookmark: isBookmark } }
    );

    return new Response(JSON.stringify({ message: 'Bookmark updated successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
