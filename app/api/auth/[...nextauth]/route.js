import connectDB from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

console.log('hi')

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(connectDB()),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Page</title>
  <link rel="stylesheet" href="login.css" />
  <div className="login">
    <div className="bg">
      <div className="ellipse-623" />
    </div>
    <div className="home-indicator">
      <div className="home-indicator2" />
    </div>
    <div className="home-indicator">
      <div className="home-indicator3" />
    </div>
    <div className="frame-427320334">
      <div className="frame-427320335">
        <div className="frame-427320380">
          <div className="login-id">
            <div className="description">아이디를 입력해주세요</div>
          </div>
          <div className="login-pw">
            <div className="description">비밀번호를 입력해주세요</div>
          </div>
        </div>
      </div>
      <div className="frame-427320634">
        <div className="category-button">
          <div className="description2">로그인</div>
        </div>
        <div className="description3">회원가입</div>
      </div>
    </div>
    <div className="status-bar">
      <div className="time">
        <div className="time2">9:41</div>
      </div>
      <div className="levels">
        <svg
          className="battery"
          width={28}
          height={13}
          viewBox="0 0 28 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.35"
            x={1}
            y="0.5"
            width={24}
            height={12}
            rx="3.8"
            stroke="#F0ECF1"
          />
          <path
            opacity="0.4"
            d="M26.5 4.78125V8.85672C27.3047 8.51155 27.828 7.70859 27.828 6.81899C27.828 5.92938 27.3047 5.12642 26.5 4.78125Z"
            fill="#F0ECF1"
          />
          <rect x="2.5" y={2} width={21} height={9} rx="2.5" fill="#F0ECF1" />
        </svg>
        <svg
          className="wifi"
          width={18}
          height={13}
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.77052 3.10398C11.2576 3.10408 13.6496 4.02616 15.4521 5.67964C15.5879 5.8073 15.8048 5.80569 15.9385 5.67603L17.236 4.41257C17.3037 4.34681 17.3414 4.25773 17.3409 4.16505C17.3403 4.07237 17.3015 3.98372 17.233 3.91873C12.502 -0.455983 5.03829 -0.455983 0.307275 3.91873C0.238743 3.98368 0.199859 4.07229 0.199227 4.16497C0.198595 4.25766 0.236267 4.34676 0.303908 4.41257L1.60177 5.67603C1.73537 5.80588 1.95249 5.8075 2.08814 5.67964C3.89088 4.02606 6.28317 3.10397 8.77052 3.10398ZM8.76717 7.32425C10.1245 7.32417 11.4334 7.83591 12.4395 8.76004C12.5756 8.89119 12.7899 8.88835 12.9226 8.75363L14.2099 7.43432C14.2777 7.36512 14.3153 7.27124 14.3143 7.17369C14.3133 7.07614 14.2738 6.98306 14.2047 6.91527C11.1408 4.02442 6.3961 4.02442 3.33227 6.91527C3.26306 6.98306 3.22357 7.07619 3.22266 7.17377C3.22176 7.27135 3.2595 7.36522 3.32744 7.43432L4.61435 8.75363C4.747 8.88835 4.96136 8.89119 5.09745 8.76004C6.1029 7.83652 7.41074 7.32482 8.76717 7.32425ZM11.2916 10.1178C11.2935 10.2232 11.2565 10.3247 11.1892 10.3985L9.01249 12.8533C8.94868 12.9254 8.86169 12.966 8.77092 12.966C8.68015 12.966 8.59316 12.9254 8.52935 12.8533L6.35232 10.3985C6.28507 10.3247 6.24808 10.2231 6.25007 10.1177C6.25206 10.0124 6.29287 9.9126 6.36286 9.84199C7.75296 8.52809 9.78888 8.52809 11.179 9.84199C11.2489 9.91266 11.2897 10.0125 11.2916 10.1178Z"
            fill="#F0ECF1"
          />
        </svg>
        <svg
          className="cellular-connection"
          width={20}
          height={13}
          viewBox="0 0 20 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.7 1.68187C19.7 1.04883 19.2224 0.535645 18.6333 0.535645H17.5667C16.9776 0.535645 16.5 1.04883 16.5 1.68187V11.6158C16.5 12.2489 16.9776 12.7621 17.5667 12.7621H18.6333C19.2224 12.7621 19.7 12.2489 19.7 11.6158V1.68187ZM12.2659 2.98093H13.3326C13.9217 2.98093 14.3992 3.50643 14.3992 4.15466V11.5883C14.3992 12.2366 13.9217 12.7621 13.3326 12.7621H12.2659C11.6768 12.7621 11.1992 12.2366 11.1992 11.5883V4.15466C11.1992 3.50643 11.6768 2.98093 12.2659 2.98093ZM7.93411 5.62997H6.86745C6.27834 5.62997 5.80078 6.16216 5.80078 6.81865V11.5734C5.80078 12.2299 6.27834 12.762 6.86745 12.762H7.93411C8.52322 12.762 9.00078 12.2299 9.00078 11.5734V6.81865C9.00078 6.16216 8.52322 5.62997 7.93411 5.62997ZM2.63333 8.07527H1.56667C0.977563 8.07527 0.5 8.59985 0.5 9.24697V11.5904C0.5 12.2375 0.977563 12.7621 1.56667 12.7621H2.63333C3.22244 12.7621 3.7 12.2375 3.7 11.5904V9.24697C3.7 8.59985 3.22244 8.07527 2.63333 8.07527Z"
            fill="#F0ECF1"
          />
        </svg>
      </div>
    </div>
    <svg
      className="iceberg"
      width={32}
      height={46}
      viewBox="0 0 32 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.93189 27.9754L12.707 39.1416C14.1448 41.2064 14.8637 42.2389 15.7473 42.5809C16.5197 42.8798 17.3797 42.8572 18.1353 42.5182C18.9998 42.1303 19.6635 41.0615 20.991 38.924L28.2478 27.239C29.4343 25.3285 30.0275 24.3732 30.341 23.3747C30.8482 21.7591 30.8477 20.0268 30.3395 18.4114C30.0255 17.4131 29.4316 16.4582 28.244 14.5484L28.1121 14.3364C27.1683 12.8186 26.6964 12.0597 26.164 11.6926C25.0937 10.9546 23.6768 10.9618 22.6141 11.7107C22.0854 12.0833 21.6213 12.8469 20.693 14.3742L16.6376 7.5765C15.2443 5.24103 14.5476 4.07329 13.6427 3.67368C12.8528 3.32488 11.9534 3.32084 11.1605 3.66253C10.252 4.05399 9.54487 5.21542 8.13062 7.53827L4.48835 13.5206C2.864 16.1885 2.05183 17.5225 1.76351 18.9422C1.50866 20.1972 1.54846 21.4941 1.87977 22.731C2.25459 24.1304 3.14702 25.4121 4.93189 27.9754Z"
        fill="url(#paint0_linear_296_2309)"
      />
      <path
        d="M28.3183 14.6681H3.78979C3.88194 14.5165 3.97731 14.3598 4.07598 14.1978L8.61955 6.73511C9.87444 4.674 10.5019 3.64342 11.3056 3.29493C12.0072 2.99068 12.802 2.99432 13.5009 3.30497C14.3014 3.66081 14.9196 4.69707 16.1561 6.7696L20.6929 14.3743C21.8907 12.4036 22.4895 11.4183 23.255 11.0653C23.9724 10.7345 24.7954 10.7303 25.5161 11.0536C26.2851 11.3986 26.894 12.3776 28.1116 14.3357L28.2424 14.5461C28.2679 14.5871 28.2933 14.6278 28.3183 14.6681Z"
        fill="url(#paint1_linear_296_2309)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_296_2309"
          x1="16.0946"
          y1="0.5"
          x2="16.0946"
          y2="45.3274"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.15" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_296_2309"
          x1="11.5554"
          y1="14.4501"
          x2="11.5554"
          y2="3.65007"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
    <svg
      className="innersight"
      width={192}
      height={40}
      viewBox="0 0 192 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.67223 5.84974C1.19223 5.84974 0 4.66544 0 3.19529C0 1.72513 1.19223 0.5 2.67223 0.5C4.15224 0.5 5.30336 1.72513 5.30336 3.19529C5.30336 4.66544 4.15224 5.84974 2.67223 5.84974ZM0.657781 9.811H4.7278V29.8215H0.657781V9.811Z"
        fill="url(#paint0_linear_296_2318)"
      />
      <path
        d="M20.5258 13.2005C16.5791 13.2005 14.6057 16.4267 14.6057 20.1429V29.8215H10.5357V19.7346C10.5357 13.8948 14.0302 9.32094 20.5258 9.32094C27.1036 9.32094 30.6803 13.8948 30.6803 19.6937V29.8215H26.6102V20.1838C26.6102 16.4267 24.5547 13.2005 20.5258 13.2005Z"
        fill="url(#paint1_linear_296_2318)"
      />
      <path
        d="M45.6791 13.2005C41.7325 13.2005 39.7591 16.4267 39.7591 20.1429V29.8215H35.6891V19.7346C35.6891 13.8948 39.1836 9.32094 45.6791 9.32094C52.2569 9.32094 55.8336 13.8948 55.8336 19.6937V29.8215H51.7636V20.1838C51.7636 16.4267 49.708 13.2005 45.6791 13.2005Z"
        fill="url(#paint2_linear_296_2318)"
      />
      <path
        d="M70.2569 30.2707C64.1314 30.2707 59.568 25.8602 59.568 19.6937C59.568 13.9356 63.7202 9.23927 69.7636 9.23927C75.8481 9.23927 79.6303 13.6089 79.6303 19.2037V20.8372H63.5147C63.9669 24.2675 66.598 26.677 70.2158 26.677C72.6825 26.677 74.9025 25.6152 76.0947 23.4099L79.2192 25.0026C77.4514 28.433 74.2036 30.2707 70.2569 30.2707ZM63.6791 18.2236H75.5603C75.3959 15.0382 73.0525 12.8738 69.7225 12.8738C66.3103 12.8738 64.0902 15.2424 63.6791 18.2236Z"
        fill="url(#paint3_linear_296_2318)"
      />
      <path
        d="M87.7373 29.8215H83.6673V17.8969C83.6673 13.0372 86.4628 9.40262 91.7251 9.40262C92.9995 9.40262 94.3151 9.64764 95.3429 10.1377V14.1398C94.3562 13.5681 93.2051 13.2822 92.0951 13.2822C89.3817 13.2822 87.7373 15.1199 87.7373 18.0602V29.8215Z"
        fill="url(#paint4_linear_296_2318)"
      />
      <path
        d="M104.935 30.2707C101.194 30.2707 98.3164 28.8005 96.7541 25.8194L99.8786 24.1042C100.906 26.1052 102.551 26.8403 104.771 26.8403C107.073 26.8403 108.841 25.901 108.841 24.145C108.841 19.9387 97.2886 23.1241 97.2886 15.4874C97.2886 11.9754 100.413 9.40262 104.812 9.40262C108.553 9.40262 111.102 11.1178 112.376 13.4455L109.252 15.2016C108.389 13.4455 106.744 12.833 104.894 12.833C103.003 12.833 101.359 13.8131 101.359 15.4058C101.359 19.4895 112.911 16.5084 112.911 24.0634C112.911 27.8613 109.211 30.2707 104.935 30.2707Z"
        fill="url(#paint5_linear_296_2318)"
      />
      <path
        d="M119.828 5.84974C118.348 5.84974 117.156 4.66544 117.156 3.19529C117.156 1.72513 118.348 0.5 119.828 0.5C121.308 0.5 122.459 1.72513 122.459 3.19529C122.459 4.66544 121.308 5.84974 119.828 5.84974ZM117.814 9.811H121.884V29.8215H117.814V9.811Z"
        fill="url(#paint6_linear_296_2318)"
      />
      <path
        d="M136.777 39.5C132.419 39.5 128.802 37.6215 126.952 34.0686L130.364 32.2309C131.556 34.3953 133.776 35.7838 136.695 35.7838C140.929 35.7838 143.807 32.7618 143.807 28.0654V26.4728C142.492 28.5555 140.025 30.1073 136.654 30.1073C130.939 30.1073 126.417 25.6152 126.417 19.7346C126.417 14.0173 131.022 9.32094 137.147 9.32094C143.232 9.32094 147.877 13.8131 147.877 19.7754V28.0246C147.877 34.967 143.191 39.5 136.777 39.5ZM137.106 26.3094C140.806 26.3094 143.766 23.3691 143.766 19.6937C143.766 16.0183 140.806 13.1597 137.106 13.1597C133.447 13.1597 130.446 16.0183 130.446 19.6937C130.446 23.3691 133.447 26.3094 137.106 26.3094Z"
        fill="url(#paint7_linear_296_2318)"
      />
      <path
        d="M157.777 29.8215H153.707V0.622514H157.777V12.0571C159.34 10.3827 161.765 9.32094 164.479 9.32094C170.399 9.32094 173.729 13.2414 173.729 19.367V29.8215H169.659V19.7754C169.659 16.2225 167.685 13.1597 163.862 13.1597C160.285 13.1597 157.777 16.0183 157.777 19.8979V29.8215Z"
        fill="url(#paint8_linear_296_2318)"
      />
      <path
        d="M187.889 30.3524C182.873 30.3524 180.201 27.2079 180.201 22.634V13.323H176.213V9.811H180.201V4.62461H184.271V9.811H192V13.323H184.271V22.5115C184.271 25.1251 185.833 26.677 188.259 26.677C189.574 26.677 191.013 26.1869 192 25.4927V29.2089C190.972 29.9031 189.369 30.3524 187.889 30.3524Z"
        fill="url(#paint9_linear_296_2318)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_296_2318"
          x1={0}
          y1={20}
          x2={192}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ECF1" stopOpacity="0.6" />
          <stop offset="0.50087" stopColor="#F0ECF1" />
          <stop offset={1} stopColor="#F0ECF1" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
    <div className="div">
      <div className="div2">
        잠들 때마다 펼쳐지는 이야기 속
        <br />
        숨겨진 당신의 내면을 만나보세요
      </div>
    </div>
  </div>
</>)}
