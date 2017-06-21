var Transaction = require('../models/transaction.js')
var Book = require('../models/book.js')
var helper = require('../helpers/transactionLibrary.js')


module.exports = {
  create: (req, res)=>{
    console.log(req.body.days);
    Book.findById(req.body.booklist, (err, result)=>{
      // console.log(result);
      if (result.stock == 0) {
        res.send({massage: 'stock is empty'})
      } else {
        var bookUpdate = {
        isbn: req.body.isbn || result.isbn,
        title: req.body.title || result.title,
        author: req.body.author || result.author,
        category: req.body.category || result.category,
        stock: result.stock - 1
        }
        Book.update({_id: req.body.booklist}, {$set: bookUpdate}, {new: true}, (err, result)=>{
          if(!err){
            console.log(result)
          } else {
            console.log(err)
          }
        })
        var newTransaction = new Transaction({
          memberid: req.body.memberid,
          days: req.body.days,
          due_date: new Date(helper.dueDate(req.body.days)),
          in_date: req.body.in_date,
          fine: helper.countFine(req.body.in_date, req.body.days),
          booklist: req.body.booklist
        })

        newTransaction.save((err, transaction)=>{
          if(!err){
            res.send(transaction)
          } else {
            rs.send(err)
          }
        })
      }
    })
  },

  read: (req, res)=>{
    Transaction.find((err, data)=>{
      if(!err) {
        res.send(data)
      } else {
        res.send(err)
      }
    })
  },

  findOne: (req, res)=>{
    Transaction.findOne({_id: req.params.id})
    .populate('booklist')
    .exec(function(err, transaction){
      if(!err) {
        res.send(transaction)
      } else {
        res.send(err)
      }
    })
  },

  update: (req, res)=>{
    Transaction.findById(req.params.id, (err, result)=>{
      var newTransaction = {
        memberid: req.body.memberid || result.memberid,
        days: req.body.days || result.days,
        due_date: helper.dueDate(req.body.days) || result.due_date,
        in_date: req.body.in_date || result.in_date,
        fine: helper.countFine(req.body.in_date, req.body.days) || result.fine,
        booklist: req.body.booklist || result.booklist
      }
      Transaction.update(req.params.id, {$set: newTransaction}, {new: true}, (err, result)=>{
        if(!err){
          res.send(result)
        } else {
          res.send(err)
        }
      })
    })
  },

  delete: (req, res)=>{
    Transaction.findOneAndRemove({_id: req.params.id}, (err, result)=>{
      if(!err){
        res.send({message: `id ${req.params.id} deleted`})
      } else {
        res.send(err)
      }
    })
  }
}
