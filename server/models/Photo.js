const mongoose = require('mongoose');

const Photo = new mongoose.Schema({
  url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Photo', Photo);
