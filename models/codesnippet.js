// models/CodeSnippet.js
const mongoose = require('mongoose');

const codeSnippetSchema = new mongoose.Schema({
  content: String,
});

module.exports = mongoose.model('CodeSnippet', codeSnippetSchema);