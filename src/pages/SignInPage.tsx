import React, { ChangeEvent, useEffect } from 'react';
import TitleImage from "../assets/images/title.png";
import { useState } from "react";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");
  const [helperTextColor, setHelperTextColor] = useState<string>('red');

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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;<>,.?/~\\|-]{5,}$/;
    const result = passwordRegex.test(password);

    if (password === "") setPasswordHelperText("비밀번호를 입력해주세요.");
    else if (password.length < 5) setPasswordHelperText("비밀번호는 5글자 이상이어야 합니다.");
    else if (password.includes(' ')) setPasswordHelperText("공백이 포함되어 있습니다.");
    else if (!result) setPasswordHelperText("비밀번호는 영어 + 숫자 조합이어야 합니다.");
    else setPasswordHelperText("");

    return result;
  }

  const loginUser = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const token = await response.text();
      sessionStorage.setItem('jwtToken', token);

      setPasswordHelperText('* 성공');
      setHelperTextColor('blue');
      // setTimeout(() => {
      //   redirectToPostListPage();
      // }, 3000);
    } else {
      setPasswordHelperText('* 이메일 또는 비밀번호를 다시 확인해주세요.');
      setHelperTextColor('red');
    }
  };

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
        <form className="space-y-6" onSubmit={loginUser}>
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
            <p className={`text-xs ${helperTextColor === "blue" ? "text-blue-500" : "text-red-500"} pl-1 ${passwordHelperText !== "" ? "visible" : "invisible"}`}>{passwordHelperText}</p>
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
              href="sign-up"
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