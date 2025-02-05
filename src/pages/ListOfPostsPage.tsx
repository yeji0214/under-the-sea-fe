import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import Header from "../components/Header.tsx";
import PostList from "../components/PostList.tsx";

const ListOfPosts: React.FC = () => {
    const { token, logout } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!token) {
            window.location.href = '/sign-in';
            return;
        }

        fetch('http://localhost:8080/posts', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, [token]);

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header onLogout={logout} />
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-xl text-center mb-5">
                    안녕하세요, <br /> Under The Sea 게시판입니다.
                </h1>
                <div className="flex justify-end">
                    <a href="/create-post">
                        <button className="bg-[#7fb3f3] text-white px-4 py-1 mb-5 rounded-xl hover:bg-[#4e9af7]">
                            게시글 작성
                        </button>
                    </a>
                </div>
                <PostList posts={posts} />
            </div>
        </div>
    );
}

export default ListOfPosts;