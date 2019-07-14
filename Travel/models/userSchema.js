const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userName :String,
  password :String,
  info :String,
  gender :Number,
  tickets : [],
  publis : [],
  url:String
}, { collection: 'users'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Users = module.exports = mongoose.model('hero',userSchema);
