<template>
  <transition name="el-fade-in">
    <div class="dialog-beds-state" v-show="show">
      <div class="dialog-content-wp pr">
        <h3 class="title tc bg-f pr">当前选择<span class="customer ml5 mr5">{{customerName}}</span>女士，请选择以下空闲床位 <el-button type="text" class="btn-close pa" icon='el-icon-close' @click="close"></el-button>
        </h3>
        <div class="content-wrap pa bg-f box-shadow">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="tc nodata" v-if="list.length==0">暂无数据</div>
                <ul class="row">
                  <li class="cell" :class="{'empty':item.state=='1'}" v-for="(item,index) in list" :key="index" @click="checkedItem=item;checked=true">
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
        <el-button class="btn-sure  pa" :disabled="
            !checked" :class="{'disabled':!checked}" @click="chooseBed">确定选择<span class="ml5" v-if="checked">床位 【{{checkedItem.bedName}}】</span></el-button>
      </div>
    </div>
  </transition>
</template>

<script>
import Cookies from 'js-cookie'
import api from '@/api/entershop'
import { setTimeout } from 'timers'
export default {
  props: {
    isShow: {
      default: ''
    },
    recordId: {
      default: ''
    },
    customerName: {
      default: ''
    }
  },
  data () {
    return {
      show: false,
      checked: false,
      checkedItem: '',
      list: []
    }
  },
  watch: {
    isShow (val) {
      return (this.show = val)
    }
  },
  mounted () {
    // this.initSwiper();
    // this.getList();
  },
  methods: {
    initSwiper () {
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
          //   hide: true
          // draggable: true,//该参数设置为true时允许拖动滚动条
        },
        mousewheel: true
      })
    },
    chooseBed () {
      if (!this.checked) {
        this.$message({
          type: 'warning',
          message: '请选择床位'
        })
        return
      }
      api.chooseBed({
        registration_id: this.recordId,
        workposition_id: this.checkedItem.bedId,
        workposition_name: this.checkedItem.bedName
      }).then(() => {
        this.$message({
          type: 'success',
          message: '床位选择成功'
        })
        this.$emit('chooseSuccess')
        this.close()
      })
    },
    getList () {
      const storeId = Cookies.get('storeId')
      api
        .getBeds({
          store_id: storeId
        })
        .then(res => {
          this.list = res.workpositions
          setTimeout(() => {
            this.initSwiper()
          }, 200)
        })
    },
    close () {
      this.checked = false
      this.checkedItem = ''
      this.$emit('chooseShow')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-beds-state {
    position: fixed;
    width: 990px;
    height: 620px;
    background: #fff;
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
      padding: 34px;
      font-size: 16px;
      color: #272636;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    .content-wrap {
      left: 20px;
      right: 20px;
      bottom: 100px;
      top: 86px;
    }
    .btn-close {
      right: 20px;
      color: #272636;
      font-size: 18px;
      top: 5px;
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
        width: 25%;
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
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      height: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0 10px;
    }
    .customer {
      color: #ff5183;
    }
    .btn-sure {
      bottom: 26px;
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      width: 260px;
      height: 50px;
      background: #ff5183;
      color: #fff;
      &.disabled {
        background: rgba(255, 196, 213, 1);
      }
    }
  }
</style>
