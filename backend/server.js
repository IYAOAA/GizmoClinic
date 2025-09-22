const express = require('express');
const cors = require('cors');
const posts = require('./posts.json');

const app = express();
app.use(cors());

// GET posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
