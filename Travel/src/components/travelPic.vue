<template>
  <div class="travelPic">
    <h2> <span class="share_pic">分享新图片<input type="file" id="picData" class="filepath" @change="onRead(this)"
          accept="image/jpg,image/jpeg,image/png,image/PNG"></span></h2>
    <ul>
      <li v-for="item in list" :key="item._id">
        <img :src="item.image" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  import request from "@/utils/request";
  export default {
    name: 'travelPic',
    data() {
      return {
        list:[],
        travelId:'',
      }
    },
    mounted(){
      if(this.$route.query){
        this.travelId = this.$route.query.id
      }
      this.getList();
    },
    methods: {
      // 上传图片
      onRead(e) {
        var picData = new FormData(); //实例化文件对象
        console.log(e);
        picData.append("sendImg", document.getElementById('picData').files[0]); //将上传文件的添加到文件中
        picData.append("travelId", this.travelId); 
        // console.log(file);
        request({
          url: '/uploadPic',
          header: {
            "Content-type": "multipart/form-data"
          },
          contentType: false, //不可缺参数
          processData: false, //不可缺参数
          method: "post",
          data: picData,
        }).then(res => {
          if(res.data.err == 0){
            this.getList();
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取图片列表
      getList(){
        var params = {id:this.travelId};
        request({
          url:'/getTravePic/'+params.id,
          method:'get',
          params,
        }).then(res=>{
          if(res.data.errno == 0){
            this.list = res.data.list;
          }
        }).catch(err=>{

        })
      }
    }

  }

</script>

<style scoped>
  .travelPic {
    width: 1200px;
    margin: 0 auto;
  }

  .travelPic ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }

  .travelPic ul li {
    padding: 10px;
    background: #fafafa;
    margin-right: 20px;
    margin-bottom: 15px;
    border-radius: 10px;
  }

  .travelPic ul li img {
    max-width: 520px;
  }
  .share_pic{
      display: inline-block;
      position: relative;
      font-size: 14px;
      font-weight: normal;
      width: 100px;
      overflow: hidden;
      padding: 3px 0;
      background-color: rgba(0, 0, 0, .5);
      text-align: center;
      color: #fff;
      border-radius: 5px;
      margin-bottom: -3px;
      margin-left: 5px;
  }
  .share_pic input{
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
  }

</style>
