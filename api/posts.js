const express = require('express');
const postsRouter = express.Router();
const { getAllPosts } = require('../db');

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next(); // THIS IS DIFFERENT
});

postsRouter.get('/api/posts', async (req, res, next) => {
    const users = await getAllPosts();
  
    res.send({
      posts: []
    });
  });


module.exports = postsRouter;