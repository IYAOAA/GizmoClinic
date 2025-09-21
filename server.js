const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const app = express();

// connect to MongoDB Atlas (replace with your own connection string)
mongoose.connect('mongodb+srv://<user>:<password>@cluster.mongodb.net/gizmoclinic');

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home/listing page
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.render('index', { posts });
});

// Single post page
app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('post', { post });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
