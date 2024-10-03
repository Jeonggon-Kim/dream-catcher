"use client"; // Client-side rendering in Next.js

import { useRouter } from 'next/navigation'; // Router hook for navigation
import '../Login page/signup1.css';  // Import the CSS file for styling

export default function Home() {
  const router = useRouter();

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
        const result = await response.json();
        console.log(result);

        // Redirect to the next page
        window.location.href = "/sign_up2";
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign Up Page</title>
      </head>

      <body>
        <div className="survey-1">
          <div className="bg">
            <div className="ellipse-623"></div>
            <div className="frame-427320609">
              <form onSubmit={handleSubmit}>
                <div className="frame-427319140">
                  <div className="description">이름</div>
                  <div className="name">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="홍길동"
                      required
                      className="description2"
                    />
                  </div>
                </div>

                <div className="frame-4273206092">
                  <div className="description">생년월일</div>
                  <div className="birth">
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      defaultValue="2001-10-07"
                      required
                      className="description2"
                    />
                  </div>
                </div>

                <div className="frame-427320608">
                  <div className="description3">성별</div>
                  <div className="frame-427320635">
                    <div className="sex">
                      <input type="radio" id="female" name="gender" value="female" />
                      <label htmlFor="female" className="description4">여성</label>
                    </div>
                    <div className="sex2">
                      <input type="radio" id="male" name="gender" value="male" defaultChecked />
                      <label htmlFor="male" className="description4">남성</label>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button type="submit">계속하기</button>
                </div>
              </form>
            </div>
          </div>

          <div className="frame-427319766">
            <div className="frame-37945">
              <div className="group-38122">
                <div className="rectangle-578"></div>
                <div className="rectangle-579"></div>
              </div>
            </div>
            <div className="frame-427319776">
              <div className="frame-427319765">
                <div className="_35">이름, 나이, 성별을 기입해주세요.</div>
                <div className="description5">
                  이름, 나이, 성별 데이터를 기반으로
                  <br />
                  맞춤형 꿈 분석과 꿈 생성 이미지를 받아볼 수 있어요
                </div>
              </div>
            </div>
          </div>

          <div className="home-indicator">
            <div className="home-indicator2"></div>
          </div>
          <div className="home-indicator">
            <div className="home-indicator3"></div>
          </div>
          <div className="status-bar">
            <div className="time">
              <div className="time2">9:41</div>
            </div>
            <div className="levels">
              <svg className="battery" width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.35" x="1" y="0.5" width="24" height="12" rx="3.8" stroke="#F0ECF1" />
                <path opacity="0.4" d="M26.5 4.78125V8.85672C27.3047 8.51155 27.828 7.70859 27.828 6.81899C27.828 5.92938 27.3047 5.12642 26.5 4.78125Z" fill="#F0ECF1" />
                <rect x="2.5" y="2" width="21" height="9" rx="2.5" fill="#F0ECF1" />
              </svg>
              <svg className="wifi" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.7 1.68187C19.7 1.04883 19.2224 0.535645 18.6333 0.535645H17.5667C16.9776 0.535645 16.5 1.04883 16.5 1.68187V11.6158C16.5 12.2489 16.9776 12.7621 17.5667 12.7621H18.6333C19.2224 12.7621 19.7 12.2489 19.7 11.6158V1.68187ZM12.2659 2.98093H13.3326C13.9217 2.98093 14.3992 3.50643 14.3992 4.15466V11.5883C14.3992 12.2366 13.9217 12.7621 13.3326 12.7621H12.2659C11.6768 12.7621 11.1992 12.2366 11.1992 11.5883V4.15466C11.1992 3.50643 11.6768 2.98093 12.2659 2.98093ZM7.93411 5.62997H6.86745C6.27834 5.62997 5.80078 6.16216 5.80078 6.81865V11.5734C5.80078 12.2299 6.27834 12.762 6.86745 12.762H7.93411C8.52322 12.762 9.00078 12.2299 9.00078 11.5734V6.81865C9.00078 6.16216 8.52322 5.62997 7.93411 5.62997ZM2.63333 8.07527H1.56667C0.977563 8.07527 0.5 8.59985 0.5 9.24697V11.5904C0.5 12.2375 0.977563 12.7621 1.56667 12.7621H2.63333C3.22244 12.7621 3.7 12.2375 3.7 11.5904V9.24697C3.7 8.59985 3.22244 8.07527 2.63333 8.07527Z"
                fill="#F0ECF1"
            />
            </svg>
        </div>
        </div>
    </div>
</body>
</html>
  )}
