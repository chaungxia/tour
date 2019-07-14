const mongoose = require('mongoose')

const CreateTravel = mongoose.Schema({
  date :Object,
  title :String,
  bgUrl :String,
  content :String,
  upUrl :Array,
  Id:String,
  userlId:String,
  userName:String
}, { collection: 'CreateTravel'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const TravelList = module.exports = mongoose.model('create',CreateTravel);
