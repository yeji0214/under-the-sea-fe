import React from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import Header from "../components/Header.tsx";

const ListOfPosts: React.FC = () => {
    const {token, logout} = useAuth();
    return (
        <div className="h-screen bg-blue-100">
            <Header onLogout={logout}/>
        </div>
    );
}

export default ListOfPosts;