import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem.tsx";

interface CommentSectionProps {
    comments: any[];
    currentUserEmail: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, currentUserEmail }) => {
    const [editingComment, setEditingComment] = useState("");

    useEffect(() => {

    }, )

    const handleEditComment = (content: string) => {
        setEditingComment(content);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditingComment(e.target.value);
    }

    return (
        <div>
            <section className="bg-white mb-5 w-[450px] h-[130px] rounded-md relative">
                <textarea value={editingComment} className="w-full outline-none p-3 h-[80px] rounded-md text-sm" placeholder="댓글을 남겨주세요!" onChange={handleChange}></textarea>
                <hr />
                <button className="bg-[#7fb3f3] h-[27px] border-none rounded-lg my-2 px-5 text-[14px] absolute right-3 text-white">댓글 등록</button>
            </section>
            <section className="flex flex-col h-[30px]">
                {comments.map((comment) => (
                    <CommentItem key={comment.commentId} comment={comment} currentUserEmail={currentUserEmail} onEdit={handleEditComment}/>
                ))}
            </section>
        </div>
    );
}

export default CommentSection;