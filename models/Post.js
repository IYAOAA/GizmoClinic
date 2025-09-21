const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  image: String
});

module.exports = mongoose.model('Post', postSchema);
