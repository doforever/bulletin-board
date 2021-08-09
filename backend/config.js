const dbURI = process.env.NODE_ENV === 'production'
  ? 'mongodb://localhost:27017/bulletinBoard'
  : 'mongodb://localhost:27017/bulletinBoard';

module.exports = {dbURI};
