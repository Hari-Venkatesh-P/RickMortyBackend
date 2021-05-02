const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

const CartoonSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  cartoonId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  status: {
    type: String,
  },
  type: {
    type: String,
  },
  gender: {
    type: String,
  },
  origin: {
    type: urlSchema,
  },
  location: {
    type: urlSchema,
  },
  image: {
    type: urlSchema,
  },
});

module.exports = mongoose.model('CartoonDetails', CartoonSchema);
