import express from "express";
import * as crypto from "crypto";

const app = express();
app.use(express.json());

const commentsList: { [key: string]: [{}] } = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsList[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = crypto.randomBytes(6).toString("hex");
  const { content } = req.body;

  const comments = commentsList[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsList[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log(`✔ Post started on port 4001`);
});
