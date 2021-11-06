const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require('body-parser');
const keys = require('./config/keys');
const app = express();
//add all routes files.
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//passport config
app.use(passport.initialize());
require('./config/passport')(passport)
//Body-parser config
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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

if (process.env.NODE_ENV ==='production') {
  app.use (express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

//changed port no. 8000 t0 9000
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server is running on port ${port}`));