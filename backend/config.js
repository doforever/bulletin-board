const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://doforever:${process.env.dbpass}@cluster0.tvjci.mongodb.net/BulletinBoard?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/bulletinBoard';

const imagesURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

const audience = process.env.NODE_ENV === 'production' ? 'https://still-stream-70087.herokuapp.com/' : 'http://localhost:8000';

module.exports = {dbURI, imagesURL, audience};
