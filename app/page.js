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

  let current_user = await db.collection('users').findOne({ email: session.user.email });

  if (!current_user.birth_date || !current_user.gender ) {
    console.log(current_user.birth_date)
    console.log(current_user.gender)
    redirect('/sign_up');
  }
  console.log(current_user)
  if (!current_user.occupation ) {
    redirect('/sign_up2');
  }


  // Fetch only diaries belonging to the logged-in user
  let result = await db.collection('diary').find({ user_email: session.user.email }).toArray();

  const leftContent = "꿈 보관함";
  const rightContent = <MyComponents.FluentPerson />;

  return (
    <>
      <LogoutBtn/>     
      <div style={{height:"50px"}}><a href="/sign_up"> adf </a> </div>
      <div style={{padding:"0px", margin:"0px", height:"100%", width: "100%", backgroundColor: "black"}} className="list-bg">
        {/* Using MyComponents to reference all components */}
        <MyComponents.TopBar leftContent={leftContent} rightContent={rightContent} />
        <MyComponents.BookmarkBox>
          <MyComponents.BookmarkMiniBox>
            <MyComponents.BookmarkText>북마크</MyComponents.BookmarkText>
          </MyComponents.BookmarkMiniBox>
        </MyComponents.BookmarkBox>
        {result.length > 0 ? (
          result.map((a, i) => (
            <div className="list-item" key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              {/* Image placed on the left */}
              <img src={`/images/${a._id}.webp`} alt="Diary Icon" style={{ width: "70px", height: "70px" }} />
              
              {/* Wrap title and date in a container */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Title next to the image */}
                <a href={`chat/${a._id}`} style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>{a.title}</a>
                {/* Date below both the image and title */}
                <p style={{ margin: 0, color: "gray" }}>{new Date(a.created_at).toLocaleString()}</p>
              </div>
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
