import express from "express";
import * as crypto from "crypto";

const app = express();
app.use(express.json());

const posts: {
  [key: string]: {
    id: string;
    title: string;
  };
} = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts", (req, res) => {
  const id = crypto.randomBytes(6).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log(`✔ Post started on port 4000`);
});
