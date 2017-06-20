var mongoose = require('mongoose')
var Schema = mongoose.Schema


var transactionsSchema = new Schema({
  memberid: String,
  days: Number,
  out_date: {type: Date, default: Date.now},
  due_date: Date,
  in_date: Date,
  fine: Number,
  booklist: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
})


var Transaction = mongoose.model('Transaction', transactionsSchema)

module.exports = Transaction
