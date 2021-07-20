const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');
var ObjectId = require('mongoose').Types.ObjectId;

const Post = require('../models/post.model');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').slice(-1);
    cb(null, uniqid() + '.' + ext);
  },
});

const upload = multer({ storage: storage,
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.includes('image')) {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 5000000,
  },
});

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo status')
      .sort({created: -1});
    if(!result) res.status(404).json({ message: 'Not found' });
    else {
      res.json(result);
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) res.status(404).json({ message: 'Not found' });
    else {
      const result = await Post.findById(req.params.id);
      if(!result) res.status(404).json({ message: 'Not found' });
      else res.json(result);
    }
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/posts', upload.single('photo'), async (req, res) => {
  const { author, title, text, price, phone, location, status } = req.body;
  const photo = req.file;

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
});

router.put('/posts/:id', upload.single('photo'), async (req, res) => {
  const { title, text, price, phone, location, status} = req.body;
  let photoString = req.body.photo;
  const photo = req.file;

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
});

router.delete('/posts/:id', async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const removedPost = await post.remove();
      res.json(removedPost);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Remove cart error' });
  }
});

module.exports = router;
