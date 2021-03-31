const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
const router = express.Router();

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //Validation


    //Get data
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
    if (req.body.gender)
      profileFields.gender = req.body.gender;
    if (req.body.dateofbirth)
    profileFields.dateofbirth = req.body.dateofbirth;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        
        // Edit Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {

        // Create Profile

        Profile.findOne({ username: profileFields.username })
        .then((profile) => {
          if (profile) {
            errors.username = "That username already exists";
            return res.status(400).json(errors);
          }
          // Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);



//export
module.exports = router;