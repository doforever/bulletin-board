const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo status')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  const { author, created, updated, status, title, text, photo, price, phone, location } = req.body;
  try {
    const newPost = new Post({author, created, updated, status, title, text, photo, price, phone, location});
    const saved = await newPost.save();
    res.status(201).json(saved);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: 'Post saving error'});
  }
});

module.exports = router;
