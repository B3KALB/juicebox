const express = require('express');
const tagsRouter = express.Router();
const { getAllTags } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/api/tags', async (req, res, next) => {
    const users = await getAllTags();
  
    res.send({
      tags: []
    });
  });


module.exports = tagsRouter;