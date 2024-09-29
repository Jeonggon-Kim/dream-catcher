"use client"; // Make sure this is a client component

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); // Initialize the Next.js router

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      occupation: event.target.occupation.value
    };

    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
    console.log(formData)
    try {
      // Send a POST request to the API route
      const response = await fetch('/api/submitForm2', {
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
        window.location.href = "/";
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
          <span>직업</span><br />
            <input type="radio" id="student" name="occupation" value="student" />
            <label htmlFor="student">학생</label>

            <input type="radio" id="employee" name="occupation" value="employee" defaultChecked />
            <label htmlFor="employee">직장인</label>

            <input type="radio" id="self_employed" name="occupation" value="self_employed" />
            <label htmlFor="self_employed">자영업</label>

            <input type="radio" id="housewife" name="occupation" value="housewife" />
            <label htmlFor="housewife">주부</label>

            <input type="radio" id="unemployed" name="occupation" value="unemployed" />
            <label htmlFor="unemployed">무직</label>

            <input type="radio" id="others" name="occupation" value="others" />
            <label htmlFor="others">기타</label>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit">계속하기</button>
        </div>
      </form>
    </div>
  );
}
