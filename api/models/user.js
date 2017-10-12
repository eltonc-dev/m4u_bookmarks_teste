const mongoose = require('mongoose')
const moment = require('moment')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true , select: false },
  admin: { type: Boolean, default:false },
  created_at: Date

});

userSchema.pre('save', function(next) {
  
  var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
  
  if (!this.created_at)
    this.created_at = currentDate;
  
  if( this.isModified('password') ) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  next();
})

//checo se a senha informada é a senha do usuário
userSchema.methods.checkPassword = function(pass) {
  return bcrypt.compareSync(pass,this.password);
}

userSchema.methods.isAdmin = function(){
  return this.admin
}

// Criando o model User
var User = mongoose.model('User', userSchema);

module.exports = User;