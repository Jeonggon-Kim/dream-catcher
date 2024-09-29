import connectDB from "@/util/database";
import * as MyComponents from "./components/junseok"; // index.js의 모든 컴포넌트를 객체 형태로 가져오기
import React from 'react';

export default async function Home() {
  const client = await connectDB();
  const db = client.db("dream-catcher");
  let result = await db.collection('diary').find().toArray();

  const leftContent = <span style={{ color: "#F0ECF1" }}>꿈 보관함</span>;
  const rightContent = <MyComponents.FluentPerson/>;
  
  const left = <div>전체</div>
  const right = <div>최신순</div>

  

  return (
    <>
    
      <div style={{ width: "100%", backgroundColor: "black" }} className="list-bg">
        {/* MyComponents 객체를 통해 모든 컴포넌트를 참조하여 사용 */}
        <MyComponents.TopBar leftContent={leftContent} rightContent={rightContent} />
        <MyComponents.BookmarkBox style={{ padding: '16px', backgroundColor: '#1C1C1E',   }}>
          {/* BookmarkMiniBox 내부에 BookmarkText 추가 */}
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
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'calc(100% - 267px)' }}
/>       

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
