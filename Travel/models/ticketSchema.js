const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    travelId :String,
    travelName :String,
    userlId :String,
    price :String,
}, { collection: 'ticket'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Ticket = module.exports = mongoose.model('ticket',ticketSchema);
