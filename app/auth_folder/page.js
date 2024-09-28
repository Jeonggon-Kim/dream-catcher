// import connectDB from "@/util/database";
// import * as MyComponents from "./components/junseok"; // index.js의 모든 컴포넌트를 객체 형태로 가져오기
// import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginBtn from "../components/jeonggon/LogoutBtn";

export default async function Home() {
  console.log('asdf')
  let session = await getServerSession(authOptions)
  console.log(session.user.name)
  return (
    <div>
        {/* <LoginBtn/>      */}
    </div>
  );
}
