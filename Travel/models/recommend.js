const mongoose = require('mongoose')
// 今日推荐
const Recommend = mongoose.Schema({
  title :String,  //
  city :String,  //
  price :String,   //
  clssify:String,
  cover:String,
  type:Array,
  content1:String,
  content2:String,
  url1:String,
  url2:String
}, { collection: 'recommend'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据
const Recommends = module.exports = mongoose.model('recommend',Recommend);
