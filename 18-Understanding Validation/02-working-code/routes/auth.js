const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { body } = require("express-validator");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.post(
  "/signup",
  [
    // email, password, confirmPassword
    // email must be an email
    body(
      "email",
      "Field - The password can only have letters - - @Express validator"
    )
      .isEmail()
      .withMessage("Please enter a valid email address - @Express validator")
      .custom((value, { req }) => {
        if (value === "testC@gmail.com") {
          throw new Error(
            "Bad email address. Try sth else - @Express validator"
          );
        }
        return true;
      })
      .isAlphanumeric(),
    // password must be at least 5 chars long
    body("password")
      .isLength({ min: 5 })
      .withMessage(
        "Password length must be greater than 5 characters - @Express validator"
      ),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Passwords must match - @Express validator");
      return true;
    }),
  ],
  authController.postSignup
);
router.get("/reset", authController.getResetPassword);
router.post("/reset", authController.postResetPassword);
router.get("/new-password/:resetToken", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
