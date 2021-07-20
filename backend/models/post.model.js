const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    match: new RegExp(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]{1,6}))$/i),
  },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ['published', 'draft', 'closed'],
  },
  title: {
    type: String,
    required: true,
    maxLength: 25,
  },
  text: {
    type: String,
    required: true,
    maxLength: 2000,
  },
  photo: { type: String },
  price: {
    type: Number,
    min: 0,
  },
  phone: {
    type: String,
    maxLength: 12,
  },
  location: {
    type: String,
    maxLength: 60,
  },
});

module.exports = mongoose.model('Post', postSchema);
