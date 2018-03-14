const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const itemSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
})

module.exports = itemSchema
