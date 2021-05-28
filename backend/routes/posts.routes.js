const express = require('express');
const router = express.Router();
const multer = require('multer');
const uniqid = require('uniqid');
const { isTitleValid, isEmailValid, isTextValid, isStatusValid, isPhotoValid } = require('../validation.js');

const Post = require('../models/post.model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').slice(-1);
    cb(null, uniqid() + '.' + ext);
  },
});

const upload = multer({ storage: storage });

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

router.post('/posts', upload.single('photo'), async (req, res) => {
  const { author, title, text, price, phone, location, status } = req.body;
  const photo = req.file;

  if ( isTitleValid(title)
    && isTextValid(text)
    && isEmailValid(author)
    && isStatusValid(status)
    && isPhotoValid(photo) ) {
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

router.put('/posts/:id', upload.single('photo'), async (req, res) => {
  const { title, text, price, phone, location, status} = req.body;
  let photoString = req.body.photo;
  const photo = req.file;

  if (isTitleValid(title) && isTextValid(text) && isStatusValid(status) && isPhotoValid(photo)) {
    if (!photoString) photoString = photo ? photo.path.replace('public', '') : '';
    const date = new Date();
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        Object.assign(post, {
          title,
          text,
          photo: photoString,
          price: price === 'null' ? null : price,
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
      console.error(err);
      res.status(500).json({ message: 'Post update error' });
    }
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = router;
