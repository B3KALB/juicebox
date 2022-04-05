
const express = require('express');
const server = express();
const morgan = require('morgan');
const { client } = require('./db');

client.connect();
server.use(morgan('dev'));

server.use(express.json())

// stuff above here

const apiRouter = require('./api');
server.use('/api', apiRouter);
server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });
// stuff below here
const PORT = 3000;
server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
  });