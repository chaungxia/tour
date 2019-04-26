<template>
    <transition name='el-fade-in'>
        <div class="dialog-entershop-state" v-show="show">
            <div class="dialog-box pr">
                <h4 class="title pr tc bg-f">
                    技师状态
                    <el-button class="btn-close pa" type='text' icon='el-icon-close' @click="close"></el-button>
                </h4>
                <!-- 左侧内容 -->
                <div class="left">
                    <ul class="tabs">
                        <li :class="{'active':tabIndex==index+1}" v-for="(item,index) in tabs" :key='index' @click="toggleTabs(index+1)">{{item.name}}</li>
                    </ul>
                    <div class="swiper-box pa">
                        <!-- Swiper -->
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <ul class="cell-box">
                                        <li class="cell js-cell" :class="{'empty':item.state==1}" v-for="(item,index) in list" :key="index">
                                            <div class="content  pr">
                                                <div class="js-top">
                                                    <p class="js-name f16 fb mb5">{{item.jsName}}</p>
                                                    <span class="js-catergary">{{item.position}}</span>
                                                    <span class="js-state pa" v-if="item.state!=2">{{item.state==1?'空闲':item.state==3?'休息':''}}</span>
                                                    <span class="end-time pa" v-if="item.state==2">{{item.endtime}}结束</span>
                                                </div>
                                                <div class="js-btm">
                                                    <span class="xc">下次预约时间</span>
                                                    <span class="time">{{item.nexttime}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Add Scroll Bar -->
                            <div class="swiper-scrollbar"></div>
                        </div>
                    </div>
                </div>
                <!-- 右侧内容 -->
                <div class="right">
                    <div class="right-top table w">
                        <p class="table-cell ws5 f14 pr">空闲技师<span class="num ml20">{{freeList.length}}</span></p>
                        <p class="table-cell ws5 f14">总技师数<span class="num ml20">{{list.length}}</span></p>
                    </div>
                    <div class="right-content">
                        <!-- Swiper -->
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <ul class="grid-box">
                                        <li class="grid  js-grid" :class="{'active':item.state==1}" v-for="(item,index) in list" :key='index'>
                                            <div class="content">{{item.jsName}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Add Scroll Bar -->
                            <div class=" swiper-scrollbar"></div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    isShow: {
      default: false
    },
    storeId: {
      default: ''
    }
  },
  data () {
    return {
      tabIndex: 1,
      id: '',
      show: false,
      tabs: [{
        name: '所有床位',
        code: ''
      }, {
        name: '空闲中',
        code: '1'
      }, {
        name: '已占用',
        code: '2'
      }],
      // state:1.空闲 2.服务 3.休息
      list: [{
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '美容师',
        'state': '1',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '客户经理',
        'state': '2',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '客户经理',
        'state': '3',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '美容师',
        'state': '1',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '客户经理',
        'state': '2',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '客户经理',
        'state': '3',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '美容师',
        'state': '1',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '客户经理',
        'state': '2',
        'endtime': '16:30',
        'nexttime': '18:30'
      }, {
        'jsId': '1',
        'jsName': '贾丽丽',
        'position': '客户经理',
        'state': '3',
        'endtime': '16:30',
        'nexttime': '18:30'
      }],
      freeList: []
    }
  },
  watch: {
    isShow (val) {
      this.show = val
      return val
    },
    storeId (val) {
      this.id = val
      return val
    }
  },
  mounted () {
    // this.innitSwiper();
    this.freeList = this.list.filter(el => {
      return el.state === 1
    })
  },
  methods: {
    toggleTabs (index) {
      this.tabIndex = index
    },
    innitSwiper () {
      /* eslint-disable no-new */
      new Swiper('.right-content .swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.right-content .swiper-scrollbar'
        },
        mousewheel: true
      })
      /* eslint-disable no-new */
      new Swiper('.swiper-box .swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-box .swiper-scrollbar'
        },
        mousewheel: true
      })
    },
    close () {
      this.id = ''
      this.show = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "sate";
</style>
