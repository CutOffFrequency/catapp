const mongoose = require('mongoose')

const catsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  temperment: String,
})

module.exports = mongoose.model('Cats', catsSchema)