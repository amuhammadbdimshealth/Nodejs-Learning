const { validationResult } = require('express-validator')
const Post = require("../models/post")

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