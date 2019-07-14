<template>
  <div class="userCenter">
    <div class="userCenter_top">
      <p style="margin:0">
        <img :src="require('../../static/purse.png')" @click="image()" alt>
      </p>
      <p>{{userInfo.userName}}</p>
      <p style="margin:0">
        <el-button type="primary" @click="logout()">退出登录</el-button>
      </p>
    </div>
    <div class="userCenter_list">
      <el-tabs type="border-card">
        <el-tab-pane label="个人信息">
          <el-form label-width="80px" class="demo-form">
            <el-form-item label="用户名">
              <el-input v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-radio-group v-model="radio2">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="3">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input type="textarea" v-model="userInfo.info"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sumbit()">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="我的预定">
          <el-table :data="OrderTable" stripe style="width: 100%">
            <el-table-column prop="travelName" label="景点"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="$router.push({path:'/travelDetail',query:{id:scope.row.travelId}})"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button type="text" size="small" @click="deletTick(scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的发布">
          <el-table :data="publishTable" stripe style="width: 100%">
            <el-table-column prop="travelName" label="景点"></el-table-column>
            <el-table-column prop="comment" label="评论"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="$router.push({path:'/travelDetail',query:{id:scope.row.travelId}})"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button type="text" size="small" @click="deleteComment(scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的游记">
          <el-table :data="getHotTable" stripe style="width: 100%">
            <el-table-column v-if="userlId==this.id" show-overflow-tooltip prop="title" label="标题"></el-table-column>
            <el-table-column
             
              show-overflow-tooltip
              prop="content"
              label="标题"
            ></el-table-column>
            <el-table-column  show-overflow-tooltip prop="content" label="介绍"></el-table-column>
            <el-table-column  show-overflow-tooltip prop="date" label="日期"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="$router.push({path:'/hotDetail',query:{id:scope.row.travelId}})"
                  type="text"
                  size="small"
                >查看</el-button>
                <el-button type="text" size="small" @click="deleteHot(scope.row._id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { getToken, removeToken } from "@/utils/user";
export default {
  name: "userCenter",
  data() {
    return {
      userInfo: {},
      radio2: "",
      OrderTable: [],
      publishTable: [],
      getHotTable: [],
      id: "",
      userlId: ""
    };
  },
  mounted() {
    this.getUserInfo();
    this.getPublish();
    this.getTicketList();
    this.getHotTravel();
    this.id = getToken("USERNAME");
    console.log("<<<<", this.id);
  },
  methods: {
    // 获取用户详情
    getUserInfo() {
      var params = {
        id: getToken("TRAVELUSER")
      };
      request({
        url: "/getUserDetail/" + params.id,
        method: "get",
        params
      })
        .then(res => {
          if (res.data.errno == 0) {
            this.userInfo = res.data.data;
            (this.userName = res.data.data.userName),
              (this.radio2 = res.data.data.gender);
          }
        })
        .catch(err => {});
    },

    // 修改个人资料
    sumbit() {
      var data = {
        id: this.userInfo._id,
        userName: this.userInfo.userName,
        gender: this.radio2,
        info: this.userInfo.info
      };
      // console.log(data);
      request({
        url: "/modifUser",
        method: "post",
        data
      })
        .then(res => {
          if (res.data.errno == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getUserInfo();
          }
        })
        .catch(res => {});
    },

    // 获取我的预定
    getPublish() {
      var params = {
        id: getToken("TRAVELUSER")
      };
      request({
        url: "/getMyTickets/" + getToken("TRAVELUSER"),
        method: "get",
        params
      })
        .then(res => {
          if (res.data.errno == 0) {
            this.OrderTable = res.data.data;
          }
        })
        .catch(err => {});
    },
    // 删除评论
    deleteComment(id) {
      this.$confirm("确定删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            id
          };
          request({
            url: "/deletComment/" + params.id,
            method: "delete",
            params
          })
            .then(res => {
              if (res.data.errno == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getTicketList();
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除门票预定
    deletTick(id) {
      this.$confirm("确定删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            id
          };
          request({
            url: "/delet/" + params.id,
            method: "delete",
            params
          })
            .then(res => {
              console.log("qqqqq");
              if (res.data.errno == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getPublish();
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取我的发布
    getTicketList() {
      var params = {
        id: getToken("TRAVELUSER")
      };
      request({
        url: "/getMyCommentList/" + getToken("TRAVELUSER"),
        method: "get",
        params
      })
        .then(res => {
          if (res.data.errno == 0) {
            this.publishTable = res.data.data;
          }
        })
        .catch(err => {});
    },
    // 我的发布游记
    getHotTravel() {
      request({
        url: "/getHotTravel",
        method: "get"
      }).then(res => {
        // console.log(res.data.data, ">>>");
        if (res.data.errno == 0) {
          res.data.data.map(el => {
            el.date = el.date.slice(0, 10);
            this.userlId = el.userName;
          });
          this.getHotTable = res.data.data;
          // console.log(this.getHotTable, "<<<<<<<<");
        }
      });
    },
    // 删除游记
    deleteHot(id) {
      this.$confirm("确定删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = {
            id
          };
          request({
            url: "/deletHot/" + params.id,
            method: "delete",
            params
          })
            .then(res => {
              console.log(">>>>>");
              if (res.data.errno == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
               this.getHotTravel();
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 退出登录
    logout() {
      this.$confirm("确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeToken("TRAVELUSER");
          removeToken("USERNAME");
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.userCenter_top {
  width: 100%;
  height: 320px;
  background-color: #fafafa;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.userCenter_top img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.userCenter_list {
  width: 1000px;
  margin: 0 auto;
  margin-top: -40px;
  margin-bottom: 30px;
}

.demo-form {
  width: 500px;
  margin: 10px auto;
}
</style>
