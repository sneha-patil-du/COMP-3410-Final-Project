// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  codeSnippetId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Comment', commentSchema);

