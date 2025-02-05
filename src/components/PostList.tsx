import React from "react";
import PostItem from "./PostItem.tsx";

interface PostListProps {
    posts: any[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 flex flex-col items-center">
            {posts.map((post) => (
                <PostItem key={post.postId} post={post} />
            ))}
        </section>
    );
}

export default PostList;