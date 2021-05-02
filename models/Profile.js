const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//reference to users collection and create new collection profile
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
    type: String,
    require: true
  },
  phonenumber: {
    type: String
  },
  gender:{
    type: String
  },
  dateofbirth:{
    type: String
  },
 //schema for followers and following.
  following: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      username: {
        type: String
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile",
      }
    }
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      username: {
        type: String
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile",
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  } 
});


const Profile = mongoose.model
('profile', ProfileSchema);
module.exports = Profile;