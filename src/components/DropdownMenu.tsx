import React, { useEffect, useRef, useState } from "react";

interface DropdownMenuProps {
    profileImage: string;
    onLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ profileImage, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative">
            <img src={profileImage} className="w-10 h-10 rounded-full" onClick={() => setIsOpen(!isOpen)} />
            {isOpen &&
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <label
                        className="font-medium h-14 relative hover:bg-zinc-100 flex items-center text-center px-3 gap-3 rounded-lg"
                    >
                        <button className="mx-auto">회원정보수정</button>
                    </label>
                    <label
                        className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg"
                    >
                        <button className="mx-auto">비밀번호수정</button>
                    </label>
                    <p className="border-b-2 border-gray-200"></p>
                    <label
                        className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg"
                    >
                        <button className="mx-auto">로그아웃</button>
                    </label>
                </div>

            }
        </div>
    );
}

export default DropdownMenu;