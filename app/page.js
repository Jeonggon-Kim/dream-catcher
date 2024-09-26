import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("dream-catcher")
  let result = await db.collection('diary').find().toArray()

  return (
    <div style={{width:"100%", backgroundColor:"black"}} className="list-bg">
      {
        result.map((a, i) => {
          return (
            <div className="list-item" key={i}>
              <a href={`chat/${a._id}`}> {a.title} </a>
              <p>{a.created_at.toLocaleString()}</p>
            </div>
          );
        })
      }
    <a href={`/chat`}> 꿈 기록하러 가기 </a>
  </div>
  );
}
