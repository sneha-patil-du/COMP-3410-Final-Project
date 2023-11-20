// models/CodeSnippet.js
const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  content: String,
  // Add other relevant fields as needed
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);