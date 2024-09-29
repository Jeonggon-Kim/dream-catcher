"use client";

import {signOut } from 'next-auth/react'

export default function LogoutBtn() {
  return (
    <div>
        <button onClick={()=> {signOut()}}  style={{position:"absolute", left:"100px", fontSize:"50px", height:"100px"}}> 로그아웃 </button>  
    </div>  
  );
}
