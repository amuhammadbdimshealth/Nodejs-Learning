const express = require("express");
const { validationResult } = require('express-validator')

// router.get('/posts', (req, res, next) => {
//     res.status(200).json({
//         posts: [
//             {title: 'First post', content: 'This is the first post'},
//             {title: 'Second post', content: 'This is the second post'}
//         ]
//     })
// })

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            { _id: 0, creator: { name: 'Arif' }, createdAt: new Date().toISOString(), title: 'My First Post', imageUrl: 'images/book.jpg', content: 'My Post Content1' },
            { _id: 1, creator: { name: 'Juthi' }, createdAt: new Date().toISOString(), title: 'My Second Post', imageUrl: 'URL', content: 'My Post Content2' },
            { _id: 2, creator: { name: 'Amit' }, createdAt: new Date().toISOString(), title: 'My Third Post', imageUrl: 'URL', content: 'My Post Content3' }
        ],
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    console.log(title, content)
        // Create post in DB
    res.status(201).json({
        message: "Post successfully created",
        post: { _id: new Date().toISOString(), creator: { name: 'Juthi' }, createdAt: new Date().toISOString(), title: title, imageUrl: 'URL', content: content }
    });
};