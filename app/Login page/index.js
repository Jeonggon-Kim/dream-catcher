// pages/index.js
import LoginComponent from '../components/LoginComponent';
import StatusBar from '../components/StatusBar';

export default function Home() {
  return (
    <div>
      <StatusBar time="9:41" />
      <LoginComponent 
        placeholderID="아이디를 입력해주세요" 
        placeholderPW="비밀번호를 입력해주세요" 
        buttonText="로그인"
        signupText="회원가입"
      />
    </div>
  );
}
