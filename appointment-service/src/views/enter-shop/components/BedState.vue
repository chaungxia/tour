<template>
    <transition name='el-fade-in'>
        <div class="dialog-entershop-state" v-show="show">
            <div class="dialog-box pr">
                <h4 class="title pr tc bg-f">
                    床位状态
                    <el-button class="btn-close pa" type='text' icon='el-icon-close' @click="close"></el-button>
                </h4>
                <!-- 左侧内容 -->
                <div class="left">
                    <ul class="tabs">
                        <li :class="{'active':tabIndex==index+1}" v-for="(item,index) in tabs" :key='index' @click="toggleTabs(index+1,item)">{{item.name}}</li>
                    </ul>
                    <div class="swiper-box pa">
                        <!-- Swiper -->
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <ul class="cell-box">
                                        <li class="cell" :class="{'empty':item.state==1}" v-for="(item,index) in list" :key="index">
                                            <div class="content">
                                                <p class="row1 pr tr mb15">
                                                    <span class="rom-no pa">{{item.bedName}}</span>
                                                    <span class="flag1 flag ib">空闲</span>
                                                    <span class="flag2 flag ib">{{item.estimateEndTime?item.estimateEndTime.substring(item.estimateEndTime.length-9):''}} 结束</span>
                                                </p>
                                                <p class="row2">
                                                    <i class="iconfont icon-xuanzekehu mr5"></i>{{item.customerName}}
                                                </p>
                                                <p class="row3 clearfix mb5">
                                                    <span class="fl">已服务{{item.allredyServiceTime||0}}分钟</span>
                                                    <span class="fr">共{{item.period||0}}分钟</span>
                                                </p>
                                                <p class="row4 pr">
                                                    <span class="progessbar pa" :style="{width:Number(item.allredyServiceTime)/Number(item.period)*100+'%'}"></span>
                                                </p>
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
                        <p class="table-cell ws5 f14 pr">空闲床位<span class="num ml20">{{leisureTotalCount}}</span></p>
                        <p class="table-cell ws5 f14">总床位<span class="num ml20">{{allTotalCount}}</span></p>
                    </div>
                    <div class="right-content">
                        <!-- Swiper -->
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <ul class="grid-box">
                                        <li class="grid" :class="{'active':item.state==1}" v-for="(item,index) in list" :key='index'>
                                            <div class="content">{{item.bedName}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Add Scroll Bar -->
                            <div class="swiper-scrollbar"></div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import api from '@/api/entershop'
import { setTimeout } from 'timers'
import Cookies from 'js-cookie'
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
      state: '',
      id: '',
      show: false,
      allTotalCount: '',
      leisureTotalCount: '',
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
      list: [{
        'bedId': '1',
        'bedName': '801',
        'state': '1',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '45',
        'customerName': ''
      }, {
        'bedId': '2',
        'bedName': '802',
        'state': '2',
        'period': '90',
        'allredyServiceTime': '30',
        'estimateEndTime': '2018-01-01 08:30:00',
        'customerId': '23',
        'customerName': '怀旧'
      }, {
        'bedId': '3',
        'bedName': '803',
        'state': '3',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '56',
        'customerName': '王琳琳'
      }, {
        'bedId': '4',
        'bedName': '804',
        'state': '1',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '45',
        'customerName': ''
      }, {
        'bedId': '5',
        'bedName': '805',
        'state': '2',
        'period': '90',
        'allredyServiceTime': '30',
        'estimateEndTime': '2018-01-01 08:30:00',
        'customerId': '23',
        'customerName': '怀旧'
      }, {
        'bedId': '6',
        'bedName': '806',
        'state': '3',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '56',
        'customerName': '王琳琳'
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
  },
  methods: {
    toggleTabs (index, item) {
      this.tabIndex = index
      this.state = item.code
      this.fetchData()
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
    },
    fetchData () {
      const storeId = Cookies.get('storeId')
      api.getBeds({
        store_id: storeId,
        state: this.state
      }).then(res => {
        this.list = res.workpositions
        this.leisureTotalCount = res.leisureTotalCount
        this.allTotalCount = res.allTotalCount
        setTimeout(() => {
          this.innitSwiper()
        }, 200)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "sate";
</style>
