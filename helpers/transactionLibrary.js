var Book = require('../models/book.js')

function dueDate(n){

  var t = new Date();
  t.setDate(t.getDate() + parseInt(n));
   var date = t.getFullYear()+","+(((t.getMonth() + 1) < 10 ) ? '0'+(t.getMonth()+1) : (t.getMonth()+1))+","+((t.getDate() < 10) ?  '0'+t.getDate() : t.getDate());
  return date;
}
  function countFine(in_date, days){
    // console.log(in_date);
    var secondDate = new Date(in_date)
    // console.log(secondDate);
    var oneDay = 24*60*60*1000 // hours*minutes*seconds*milliseconds
    , firstDate = new Date(dueDate(parseInt(days)))
    , charge = 15000
    , diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))
    , totalCharge = diffDays*charge
    // console.log(firstDate);
    // console.log(secondDate);
    console.log(totalCharge);
    return totalCharge;
  }
module.exports = {
  dueDate,
  countFine
}
