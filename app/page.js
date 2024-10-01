import connectDB from "@/util/database";
import * as MyComponents from "./components/junseok"; // Importing all components from index.js as an object
import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutBtn from "./components/jeonggon/LogoutBtn";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const client = await connectDB();
  const db = client.db("dream-catcher");

  let current_user = await db.collection('users').findOne({ email: session.user.email });

  if (!current_user.birth_date || !current_user.gender) {
    redirect('/sign_up');
  }

  if (!current_user.occupation) {
    redirect('/sign_up2');
  }

  let result = await db.collection('diary').find({ user_email: session.user.email }).toArray();

  return (
    <>
      <LogoutBtn />
      <div style={{ height: "50px" }}><a href="/sign_up"> adf </a> </div>

      {/* MainContainer에 자식 요소로 MainContent와 FloatingButton 전달 */}
      <MyComponents.MainContainer>
        <MyComponents.MainContent result={result} />
        <MyComponents.FloatingButton />
      </MyComponents.MainContainer>
    </>
  );
}
