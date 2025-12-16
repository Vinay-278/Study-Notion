//  Authentication routes

//import the required modules
const express = require("express");
const router = express.Router();

//import the required constroller and middleware function
const {
  sendotp,
  signUp,
  login,
  changePassword,
} = require("../Controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../Controllers/ResetPassword");

const { auth } = require("../Middlewares/auth");

//Routes for Login, Signup, and Aunthentication

//Route for user login
router.post("/login", login);

//Route for user sigup
router.post("/signup", signUp);

//Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

//Route for chnaging the password
router.post("/changepassword", auth, changePassword);

//Reset Password

//Routes for genrating a reset password token
router.post("/reset-password-token", resetPasswordToken);

//Routes for generating user's password after verification
router.post("/reset-password", resetPassword);

//Export the router for use in the main application
module.exports = router;
