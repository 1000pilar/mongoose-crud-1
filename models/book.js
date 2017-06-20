var mongoose = require('mongoose')
var Schema = mongoose.Schema



var booksSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number
}, {timestamps: true})


var Book = mongoose.model('Book', booksSchema)

module.exports = Book
