import connectDB from "@/util/database";
import * as MyComponents from "./components/junseok"; // index.js의 모든 컴포넌트를 객체 형태로 가져오기
import React from 'react';

export default async function Home() {
  const client = await connectDB();
  const db = client.db("dream-catcher");
  let result = await db.collection('diary').find().toArray();

  const leftContent = "꿈 보관함";
  const rightContent = <MyComponents.FluentPerson/>;

  return (
    <>
      

      <div style={{ width: "100%", backgroundColor: "black" }} className="list-bg">
        {/* MyComponents 객체를 통해 모든 컴포넌트를 참조하여 사용 */}
      <MyComponents.TopBar leftContent={leftContent} rightContent={rightContent} />
      <MyComponents.BookmarkBox>
        <MyComponents.BookmarkMiniBox>
          <MyComponents.BookmarkText>북마크</MyComponents.BookmarkText>
        </MyComponents.BookmarkMiniBox>
      </MyComponents.BookmarkBox>
        {result.map((a, i) => (
          <div className="list-item" key={i}>
            <a href={`chat/${a._id}`}>{a.title}</a>
            <p>{new Date(a.created_at).toLocaleString()}</p>
          </div>
        ))}
        <a href={`/chat`}>꿈 기록하러 가기</a>
      </div>
     
    </>
  );
}
