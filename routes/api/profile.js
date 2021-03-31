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
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
   //find profile and grab the name and avatar from user collection by id
    Profile.findOne({ user: req.user.id })
    //.populate command will add more information from reference
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);
// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
//.find() will find and fetch all the profiles 
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      //display all profiles
      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
  });

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
  router.get("/user/:user_id", (req, res) => {
  const errors = {};
  //pull the profile based on user_id.
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      //display profile
      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "There is no profile for this user" })
    )
})

// @route   GET api/profile/username/:username
// @desc    Get profile by handle
// @access  Public
  router.get("/username/:username", (req, res) => {
  const errors = {};
  //find the profile based on the value stored in the handle variable.
  Profile.findOne({ username: req.params.username })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
    //display profile
      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
  });



// @route   POST api/profile
// @desc    create or edit users profile
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
      //search if profile exsist
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
    })
  }
)
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      )
    })
  }
)
//export
module.exports = router;