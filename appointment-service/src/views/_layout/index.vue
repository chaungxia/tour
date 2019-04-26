<template>
  <div class="appointment-container">
    <app-header></app-header>
    <router-view class="appointment-content" />
  </div>
</template>

<script>
import AppHeader from './Header.vue'
export default {
  components: { AppHeader },
  name: 'Appointment'
}
</script>

<style lang="scss" scoped>
.appointment-container {
  padding-top: 66px;
  width: 100%;
  background-color: #f8fafb;
  color: #272636;
  height: 100%;
  box-sizing: border-box;
}
</style>

<style lang="scss">
@import "@/styles/_common.scss";
@import "@/styles/icons.scss";

.appointment-container {
  .iconfont {
    font-size: 14px;
  }
  .el-button--danger {
    color: #fff;
    background-color: #ff5183;
    border-color: #ff5183;
  }
  .appointment-content {
  }
}
</style>
