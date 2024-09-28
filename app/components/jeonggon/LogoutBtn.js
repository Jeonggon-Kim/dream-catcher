"use client";

import {signOut } from 'next-auth/react'

export default function LogoutBtn() {
  return (
    <div>
        <button onClick={()=> {signOut()}}  style={{position:"absolute", left:"100px", fontSize:"100px", height:"200px"}}> 로그아웃 </button>  
        <p  style={{position:"absolute", left:"100px", top:"200px", fontSize:"25px", height:"200px"}}> 임시 로그아웃</p>   
    </div>  
  );
}
