import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const __dirname = path.resolve();
const postsFile = path.join(__dirname, "data", "posts.json");

// middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// get all posts
app.get("/api/posts", (req, res) => {
  fs.readFile(postsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read posts" });
    res.json(JSON.parse(data));
  });
});

// add new post
app.post("/api/posts", (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Title & content required" });

  fs.readFile(postsFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read posts" });
    let posts = JSON.parse(data);
    const slug = title.toLowerCase().replace(/ /g, "-");
    const newPost = {
      id: Date.now(),
      title,
      content,
      image: image || "",
      slug,
      date: new Date().toISOString()
    };
    posts.unshift(newPost);
    fs.writeFile(postsFile, JSON.stringify(posts, null, 2), err => {
      if (err) return res.status(500).json({ error: "Could not save post" });
      res.json(newPost);
    });
  });
});

// single post page
app.get("/post/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "post.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));
