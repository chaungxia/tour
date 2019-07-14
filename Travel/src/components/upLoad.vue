<template>
  <div class="upLoad-travel">
    <el-form label-width="60px" class="demo-ruleForm" :model="form" ref="form">
      <el-form-item>
        <el-input v-model="form.title" placeholder="请在这里输入标题"></el-input>
        <el-input type="textarea" v-model="form.content" :rows="5" placeholder="请在这里输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="upload_pic">
          <img v-for="(item,index) in form.addArrImg" :key="index+'arrImg'" :src="item" alt>
          <div>
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="up">上传图片</div>
            <input
              type="file"
              id="picData"
              class="filepath"
              @change="onRead(this)"
              accept="image/jpg, image/jpeg, image/png, image/PNG"
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <!--  -->
        <el-button :disabled="!(form.title&&form.content&&form)" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/user";
import { fmtDate } from "@/utils/validate";
export default {
  data() {
    return {
      // addArrImg: [],
      list: [],
      id: "",
      form: {
        title: "",
        date: "",
        content: "",
        addArrImg: []
      }
    };
  },
  mounted() {
    this.getList();
    // let yearMonthDay = fmtDate(new Date(), 'yyyy-MM-dd')
  },
  methods: {
    // 获取列表
    getList() {
      request({
        url: "/getHotTravel",
        method: "get"
      }).then(res => {
        console.log(">>>", res);
        if (res.data.errno == 0) {
          this.list = res.data.data;
        }
      });
    },
    onRead(e) {
      var picData = new FormData(); //实例化文件对象
      picData.append("sendImg", document.getElementById("picData").files[0]); //将上传文件的添加到文件中
      request({
        url: "/uploadPic",
        header: {
          "Content-type": "multipart/form-data"
        },
        contentType: false, //不可缺参数
        processData: false, //不可缺参数
        method: "post",
        data: picData
      })
        .then(res => {
          this.form.addArrImg.push(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit(formName) {
      this.form.date = new Date();
      var data = {
        userlId: getToken("TRAVELUSER"),
        userName: getToken("USERNAME"),
        title: this.form.title,
        date: this.form.date,
        content: this.form.content,
        upUrl: this.form.addArrImg
      };
      request({
        url: "/addTravel",
        method: "post",
        data
      })
        .then(res => {
          if (res.data.errno == 0) {
            this.$message({
              message: "发布成功",
              type: "success"
            });
            this.$router.push({
              path: "/hot"
            });
            // this.form.date = "";
            this.form.title = "";
            this.form.content = "";
            this.form.addArrImg = "";
            // this.$refs[formName].resetFields();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      // this.form.date = "";
      this.form.title = "";
      this.form.content = "";
      this.form.addArrImg = "";
      // this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.upLoad-travel {
  .el-textarea {
    margin-top: 20px;
  }
  .el-button {
    background-color: #ff9d00;
    color: #fff;
    border: none;
  }
}
</style>

<style lang="scss" scoped>
.upLoad-travel {
  width: 800px;
  margin: 0 auto;
  .upload_pic {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .upload_pic img {
    max-width: 220px;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 150px;
    height: 150px;
    border-radius: 5px;
  }

  .upload_pic > div {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    position: relative;
  }

  .upload_pic > div input {
    position: absolute;
    width: 150px;
    height: 150px;
    opacity: 0;
    top: 0;
    left: 0;
  }

  .upload_pic > div i {
    font-size: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -20px;
    margin-top: -20px;
  }
  .upload_pic > div .up {
    color: #333;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -27px;
    margin-top: 26px;
  }
}
</style>

