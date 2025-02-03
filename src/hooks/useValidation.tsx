import { useState } from "react";

const useValidation = () => {
    
    const validateProfileImage = (imageSrc: string, defaultImage: string) => {
        if (imageSrc === "" || imageSrc === defaultImage) {
            return "프로필 사진을 추가해주세요.";
        }
        else {
            return "";
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(email);

        if (!result) {
            if (email === "") return "이메일을 입력해주세요.";
            else if (email.includes(' ')) return "공백이 포함되어 있습니다.";
            else return "올바르지 않은 이메일입니다.";
        }

        return "";
    }

    const validateNewEmail = async (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(email);

        if (!result) {
            if (email === "") return "이메일을 입력해주세요.";
            else if (email.includes(' ')) return "공백이 포함되어 있습니다.";
            else return "올바르지 않은 이메일입니다.";
        }

        else {
            try {
                const response = await fetch("http://localhost:8080/auth/users");// 사용자 정보 fetch
                const data = await response.json();
                const existingEmail = data.find((user: { email: string; }) => user.email === email);
                if (existingEmail) {
                    return "중복된 이메일입니다.";
                } else {
                    return "";
                }
            } catch (error) {
                console.error("Error:", error);
                // alert("회원가입 중 오류가 발생했습니다.");
                return "회원가입 중 오류가 발생했습니다.";
            }
        }
    }

    const validatePassword = (password: string) => {
        // 정규식: 영어 + 숫자 조합 5글자 이상
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;<>,.?/~\\|-]{5,}$/;
        const result = passwordRegex.test(password);

        if (password === "") return "비밀번호를 입력해주세요.";
        else if (password.length < 5) return "비밀번호는 5글자 이상이어야 합니다.";
        else if (password.includes(' ')) return "공백이 포함되어 있습니다.";
        else if (!result) return "비밀번호는 영어 + 숫자 조합이어야 합니다.";

        return "";
    }

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            if (confirmPassword === "")
                return "비밀번호를 다시 한 번 입력해주세요.";
            else
                return "비밀번호가 일치하지 않습니다.";
        }
        else {
            return "";
        }
    };

    const validateNickname = async (nickname: string) => {
        if (nickname === "") {
            return "닉네임을 입력해주세요.";
        }
        else if (nickname.includes(' ')) {
            return "공백이 포함되어 있습니다.";
        }
        else if (nickname.length > 10) {
            return "닉네임은 최대 10글자까지 설정 가능합니다.";
        }
        else {
            try {
                const response = await fetch("http://localhost:8080/auth/users");// 사용자 정보 fetch
                const data = await response.json();
                const existingNickname = data.find((user: { nickname: string; }) => user.nickname === nickname);
                if (existingNickname) {
                    return "중복된 닉네임입니다.";
                } else {
                    return "";
                }
            } catch (error) {
                console.error("Error:", error);
                // alert("회원가입 중 오류가 발생했습니다.");
                return "회원가입 중 오류가 발생했습니다.";
            }
        }
    }

    return { validateProfileImage, validateEmail, validateNewEmail, validatePassword, validateConfirmPassword, validateNickname };
};

export default useValidation;
