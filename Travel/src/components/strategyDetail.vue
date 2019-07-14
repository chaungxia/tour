<template>
  <div class="strategy">
    <div class="info">
      <h1>{{list.caption}}</h1>
      <h2>{{list.title}}</h2>
      <p class="detailInfo" v-for="(itm,idx) in list.detailInfo" :key="idx">{{itm}}</p>
      <div class="image">
        <img :src="list.url1" alt>
      </div>
      <h2 class="trafic">{{list.traficTitle}}</h2>
      <div v-for="(item,index) in list.traficContent" :key="index+item">
        <div>{{item}}</div>
      </div>
      <div class="image">
        <img :src="list.url2" alt>
      </div>
      <p>{{list.attention}}</p>
      <h2>{{way1}}</h2>
      <img class="img1" :src="list.url3" alt>
      <p class="content1" v-for="content1 in list.content1" :key="content1+list.id">{{content1}}</p>
      <div v-for="(url,lll) in list.url" :key="lll+url">
        <img class="img1" :src="url" alt>
      </div>
      <p v-for="content2 in list.content2" :key="content2+list.id">{{content2}}</p>
      <h2>{{way2}}</h2>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      list: [],
      detailInfo: [],
      id:'',
      way1:'',
      way2:''
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
        url: "/getStrategy/" + params.id,
        method: "get",
        params
      })
        .then(res => {
          console.log('>>>>',res.data.data)
          console.log('>>>>',)
          if (res.data.errno == 0) {
            this.way1=res.data.data.way[0];
             this.way2=res.data.data.way[1];
            this.list = res.data.data;
            
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.strategy {
  width: 1200px;
  margin: 0 auto;

  .info {
    width: 800px;
    margin: 0 auto;
    // line-height: 28px;
    h1 {
      margin: 20px 0;
    }
    .detailInfo {
      color: #333;
      font-size: 18px;
    }
    .image {
      width: 850px;
      height: 400px;
      margin: 20px 0 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img1 {
      display: block;
      width: 850px;
      height: 400px;
      margin: 20px 0;
    }
    .content1 {
      color: #666;
      font-size: 18px;
      line-height: 28px;
    }
  }
}
</style>
