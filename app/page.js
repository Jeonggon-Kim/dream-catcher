import connectDB from "@/util/database";
import * as MyComponents from "./components/junseok"; // Importing all components from index.js as an object
import React from 'react';
import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ensure this path is correct
import { redirect } from "next/navigation";
import LogoutBtn from "./components/jeonggon/LogoutBtn";

export default async function Home() {
  // Get session info to check if the user is logged in
  const session = await getServerSession(authOptions);

  // If the user is not logged in, redirect to the sign-in page
  if (!session) {
    redirect('/api/auth/signin'); // Adjust the path based on your login page route
  }

  // If the user is logged in, connect to the database
  const client = await connectDB();
  const db = client.db("dream-catcher");

  // Fetch only diaries belonging to the logged-in user
  let result = await db.collection('diary').find({ user_email: session.user.email }).toArray();

  // Ensure result is in the format you expect
  console.log('Filtered Diaries:', result);

  const leftContent = "꿈 보관함";
  const rightContent = <MyComponents.FluentPerson />;

  return (
    <>
      <LogoutBtn/>     
      <div style={{ width: "100%", backgroundColor: "black" }} className="list-bg">
        {/* Using MyComponents to reference all components */}
        <MyComponents.TopBar leftContent={leftContent} rightContent={rightContent} />
        <MyComponents.BookmarkBox>
          <MyComponents.BookmarkMiniBox>
            <MyComponents.BookmarkText>북마크</MyComponents.BookmarkText>
          </MyComponents.BookmarkMiniBox>
        </MyComponents.BookmarkBox>
        {result.length > 0 ? (
          result.map((a, i) => (
            <div className="list-item" key={i}>
              <a href={`chat/${a._id}`}>{a.title}</a>
              <p>{new Date(a.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No diaries found for the current user.</p>
        )}
        <a href={`/chat`}>꿈 기록하러 가기</a>
      </div>
    </>
  );
}
