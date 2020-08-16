const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')
const { body } = require('express-validator');

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.post("/signup", [
  
  // email, password, confirmPassword
  // email must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })

], authController.postSignup);
router.get("/reset",authController.getResetPassword);
router.post("/reset",authController.postResetPassword);
router.get("/new-password/:resetToken", authController.getNewPassword);
router.post("/new-password",authController.postNewPassword);


module.exports = router;