const express = require("express");

// # Import path
const path = require('path');

// # Import rootDirectory variable from Utility > path.js
const rootDir = require('../utility/path') 

const router = express.Router();

// # Store the products 
const products = [];

// ## Form to send user request
router.get("/add-product", (req, res, next) => {
  console.log("[admin.js]", "In add-product middleware ");
  // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  
});
// ## Handling Incoming request - Add incoming product to products list
router.post("/add-product", (req, res, next) => {
  // console.log(req.body); //-> undefined . if not parsed
  products.push({title: req.body.title});
  res.redirect("/");
});

// Export router, products
module.exports.routes = router;
module.exports.products = products;

