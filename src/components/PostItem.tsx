import React, { useState } from "react";
import HasImageIconBlack from "../assets/images/has-image-icon-black.png";
import HasImageIconWhite from "../assets/images/has-image-icon-white.png";

interface PostItemProps {
    post: {
        postId: number;
        title: string;
        likesCount: number;
        commentsCount: number;
        viewsCount: number;
        postImage: string;
        user: {
            nickname: string;
            profilePicture: string;
        };
    };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a href={`post-details?id=${post.postId}`} className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-700 hover:text-white w-full mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="flex p-1 gap-1.5 mb-3">
                <span className="bg-orange-500 inline-block center w-3 h-3 rounded-full"></span>
                <span className="bg-yellow-400 inline-block center w-3 h-3 rounded-full"></span>
                <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
            </div>
            <div>
                <div className="flex">
                    <div>{post.postImage && <img src={isHovered ? HasImageIconWhite : HasImageIconBlack} className="w-4 h-3.5 mr-1.5 mt-1.5" />}</div>
                    <h1 className="text-lg font-semibold">{post.title}</h1>
                </div>
                <div className="font-sm mt-2 mb-3"><small>좋아요 {post.likesCount} 댓글 {post.commentsCount} 조회수 {post.viewsCount}</small></div>
                <hr />
                <div className="flex mt-3">
                    <img src={`http://localhost:8080/uploads/${post.user.profilePicture}`} className="w-8 h-8 rounded-full object-cover" />
                    <div className="ml-3 mt-1 text-sm font-medium"><small><b>{post.user.nickname}</b></small></div>
                </div>

            </div>
        </a>
    );
}

export default PostItem;