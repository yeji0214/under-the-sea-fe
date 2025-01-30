import React, { ChangeEvent, useEffect } from 'react';
import TitleImage from "../assets/images/title.png";
import { useState } from "react";

interface SignInPageProps {
  onFindIdClick?: () => void;
  onUpdatePasswordClick?: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onFindIdClick, onUpdatePasswordClick }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  useEffect(() => {
    validateInputs();
  }, [email, password]);

  // 유효성 검사
  const validateInputs = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setIsValid(isEmailValid && isPasswordValid);
  }

  // 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailRegex.test(email);

    if (!result) {
      if (email === "") setEmailHelperText("이메일을 입력해주세요.");
      else if (email.includes(' ')) setEmailHelperText("공백이 포함되어 있습니다.");
      else setEmailHelperText("올바르지 않은 이메일입니다.");
    }
    else setEmailHelperText("");

    return result;
  }

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    // 정규식: 영어 + 숫자 조합 5글자 이상
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const result = passwordRegex.test(password);

    if (password === "") setPasswordHelperText("비밀번호를 입력해주세요.");
    else if (password.length < 5) setPasswordHelperText("비밀번호는 5글자 이상이어야 합니다.");
    else if (password.includes(' ')) setPasswordHelperText("공백이 포함되어 있습니다.");
    else if (!result) setPasswordHelperText("비밀번호는 영어 + 숫자 조합이어야 합니다.");
    else setPasswordHelperText("");

    return result;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <div className="flex flex-col items-center">
          <img
            src={TitleImage}
            alt="Logo"
            className="w-36 mb-8"
          />
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 pl-1">
              이메일
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4e9af7] placeholder-transparent hover:border-[#bbd9ff]"
              placeholder="email"
            />
            <p className={`text-xs text-red-500 pl-1 ${emailHelperText !== "" ? "visible" : "invisible"}`}>{emailHelperText}</p>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 pl-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4e9af7] placeholder-transparent hover:border-[#bbd9ff]"
              placeholder="password"
            />
            <p className={`text-xs text-red-500 pl-1 ${passwordHelperText !== "" ? "visible" : "invisible"}`}>{passwordHelperText}</p>
          </div>
          <div className="flex flex-col items-center">
            <button
              disabled={!isValid}
              type="submit"
              className={`w-full bg-[#bbd9ff] text-gray-900 py-2 px-4 rounded-xl text-sm ${isValid ? "hover:bg-[#94c1fb]" : "cursor-not-allowed"}`}
            >
              로그인
            </button>
            <a
              href="#"
              onClick={onUpdatePasswordClick}
              className="w-full mt-4 text-sm text-center text-gray-500 hover:text-gray-700"
            >
              회원가입
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;





// import TitleImage from "../assets/images/title.png";
// import BubblesImage from "../assets/images/bubbles.png";
// import FishImage from "../assets/images/fish.png";
// import TurtleImage from "../assets/images/turtle.png";

// const SignInPage = () => {
//     return (
//         <div className="flex justify-center items-center h-screen bg-cover" style={{ backgroundImage: url('../assets/images/blue_background.avif') }}>
//             <div className="w-[30%] h-full p-4 bg-white bg-opacity-70 rounded-lg shadow-md">
//                 <header className="flex justify-center mb-4">
//                     <img src={TitleImage} className="w-36" alt="title-image" />
//                 </header>
//                 {/* <section className="flex flex-col justify-center items-center h-full"> */}
//                 <section className="flex flex-col justify-center items-center h-full w-full">
//                     <h1 className="text-center text-2xl font-bold mb-6 flex items-center justify-center gap-2">
//                         <img src={BubblesImage} className="w-8 h-8" alt="img-bubbles" />
//                         로그인
//                         <img src={BubblesImage} className="w-8 h-8" alt="img-bubbles" />
//                     </h1>
//                     <form id="login-form" action="/login" method="post">
//                         <div className="mb-4">
//                             <label className="flex items-center gap-2 text-sm font-bold mb-2">
//                                 <img src={FishImage} className="w-6 h-6" alt="img-fish" />
//                                 이메일
//                                 <img src={FishImage} className="w-6 h-6" alt="img-fish" />
//                             </label>
//                             <input
//                                 id="email-input"
//                                 type="text"
//                                 className="w-full h-8 px-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//                                 placeholder="이메일을 입력하세요"
//                                 name="email"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="flex items-center gap-2 text-sm font-bold mb-2">
//                                 <img src={TurtleImage} className="w-6 h-6" alt="img-turtle" />
//                                 비밀번호
//                                 <img src={TurtleImage} className="w-6 h-6" alt="img-turtle" />
//                             </label>
//                             <input
//                                 id="password-input"
//                                 type="password"
//                                 className="w-full h-8 px-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
//                                 placeholder="비밀번호를 입력하세요"
//                                 name="password"
//                             />
//                         </div>
//                         <small id="helper-text" className="text-red-500 hidden">
//                             * helper text
//                         </small>
//                         <button
//                             id="login-button"
//                             type="submit"
//                             disabled
//                             className="w-full h-10 bg-blue-400 text-white rounded-md mt-4 cursor-not-allowed opacity-50"
//                         >
//                             로그인
//                         </button>
//                         <a href="sign-up" className="block mt-4 text-center text-sm text-blue-600 hover:underline">
//                             회원가입
//                         </a>
//                     </form>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default SignInPage;