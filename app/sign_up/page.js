"use client"; // Make sure this is a client component

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // Initialize the Next.js router

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      name: event.target.name.value,
      birthdate: event.target.birthdate.value,
      gender: event.target.gender.value,
    };

    try {
      // Send a POST request to the API route
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle a successful response
        const result = await response.json();
        console.log(result);
        console.log('asdfasdfasdfasdfasdf')

        // Redirect to a new page, e.g., '/thank-you' or any other page
        window.location.href = "/sign_up2";
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
      <h2>이름, 나이, 성별을 기입해주세요.</h2>
      <p>이름, 나이, 성별 데이터를 기반으로 맞춤형 꿈 분석과 꿈 생성 이미지를 받아볼 수 있어요</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름</label><br />
          <input type="text" id="name" name="name" placeholder="홍길동" required /><br /><br />
        </div>

        <div>
          <label htmlFor="birthdate">생년월일</label><br />
          <input type="date" id="birthdate" name="birthdate" defaultValue="2001-10-07" required /><br /><br />
        </div>

        <div>
          <span>성별</span><br />
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">여성</label>
          <input type="radio" id="male" name="gender" value="male" defaultChecked />
          <label htmlFor="male">남성</label>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit">계속하기</button>
        </div>
      </form>
    </div>
  );
}
