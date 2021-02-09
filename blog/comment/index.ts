import express from "express";
import * as crypto from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const commentsList: { [key: string]: [{}] } = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsList[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = crypto.randomBytes(6).toString("hex");
  const { content } = req.body;

  const comments = commentsList[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsList[req.params.id] = comments;
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("received event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log(`✔ Post started on port 4001`);
});
