var express = require('express')
var router = express.Router()
var customerControllers = require('../controllers/customers-cont.js')


router.post('/', customerControllers.create)
router.get('/', customerControllers.read)
router.put('/:id', customerControllers.update)
router.delete('/:id', customerControllers.delete)

module.exports = router
