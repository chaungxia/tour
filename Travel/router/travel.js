//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();

var multer = require('multer'); //文件获取储存的第三方模块
const fs = require('fs');
const path = require('path');
var upload = multer({
    dest: '/static/'
}); //将头像临时文件夹

//引入数据模型模块
const Users = require("../models/userSchema");
const TravelList = require("../models/travelSchema");
const Comment = require("../models/commentSchema");
const Ticket = require("../models/ticketSchema");
const TravelPic = require("../models/travelPicSchema");
const hotlList = require("../models/hotPicSchema");
const createTravel=require("../models/createTravel")
const Recommend=require("../models/recommend")
const Strategy=require("../models/strategySchema")
const City=require("../models/city")

//注册
router.post('/register', (req, res) => {
  var data = {
    userName: req.body.userName,
    password: req.body.password,
    info:'',
    gender:3,
    tickets:[],
    publis:[]
  }
  //判断用户名是否存在
  Users.find({userName: req.body.userName}, function (err, obj) {
    if (obj.length == 0) {
      Users.create(data, (err, hero) => {
        if (err) {
          console.log("Error:" + err);
        } else {
          res.json({
            errno: 0,
            msg: '注册成功，请登录'
          });
        }
      });
    } else {
      res.json({
        errno: 2,
        msg: '用户名已存在',
      });
    }
  })
});

//登录接口
router.post('/login', function (req, res, next) {
  //用户名、密码、验证码
  var data = {
    userName: req.body.userName,
    password: req.body.password
  }
  Users.find(data, function (err, obj) {
    if (obj.length == 0) {
      res.json({
        errno: 2,
        msg: '用户名或密码有误'
      });
    } else {
      res.json({
        errno: 0,
        msg: '登录成功',
        token: obj[0].id,
        name:obj[0].userName,
      });
    }
  })
});
// 根据id获取用户详情
router.get('/getUserDetail/:id', function (req, res, next) {
  Users.findById(req.params.id)
    .then(hero => {
      res.json({
        errno: 0,
        data: hero
      });
    })
    .catch(err => {
      res.json(err);
    });
})

// 获取景点列表
router.get('/getTraveList', function (req, res, next) {
  TravelList.find({}, function (err, obj) {
    if (obj) {
      res.json({
        errno: 0,
        list: obj
      });
    } else {
      res.json({
        errno: 5001,
        msg: '获取列表失败',
      });
    }
  })
})

// 根据id获取景点详情
router.get('/getTraveDetail/:id', function (req, res, next) {
  TravelList.findById(req.params.id)
    .then(hero => {
      res.json({
        errno: 0,
        data: hero
      });
    })
    .catch(err => {
      res.json(err);
    });
})

// 添加评论
router.post('/addComment', (req, res) => {
  Comment.create(req.body, (err, hero) => {
    if (err) {
      console.log("Error:" + err);
    } else {
      res.json({
        errno: 0,
        msg: '添加成功'
      });
    }
  });
})

// 获取评论列表
router.get('/getCommentList/:id', function (req, res, next) {
  var data={travelId:req.params.id};
  Comment.find(data, function (err, obj) {
    if(obj){
      res.json({
        errno:0,
        data:obj
      })
    }else{
      res.json({
        errno:5001,
        msg:'获取列表失败'
      })
    }
  })
})

// 获取我的发布
router.get('/getMyCommentList/:id', function (req, res, next) {
  var data={userlId:req.params.id};
  Comment.find(data, function (err, obj) {
    if(obj){
      res.json({
        errno:0,
        data:obj
      })
    }else{
      res.json({
        errno:5001,
        msg:'获取列表失败'
      })
    }
  })
})

// 修改个人资料
router.post("/modifUser", (req, res) => {
  Users.findOneAndUpdate({
    _id: req.body.id
  }, {
    $set:{
      userName:req.body.userName,
      gender:req.body.gender,
      info:req.body.info,
    }
  }, {
    new: true
  })
  .then(hero => res.json({
    errno: 0,
    message: '修改成功'
  }))
  .catch(err => res.json({
    errno: 5001,
    message: '修改失败'
  }));
})

// 删除评论
router.delete("/deletComment/:id", (req, res) => {
  Comment.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.json({
      errno:0,
      message:"删除成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});

// 预定
router.post('/bookingTicket', (req, res) => {
  Ticket.create(req.body, (err, hero) => {
    if (err) {
      console.log("Error:" + err);
    } else {
      res.json({
        errno: 0,
        msg: '预定成功'
      });
    }
  });
})

// 获取我的预定列表
router.get('/getMyTickets/:id', function (req, res, next) {
  var data={userlId:req.params.id};
  Ticket.find(data, function (err, obj) {
    if(obj){
      res.json({
        errno:0,
        data:obj
      })
    }else{
      res.json({
        errno:5001,
        msg:'获取列表失败'
      })
    }
  })
})
// 删除门票  
router.delete("/delet/:id", (req, res) => {
  Ticket.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.json({
      errno:0,
      message:"删除成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});

// 上传图片
router.post('/uploadPic', upload.single('sendImg'), (req, res) => { //路由地址
  //读取传输的头像
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      throw ('Load_Err');
    }
    let type = req.file.mimetype.split('/')[1]; //获取文件类型名
    let name = new Date().getTime() + parseInt(Math.random() * Math.random() * 1000000); //使用时间戳和随机数生成随机名，并且连成完整的文件名
    //保存文件至savePic文件夹
    let filename = name + '.' + type;
    fs.writeFile(path.join(__dirname, '../static/' + filename), data, (err) => {
      // 返回信息给前端
      if (err) {
        res.send({
          err: 1,
          msg: '上传失败'
        });
        return;
      } else {
        var data={
          travelId :req.body.travelId,
          image :'static/' + filename,
        }
        TravelPic.create(data, (err, hero) => {
          if (err) {
            console.log("Error:" + err);
          } else {
            res.send({
              err: 0,
              msg: '上传成功',
              data: 'static/' + filename
            });
          }
        });
      }
    });
  });


});

// 获取景点图片列表
router.get('/getTravePic/:id', function (req, res, next) {
  var data={travelId:req.params.id};
  TravelPic.find(data, function (err, obj) {
    if(obj){
      res.json({
        errno:0,
        list:obj
      })
    }else{
      res.json({
        errno:5001,
        msg:'获取列表失败'
      })
    }
  })
});
// db.somecollection.find().sort({ time : -1 });
// 获取热门游记列表
router.get('/getHotPic', function (req, res, next) {
  
  hotlList.find({}, function (err, obj) {
    if (obj) {
      res.json({
        errno: 0,
        list: obj
      });
    } else {
      res.json({
        errno: 5001,
        msg: '获取列表失败',
      });
    }
  })
});
// 根据id获取热门游记详情
router.get('/getHotDetail/:id', function (req, res, next) {
  hotlList.findById(req.params.id)
    .then(hot => {
      res.json({
        errno: 0,
        data: hot
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// 写游记添加标题,内容
router.post('/addTravel', (req, res) => {
  createTravel.create(req.body, (err, hero) => {
    if (err) {
      console.log("Error:" + err);
    } else {
      res.json({
        errno: 0,
        msg: '添加成功'
      });
    }
  });
});
// 获取
router.get('/getHotTravel', function (req, res, next) {
  // var data={userlId:req.params.id};
  createTravel.find({}, function (err, obj) {
    if(obj){
      res.json({
        errno:0,
        data:obj
      })
    }else{
      res.json({
        errno:5001,
        msg:'获取列表失败'
      })
    }
  })
});
// 删除游记
router.delete("/deletHot/:id", (req, res) => {
  createTravel.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.json({
      errno:0,
      message:"删除成功"
    }))
    .catch(err => res.json({
      status:"fail",
      message:"删除失败"
    }));
});
// 根据id获取详情
router.get('/getTravelDetail/:id', function (req, res, next) {
  createTravel.findById(req.params.id)
    .then(create => {
      res.json({
        errno: 0,
        data: create
      });
    })
    .catch(err => {
      res.json(err);
    });
});
// 旅游攻略列表
router.get('/getStrategy', function (req, res, next) {
  Strategy.find({}, function (err, obj) {
    if (obj) {
      res.json({
        errno: 0,
        list: obj
      });
    } else {
      res.json({
        errno: 5001,
        msg: '获取列表失败',
      });
    }
  })
});
// 根据id获取旅游攻略详情
router.get('/getStrategy/:id', function (req, res, next) {
  Strategy.findById(req.params.id)
    .then(strategy => {
      res.json({
        errno: 0,
        data: strategy
      });
    })
    .catch(err => {
      res.json(err);
    });
});
// 今日推荐列表
// recommend
router.get('/getRecommend', function (req, res, next) {
  Recommend.find({}, function (err, obj) {
    if (obj) {
      res.json({
        errno: 0,
        list: obj
      });
    } else {
      res.json({
        errno: 5001,
        msg: '获取列表失败',
      });
    }
  })
});
// 根据id获取今日推荐详情
router.get('/recommend/:id', function (req, res, next) {
  Recommend.findById(req.params.id)
    .then(recommend => {
      res.json({
        errno: 0,
        data: recommend
      });
    })
    .catch(err => {
      res.json(err);
    });
});
// 获取城市列表
router.get('/getCity', function (req, res, next) {
  City.find({}, function (err, obj) {
    if (obj) {
      res.json({
        errno: 0,
        list: obj
      });
    } else {
      res.json({
        errno: 5001,
        msg: '获取列表失败',
      });
    }
  })
});
module.exports = router;
