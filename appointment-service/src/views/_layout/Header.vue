<template>
  <div class="wrap">
      <div class="app_header_wrap clearfix">
    <div class="app_header_fixed">
      <div class="fl header_lf">
        <img src="../../assets/img/feiji.png">Travel
      </div>
      <div class="fl app_nav">
        <app-nav/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AppNav from './Nav.vue'
import Cookies from 'js-cookie'
import { clearCookies } from '@/utils/common'

export default {
  components: { AppNav },
  data () {
    return {
      loginName: Cookies.get('loginName')
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'a':
          this.$router.replace({ path: '/index' })
          break
        case 'b':
          let CookiesNames = [
            'token',
            'storeId',
            'storeName',
            'loginId',
            'loginName',
            'avatar',
            'positionName',
            'account',
            'password',
            'loginIn'
          ]
          clearCookies(CookiesNames)
          // this.$router.replace({ path: '/Login' })
          // location.href = 'http://0.0.0.0:8081/#/Login?redirect=' + encodeURIComponent(location.href)
          break
      }
    }
  },
  mounted () {}
}
</script>
<style lang="scss">
.ad_xmg_dropdown {
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #ff9d00;
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.wrap{
  margin-right: 50px;
  .app_header_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  .app_header_fixed {
    margin: 0 20%;
    .header_lf {
      line-height: 66px;
      color: #395366;
      position: relative;
      font-size: 16px;
      font-weight: 600;
      padding-left: 66px;
    }
    .app_nav{
      margin-left: 50px;
      // position:fixed;
      // right: 0;
      // top: 0;
    }
    img {
      width: 36px;
      height: 36px;
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
    }
    background-color: #fff;
    height: 66px;
    box-shadow: 0px 1px 0px 0px rgba(236, 236, 236, 1);
  }
}
}

* {
  box-sizing: border-box;
}
</style>
