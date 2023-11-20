# COMP-3410-Final-Project
# Code Buddy Web Application

## Overview

Code Buddy is a web application designed to assist users in finding GitHub repositories similar to their code snippets and allowing other users to comment feedback and suggestions to improve you code. 

## Features

- **Code Submission**: Users can submit their code snippets via a form. Upon submission, the code is processed to extract relevant keywords for searching similar repositories on GitHub.
- **Repository Suggestions**: The application connects to the GitHub API to find repositories similar to the submitted code snippet. It displays these suggestions in its own section.
- **Comments Section**: A real-time comments section where users can post and view comments. It's implemented using Socket.io for live updates.
- **User Interface**: The UI is designed for easy use while being aesthetic with a light blue background, monospace font, and a centered layout with curved corners and shadows for containers.

## Technical Details

### Frontend

- Implemented using HTML, CSS, and JavaScript.

### Backend

- Built with Node.js, Express.js, and Socket.io.
- MongoDB is used for storing code snippets and comments.
- The `extractKeywords` function processes the submitted code snippets to extract relevant search keywords.
- The GitHub API is used to find similar repositories based on extracted keywords.

### Setup and Configuration

- Node.js and MongoDB are required for the backend.
- A GitHub API token is needed for repository search functionality.
- Run `npm install` to install dependencies.

### Running the Application

- Access the application through a web browser at `http://snehapatil.me/`.

## Future Enhancements

- Expand keyword extraction to support multiple programming languages.
- Implement user authentication for personalized experiences.

---
