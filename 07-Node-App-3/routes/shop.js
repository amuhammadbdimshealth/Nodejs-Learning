const express = require("express");

const path = require('path');

// # Import rootDirectory variable from Utility > path.js
const rootDir = require('../utility/path') 
// # Import admin data
const adminData = require('./admin');


const router = express.Router();

router.get("/", (req, res, next) => {    
    console.log('[shop.js]', adminData.products);    
     res.sendFile(path.join(rootDir, 'views', 'shop.html'))
});


module.exports = router;