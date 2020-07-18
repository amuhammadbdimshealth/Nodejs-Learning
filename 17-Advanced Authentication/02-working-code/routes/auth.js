const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth')

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.post("/signup", authController.postSignup);
router.get("/reset",authController.getResetPassword);
router.post("/reset",authController.postResetPassword);
router.get("/new-password/:resetToken", authController.getNewPassword);
router.post("/new-password",authController.postNewPassword);


module.exports = router;