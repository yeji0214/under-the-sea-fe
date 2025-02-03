import React, { ChangeEvent, FormEvent } from "react";
import InputField from "./InputField.tsx";

interface AuthFormProps {
    fields: { label: string; type: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; helperText?: string }[];
    buttonText: string;
    onSubmit: (e: FormEvent) => void;
    isValid: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ fields, buttonText, onSubmit, isValid }) => {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            {fields.map((field, index) => (
                <InputField key={index} {...field} />
            ))}
            <button
                disabled={!isValid}
                type="submit"
                className={`w-full bg-[#bbd9ff] text-gray-900 py-2 px-4 rounded-xl text-sm ${isValid ? "hover:bg-[#94c1fb]" : "cursor-not-allowed"}`}
            >
                {buttonText}
            </button>
            <a
                href={buttonText === "로그인" ? "sign-up" : "sign-in"}
                className="w-full mt-2 text-sm flex flex-col items-center text-gray-500 hover:text-gray-700"
            >
                {buttonText === "로그인" ? "회원가입" : "로그인하러 가기"}
            </a>
        </form>
    );
};

export default AuthForm;