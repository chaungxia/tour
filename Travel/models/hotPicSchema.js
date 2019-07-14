const mongoose = require('mongoose')
// 详情页面
const hotPicSchema = mongoose.Schema({
  simplename :String,  //
  simpleInfo :String,  //
  simpleUrl :String,   //
  detailUrl :String,       //
  userName :String,    //
  time :String ,    //
  detailInfo :String ,   //
  url:String,       //
  title:String,
  userlId :String
}, { collection: 'hotList'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据
const hotlList = module.exports = mongoose.model('hot',hotPicSchema);
