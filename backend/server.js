// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // allow frontend to call API

// Temporary demo posts
const posts = [
  {
    id: 1,
    title: 'How to Stop Windows Auto Update in 2 Minutes',
    excerpt: 'Quick steps to stop Windows from updating automatically.',
    content: `<p>Windows updates can interrupt your work. Here’s how to pause or stop them in two minutes:</p>
              <ol>
                <li>Press <strong>Win + R</strong>, type <code>services.msc</code> and hit Enter.</li>
                <li>Find “Windows Update” in the list, double-click it.</li>
                <li>Change “Startup type” to <strong>Disabled</strong> and click <strong>Stop</strong>.</li>
                <li>Click <strong>Apply</strong> then <strong>OK</strong>.</li>
              </ol>
              <p>Done — no more surprise updates.</p>`,
    image: 'https://via.placeholder.com/600x300.png?text=Windows+Update+Fix',
    date: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Speed Up Your Old Laptop in 5 Easy Steps',
    excerpt: 'Five quick changes that give old laptops a new life.',
    content: '<p>Full tutorial here...</p>',
    image: 'https://via.placeholder.com/600x300.png?text=Laptop+Speed',
    date: new Date().toISOString()
  }
];

// List posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Single post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
