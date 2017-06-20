var express = require('express')
var router = express.Router()
var transactionsControllers = require('../controllers/transaction-cont.js')


router.post('/', transactionsControllers.create)
router.get('/', transactionsControllers.read)
router.put('/:id', transactionsControllers.update)
router.delete('/:id', transactionsControllers.delete)

module.exports = router
