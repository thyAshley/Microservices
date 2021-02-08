import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const { data } = useQuery<{ data: { id: string; title: string } }>(
    "posts",
    async () => await axios.get("http://localhost:4002/posts")
  );
  let posts: any = data && Object.values(data.data);

  return (
    <div className="flex-row flex-wrap d-flex justify-content-between">
      {posts
        ? posts.map((post: { id: string; title: string; comments: [] }) => (
            <div
              className="card"
              style={{ width: "30%", marginBottom: "20px" }}
              key={post.id}
            >
              <div className="card-body">
                <h3>{post.title}</h3>
              </div>
              <CommentList comments={post.comments} />
              <CommentCreate postId={post.id} />
            </div>
          ))
        : null}
    </div>
  );
};

export default PostList;
