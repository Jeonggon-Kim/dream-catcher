import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";
import { TopBar } from "./components/junseok/MyComponent";



export default async function Home() {
  const client = await connectDB;
  const db = client.db("dream-catcher");
  let result = await db.collection('diary').find().toArray();

  const leftContent="꿈 보관함"
  const rightContent="프로필 아이콘"

  return (
    <>
    <TopBar leftContent={leftContent} rightContent={rightContent} />
    
      <div style={{ width: "100%", backgroundColor: "black" }} className="list-bg">
        {result.map((a, i) => (
          <div className="list-item" key={i}>
            <a href={`chat/${a._id}`}>{a.title}</a>
            <p>{a.created_at.toLocaleString()}</p>
          </div>
        ))}
        <a href={`/chat`}>꿈 기록하러 가기</a>
        
      </div>
      
      
    </>
  );
}
