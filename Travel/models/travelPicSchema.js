const mongoose = require('mongoose')

const travelPicSchema = mongoose.Schema({
    travelId :String,
    image :String,
}, { collection: 'travelPic'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const TravelPic = module.exports = mongoose.model('travelPic',travelPicSchema);
