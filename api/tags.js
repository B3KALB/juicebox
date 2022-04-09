const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  try {
      const {tagName} = req.params;
      const users = await getPostsByTagName(tagName);
      console.log(users)
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
      res.send(users)
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({ name, message })
    }
  });

module.exports = tagsRouter;