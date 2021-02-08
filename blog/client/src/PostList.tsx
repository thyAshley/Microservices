import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const PostList = () => {
  const { data } = useQuery<{ data: { id: string; title: string } }>(
    "posts",
    async () => await axios.get("http://localhost:4000/posts")
  );
  let posts: any = data && Object.values(data.data);

  return posts
    ? posts.map((post: { id: string; title: string }) => (
        <div
          className="card"
          style={{ width: "30%", marginBottom: "20px" }}
          key={post.id}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
          </div>
        </div>
      ))
    : null;
};

export default PostList;
