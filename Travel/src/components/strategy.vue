<template>
  <div class="strategy">
    <div class="img">
      <img src="../../static/图片.jpeg" alt>
    </div>
    <el-row :gutter="20">
      <!-- <el-col :span="6">
        <div class="h2">旅游攻略导航</div>
        <ul class="ul">
          <li v-for="itm in city" :key="itm.id" class="citys">
            <span class="city">{{itm.n}}</span>
          </li>
        </ul>
      </el-col> -->
      <el-col :span="24">
        <div class="h2">推荐攻略</div>
        <ul class="info">
          <li class="box" v-for="(item,index) in list" :key="index" @click="hotClick(item)">
            <div class="caption">{{item.caption}}</div>
            <div class="title">{{item.detailInfo[0]}}</div>
            <div class="image">
              <div v-for="(url,lll) in item.url" :key="lll+url" class="images">
                <img class="img1" :src="url" alt>
              </div>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      list: [],
      detailInfo: [],
      id: "",
      city: []
    };
  },
  mounted() {
    this.getList();
    this.getCity();
  },
  methods: {
    getList() {
      request({
        url: "/getStrategy",
        method: "get"
      }).then(res => {
        // console.log(res.data.list);
        if (res.data.errno == 0) {
          res.data.list.map(el => {
            this.detailInfo = el.detailInfo;
          });
          this.list = res.data.list;
        }
      });
    },
    hotClick(item) {
      // console.log(item._id);
      this.$router.push({
        path: "/Strategy_detail", //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
          id: item._id
        }
      });
    },
    // 获取城市列表
    getCity() {
      request({
        url: "/getCity",
        method: "get"
      }).then(res => {
        // console.log(">>>>>",res.data.list[0].city);
        if (res.data.errno == 0) {
          this.city = res.data.list[0].city;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.strategy {
  width: 1200px;
  margin: 0 auto;
  .img {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  li {
    list-style: none;
  }
  .h2 {
    margin: 20px 0;
    font-size: 20px;
    color: #333;
    margin-left: 36px;
  }
  .ul {
    .citys {
      // margin-left: 28px;

      .city {
        background-color: #ff9d00;
        font-size: 18px;
        color: #ffffff;
        padding: 10px 30px;
        display: block;
        margin-bottom: 10px;
        line-height: 24px;
        width: 100px;
      }
    }
  }

  .info {
    .box {
      padding: 20px;
      margin-bottom: 20px;
      background-color: #fcfcfc;
      cursor: pointer;
      .caption {
        font-size: 24px;
        //
      }
      &:hover {
        color: #ff9d00;
      }
      .title {
        margin: 20px 0;
        color: #333;
      }
      .image {
        overflow: hidden;
        
        .images {
          width: 256px;
          height: 170px;
          float: left;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    &:hover {
    }
  }
}
</style>
