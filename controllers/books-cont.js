var Book = require('../models/book.js')

module.exports = {
  create: (req, res)=>{
    var newBook = new Book({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    })

    newBook.save((err, book)=>{
      if(!err){
        res.send(book)
      } else {
        rs.send(err)
      }
    })
  },

  read: (req, res)=>{
    Book.find((err, data)=>{
      if(!err) {
        res.send(data)
      } else {
        res.send(err)
      }
    })
  },

  update: (req, res)=>{
    Book.findOneAndUpdate({_id: req.params.id}, {$set :{
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    }}, {new: true}, (err, result)=>{
      if(!err){
        res.send(result)
      } else {
        res.send(err)
      }
    })
  },

  delete: (req, res)=>{
    Book.findOneAndRemove({_id: req.params.id}, (err, result)=>{
      if(!err){
        res.send({message: `id ${req.params.id} deleted`})
      } else {
        res.send(err)
      }
    })
  }
}
