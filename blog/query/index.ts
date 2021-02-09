import express from "express";
import cors from "cors";

interface CommentAttribute {
  id: string;
  content: string;
  status: string;
}

interface postsAttribute {
  id: string;
  title: string;
  comments?: CommentAttribute[];
}
const app = express();
app.use(cors());
app.use(express.json());

const posts: { [key: string]: postsAttribute } = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments!.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post?.comments?.find((c) => c.id === id);

    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }
  res.status(200).send({});
});

app.listen(4002, () => {
  console.log("query listener start on port 4002");
});
