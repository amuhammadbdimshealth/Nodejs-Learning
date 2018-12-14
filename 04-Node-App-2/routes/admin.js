const express = require("express");

// # Import path
const path = require('path');

// # Import rootDirectory variable from Utility > path.js
const rootDir = require('../utility/path') 

const router = express.Router();

// ## Form to send user request
router.get("/add-product", (req, res, next) => {
  console.log("In add-product middleware ");
  // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  
});
// ## Handling Incoming request
router.post("/add-product", (req, res, next) => {
  console.log(req.body); //-> undefined . if not parsed
  res.redirect("/");
});

// Export the Router
module.exports = router; // This router is a valid middleware function
