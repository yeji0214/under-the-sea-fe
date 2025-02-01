import React, { ChangeEvent, useEffect, useState } from "react";
import TitleImage from "../assets/images/title.png";
import ButtonAddProfileImage from "../assets/images/button-add-profile-image.png"

const SignUpPage: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const [profileImageHelperText, setProfileImageHelperText] = useState<string>("");
    const [emailHelperText, setEmailHelperText] = useState<string>("");
    const [passwordHelperText, setPasswordHelperText] = useState<string>("");
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState<string>("");
    const [nicknameHelperText, setNicknameHelperText] = useState<string>("");

    useEffect(() => {
        validateInputs();
    }, [imageSrc, email, password, confirmPassword, nickname]);

    const validateInputs = async () => {
        const isProfileImageValid = validateProfileImage(imageSrc);
        const isEmailValid = await validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
        const isNicknameValid = await validateNickname(nickname);

        setIsValid(isProfileImageValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isNicknameValid);
    };

    const validateProfileImage = (imageSrc: string | null) => {
        if (imageSrc === null || imageSrc === ButtonAddProfileImage) {
            setProfileImageHelperText("프로필 사진을 추가해주세요.");
            return false;
        }
        else {
            setProfileImageHelperText("");
            return true;
        }
    };

    const validateEmail = async (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(email);

        if (!result) {
            if (email === "") setEmailHelperText("이메일을 입력해주세요.");
            else if (email.includes(' ')) setEmailHelperText("공백이 포함되어 있습니다.");
            else setEmailHelperText("올바르지 않은 이메일입니다.");
        }
        else {
            try {
                const response = await fetch("http://localhost:8080/auth/users"); // 사용자 정보 fetch
                const data = await response.json();
                const existingEmail = data.find((user: { email: string; }) => user.email === email);
                if (existingEmail) {
                    setEmailHelperText("중복된 이메일입니다.");
                    return false;
                } else {
                    setEmailHelperText("");
                    return true;
                }
            } catch (error) {
                console.error("Error:", error);
                alert("회원가입 중 오류가 발생했습니다.");
                return false;
            }
        }
        return result;
    };

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
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            if (confirmPassword === "")
                setConfirmPasswordHelperText("");
            else
                setConfirmPasswordHelperText("비밀번호가 일치하지 않습니다.");
            return false;
        }
        else {
            setConfirmPasswordHelperText("");
            return true;
        }
    };

    const validateNickname = async (nickname: string) => {
        if (nickname === "") {
            setNicknameHelperText("닉네임을 입력해주세요.");
            return false;
        }
        else if (nickname.includes(' ')) {
            setNicknameHelperText("공백이 포함되어 있습니다.");
            return false;
        }
        else if (nickname.length > 10) {
            setNicknameHelperText("닉네임은 최대 10글자까지 설정 가능합니다.");
            return false;
        }
        else {
            try {
                const response = await fetch("http://localhost:8080/auth/users");// 사용자 정보 fetch
                const data = await response.json();
                const existingNickname = data.find((user: { nickname: string; }) => user.nickname === nickname);
                if (existingNickname) {
                    setNicknameHelperText("중복된 닉네임입니다.");
                    return false;
                } else {
                    setNicknameHelperText("");
                    return true;
                }
            } catch (error) {
                console.error("Error:", error);
                alert("회원가입 중 오류가 발생했습니다.");
                return false;
            }
        }
    }


    const changeProfile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
        else {
            setImageSrc(ButtonAddProfileImage);
        }
    };

    const registerUser = () => {

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
                <form className="space-y-6" onSubmit={registerUser}>
                    <div className="flex flex-col">
                        <label htmlFor="profileImageInput" className="block text-sm font-medium text-gray-700 p-2">
                            프로필 사진
                        </label>
                        <p className={`text-xs text-red-500 pl-2 ${profileImageHelperText !== "" ? "visible" : "invisible"}`}>{profileImageHelperText}</p>
                        <label htmlFor="profileImageInput" className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center cursor-pointer overflow-hidden mx-auto">
                            <img src={imageSrc || ButtonAddProfileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                        </label>
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*"
                            className="hidden"
                            onChange={changeProfile}
                        />
                    </div>
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
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 pl-1">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4e9af7] placeholder-transparent hover:border-[#bbd9ff]"
                            placeholder="cofirmPassword"
                        />
                        <p className={`text-xs text-red-500 pl-1 ${confirmPasswordHelperText !== "" ? "visible" : "invisible"}`}>{confirmPasswordHelperText}</p>
                    </div>
                    <div>
                        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 pl-1">
                            닉네임
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNickname(e.target.value)
                            }
                            className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4e9af7] placeholder-transparent hover:border-[#bbd9ff]"
                            placeholder="nickname"
                        />
                        <p className={`text-xs text-red-500 pl-1 ${nicknameHelperText !== "" ? "visible" : "invisible"}`}>{nicknameHelperText}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            disabled={!isValid}
                            type="submit"
                            className={`w-full bg-[#bbd9ff] text-gray-900 py-2 px-4 rounded-xl text-sm ${isValid ? "hover:bg-[#94c1fb]" : "cursor-not-allowed"}`}
                        >
                            회원가입
                        </button>
                        <a
                            href="sign-in"
                            className="w-full mt-4 text-sm text-center text-gray-500 hover:text-gray-700"
                        >
                            로그인하러 가기
                        </a>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default SignUpPage;
