import React, { ChangeEvent, useEffect, useState } from "react";
import TitleImage from "../assets/images/title.png";
import ButtonAddProfileImage from "../assets/images/button-add-profile-image.png"
import AuthForm from '../components/AuthForm.tsx';
import useValidation from "../hooks/useValidation.tsx";

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        file: undefined as File | undefined,
        imageSrc: "",
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    });

    const [validation, setValidation] = useState({
        isValid: false,
        profileImageHelperText: "",
        emailHelperText: "",
        passwordHelperText: "",
        confirmPasswordHelperText: "",
        nicknameHelperText: "",
    });

    const { validateProfileImage, validateNewEmail, validatePassword, validateConfirmPassword, validateNickname } = useValidation();

    useEffect(() => {
        const validate = async () => {
            await validateInputs();
        };
        validate();
    }, [formData]);

    // ✅ 입력값 변경 핸들러 (텍스트 입력)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ 파일 입력 핸들러 (파일 업로드)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        setFormData(prev => ({
            ...prev,
            file: selectedFile,
            imageSrc: selectedFile ? URL.createObjectURL(selectedFile) : ButtonAddProfileImage,
        }));
    };

    const validateInputs = async () => {
        const isProfileImageValid = validateProfileImage(formData.imageSrc, ButtonAddProfileImage);
        const isEmailValid = await validateNewEmail(formData.email);
        const isPasswordValid = validatePassword(formData.password);
        const isConfirmPasswordValid = validateConfirmPassword(formData.password, formData.confirmPassword);
        const isNicknameValid = await validateNickname(formData.nickname);

        setValidation((prev) => ({
            ...prev,
            profileImageHelperText: isProfileImageValid,
            emailHelperText: isEmailValid,
            passwordHelperText: isPasswordValid,
            confirmPasswordHelperText: isConfirmPasswordValid,
            nicknameHelperText: isNicknameValid,
            isValid: isProfileImageValid === "" && isEmailValid === "" && isPasswordValid === "" && isConfirmPasswordValid === "" && isNicknameValid === ""
        }));
    };

    const registerUser = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // FormData 준비
        const formDataToTransfer = new FormData();
        formDataToTransfer.append('email', formData.email);
        formDataToTransfer.append('password', formData.password);
        formDataToTransfer.append('confirmPassword', formData.confirmPassword); // 추가
        formDataToTransfer.append('nickname', formData.nickname);
        if (formData.file) {
            formDataToTransfer.append('profilePicture', formData.file);
        }

        try {
            // 서버로 회원가입 요청
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                body: formDataToTransfer,
            });

            if (response.ok) {
                alert('회원가입이 완료되었습니다!');
                window.location.href = '/sign-in';
            } else {
                const errorData = await response.json();
                alert(`회원가입 실패: ${errorData.message}`);
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
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
                <AuthForm
                    fields={[
                        { label: "프로필 사진", type: "file", name: "profileImage", value: formData.imageSrc, onChange: handleFileChange, helperText: validation.profileImageHelperText },
                        { label: "이메일", type: "text", name: "email", value: formData.email, onChange: handleInputChange, helperText: validation.emailHelperText },
                        { label: "비밀번호", type: "password", name: "password", value: formData.password, onChange: handleInputChange, helperText: validation.passwordHelperText },
                        { label: "비밀번호 확인", type: "password", name: "confirmPassword", value: formData.confirmPassword, onChange: handleInputChange, helperText: validation.confirmPasswordHelperText },
                        { label: "닉네임", type: "text", name: "nickname", value: formData.nickname, onChange: handleInputChange, helperText: validation.nicknameHelperText },
                    ]}
                    buttonText="회원가입"
                    onSubmit={registerUser}
                    isValid={validation.isValid}
                />
            </div>
        </div>
    );
};

export default SignUpPage;
