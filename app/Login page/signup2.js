"use client"; // This is a client-side component

import { useRouter } from 'next/navigation'; // Router hook for navigation
import '../Login page/signup2.css'; // Import the CSS file for styling

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      occupation: event.target.occupation.value,
    };

    try {
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
        <div className="survey-2">
          <div className="bg">
            <div className="ellipse-623"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="frame-427320327">
              <div className="category-button">
                <input type="radio" id="student" name="occupation" value="student" />
                <label htmlFor="student" className="description2">학생</label>
              </div>
              <div className="category-button2">
                <input type="radio" id="employee" name="occupation" value="employee" defaultChecked />
                <label htmlFor="employee" className="description2">직장인</label>
              </div>
              <div className="category-button2">
                <input type="radio" id="self_employed" name="occupation" value="self_employed" />
                <label htmlFor="self_employed" className="description2">자영업</label>
              </div>
              <div className="category-button2">
                <input type="radio" id="housewife" name="occupation" value="housewife" />
                <label htmlFor="housewife" className="description2">주부</label>
              </div>
              <div className="category-button2">
                <input type="radio" id="unemployed" name="occupation" value="unemployed" />
                <label htmlFor="unemployed" className="description2">무직</label>
              </div>
              <div className="category-button2">
                <input type="radio" id="others" name="occupation" value="others" />
                <label htmlFor="others" className="description2">기타</label>
              </div>
            </div>

            <div className="button">
              <button type="submit" className="description2">시작하기</button>
            </div>
          </form>

          <div className="frame-427319766">
            <div className="frame-37945">
              <div className="group-38122">
                <div className="rectangle-578"></div>
                <div className="rectangle-579"></div>
              </div>
            </div>
            <div className="frame-427319776">
              <div className="frame-427319765">
                <div className="_35">어떤 일을 하고 계신가요?</div>
                <div className="description3">
                  직업 정보를 설정하면,
                  <br />
                  더 정확한 꿈 기록과 분석을 받아볼 수 있어요
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
              <svg
                className="battery"
                width="28"
                height="13"
                viewBox="0 0 28 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.35"
                  x="1"
                  y="0.5"
                  width="24"
                  height="12"
                  rx="3.8"
                  stroke="#F0ECF1"
                />
                <path
                  opacity="0.4"
                  d="M26.5 4.78125V8.85672C27.3047 8.51155 27.828 7.70859 27.828 6.81899C27.828 5.92938 27.3047 5.12642 26.5 4.78125Z"
                  fill="#F0ECF1"
                />
                <rect x="2.5" y="2" width="21" height="9" rx="2.5" fill="#F0ECF1" />
              </svg>

              <svg
                className="wifi"
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.77052 3.10398C11.2576 3.10408 13.6496 4.02616 15.4521 5.67964C15.5879 5.8073 15.8048 5.80569 15.9385 5.67603L17.236 4.41257C17.3037 4.34681 17.3414 4.25773 17.3409 4.16505C17.3403 4.07237 17.3015 3.98372 17.233 3.91873C12.502 -0.455983 5.03829 -0.455983 0.307275 3.91873C0.238743 3.98368 0.199859 4.07229 0.199227 4.16497C0.198595 4.25766 0.236267 4.34676 0.303908 4.41257L1.60177 5.67603C1.73537 5.80588 1.95249 5.8075 2.08814 5.67964C3.89088 4.02606 6.28317 3.10397 8.77052 3.10398ZM8.76717 7.32425C10.1245 7.32417 11.4334 7.83591 12.4395 8.76004C12.5756 8.89119 12.7899 8.88835 12.9226 8.75363L14.2099 7.43432C14.2777 7.36512 14.3153 7.27124 14.3143 7.17369C14.3133 7.07614 14.2738 6.98306 14.2047 6.91527C11.1408 4.02442 6.3961 4.02442 3.33227 6.91527C3.26306 6.98306 3.22357 7.07619 3.22266 7.17377C3.22176 7.27135 3.2595 7.36522 3.32744 7.43432L4.61435 8.75363C4.747 8.88835 4.96136 8.89119 5.09745 8.76004C6.1029 7.83652 7.41074 7.32482 8.76717 7.32425ZM11.2916 10.1178C11.2935 10.2232 11.2565 10.3247 11.1892 10.3985L9.01249 12.8533C8.94868 12.9254 8.86169 12.966 8.77092 12.966C8.68015 12.966 8.59316 12.9254 8.52935 12.8533L6.35232 10.3985C6.28507 10.3247 6.24808 10.2231 6.25007 10.1177C6.25206 10.0124 6.29287 9.9126 6.36286 9.84199C7.75296 8.52809 9.78888 8.52809 11.179 9.84199C11.2489 9.91266 11.2897 10.0125 11.2916 10.1178Z"
                fill="#F0ECF1"
            />
            </svg>
            <svg
            class="cellular-connection"
            width="20"
            height="13"
            viewBox="0 0 20 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
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
  </html>  )}
