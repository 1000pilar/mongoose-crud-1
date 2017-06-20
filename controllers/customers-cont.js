var Customer = require('../models/customer.js')

module.exports = {
  create: (req, res)=>{
    var newCustomer = new Customer({
      name: req.body.name,
      memberid: req.body.memberid,
      address: req.body.address,
      zipcode: req.body.zipcode,
      phone: req.body.phone
    })

    newCustomer.save((err, book)=>{
      if(!err){
        res.send(book)
      } else {
        rs.send(err)
      }
    })
  },

  read: (req, res)=>{
    Customer.find((err, data)=>{
      if(!err) {
        res.send(data)
      } else {
        res.send(err)
      }
    })
  },

  update: (req, res)=>{
    Customer.findOneAndUpdate({_id: req.params.id}, {$set :{
      name: req.body.name,
      memberid: req.body.memberid,
      address: req.body.address,
      zipcode: req.body.zipcode,
      phone: req.body.phone
    }}, {new: true}, (err, result)=>{
      if(!err){
        res.send(result)
      } else {
        res.send(err)
      }
    })
  },

  delete: (req, res)=>{
    Customer.findOneAndRemove({_id: req.params.id}, (err, result)=>{
      if(!err){
        res.send({message: `id ${req.params.id} deleted`})
      } else {
        res.send(err)
      }
    })
  }
}
