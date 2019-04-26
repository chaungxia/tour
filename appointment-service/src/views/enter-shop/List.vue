<template>
    <section class="page-entershop-list">
        <div class="header-row">
            <el-button class="mr30 btn-refresh" :class="{'active':loading}" type="default" @click="refresh"><i class="el-icon-refresh"></i></el-button>
            <span class="mr20  line">在店顾客<b>{{storeInfo.inStoreCustomerNum||0}}</b></span>
            <span class="mr20  line pointer" @click="bedsState">空闲床位<b>{{storeInfo.storeLeisureNum||0}}</b></span>
            <span class="pointer" @click="jsState">空闲技师<b>{{storeInfo.freeEmployeesNum||0}}</b></span>
        </div>
        <div class="content-wrap-shop">
            <!-- right content -->
            <div class="right-wrap bg-f">
                <h3 class="tc title" v-if="!this.hasclick">请先选择在店客户，进行以下操作</h3>
                <h3 class="tc title has-customer" v-else>已选择 <span class="c-pink">{{info.customerName}}</span>，可进行以下操作</h3>
                <ul class="block-wrap" :class="{'block-selected':hasclick}">
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(1)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-diandan"></span>
                            <p>点单</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(2)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-yanquan"></span>
                            <p>验券</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(3)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-jinfang"></span>
                            <p>{{hasclick&&info.bedName?'出房':'进房'}}</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(4)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-zhuanzhang1"></span>
                            <p>转账</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(5)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-chongzhi"></span>
                            <p>充值</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(6)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-kaiqia"></span>
                            <p>开卡</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(7)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-renlianshibie"></span>
                            <p>人脸识别</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(8)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-qianming"></span>
                            <p>签名</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(9)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-jiezhang"></span>
                            <p>结账</p>
                        </div>
                    </li>
                    <li class="block-item" :class="{'disabled':disabled}" @click="linkTo(10)">
                        <div class="item-cnt tc">
                            <span class="iconfont icon-lidian"></span>
                            <p>离店</p>
                        </div>
                    </li>
                </ul>
                <div class="btn-row">
                    <el-button type="default" @click='storeregistry'><i class="el-icon-plus mr5"></i>进店登记</el-button>
                </div>
            </div>
            <!-- left content -->
            <div class="left-wrap bg-f">
                <!-- tabs -->
                <ul class="tabs-wrap">
                    <li :class="{active:tabIndex==index+1}" v-for="(item,index) in tabs" :key="index" @click="toggleTabs(index+1,item.code)">{{item.name}}</li>
                </ul>
                <!-- Swiper -->
                <div class="swiper-container tabs-content" id="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="tc nodata" v-if="list.length==0">暂无数据</div>
                            <!-- hasclick:控制选中某一个项目     -->
                            <ul class="row" :class="{hasclick:hasclick}">
                                <!-- active:控制选中当前item     -->
                                <li class="cell" :class="{active:itemIndex==index+1}" v-for="(item,index) in list" :key="index" @click="clickHandle(index+1,item)">
                                    <!--state-waiting:待服务  state-servicing：服务中  state-end :  state-leave：已离店 -->
                                    <div class="content" :class="{'state-waiting':item.state==1,'state-servicing':item.state==2,'state-end':item.state==3,'state-leave':item.state==4}">
                                        <p class="name-pic">
                                            <span class="name animation">{{item.customerName}}</span><span class="icon-vip ib ml5" v-if="item.memberType==1"><i class="iconfont animation">v</i></span><br>
                                            <span class="state ib animation">{{item.state==1?'待服务':item.state==2?'服务中':item.state==3?'已服务':item.state==4?'已离店':''}}</span>

                                            <img class="pic" :src="item.customerAvatar||require('../../assets/img/pic_default.png')" alt="">
                                            <span class="pic-msk animation"></span>
                                        </p>
                                        <div class="info">
                                            <p class="row-item animation">
                                                <i class="iconfont  icon-jishi11 animation"></i>
                                                <span v-if="item.technicianName">{{item.technicianName?item.technicianName.split(',')[0]:''}} 等{{item.technicianName?item.technicianName.split(',').length:''}}人</span>
                                                <span v-else>--</span>
                                            </p>
                                            <p class="row-item animation">
                                                <i class="iconfont icon-chuangwei animation"></i>
                                                <span>{{item.bedName?item.bedName:'未安排'}}</span>
                                            </p>
                                            <p class="row-item animation">
                                                <i class="iconfont icon-shijian animation"></i>
                                                <!-- fmtDate(scope.row.createTime,'yyyy-MM-dd hh:mm:ss')||'--' -->
                                                <span>{{item.period?Number((item.period/60).toFixed(0)):'--'}}</span>
                                            </p>
                                        </div>
                                        <span v-if="item.state==1" class="btm-item animation">已等待{{item.waitTiem?Number((item.waitTiem/60).toFixed(0))+'分钟':'--'}}</span>
                                        <span v-if="item.state==2" class="btm-item animation">已服务{{item.serviceTime?Number((item.serviceTime/60).toFixed(0))+"分钟":'--'}}</span>
                                        <span v-if="item.state==3" class="btm-item animation">{{item.orderEndTime?fmtDate(item.orderEndTime,'yyyy-MM-dd hh:mm:ss')+'完成':'未登记'}}</span>
                                        <span v-if="item.state==4" class="btm-item animation">{{item.levelTime?fmtDate(item.levelTime,'yyyy-MM-dd hh:mm:ss')+'完成结账':'--'}}</span>
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
        <!-- 进房选床位 -->
        <choose-beds :isShow='ishow' :customerName='info.customerName' :recordId='info.id' ref='choosebeds' @chooseShow="ishow = false" @chooseSuccess='chooseSuccess'></choose-beds>
        <!-- 床位状态弹框 -->
        <bed-state :isShow='bedSateShow' :storeId='storeId' @close="bedSateShow=false" ref='bedsState'></bed-state>
        <!-- 技师状态弹框 -->
        <js-state :isShow='jsSateShow' :storeId='storeId' @close="jsSateShow=false" ref='jsState'></js-state>
        <!-- 遮罩层 -->
        <transition name="el-fade-in">
            <div class="dialog-mask" v-show="ishow||bedSateShow||jsSateShow"></div>
        </transition>
    </section>
</template>

<script>
import api from '@/api/entershop'
// import dialogBeds from './components/DialogBeds'
import ChooseBeds from './components/ChooseBeds'
import BedState from './components/BedState'
import JsState from './components/JsState'
import { fmtDate } from '@/utils/common'

export default {
  components: {
    // dialogBeds,
    ChooseBeds,
    BedState,
    JsState
  },
  data () {
    return {
      tabIndex: 1,
      fmtDate,
      ishow: false, // 进房选床位dialog controll
      bedSateShow: false, // 床位状态 dialog controll
      jsSateShow: false, // 床位状态 dialog controll
      storeId: '2',
      state: '',
      hasclick: false,
      itemIndex: '',
      info: '',
      customerId: '',
      disabled: true,
      storeInfo: {
        inStoreCustomerNum: 0,
        freeEmployeesNum: 0,
        storeLeisureNum: 0
      },
      loading: false,
      tabs: [{
        name: '所有服务',
        code: ''
      },
      {
        name: '待服务',
        code: '1'
      },
      {
        name: '服务中',
        code: '2'
      },
      {
        name: '已服务',
        code: '3'
      },
      {
        name: '已离店',
        code: '4'
      }
      ],
      list: []
    }
  },
  mounted () {
    this.getList()
    this.storeData()
    this.initSwiper()
  },
  methods: {
    toggleTabs (index, state) {
      this.state = state
      this.tabIndex = index
      this.getList()
    },
    clickHandle (index, item) {
      this.hasclick = true
      this.itemIndex = index
      this.info = item
      this.disabled = false
    },
    bedsState () {
      this.bedSateShow = true
      this.$refs.bedsState.fetchData()
    },
    jsState () {
      this.jsSateShow = true
      this.$refs.jsState.innitSwiper()
    },
    storeregistry () {
      this.$router.push('/store-registry')
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
        },
        mousewheel: true
      })
    },
    getList () {
      api
        .enterCustomers({
          state: this.state
        })
        .then(res => {
          this.list = res.data
        })
    },
    storeData () {
      api.storeInfo().then(res => {
        this.storeInfo = res
      })
    },
    linkTo (id) {
      let path = ''
      switch (id) {
        case 1:
          path = '/'
          break
        case 2:
          path = '/'
          break
        case 3:
          if (this.info.bedName) { // 出房
            api.getOut(this.info.id).then(() => {
              this.$message({
                type: 'success',
                message: '出房成功'
              })
              this.chooseSuccess()
            })
          } else { // 进房
            this.ishow = true
            this.$refs.choosebeds.getList()
          }
          break
        case 4:
          path = '/'
          break
        case 5:
          path = '/Payment'
          break
        case 6:
          path = '/'
          break
        case 7:
          path = '/'
          break
        case 8:
          path = '/'
          break
        case 9:
          path = '/'
          break
        case 10:
          path = '/'
          break
      }
      if (id !== 3 && id !== 5) {
        return
      }
      this.$router.push(path)
    },
    refresh () {
      this.loading = true
      this.tabIndex = 1
      this.state = ''
      this.hasclick = ''
      this.info = ''
      this.itemIndex = ''
      this.customerId = ''
      this.loading = false
      this.disabled = true
      this.storeData()
      this.getList()
    },
    chooseSuccess () {
      this.hasclick = ''
      this.info = ''
      this.disabled = true
      this.getList()
    }
  }
}
</script>

<style lang="scss">
@import "./list.scss";
</style>
