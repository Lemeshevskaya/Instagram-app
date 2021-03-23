const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
//add all routes files.
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//Db config
const db = keys.mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err))

//First route
app.get('/', (req, res) => res.send('Hello'));
//defining own routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));