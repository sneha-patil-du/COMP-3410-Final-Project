// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  codeSnippetId: mongoose.Schema.Types.ObjectId, // Reference to associated code snippet
  // Add other fields as needed, like user information, timestamps, etc.
});

module.exports = mongoose.model('Comment', commentSchema);

