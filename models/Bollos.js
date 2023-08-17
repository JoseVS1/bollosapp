const mongoose = require('mongoose')

const BollosSchema = new mongoose.Schema({
  flavor: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: false,
  },
  ingredients: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Bollos', BollosSchema)
