<template>
  <div class="dialog-beds-state">
    <div class="dialog-content-wp pr">
      <h3 class="title tc bg-f pr">床位状态
        <el-button type="text" class="btn-close pa" icon='el-icon-close'></el-button>
      </h3>
      <div class="dialog-content">
        <!-- left content  -->
        <div class="left pa bg-f box-shadow">
          <div class="left-cnt pr">
            <ul class="tabs-wrap">
              <li :class="{'active':currentTab==index+1}" v-for="(item,index) in tabs" :key="index"
                  @click="toggleTabs(index+1)">{{item.name}}
              </li>
            </ul>
            <div class="swiper-container tabs-content">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="tc nodata" v-if="list.length==0">暂无数据</div>
                  <ul class="row">
                    <li class="cell" :class="{'empty':item.state=='1'}" v-for="(item,index) in list" :key="index"
                        @click="chooseBed(item)">
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
                          <span class="progessbar pa"
                                :style="{width:Number(item.allredyServiceTime)/Number(item.period)*100+'%'}"></span>
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
        <!-- right content -->
        <div class="right pa bg-f box-shadow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import api from '@/api/entershop'

export default {
  data () {
    return {
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
      currentTab: 1,
      list: [{
        'bedId': '1',
        'bedName': '68',
        'state': '1',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '',
        'customerName': ''
      },
      {
        'bedId': '2',
        'bedName': '88',
        'state': '2',
        'period': '90',
        'allredyServiceTime': '30',
        'estimateEndTime': '2018-01-01 08:30:00',
        'customerId': '65',
        'customerName': '张茜'
      },
      {
        'bedId': '1',
        'bedName': '68',
        'state': '1',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '',
        'customerName': ''
      },
      {
        'bedId': '2',
        'bedName': '88',
        'state': '2',
        'period': '90',
        'allredyServiceTime': '30',
        'estimateEndTime': '2018-01-01 08:30:00',
        'customerId': '65',
        'customerName': '张茜'
      },
      {
        'bedId': '1',
        'bedName': '68',
        'state': '1',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '',
        'customerName': ''
      },
      {
        'bedId': '2',
        'bedName': '88',
        'state': '2',
        'period': '90',
        'allredyServiceTime': '30',
        'estimateEndTime': '2018-01-01 08:30:00',
        'customerId': '65',
        'customerName': '张茜'
      },
      {
        'bedId': '1',
        'bedName': '68',
        'state': '1',
        'period': '',
        'allredyServiceTime': '',
        'estimateEndTime': '',
        'customerId': '',
        'customerName': ''
      },
      {
        'bedId': '2',
        'bedName': '88',
        'state': '2',
        'period': '90',
        'allredyServiceTime': '30',
        'estimateEndTime': '2018-01-01 08:30:00',
        'customerId': '65',
        'customerName': '张茜'
      }]
    }
  },
  mounted () {
    this.initSwiper()
  },
  methods: {
    toggleTabs (id) {
      this.currentTab = id
    },
    initSwiper () {
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
          // draggable: true,//该参数设置为true时允许拖动滚动条
        },
        mousewheel: true
      })
    },
    getList () {
      const storeId = Cookies.get('storeId')
      api.getBeds({
        store_id: storeId
      }).then(res => {
        this.list = res.workpositions
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .dialog-beds-state {
    position: fixed;
    width: 990px;
    height: 620px;
    background: #f8fafb;
    //   background: red;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 500;
    border-radius: 6px;

    .dialog-content-wp {
      width: 100%;
      height: 100%;
    }

    .title {
      height: 54px;
      line-height: 54px;
      font-size: 16px;
      color: #272636;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    .left {
      left: 20px;
      right: 320px;
      bottom: 20px;
      top: 74px;
      padding: 0 10px 20px;
    }

    .right {
      right: 20px;
      width: 280px;
      bottom: 20px;
      top: 74px;
    }

    .box-shadow {
      box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
      border-radius: 6px;
    }

    .btn-close {
      right: 20px;
      color: #272636;
      font-size: 18px;
      top: 5px;
    }
    .tabs-wrap {
      padding: 20px 10px;
      li {
        display: inline-block;
        font-size: 14px;
        color: #272636;
        cursor: pointer;
        margin-right: 60px;
        &.active {
          color: #ff5183;
        }
      }
    }
    .left-cnt {
      height: 100%;
    }
    .tabs-content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 55px;
      overflow: hidden;
      padding-left: 10px;
      padding-right: 10px;
      .item {
        width: 33.333%;
        box-sizing: border-box;
        .cnt {
          border: 1px solid #ccc;
          min-height: 20px;
        }
      }
    }
    .row {
      position: relative;
      margin-left: -10px;
      margin-right: -10px;
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      .cell {
        cursor: pointer;
        pointer-events: none;
        padding: 5px;
        box-sizing: border-box;
        width: 33.33333%;
      }
      .content {
        width: 100%;
        min-height: 50px;
        padding: 15px;
        box-sizing: border-box;
        border: 1px solid #ececec;
        position: relative;
        height: 142px;
      }

      .flag {
        padding: 0 10px;
        border-radius: 3px;
        color: #fff;
        font-size: 12px;
        height: 24px;
        line-height: 24px;
      }
      .flag1 {
        background: #ff5183;
        display: none;
      }
      .flag2 {
        background: #cccccc;
      }
      .rom-no {
        font-size: 22px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: #96989c;
      }
      .row2,
      .row3,
      .row4 {
        color: #96989c;
      }
      .empty {
        pointer-events: initial;
        .rom-no {
          color: #272636;
        }
        .content {
          border-color: #ffd5e1;
          background: #fff9fa;
        }
        .row2,
        .row3,
        .row4,
        .flag2 {
          display: none;
        }
        .flag1 {
          display: inline-block;
        }
      }
      .row2 {
        margin-bottom: 18px;
      }
      .row4 {
        height: 7px;
        background: #f8fafb;
        border: 1px solid #ececec;
        border-radius: 6px;
      }
      .progessbar {
        background: #cccccc;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 6px;
      }
    }
    .swiper-slide {
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }
</style>
