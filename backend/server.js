const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbURI } = require('./config');
const connectToDB = require('./db');

const postsRoutes = require('./routes/posts.routes');

const app = express();

/* CONNECT TO DB */
connectToDB(dbURI);

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build/')));
app.use(express.static(path.join(__dirname, '../public/')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
