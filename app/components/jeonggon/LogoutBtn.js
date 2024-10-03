"use client";

import {signOut } from 'next-auth/react'

export default function LogoutBtn() {
  return (
    <div>
        <button onClick={()=> {signOut()}}  style={{fontSize:"50px", height:"100px"}}> 로그아웃 </button>  
    </div>  
  );
}
