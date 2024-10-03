// app/api/getDiaries/route.js

import connectDB from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, res) {
  try {
    // 사용자 세션을 가져옴
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    // MongoDB 연결
    const client = await connectDB();
    const db = client.db("dream-catcher");

    // 현재 사용자의 이메일을 기준으로 다이어리 데이터 조회
    const diaries = await db.collection('diary').find({ user_email: session.user.email }).toArray();

    // 조회된 데이터를 반환
    return new Response(JSON.stringify(diaries), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
