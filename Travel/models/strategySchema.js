const mongoose = require('mongoose')
// 旅游攻略
const hotPicSchema = mongoose.Schema({
  caption :String,  //  大标题
  title :String,  //  标题
  detailInfo :Array,   //简介
  Url1 :String,
  Url2 :String,  
  Url3 :String, 
  url:Array,
  traficTitle :String,    //交通介绍标题
  traficContent :Array ,    //
  attention:String,
  content:Array,
  way:Array,
  content1:Array,
  content2:Array,
  classify:String
}, { collection: 'strategy'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据
const hotlList = module.exports = mongoose.model('strategy',hotPicSchema);
