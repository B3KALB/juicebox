const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, createPost } = require('../db');
const { requireUser } = require('./utils');

postsRouter.post('/', requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const postData = {authorId: req.user.id, title, content};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
     
    // add authorId, title, content to postData object
    const post = await createPost(postData);
    // this will create the post and the tags for us
    if (post.length !== 0){
      res.send({ post });
    } else {
    // if the post comes back, res.send({ post });
    next(error)}
    // otherwise, next an appropriate error object 
  } catch ({ name, message }) {
    next({ name, message });
  }
});


postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next(); // THIS IS DIFFERENT
});

postsRouter.get('/', async (req, res, next) => {
    const users = await getAllPosts();
  
    res.send({
      users
    });
  });


module.exports = postsRouter;