const express = require('express');
const usersRouter = express.Router();
const { getAllUsers } = require('../db');

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next(); // THIS IS DIFFERENT
});

usersRouter.get('/', async (req, res, next) => {
    const users = await getAllUsers();
  //router will not end without "res.send"
  //make it the last thing in the route
    res.send({
      users
    });
  });


module.exports = usersRouter;