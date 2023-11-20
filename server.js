const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser'); 

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const server = http.createServer(app);
const io = socketIo(server); 

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use(express.static('public'));

// basic route for homepage
app.get('/', (req, res) => {
  res.render('index'); 
});

// MongoDB setup and connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true, useUnifiedTopology: true });

// import models
const CodeSnippet = require('./models/codesnippet');
const Comment = require('./models/comments');

// handle a connection request from web clients
io.on('connection', (socket) => {
  // Handle comment event
  socket.on('comment', async (data) => {
    // make sure 'data' contains 'comment' and 'snippetId'
    const newComment = new Comment({ content: data.comment, codeSnippetId: data.snippetId });
    await newComment.save();
    io.emit('comment', newComment.content);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

function extractKeywords(codeSnippet, language) {
  const keyTerms = [];

  if (language === 'Python') {
    // use regex to find function and class names
    const regex = /def\s+(\w+)|class\s+(\w+)/g;
    const matches = codeSnippet.matchAll(regex);

    for (const match of matches) {
      keyTerms.push(match[1] || match[2]);
    }
  }

  // exclude common words and limit the number of keywords
  const excludedTerms = ['function', 'return', 'class', 'def', 'var']; // add more common terms
  const filteredTerms = keyTerms.filter(term => !excludedTerms.includes(term)).slice(0, 10); // limit to 10 keywords

  return filteredTerms.length > 0 ? filteredTerms : ['default', 'keyword']; // fallback keywords if empty
}

app.post('/submit-code', async (req, res) => {
  try {
    const newSnippet = new CodeSnippet({ content: req.body.codeSnippet });
    await newSnippet.save();

    // extract keywords 
    const keywords = extractKeywords(newSnippet.content, 'Python');
    console.log("Extracted Keywords:", keywords);

    // check if keywords array is empty
    if (keywords.length === 0) {
      // send a response back to the client indicating no keywords found
      return res.status(200).json({ message: "No relevant keywords found in the submitted code." });
    }
    const similarRepos = await searchGitHubRepos(keywords);
    res.status(200).json({ message: "Code submitted successfully", similarRepos });
  } catch (error) {
    res.status(500).json({ message: "Error submitting code" });
  }
});

const fs = require('fs');

let config;
try {
  const configFile = fs.readFileSync('./config.json', 'utf8');
  config = JSON.parse(configFile);
} catch (error) {
  console.error('Error reading config file:', error);
}

const axios = require('axios');

async function searchGitHubRepos(keywords) {
  try {
    console.log("GitHub Search Keywords:", keywords.join('+')); // logging the search query
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: keywords.join('+'),
        sort: 'stars',
      },
      headers: {
        'Authorization': `token ${config.GITHUB_TOKEN}` 
      }
    });
    console.log("GitHub API Response:", response.data);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching from GitHub API:', error);
    return [];
  }
}

// Use server to listen instead of app
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
