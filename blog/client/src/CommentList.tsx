import React, { useEffect, useState } from "react";
import axios from "axios";

interface CommentListAttribute {
  postId: string;
}

const CommentList: React.FC<CommentListAttribute> = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const result = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(result.data);
    };
    getComments();
  }, []);

  return (
    <ul>
      {comments.map((comment: { id: string; content: string }) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
