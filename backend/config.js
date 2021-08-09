const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://doforever:${process.env.dbpass}@cluster0.tvjci.mongodb.net/BulletinBoard?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/bulletinBoard';

module.exports = {dbURI};
