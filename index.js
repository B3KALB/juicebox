require('dotenv').config();
// EVERYTHING ELSE
const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { client } = require('./db');
const jwt = require('jsonwebtoken');


const token = jwt.sign({ id: 3, username: 'joshua' }, 'server secret');
token; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2h1YSIsImlhdCI6MTU4ODAyNDQwNn0.sKuQjJRrTjmr0RiDqEPJQcTliB9oMACbJmoymkjph3Q'
const recoveredData = jwt.verify(token, 'server secret');
recoveredData; // { id: 3, username: 'joshua', iat: 1588024406 }
// wait 1 hour:
jwt.verify(token, 'server secret');
// Uncaught TokenExpiredError: jwt expired {
//   name: 'TokenExpiredError',
//   message: 'jwt expired',
//   expiredAt: 2020-04-27T21:58:57.000Z
// }

client.connect();
server.use(morgan('dev'));
server.use(bodyParser.json())
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