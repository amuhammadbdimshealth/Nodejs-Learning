const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const User = require("../models/user");
const { signupValidators, loginValidators } = require("../validators/auth");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/login", loginValidators, authController.postLogin);
router.post("/logout", authController.postLogout);
router.post("/signup", signupValidators, authController.postSignup);
router.get("/reset", authController.getResetPassword);
router.post("/reset", authController.postResetPassword);
router.get("/new-password/:resetToken", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
