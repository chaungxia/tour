<template>
  <div class="main">
    <el-carousel height="400px" class="ellllllllllllll">
      <el-carousel-item v-for="(item,index) in Images" :key="index">
        <img :src="item.url">
      </el-carousel-item>
      <div class="search">
        <el-input
          v-model="search"
          placeholder="请输入目的地"
          prefix-icon="el-icon-search"
          @keyup.native="searchList()"
        ></el-input>
      </div>
    </el-carousel>
    <div class="classify">
      <img :src="require('../../static/捕获.png')" alt>
    </div>
    <div class="contain">
      <!-- 热门游记 -->
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="left1">
            <div class="h2">
              <div class="zhuanlan">热门游记</div>
              <div @click="abc">更多</div>
            </div>
            <div class="hot-list">
              <div class="box">
                <div class="box-top">
                  <img :src="require('../../static/吃.jpeg')" alt>
                </div>
                <div class="box-bottom">
                  <div class="title">玩转宁波，这有一份景点美食交通大全</div>
                  <!-- <div class="info"> -->
                  <p>梅田周边聚集着大阪最多的百货商店和购物中心，这里的百货店总面积加起来比新宿还多，堪称日本第一大规模，可以说在这里逛一天都能不重样！而且在这里找不到的品牌一般在其他区域的商场也不会有!</p>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="left2">
            <div class="h2">
              <div class="zhuanlan">旅游攻略推荐</div>
              <div class="more" @click="more">更多</div>
            </div>
            <div class="hot-list">
              <div class="box">
                <div class="box-top">
                  <img :src="require('../../static/180180.jpg')" alt>
                </div>
                <div class="box-bottom">
                  <div class="title">西安：旧长安的画皮</div>
                  <!-- <div class="info"> -->
                  <p>西安这座曾经的13朝古都，在今天更像旧长安的画皮，城墙完整绵延，一切就像一张唐画的影印本。</p>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="left3">
            <div class="h2">
              <div class="zhuanlan">加入我们</div>
              <div>了解详情</div>
            </div>
            <div class="hot-list">
              <div class="box">
                <div class="box-top">
                  <img :src="require('../../static/180182.jpg')" alt>
                </div>
                <div class="box-bottom">
                  <div class="title">景泰：黄河远上白云间</div>
                  <!-- <div class="info"> -->
                  <p>每次出行都会有很多惊喜，在 景泰 也不例外。从最初只是对 永泰 龟城的向往再到对 黄河 石林 的期盼，出行前又对景电工程、水川湿地和索桥古渡产生兴趣，等到行程结束时竟因许多地方没能走到留下诸多遗憾。 </p>
                  <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- <div> -->
        <!--  -->
        <el-col :span="19">
          <div class="h2">今日推荐</div>
          <ul class="travel_list">
            <div class="shadow" v-if="show==true">
              <!-- $router.push('/travelDetail?id='+item._id) -->
              <li
              
                v-for="item in List"
                
                :key="item._id"
                @click="$router.push('/Recomme_detail?id='+item._id)"
              >
                <div class="img">
                  <img :src="item.cover" alt>
                </div>
                <div class="travel">
                  <div class="name">{{item.title}}</div>
                  <div class="travel_bottom">
                    <div class="city">{{item.city}}</div>
                    <div class="price">
                      <span>{{item.price}}</span>元起
                    </div>
                  </div>
                </div>
              </li>
            </div>
                  <div class="shadow" v-if="show==false">
        <li
          v-for="item in list"
          :key="item._id"
          @click="$router.push('/travelDetail?id='+item._id)"
        >
          <div class="travel">
            <div class="img">
              <img :src="item.cover" alt>
            </div>
            <div class="travel_list">
              <div class="name">{{item.name}}</div>
              <div class="info">{{item.simpleInfo}}</div>
            </div>
          </div>
        </li>
      </div>
          </ul>
          <!-- </div> -->
        </el-col>
        <!-- </div> -->
      </el-row>
    </div>
    <div class="footer">
      <div class="f_content">
        <ul>
          <p>旅游网</p>
          <li>中国年轻一代用得更多的旅游网站</li>
          <li>
            上亿旅行者共同打造的"
            <span>"旅行神器"</span>
          </li>
          <li>
            <span>600000</span> 多个全球旅游目的地
          </li>
          <li>
            <span>600000000</span> 个细分目的地新玩法
          </li>
          <li>
            <span>76000000000</span> 次攻略下载
          </li>
          <li>
            <span>36000</span> 家旅游产品供应商
          </li>
        </ul>

        <ul>
          <p>关于我们</p>
          <li>
            <p>关于我们</p>
            <p>联系我们</p>
          </li>
          <li>
            <p>隐私政策</p>
            <span>商标声明</span>
          </li>
          <li>
            <p>服务协议</p>游记协议
          </li>
          <li>商城平台服务协议</li>
          <li>网络信息侵权通知指引</li>
          <li>马蜂窝旅游网服务监督员</li>
          <li>网站地图</li>
        </ul>

        <ul class="serve">
          <p>旅行服务</p>
          <li>
            <div>旅游攻略</div>
            <div>酒店预订</div>
          </li>
          <li>
            <div>旅游特价</div>
            <div>国际租车</div>
          </li>
          <li>
            <div>旅游问答</div>
            <div>旅游保险</div>
          </li>
          <li>
            <div>
              <span>旅游指南</span>
            </div>
            <div>酒店预订</div>
          </li>
          <li>
            <div>旅游攻略</div>
            <div>酒店预订</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/user";
import { fmtDate } from "@/utils/validate";
export default {
  name: "homePage",
  data() {
    return {
      list: [],
      allList: [],
      search: "",
      List: [],
      simpleUrl: "",
      name: "",
      HotArr: [],
      show:true,
      Images: [
        {
          url:
            "https://b2-q.mafengwo.net/s13/M00/1D/6F/wKgEaVzH_W6APMkQAAlNFArFaaQ38.jpeg?imageMogr2%2Finterlace%2F1"
        },
        {
          url:
            "https://b2-q.mafengwo.net/s13/M00/76/AB/wKgEaVzIEVaANt5tAAj8y-J8sbg52.jpeg?imageMogr2%2Finterlace%2F1"
        },
        {
          url:
            "https://n4-q.mafengwo.net/s13/M00/23/DC/wKgEaVzH_uWAViuKAAZbayKEBP491.jpeg?imageMogr2%2Finterlace%2F1"
        },
        {
          url:
            "https://p4-q.mafengwo.net/s13/M00/51/91/wKgEaVzGV8SANlZcAAm8z0Hkb0c80.jpeg?imageMogr2%2Finterlace%2F1"
        }
      ]
    };
  },
  mounted() {
    this.getList();
    this.GetList();
    // this.getHot()
    // this.show=true;
  },
  methods: {
    // 获取列表
    getList() {
      request({
        url: "/getTraveList",
        method: "get"
      })
        .then(res => {
          // console.log(res)
          if (res.data.errno == 0) {
            this.list = res.data.list;
            this.allList = res.data.list;
          }
        })
        .catch(err => {});
    },
    // 目的地
    getHot() {
      request({
        url: "/getTraveList",
        method: "get"
      })
        .then(res => {
          // console.log(res)
          if (res.data.errno == 0) {
            this.list = res.data.list;
          }
        })
        .catch(err => {});
    },
    // 搜索
    searchList() {
      var arr = this.allList;
      var flag = this.search;
      this.show=false;
      if (flag) {
        this.List = arr.filter(item => item.name.indexOf(flag) != -1);
      } else {
        request({
          url: "/getTraveList",
          method: "get"
        })
          .then(res => {
            // console.log(res)
            if (res.data.errno == 0) {
              this.list = res.data.list;
            }
          })
          .catch(err => {});
        // this.List = this.allList;
      }
    },
    // 今日推荐列表
    GetList() {
      request({
        url: "/getRecommend",
        method: "get"
      }).then(res => {
        // console.log(">>>>", res.data.list);
        if (res.data.errno == 0) {
          this.List = res.data.list;
        }
      });
    },
    // 热门游记详情
    hotClick(item) {
      console.log(item._id);
      this.$router.push({
        path: "/hotDetail", //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
          id: item._id
        }
      });
    },
    more() {
      this.$router.push({
        path: "/Strategy"
      });
    },
    abc(){
      this.$router.push({
        path: "/hot"
      });
    }
  }
};
</script>
<style lang="scss">
.el-col-19 {
  height: 200px;
  box-sizing: border-box;
  .h2 {
    font-size: 24px;
  }
}
.el-card {
  background-color: #fafbfc;
  .el-card__body {
    display: flex;
  }
  .image {
    width: 220px;
    margin: 0 auto;
    height: 150px;
    padding: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    padding: 15px;
    padding: 20px 34px 20px;
    color: #606266;

    .name {
      color: #333;
      font-size: 24px;
      margin-bottom: 10px;
      cursor: pointer;
      line-height: 35px;
      &:hover {
        color: #ff9d00;
      }
    }
    .info {
      line-height: 24px;
    }
    .user {
      margin-left: 150px;
      margin-top: 20px;
      .nam {
        color: #ff9d00;
        margin-right: 100px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.contain {
  width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  .travel_list {
    list-style: none;
    padding: 0px 20px 20px 20px;
    .shadow {
      padding: 20px;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      li {
        width: 29.3%;
        margin-right: 4%;
        float: left;
        margin-bottom: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .img {
          width: 277px;
          height: 180px;
          padding: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .travel {
          margin-top: 0px;
          width: 275px;
          .name {
            width: 275px;
            font-size: 18px;
            color: #666;
            line-height: 37px;
            padding: 5px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .travel_bottom {
            // margin: 10px;
            margin: 0px 7px 14px 12px;
            display: flex;
            justify-content: space-between;
            .price {
              text-align: right;
              .city {
                color: #666;
              }

              span {
                color: #ff9d00;
                font-size: 24px;
              }
            }
          }
        }
      }
    }
  }
}
.h2 {
  color: #5c5c5c;
  height: 40px;
  line-height: 40px;
  margin: 20px 0px 33px;
  display: flex;
  justify-content: space-around;
  .zhuanlan {
    color: #333;
    font-size: 20px;
    margin-left: -44px;
  }
}
.hot-list {
  margin-bottom: 40px;
  .box {
    width: 260px;
    height: 200px;
    box-sizing: border-box;
    .box-top {
      width: 260px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .box-bottom {
      margin: 10px 0;
      .title {
        color: #333;
      }
      p {
        height: 60px;
        line-height: 20px;
        font-size: 14px;
        overflow: hidden;
        color: #666;
      }
    }
  }
}
.search {
  width: 600px;
  position: absolute;
  top: 80%;
  height: 240px;
  left: 50%;
  margin-left: -252px;
  margin-top: -120px; /* 盒子本身高度的一半 */
  z-index: 20;
  .el-input {
    width: 76%;
  }
}
.classify {
  width: 1200px;
  margin: 0px auto;
}
.left2 {
  margin-top: 120px;
  .more {
    cursor: pointer;
    &:hover {
      color: #ff9d00;
    }
  }
}
.left3 {
  margin-top: 120px;
  margin-bottom: 100px;
}
.footer {
  width: 100%;
  background-color: #3c3c3c;
  color: #c2c2c2;
  line-height: 22px;
  padding: 20px;
  font-size: 12px;
  ul li {
    list-style: none;
  }
  span {
    color: #ff9d00;
  }
  p {
    display: inline;
  }
  .f_content {
    display: flex;
    justify-content: space-around;
  }
  .serve {
    li {
      display: flex;
      div {
        margin-right: 20px;
      }
    }
  }
}
</style>
