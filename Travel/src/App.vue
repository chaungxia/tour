<template>
  <div id="app">
    <el-header>
      <div class="tabBar">
        <div
          class="tab"
          :class="this_title==item.id ? 'this_title' : ''"
          v-for="item in title"
          :key="item.id+'title'"
          @click="tab(item)"
        >{{item.name}}</div>
      </div>
      <div class="login">
           <router-link v-if="isLogin" :to="{path:'/userCenter'}">个人中心</router-link>
            <router-link v-else :to="{path:'/login'}">登录</router-link>
          <router-link :to="{path:'/register'}">注册</router-link>
        </div>
    </el-header>

    <router-view></router-view>
  </div>
</template>

<script>
import { getToken } from "@/utils/user";
export default {
  name: "App",
  data: function() {
    return {
      current: "",
      isLogin: false,
      activeName: "first",
      this_title: 1,
      title: [
        {
          id: "1",
          name: "首页"
        },
        {
          id: "2",
          name: "热门游记"
        },
        {
          id: "3",
          name: "目的地"
        },
        {
          id: "4",
          name: "旅游攻略"
        }
      ]
    };
  },
  mounted() {
    this.current = this.$route.name;
    if (getToken("TRAVELUSER")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    handleClick() {},
    tab(item) {
      if (item.id == 1) {
        this.this_title = 1;
        this.$router.push({
          path: "/"
        });
      }
      if (item.id == 2) {
        this.this_title = 2;
        this.$router.push({
          path: "/hot"
        });
      }
      if (item.id == 3) {
        this.this_title = 3;
        this.$router.push({
          path: "/destination"
        });
      }
      if (item.id == 4) {
        this.this_title = 4;
        this.$router.push({
          path: "/Strategy"
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.current = to.path;
      if (getToken("TRAVELUSER")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
  }
};
</script>

<style lang="scss">
// .app{
.this_title {
  background-color: #ff9d00;
  color: #fff;
}
.tab {
  padding: 10px 20px 10px;
}
.el-header {
  padding: 0px 20px 20px;
  margin-bottom: 10px;
  font-size: 20px;
    display: flex;
  justify-content: space-around;
  margin-right: 200px;
}
.tabBar {
  width: 600px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  color: #ff9d00;
  div {
    cursor: pointer;
  }
}
 .login {
  a {
    color: #ff9d00;
    display: inline-block;
    padding: 0 5px;
    height: 60px;
    line-height: 60px;
    text-decoration: none;
    font-size: 20px;
    margin-top: -10px;
  }
}

.user a {
  font-size: 14px;
  color: #ff9d00;
}

</style>
