const express = require("express");

const path = require('path');

// # Import rootDirectory variable from Utility > path.js
const rootDir = require('../utility/path') 

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log('In shop middleware')
    //  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
     res.sendFile(path.join(rootDir, 'views', 'shop.html'))
});


module.exports = router;