import React, { useEffect } from "react";
import { PostType } from "../pages/types";
import { formatDateTime } from "../utils/formatDate.ts";

interface PostSectionProps {
    post: PostType;
    currentUserEmail: string;
}

const PostSection: React.FC<PostSectionProps> = ({ post, currentUserEmail }) => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-blue-100">
            <section className="bg-blue-200 mt-5 rounded-lg w-[450px] p-5">
                <h1 className="font-semibold text-xl mb-3">{post.title}</h1>
                <div className="flex items-center gap-2 self-start w-full mb-4 relative">
                    <div className="w-8 h-8 rounded-full object-cover bg-white"><img src={`http://localhost:8080/uploads/${post.authorProfilePicture}`} /></div>
                    <div className="author-name"><small><b>{post.authorNickname}</b></small></div>
                    <div className="post-date"><small>{formatDateTime(post.createdAt)}</small></div>
                    {post.authorEmail === currentUserEmail &&
                        <div className="absolute flex gap-2 right-2">
                            <a href="update-post?id=${post.postId}"><button className="h-[25px] rounded-md border border-[#4e9af7] bg-transparent py-0.5 px-2 text-[13px] hover:bg-[#4e9af7] hover:text-white">수정</button></a>
                            <button className="h-[25px] rounded-md border border-[#4e9af7] bg-transparent py-0.5 px-2 text-[13px] hover:bg-[#4e9af7] hover:text-white">삭제</button>
                        </div>
                    }
                </div>
                <hr className="mb-3 border-white" />
                <section className="body">
                    {post.postImage && <img src={`http://localhost:8080/uploads/${post.postImage}`} />}
                    <div className="text-[13px]">{post.postContent}</div>
                </section>
                <section className="flex justify-center font-medium">
                    <div className="text-center my-5 mx-2 bg-blue-100 w-[100px] py-2 rounded-xl">
                        <div><b>{post.viewsCount}</b></div>
                        <div><b><small>조회수</small></b></div>
                    </div>
                    <div className="text-center my-5 mx-2 bg-blue-100 w-[100px] py-2 rounded-xl">
                        <div><b>{post.commentsCount}</b></div>
                        <div><b><small>댓글</small></b></div>
                    </div>
                </section>
            </section>
            <hr className="mt-2 w-[450px] border-white"/>
            {/* <section className="comment-register-space">
                <textarea className="input-comment" placeholder="댓글을 남겨주세요!"></textarea>
                <hr />
                    <button className="comment-register-button" onclick="registerComment()">댓글 등록</button>
            </section>
            <section className="comment-list-space">
                댓글 목록이 여기에 동적으로 삽입됩니다
            </section> */}
        </div>
    );
}

export default PostSection;