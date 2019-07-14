<template>
  <div style>
    <div class="hot-list">
      <div class="header">
        <div class="hot" @click="$router.push('/hot')">热门游记</div>
        <div class="write" @click="createBtn()">
          <i class="el-icon-edit">写游记</i>
        </div>
      </div>
      <div class="hot">
        <div v-for="(item,index) in List" :key="index" class="cards">
          <div class="card">
            <div class="image">
              <img :src="item.arr||require('../../static/吃.jpeg')">
            </div>
            <div class="text">
              <div class="name" @click="hotClick(item)">{{item.title}}</div>
              <div class="info">{{item.content}}</div>
              <div class="user"><span class="nam">{{item.userName}}</span>  <span class="date">{{item.date}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/user";
import { fmtDate } from "@/utils/validate";
export default {
  data() {
    return {
      list: [],
      allList: [],
      List: [],
      arrImg:[],
      simpleUrl:''
    };
  },
  mounted() {
    this.GetList();
  },
  methods: {
    GetList() {
      request({
        url: "/getHotTravel",
        method: "get"
      }).then(res => {
        //  console.log(res.data.data,'>>>',)
        if (res.data.errno == 0) {
          res.data.data.map(el => {
            // this.simpleUrl=el.upUrl[0]
            el.date=el.date.slice(0,10)
            el.arr=el.upUrl[0]
            // console.log('>>>',el.upUrl)
          });
          this.List = res.data.data;
        }
      });
    },

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
    createBtn() {
      if (!getToken("TRAVELUSER")) {
        this.$message({
          message: "请登录后填写游记",
          type: "warning"
        });
        return;
      }
      this.$router.push("/create_hotDetail");
    }
  }
};
</script>

<style lang="scss">
.hot-list {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  .header {
    width: 260px;
    display: flex;
    justify-content: space-around;
    div {
      width: 100px;
      height: 50px;
      padding: 12px 0px;
      background-color: #ff9d00;
      color: #fff;
      font-size: 18px;
      text-align: center;
      border-radius: 5px;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .hot{
    width: 1200px;
  }
  .cards{
    margin-top: 20px;
    height: 200px;
    box-sizing: border-box;
  }
  .card {
    display: flex;
    justify-content: space-between;
    background-color: #fafbfc;
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
      width: 900px;
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
      .info{
        line-height: 24px;
        
      }
      .user{
        margin-left: 150px;
        margin-top: 20px;
        .nam{
          color: #ff9d00;
        margin-right: 100px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.hot-list {
}
</style>

