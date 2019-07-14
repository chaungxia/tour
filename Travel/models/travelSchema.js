const mongoose = require('mongoose')

const travelSchema = mongoose.Schema({
  name :String,
  simpleInfo :String,
  detailInfo :String,
  phoneNumber :String,
  website :String,
  time :String,
  traffic :String,
  ticket :String ,
  openTime :String ,
  cover:String,
}, { collection: 'travelList'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const TravelList = module.exports = mongoose.model('travel',travelSchema);
