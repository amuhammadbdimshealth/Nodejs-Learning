const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const signupValidators = [
  // email, password, confirmPassword
  // email must be an email
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address - @Express validator")
    .custom((value, { req }) => {
      if (value === "testC@gmail.com") {
        throw new Error("Bad email address. Try sth else - @Express validator");
      }
      return true;
    })
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          console.log("Same email", userDoc);
          return Promise.reject("User already exists - @Express validator");
        }
      });
    }),
  // password must be at least 5 chars long
  body(
    "password",
    "Field - The password can only have letters - @Express validator"
  )
    .isLength({ min: 5 })
    .withMessage(
      "Password length must be greater than 5 characters - @Express validator"
    )
    .isAlphanumeric()
    .notEmpty().withMessage("Password cannot be empty - @Express validator"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new Error("Passwords must match - @Express validator");
    return true;
  }),
];

const loginValidators = [
  body("email").custom((value, { req }) => {
    const { email, password } = req.body;
    const successOrFailPromise = User.findOne({ email: value }).then((user) => {
      // check if user is valid
      if (!user)
        return Promise.reject(
          "Incorrect username or password! Please try again - @EXP"
        );
      else {
        // compare password
        bcrypt.compare(password, user.password).then((match) => {
          if (!match)
            return Promise.reject(
              "Incorrect username or password! Please try again - @EXP"
            );
        });
      }
    });
    return successOrFailPromise;
  }),
];

module.exports = {
  signupValidators,
  loginValidators,
};
