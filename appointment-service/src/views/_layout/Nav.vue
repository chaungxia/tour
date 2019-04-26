<template>
    <div class="nav_wrap clearfix">
        <div class="nav_item fl cursor"
            :key="index"
            :class="{ active: item.active }"
            @click="switchMenu(index)"
            v-for="(item, index) in menus">
            {{item.text}}
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        { text: '首页', active: true, url: '/appointment' },
        { text: '热门游记', active: false, url: '/enter-shop-list' },
        { text: '目的地', active: false, url: '' },
        { text: '旅游攻略', active: false, url: '' },
        { text: '我的', active: false, url: '/payment' }
      ]
    }
  },

  mounted () {
    this.setMenuActive()
  },

  watch: {
    '$route' () {
      this.setMenuActive()
    }
  },

  methods: {
    setMenuActive () {
      const { fullPath } = this.$route
      const menus = this.menus
      for (let i = 0, len = menus.length; i < len; i++) {
        let topMenus = menus[i]
        if (topMenus.url === fullPath) {
          topMenus.active = true
        } else {
          topMenus.active = false
        }
      }
    },
    switchMenu (index) {
      let menus = this.menus
      this.menus = menus.map((item) => {
        item.active = false
        return item
      })
      menus[index].active = true
      this.$router.push({ path: this.menus[index].url })
    }

  }
}
</script>
<style scoped lang="scss">
.nav_wrap {
    .nav_item {
        font-size: 16px;
        color: #96989c;
        line-height: 66px;
        padding: 0 33px 0 35px;
        &.active {
            color: #272636;
            background-color: #F78536;
        }
    }
    height: 66px;
    background-color: #fff;
    box-shadow: 0px -1px 0px 0px rgba(236, 236, 236, 1);
}
</style>
