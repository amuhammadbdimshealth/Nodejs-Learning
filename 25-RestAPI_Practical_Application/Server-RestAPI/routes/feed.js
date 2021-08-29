const express = require("express");
const { body } = require('express-validator')
const feedController = require("../controllers/feed");
const router = express.Router();
const createPostValidators = [
    body('title').trim().isLength({ min: 7 }).withMessage("Minimum 5 characters required"),
    body('content').trim().isLength({ min: 5 })
]

router.get('/posts', feedController.getPosts)
router.post('/create-post', createPostValidators, feedController.createPost)

module.exports = router;