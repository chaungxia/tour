const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  travelId :String,
  travelName :String,
  userlId :String,
  comment :String,
  userName :String,
  arrImg:[]
}, { collection: 'comment'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Comment = module.exports = mongoose.model('comment',commentSchema);
