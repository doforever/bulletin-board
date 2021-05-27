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
  const { author, title, text, price, phone, location, status } = req.fields;
  const photo = req.files.photo;

  // Photo validation
  const isPhotoValid = photo ? photo.size && photo.type.includes('image') : true;

  // Title validation
  const isTitleValid = title && title.length > 10;

  // Text validation
  const isTextValid = text && text.length > 20;

  // Email validation
  const emailPattern = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i);
  const isEmailValid = emailPattern.test(author);

  // Status validation
  const isStatusValid = status && ['published', 'draft', 'closed'].includes(status);

  if ( isTitleValid && isTextValid && isEmailValid && isStatusValid && isPhotoValid) {
    const date = new Date();
    try {
      const newPost = new Post({
        author,
        created: date,
        updated: date,
        status,
        title,
        text,
        photo: photo ? photo.path.replace('public', '') : '',
        price,
        phone,
        location,
      });
      const saved = await newPost.save();
      res.status(201).json(saved);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({message: 'Post saving error'});
    }
  } else {
    res.status(400).json({message: 'Bad request'});
  }
});

router.put('/posts/:id', async (req, res) => {
  const { title, text, price, phone, location, status } = req.fields;
  const photo = req.files.photo;

  // Phot validation
  const isPhotoValid = photo ? photo.size && photo.type.includes('image') : true;

  // Title validation
  const isTitleValid = title && title.length > 10;

  // Text validation
  const isTextValid = text && text.length > 20;

  // Status validation
  const isStatusValid = status && ['published', 'draft', 'closed'].includes(status);

  if (isTitleValid && isTextValid && isStatusValid && isPhotoValid) {
    const date = new Date();
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        Object.assign(post, {
          title,
          text,
          photo: photo ? photo.path.replace('public', '') : '',
          price,
          phone,
          location,
          updated: date,
          status,
        });
        const updatedPost = await post.save();
        res.json(updatedPost);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
      res.status(500).json({ message: 'Post update error' });
    }
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = router;
