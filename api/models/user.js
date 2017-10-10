const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date

});

// Criando o model User
var User = mongoose.model('User', userSchema);

module.exports = User;