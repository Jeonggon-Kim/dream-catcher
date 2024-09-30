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

  const leftContent = <span style={{ color: "#F0ECF1" }}>꿈 보관함</span>;
  const rightContent = <MyComponents.FluentPerson />;

  const left = <div>전체</div>
  const right = <MyComponents.Dropdown style={{marginLeft: "275px"}}/>
  
  return (
    <>
      <LogoutBtn/>     
      <div style={{height:"50px"}}><a href="/sign_up"> adf </a> </div>
      <div style={{padding:"0px", margin:"0px", height:"100%", width: "100%", backgroundColor: "black"}} className="list-bg">
        {/* Using MyComponents to reference all components */}
        <MyComponents.TopBar leftContent={leftContent} rightContent={rightContent} />
        <MyComponents.BookmarkBox>
        <MyComponents.BookmarkMiniBox style={{ display: 'flex', alignItems: 'center' }}>
            <MyComponents.FluentSparkle />
            <MyComponents.BookmarkText style={{ marginLeft: '8px' }}>북마크</MyComponents.BookmarkText>
          </MyComponents.BookmarkMiniBox>

          <MyComponents.DreamcardBox >
          {/* BookmarkMiniBox 바깥에 Dreamcard 요소들 배치 */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '12px'}}>
            <MyComponents.Dreamcard1 style={{ flexShrink: 0, width: '180px', height: '113px', borderRadius: '12px' }} />
            <MyComponents.Dreamcard2 style={{ flexShrink: 0, width: '180px', height: '113px', borderRadius: '12px' }} />
          </div>
          </MyComponents.DreamcardBox>
        </MyComponents.BookmarkBox>
        <MyComponents.AlignContainer
          left={left}
          right={right}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} /> 

         {/* DiaryListItem 컴포넌트를 사용하여 일기 데이터 렌더링 */}
         {result.length > 0 ? (
          result.map((diary, index) => (
            <MyComponents.DiaryListItem key={index} diary={diary} />
          ))
        ) : (
          <p>No diaries found for the current user.</p>
        )}
        <div style={{ display: 'flex', margin: '317px 47px' }}>
          <MyComponents.FloatingButton />
        </div>
      </div>
    </>
  );
}
