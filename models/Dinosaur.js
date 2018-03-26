// Dinosaur Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dinoSchema = new Schema({
  id: Number,
  name: String,
  pronunciation: String,
  meaningOfName: String,
  diet: String,
  length: String,
  period: String,
  mya: String,
  info: String
});

module.exports = mongoose.model('Dinosaur', dinoSchema);
