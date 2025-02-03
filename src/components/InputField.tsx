import React, { ChangeEvent } from "react";
import ButtonAddProfileImage from "../assets/images/button-add-profile-image.png"

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, helperText }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 pl-1">{label}</label>
            {type === "file" ?
                <div>
                    <p className={`text-xs text-red-500 pl-1 ${helperText !== "" ? "visible" : "invisible"}`}>{helperText}</p>
                    <label htmlFor="profileImageInput" className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center cursor-pointer overflow-hidden mx-auto">
                        <img src={value || ButtonAddProfileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                    </label>
                    <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        className="hidden"
                        name={name}
                        onChange={onChange}
                    />
                </div>
                :
                <div>
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4e9af7] placeholder-transparent hover:border-[#bbd9ff]"
                        name={name}
                    />
                    <p className="text-xs text-red-500 pl-1">{helperText}</p>
                </div>
            }


        </div>
    );
};

export default InputField;