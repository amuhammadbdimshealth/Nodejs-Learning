const express = require("express");
const router = express.Router();

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
      { _id: 0, creator: { name: 'Arif' }, createdAt: new Date().toISOString(), title: 'My First Post', imageUrl: 'URL', content: 'My Post Content' },
      { _id: 1, creator: { name: 'Juthi' }, createdAt: new Date().toISOString(), title: 'My First Post', imageUrl: 'URL', content: 'My Post Content' }
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content)
  // Create post in DB
  res.status(201).json({
    message: "Post successfully created",
    post: { id: 1, title: title, content: content },
  });
};
