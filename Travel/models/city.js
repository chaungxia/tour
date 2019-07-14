const mongoose = require('mongoose')
// 城市
const CitySchema = mongoose.Schema({
  city:Array
}, { collection: 'city'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据
const City = module.exports = mongoose.model('citys',CitySchema);
