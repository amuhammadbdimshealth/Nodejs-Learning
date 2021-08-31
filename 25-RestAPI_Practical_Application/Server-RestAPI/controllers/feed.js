const { validationResult } = require('express-validator');
const post = require('../models/post');
const Post = require("../models/post")

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error("Could not find post");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "Post fetched",
                post: post
            })
        })
        .catch(error => {
            console.log("Console Error from Server", error);
            next(error);
        })
}
exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        if (!posts) {
            const error = new Error("Could not find any posts")
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Posts fetched",
            posts: posts
        })

    }).catch(err => {
        console.log(err);
        next(err);
    })

    // res.status(200).json({
    //     posts: [
    //         { _id: 0, creator: { name: 'Arif' }, createdAt: new Date().toISOString(), title: 'My First Post', imageUrl: 'images/book.jpg', content: 'My Post Content1' },
    //         { _id: 1, creator: { name: 'Juthi' }, createdAt: new Date().toISOString(), title: 'My Second Post', imageUrl: 'URL', content: 'My Post Content2' },
    //         { _id: 2, creator: { name: 'Amit' }, createdAt: new Date().toISOString(), title: 'My Third Post', imageUrl: 'URL', content: 'My Post Content3' }
    //     ],
    // });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect")
        error.statusCode = 422
        throw error;
    }

    const title = req.body.title;
    const imageUrl = 'images/book.jpg'
    const content = req.body.content;
    console.log(title, imageUrl, content)

    // Create post in DB
    const post = new Post({
        title: title,
        imageUrl: imageUrl,
        content: content,
        creator: {
            name: 'Arif Md'
        }
    })
    post.save().then((result) => {
        post.savedToDB();
        res.status(201).json({
            message: "Post successfully created",
            post: result
        });

    }).catch((err) => {
        next(err);
    })
};