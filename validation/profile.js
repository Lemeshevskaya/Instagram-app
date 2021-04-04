const Validator = require('validator');
const isEmpty = require('./is-empty');
//add module.export and call the function
module.exports = function validateProfileInput(data){
  let errors = {};
//add validations
//for username field
  if(!Validator.isLength(data.username, {min:3, max: 10})){
    errors.username = "Username must be between 3 and 10 characters";
  }
  if (isEmpty(data.username)) {
    errors.username = "Username is required";
  }
//for website
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
//for bio
  if(!Validator.isLength(data.bio, {min:5, max: 50})){
    errors.bio = "bio must be between 5 and 50 characters";
  }
  if (isEmpty(data.bio)) {
    errors.bio = "bio information is required";
  }
//for phonenumber field
  if (!isEmpty(data.phonenumber)) {
    if (!Validator.isMobilePhone(data.phonenumber)){
      errors.phonenumber = "Invalid phone number";
    }
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  }
}

