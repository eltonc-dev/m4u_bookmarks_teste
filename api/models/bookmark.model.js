const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
  owner: {type: String, required: true},  
  name: { type: String },
  url: { type: String, required: true },
  created_at: Date
});

bookmarkSchema.pre('save', function(next) {
    var currentDate = moment();
    if (!this.created_at)
      this.created_at = currentDate;
    next();
})

// Criando o model bookmark
var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;