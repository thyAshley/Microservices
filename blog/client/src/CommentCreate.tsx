import React, { useState } from "react";
import axios from "axios";

interface CommentCreateAttribute {
  postId: string;
}

const CommentCreate: React.FC<CommentCreateAttribute> = ({ postId }) => {
  const [comment, setComment] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: comment,
    });

    setComment("");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            type="text"
            className="form-control"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
