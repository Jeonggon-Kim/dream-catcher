"use client"; // Ensure this is a client component

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import LogoutBtn from "../components/jeonggon/LogoutBtn";

export default function MyPage() {
  const [userData, setUserData] = useState({
    name: "",
    birthdate: "",
    gender: "",
    occupation: "", // Add occupation to state
  });

  const router = useRouter();

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/getUserInfo'); // Fetch user info from your API
        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.name || "",
            birthdate: data.birth_date || "",
            gender: data.gender || "male",
            occupation: data.occupation || "", // Fetch occupation from user data
          });
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      name: event.target.name.value,
      birthdate: event.target.birthdate.value,
      gender: event.target.gender.value,
      occupation: event.target.occupation.value, // Add occupation to form data
    };

    try {
      // Send a POST request to the API route
      const response = await fetch('/api/submitForm3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        const result = await response.json();
        console.log(result);

        // Redirect to a new page, e.g., '/mypage'
        router.push("/mypage");
      } else {
        // Handle error response
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div>
      <h2>내 정보</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름</label><br />
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="홍길동" 
            defaultValue={userData.name} // Set default value from fetched data
            required 
          /><br /><br />
        </div>

        <div>
          <label htmlFor="birthdate">생년월일</label><br />
          <input 
            type="date" 
            id="birthdate" 
            name="birthdate" 
            defaultValue={userData.birthdate} // Set default birthdate
            required 
          /><br /><br />
        </div>

        <div>
          <span>성별</span><br />
          <input 
            type="radio" 
            id="female" 
            name="gender" 
            value="female" 
            checked={userData.gender === "female"} // Preselect based on fetched gender
            onChange={() => setUserData({ ...userData, gender: "female" })} 
          />
          <label htmlFor="female">여성</label>
          <input 
            type="radio" 
            id="male" 
            name="gender" 
            value="male" 
            checked={userData.gender === "male"} // Preselect based on fetched gender
            onChange={() => setUserData({ ...userData, gender: "male" })} 
          />
          <label htmlFor="male">남성</label>
        </div>

        <div>
          <label htmlFor="occupation">직업</label><br />
          <input 
            type="radio" 
            id="student" 
            name="occupation" 
            value="student" 
            checked={userData.occupation === "student"} // Preselect based on fetched occupation
            onChange={() => setUserData({ ...userData, occupation: "student" })}
          />
          <label htmlFor="student">학생</label>

          <input 
            type="radio" 
            id="employee" 
            name="occupation" 
            value="employee" 
            checked={userData.occupation === "employee"} // Preselect based on fetched occupation
            onChange={() => setUserData({ ...userData, occupation: "employee" })}
          />
          <label htmlFor="employee">직장인</label>

          <input 
            type="radio" 
            id="self_employed" 
            name="occupation" 
            value="self_employed" 
            checked={userData.occupation === "self_employed"} // Preselect based on fetched occupation
            onChange={() => setUserData({ ...userData, occupation: "self_employed" })}
          />
          <label htmlFor="self_employed">자영업</label>

          <input 
            type="radio" 
            id="housewife" 
            name="occupation" 
            value="housewife" 
            checked={userData.occupation === "housewife"} // Preselect based on fetched occupation
            onChange={() => setUserData({ ...userData, occupation: "housewife" })}
          />
          <label htmlFor="housewife">주부</label>

          <input 
            type="radio" 
            id="unemployed" 
            name="occupation" 
            value="unemployed" 
            checked={userData.occupation === "unemployed"} // Preselect based on fetched occupation
            onChange={() => setUserData({ ...userData, occupation: "unemployed" })}
          />
          <label htmlFor="unemployed">무직</label>

          <input 
            type="radio" 
            id="others" 
            name="occupation" 
            value="others" 
            checked={userData.occupation === "others"} // Preselect based on fetched occupation
            onChange={() => setUserData({ ...userData, occupation: "others" })}
          />
          <label htmlFor="others">기타</label>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit">수정완료</button>
        </div>
      </form>

      <LogoutBtn />     
    </div>
  );
}
