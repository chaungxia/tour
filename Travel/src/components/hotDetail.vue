<template>
  <div class="hot-contain">
    
    <div class="top">
      <div class="image">
      <img :src="detailUrl||require('../../static/吃.jpeg')">
    </div>
    <div class="user-img">
      <img :src="list.simpleUrl||require('../../static/吃.jpeg')" alt="">
      </div>
    </div>
    <div class="user">
      <span class="name">{{list.userName}}</span>
      <span class="time">{{list.date}}</span>
    </div>
    <div class="detail-content">
      <h2>{{list.title}}</h2>
      <p>{{list.content}}</p>
      <div class="img" v-for="(item,index) in list.upUrl" :key="index">
        <img :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      list: [],
      id: "",
      detailUrl:''
    };
  },

  mounted() {
    if (this.$route.query) this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    // 获取详情
    getDetail() {
      var params = {
        id: this.id
      };
      request({
        url: "/getTravelDetail/" + params.id,
        method: "get",
        params
      })
        .then(res => {
          if (res.data.errno == 0) {
            res.data.data.date=res.data.data.date.slice(0,10)
            this.list = res.data.data;
            this.detailUrl=res.data.data.upUrl[0]
            
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-contain{
  .top{
    // margin-top: 20px;
  position: relative;
 .image{
   width:100%;
   height: 400px;
   img{
     width: 100%;
     height: 100%;
   }
 }
 .user-img{
   position: absolute;
   bottom: 50%;
   margin-bottom: -260px;
   margin-left: 150px;
   img{
     width: 120px;
     height: 120px;
     border-radius: 50%;
   }
 }
}
.user{
    color: #475669;
     
     text-align: center;
     margin-top: 10px;
     .name{
       margin-right: 50px;
       color: #ff9d00;
       font-size: 24px;
     }
     .time{
       font-size: 18px;
     }
}
.detail-content{
  width: 800px;
  margin: 50px auto;
  h2{
    text-align: center;
  }
  p{
    color: #333;
    line-height: 28px;
    font-size: 18px;
    text-indent: 2em;
  }
  img{
    width: 100%;
    height: 400px;
  }
}
}
</style>

