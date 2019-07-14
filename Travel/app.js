const express = require('express');
const travel = require('./router/travel');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');//

//这一句是连接上数据库
 var db = mongoose.connect('mongodb://localhost:27017/myTravel');


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api',travel)
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})


