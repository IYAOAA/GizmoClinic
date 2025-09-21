const mongoose = require('mongoose');
const Post = require('./models/Post');

// connect to MongoDB Atlas
mongoose.connect('mongodb+srv://<user>:<password>@cluster.mongodb.net/gizmoclinic');

(async () => {
  await Post.create({
    title: 'How to Stop Windows Auto Update in 2 Minutes',
    excerpt: 'Quick guide to disable automatic Windows updates.',
    content: '<p>Full HTML article goes here. Step-by-step instructions…</p>',
    tags: ['Windows', 'Update'],
    image: '/img/windows.jpg'
  });
  console.log('Seed complete');
  mongoose.connection.close();
})();
