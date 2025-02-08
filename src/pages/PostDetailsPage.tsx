import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import Header from "../components/Header.tsx";
import PostSection from "../components/PostSection.tsx";
import { PostType } from "./types.ts";

const PostDetailsPage: React.FC = () => {
    const { token, logout } = useAuth();
    const [post, setPost] = useState<PostType | null>(null);
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    useEffect(() => {
        const postId = getPostIdFromUrl();
        if (!postId) return; // postId가 없는 경우 fetch 실행 방지

        // 게시글 정보 가져오기
        fetch(`http://localhost:8080/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(post => setPost(post))
            .catch(error => console.error('Error fetching post details:', error));

        // 현재 로그인한 사용자 정보 가져오기
        fetch('http://localhost:8080/auth/user-info', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setCurrentUserEmail(data.email))
            .catch(error => console.error("Error fetching logged-in user's email:", error));
    }, []);

    const getPostIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

return (
    <div>
        <Header onLogout={logout} />
        {post ? <PostSection post={post} currentUserEmail={currentUserEmail}/> : <p>Loading...</p>}
    </div>
);
}

export default PostDetailsPage;
