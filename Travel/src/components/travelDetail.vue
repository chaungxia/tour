<template>
  <div class="contain">
    <h2>{{detail.name}}</h2>
    <div class="cover_box">
      <img :src="detail.cover" alt="">
      <router-link :to="{path:'/travelPic',query:{id}}" class="more_cover">查看更多图片</router-link>
    </div>
    <p class="info">{{detail.detailInfo}}</p>
    <ul class="info_list">
      <li>
        <span>电话</span></br>
        {{detail.phoneNumber}}
      </li>
      <li>
        <span>网址</span></br>
        <a :href="detail.website" target="_blank">{{detail.website}}</a>
      </li>
      <li>
        <span>用时参考</span></br>
        {{detail.time}}
      </li>
    </ul>
    <ul class="info_list2">
      <li>
        <span>交通</span></br>
        {{detail.traffic}}
      </li>
      <li>
        <span>门票</span></br>
        <span>¥{{detail.ticket}}</span>
        <el-button type="danger" @click="booking()">预定</el-button>
      </li>
      <li>
        <span>开放时间</span></br>
        {{detail.openTime}}
      </li>
    </ul>
    <!-- 用户点评 -->
    <div class="comment_list">
      <h6>用户分享区：</h6>
      <ul v-if="commentList.length">
        <li v-for="(item,index) in commentList" :key="index+'commentList'">
          <p class="userName">用户名：<span>{{item.userName}}</span></p>
          <section class="user_comment">{{item.comment}}</section>
          <div class="arr_img">
            <img v-for="(img,index) in item.arrImg" :key="index+'arrImg'" :src="img" alt="">
          </div>
        </li>
      </ul>
      <p v-else class="no_share">暂无分享</p>
    </div>
    <!-- 发布点评 -->
    <div class="publish_comment">
      <h6>发布分享：</h6>
      <el-form label-width="60px" class="demo-ruleForm">
        <el-form-item label="内容：">
          <el-input type="textarea" v-model="addComment" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <div class="upload_pic">
            <img v-for="(item,index) in addArrImg" :key="index+'arrImg'" :src="item" alt="">
            <div>
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" id="picData" class="filepath" @change="onRead(this)"
                accept="image/jpg,image/jpeg,image/png,image/PNG">
            </div>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" :disabled="!addComment" @click="onSubmit()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 分享按钮 -->
    <div class="share">
      <span class="share_wx"></span></br>
      <span class="share_wb"></span>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request";
  import {
    setToken,
    getToken
  } from '@/utils/user'
  export default {
    name: 'travelDetail',
    data() {
      return {
        addComment: '',
        addArrImg: [],
        id: '',
        detail: {},
        commentList: [],

      }
    },
    mounted() {
      if (this.$route.query) this.id = this.$route.query.id;
      this.getDetail();
      this.getCommentList();
    },
    methods: {
      // 上传图片
      onRead(e) {
        var picData = new FormData(); //实例化文件对象
        console.log(e);
        picData.append("sendImg", document.getElementById('picData').files[0]); //将上传文件的添加到文件中
        picData.append("travelId", this.id); 
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
          console.log(res.data.data);
          this.addArrImg.push(res.data.data);
        }).catch(err => {
          console.log(err);
        })

      },
      //   预定
      booking() {
        if(!getToken('TRAVELUSER')){
            this.$message({
                message: '请登录后分享',
                type: 'warning'
            });
            return;
        }
        var data = {
          travelId: this.id,
          travelName: this.detail.name,
          userlId: getToken('TRAVELUSER'),
          price: this.detail.ticket,
        };
        request({
          url: '/bookingTicket',
          method: "post",
          data,
        }).then(res => {
          if (res.data.errno == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          } else {
            Toast.fail(res.data.msg);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取详情
      getDetail() {
        var params = {
          id: this.id
        };
        request({
          url: '/getTraveDetail/' + params.id,
          method: "get",
          params,
        }).then(res => {
          // console.log(res)
          if (res.data.errno == 0) {
            this.detail = res.data.data;
          }
        }).catch(err => {

        })
      },
      //提交评论
      onSubmit() {
        if(!getToken('TRAVELUSER')){
            this.$message({
                message: '请登录后再分享',
                type: 'warning'
            });
            return;
        }
        var data = {
          travelId: this.id,
          travelName: this.detail.name,
          userlId: getToken('TRAVELUSER'),
          comment: this.addComment,
          userName: getToken('USERNAME'),
          arrImg: this.addArrImg,
        }
        request({
          url: '/addComment',
          method: 'post',
          data,
        }).then(res => {
          if (res.data.errno == 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.getCommentList();
            this.addComment = '';
            this.addArrImg = [];
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取评论列表
      getCommentList() {
        var params = {
          id: this.id
        };
        request({
          url: '/getCommentList/' + params.id,
          method: "get",
          params,
        }).then(res => {
          console.log(res)
          if (res.data.errno == 0) {
            this.commentList = res.data.data;
          }
        }).catch(err => {

        })
      },
    },
  }

</script>

<style scoped>
  .contain {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .contain h2 {
    margin-bottom: 40px;
  }

  .info {
    text-align: left;
    margin: 20px auto;
    width: 800px;
    line-height: 28px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
  }

  .info_list {
    display: flex;
    list-style: none;
    width: 800px;
    margin: 10px auto;
    padding: 0;
  }

  .info_list li {
    flex-grow: 1;
    line-height: 25px;
  }

  .info_list li a {
    color: #ff9d00;
  }

  .info_list2 {
    width: 800px;
    margin: 0 auto;
    list-style: none;
    text-align: left;
    padding: 0;
    padding-top: 50px;
  }

  .info_list2 li {
    line-height: 26px;
    margin-bottom: 50px;
  }

  .info_list2 li span {
    display: inline-block;
    margin-bottom: 10px;
  }

  .comment_list {
    border-top: 1px solid #e5e5e5;
  }

  .comment_list ul {
    width: 800px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  .comment_list ul li {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
  }

  .comment_list h6 {
    width: 800px;
    margin: 0 auto;
    padding: 20px 0;
    text-align: left;
    font-size: 18px;
  }

  .comment_list h6 span {
    float: right;
    font-size: 14px;
    color: #F56C6C;
    line-height: 30px;
  }

  .comment_list h6 span:hover {
    cursor: pointer;
  }

  .userName {
    font-size: 14px;
    text-align: left;
  }

  .userName span {
    color: #ff9d00;
  }

  .user_comment {
    line-height: 22px;
    text-align: left;
    margin-bottom: 10px;
  }

  .arr_img {
    text-align: left;
  }

  .arr_img img {
    max-width: 250px;
    margin-right: 10px;
  }

  .publish_comment {
    width: 800px;
    margin: 0 auto;
    padding-top: 10px;
  }

  .publish_comment h6 {
    text-align: left;
    font-size: 18px;
    margin: 30px auto;
  }

  .demo-ruleForm {
    width: 800px;
  }

  .upload_pic {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .upload_pic img {
    max-width: 220px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .upload_pic>div {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    position: relative;
  }

  .upload_pic>div input {
    position: absolute;
    width: 150px;
    height: 150px;
    opacity: 0;
    top: 0;
    left: 0;
  }

  .upload_pic>div i {
    font-size: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -20px;
  }

  .share .share_wb {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('/static/sprite_v31.png')-246px -474px/416.6px 600px no-repeat #d84c4c;
    border-radius: 5px;
  }

  .share .share_wx {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('/static/sprite_v31.png')-306px -474px/416.6px 600px no-repeat #73a64f;
    border-radius: 5px;
  }

  .share {
    position: fixed;
    top: 50%;
    right: 0;
  }

  .cover_box {
    position: relative;
  }

  .more_cover {
    display: inline-block;
    font-size: 14px;
    position: absolute;
    left: 50%;
    bottom: 10px;
    text-decoration: none;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    margin-left: -50px;
  }

  .no_share {
    margin: 0;
    font-size: 12px;
    color: #999;
  }

</style>
