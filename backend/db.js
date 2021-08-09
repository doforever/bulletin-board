const mongoose = require('mongoose');
const loadInitialData = require('./initialData');

const connectToDB = (dbUri) => {
  console.log('Trying to connect to ', dbUri );
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database', dbUri );
    loadInitialData();
  });

  db.on('error', (err) => {
    console.log('DB connection error: ' + err);
    connectToDB(dbUri);
    process.exit();
  });
};

module.exports = connectToDB;
