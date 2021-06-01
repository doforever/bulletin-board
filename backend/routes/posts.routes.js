const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');
const ObjectId = require('mongoose').Types.ObjectId;
const { imagesURL } = require('../config');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const Post = require('../models/post.model');

const router = express.Router();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-ms59jlua.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:8000',
  issuer: [`https://dev-ms59jlua.eu.auth0.com/`],
  algorithms: ['RS256'],
  // credentialsRequired: false,
});

const checkScopes = jwtAuthz(['update:post']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images/uploads/');
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

router.post('/posts', jwtCheck, upload.single('photo'), async (req, res) => {
  const { author, title, text, price, phone, location, status } = req.body;
  const photo = req.file;
  console.log(req.user);

  const date = new Date();
  try {
    const newPost = new Post({
      author,
      created: date,
      updated: date,
      status,
      title,
      text,
      photo: photo ? photo.path.replace('../images', imagesURL) : '',
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

router.put('/posts/:id', jwtCheck, checkScopes, upload.single('photo'), async (req, res) => {
  const { title, text, price, phone, location, status} = req.body;
  let photoString = req.body.photo;
  const photo = req.file;

  if (!photoString) photoString = photo ? photo.path.replace('../images', imagesURL) : '';
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
