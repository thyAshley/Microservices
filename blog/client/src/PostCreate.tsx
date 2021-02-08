import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", { title });

    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
