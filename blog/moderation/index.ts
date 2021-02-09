import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status: status,
      },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log(`moderation service running on port 4003`);
});
