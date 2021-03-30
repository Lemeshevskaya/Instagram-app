const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    require: true
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  phonenumber: {
    type: String
  },
  gender:{
    type: String
  },
  dateofbirth:{
    type: Date
  }

});

const Profile = mongoose.model
('profile', ProfileSchema);
module.exports = Profile;