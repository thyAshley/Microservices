import express from "express";
import * as crypto from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const posts: {
  [key: string]: {
    id: string;
    title: string;
  };
} = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = crypto.randomBytes(6).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("received event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log(`✔ Post started on port 4000`);
});
