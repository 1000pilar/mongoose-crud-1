const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const books = require('./routes/books.js')
const customers = require('./routes/customers.js')
const transactions = require('./routes/transactions.js')

mongoose.connect('mongodb://localhost/library', ()=>{
  console.log(`Connect to mongodb database`);
})


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/books', books)
app.use('/customers', customers)
app.use('/transactions', transactions)


app.listen(3000)
console.log(`connect to port 3000`);
