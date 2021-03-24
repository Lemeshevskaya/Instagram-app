const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create first user schema
const UserSchema = new Schema({
    name: {
      type: String,
      require: true
    },
    login: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    }
});
//create collection using UserSchema
const User = mongoose.model('users', UserSchema);
module.exports = User;