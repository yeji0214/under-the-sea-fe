import React, { ChangeEvent, useEffect } from 'react';
import TitleImage from "../assets/images/title.png";
import { useState } from "react";
import AuthForm from '../components/AuthForm.tsx';
import useValidation from '../hooks/useValidation.tsx';

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    isValid: false,
    emailHelperText: "",
    passwordHelperText: "",
  });

  const { validateEmail, validatePassword } = useValidation();

  useEffect(() => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    setValidation((prev) => ({
      ...prev,
      emailHelperText: isEmailValid,
      passwordHelperText: isPasswordValid,
      isValid: isEmailValid === "" && isPasswordValid === "",
    }));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loginUser = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const token = await response.text();
      sessionStorage.setItem('jwtToken', token);

      setValidation((prev) => ({
        ...prev,
        passwordHelperText: "성공 !"
      }));
      // setHelperTextColor('blue');
      // setTimeout(() => {
      //   redirectToPostListPage();
      // }, 3000);
    } else {
      // setPasswordHelperText('* 이메일 또는 비밀번호를 다시 확인해주세요.');
      setValidation((prev) => ({
        ...prev,
        passwordHelperText: "이메일 또는 비밀번호를 다시 확인해주세요."
      }));
      // setHelperTextColor('red');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <div className="flex flex-col items-center">
          <img src={TitleImage} alt="Logo" className="w-36 mb-8" />
        </div>
        <AuthForm
          fields={[
            { label: "이메일", type: "text", name: "email", value: formData.email, onChange: handleInputChange, helperText: validation.emailHelperText },
            { label: "비밀번호", type: "password", name: "password", value: formData.password, onChange: handleInputChange, helperText: validation.passwordHelperText },
          ]}
          buttonText="로그인"
          onSubmit={loginUser}
          isValid={validation.isValid}
        />
      </div>
    </div>
  );
};

export default SignInPage;