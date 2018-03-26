// Dragon Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dragonSchema = new Schema({
  id: Number,
  name: String,
  type: String,
  source: String,
  info: String
});

module.exports = mongoose.model('Dragon', dragonSchema);
