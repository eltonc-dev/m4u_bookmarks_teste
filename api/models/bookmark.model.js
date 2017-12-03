const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema;

let bookmarkSchema = new Schema({
  owner: {type: String, required: true},  
  name: { type: String },
  url: { type: String, required: true },
  created_at: Date
});

bookmarkSchema.pre('save', function(next) {
    let currentDate = moment();
    if (!this.created_at)
      this.created_at = currentDate;
    next();
})

// Criando o model bookmark
let Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;