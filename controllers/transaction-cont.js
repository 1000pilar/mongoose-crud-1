var Transaction = require('../models/transaction.js')
var helper = require('../helpers/transactionLibrary.js')

module.exports = {
  create: (req, res)=>{
    console.log(req.body.days);
    var newTransaction = new Transaction({
      memberid: req.body.memberid,
      days: req.body.days,
      due_date: new Date(helper.dueDate(req.body.days)),
      in_date: req.body.in_date,
      fine: helper.countFine(req.body.in_date, req.body.days),
      booklist: req.body.booklist
    })
    helper.updateStock(req.body.booklist)
    newTransaction.save((err, transaction)=>{
      if(!err){
        res.send(transaction)
      } else {
        rs.send(err)
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

  update: (req, res)=>{
    Transaction.findById(req.params.id, (err, result)=>{
      var newTransaction = new Transaction({
        memberid: req.body.memberid || result.memberid,
        days: req.body.days || result.days,
        due_date: helper.dueDate(req.body.days) || result.due_date,
        in_date: req.body.in_date || result.in_date,
        fine: helper.countFine(req.body.in_date, req.body.days) || result.fine,
        booklist: req.body.booklist || result.booklist
      })
    newTransaction.save((err, result)=>{
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
