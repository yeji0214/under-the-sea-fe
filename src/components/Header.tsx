import React, { useEffect, useState } from "react";
import TitleImage from "../assets/images/title.png";
import DefaultProfileImage from "../assets/images/profile-image.png";
import DropdownMenu from "./DropdownMenu.tsx";

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const [profileImage, setProfileImage] = useState(DefaultProfileImage);

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');

        fetch('http://localhost:8080/users/get-profile-image', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
            .then(response => response.json())
            .then((data) => {
                if (data.profileImagePath) {
                    setProfileImage(`http://localhost:8080/uploads/${data.profileImagePath}`);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <header className="relative flex justify-center items-center p-4 bg-white shadow-sm">
            <img src={TitleImage} alt="Logo" className="w-36" />
            <div className="absolute right-4">
                <DropdownMenu profileImage={profileImage} onLogout={onLogout}/>
            </div>
        </header>
    );
}

export default Header;