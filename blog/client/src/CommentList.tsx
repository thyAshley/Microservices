import React from "react";

interface CommentListAttribute {
  comments: {
    id: string;
    content: string;
  }[];
}

const CommentList: React.FC<CommentListAttribute> = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
