const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

const addProductValidators = [
  body("title")
    .isAlphanumeric()
    .withMessage("Title can contain only letters and numbers")
    .trim(),
  // body("imageUrl")
  //   .isString()
  //   .withMessage("Invalid image url"),
  body("price")
    .isDecimal({
      decimal_digits: 2,
    })
    .withMessage("Price must be a decimal value with 2 digits after decimal"),
  body("description")
    .isLength({ min: 5, max: 10 })
    .withMessage("Description must be within 5-10 characters long")
    .trim(),
];

module.exports = { addProductValidators };
