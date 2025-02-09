import React from "react";
import { formatDateTime } from "../utils/formatDate.ts";

interface CommentItemProps {
    comment: {
        authorEmail: string;
        authorNickname: string;
        authorProfilePicture: string;
        content: string;
        createdAt: string;
    }
    currentUserEmail: string;
    onEdit: (content: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, currentUserEmail, onEdit }) => {

    return (
        <div>
            <section className="flex relative">
                <img src={`http://localhost:8080/uploads/${comment.authorProfilePicture}`} className="rounded-full w-7 h-7 object-cover" />
                <div className="ml-3"><small><b>{comment.authorNickname}</b></small></div>
                <div className="ml-4"><small>{formatDateTime(comment.createdAt)}</small></div>
                {comment.authorEmail === currentUserEmail &&
                    <div className="absolute flex gap-2 right-2">
                        <button className="h-[25px] rounded-md border border-[#4e9af7] bg-transparent py-0.5 px-2 text-[13px] hover:bg-[#4e9af7] hover:text-white" onClick={() => onEdit(comment.content)}>수정</button>
                        <button className="h-[25px] rounded-md border border-[#4e9af7] bg-transparent py-0.5 px-2 text-[13px] hover:bg-[#4e9af7] hover:text-white">삭제</button>
                    </div>
                }
            </section>
            <section className="ml-10 mb-5 mt-1">
                <div><small>{comment.content}</small></div>
            </section>
        </div>
    );
}

export default CommentItem;