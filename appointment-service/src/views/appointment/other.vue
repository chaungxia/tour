<template>
  <div class="technician_board_wrap clearfix">
    <div class="fl left_wrap">
      <div class="input_wrap">
        <el-select v-model="value"
                   class="sel_wrap"
                   placeholder="请选择">
          <i class="iconfont icon-dianpucopy"
             slot='prefix'></i>
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="输入搜索技师"
                  @keyup.enter.native="searchTec"
                  v-model="keyword"
                  class="search_tec_wrap">
          <i slot="suffix"
             class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="swiper-container5">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <!-- <ul class="tec_wrap"> -->
            <!-- <div class="item cursor"
                :class="{tec_active:tecIndex==index}"
                v-for='(item,index) in tecData'
                @click='tecClick(item,index)'
                v-if='tecData.length'
                :key='index'>
                <img class="round_img"
                    :src="item.avatar||require('../../assets/img/pic.png')"
                    alt="">
                <ul class="info">
                    <li class="name">{{item.realname}}</li>
                    <li class="no">{{item.empNo}}</li>
                </ul>
            </div>
            <div class="item"
                v-if='tecData.length==0'
                style="text-align:center;padding:10px 0;">
                无数据
            </div> -->
            <!-- </ul> -->
            <p style="height:500px">12312</p>
            <p style="height:500px">adds</p>
          </div>
        </div>
        <!-- Add Scroll Bar -->
        <div class="swiper-scrollbar5"></div>
      </div>
    </div>
    <div class="right_wrap">
      <div class="header_wrap clearfix">
        <router-link to='/appointment/create'>
          <el-button type="danger">
            <i class="el-icon-plus"></i> 新预约
          </el-button>
        </router-link>
        <el-button>
          <i class="iconfont icon-shuaxin refresh"></i>
        </el-button>
        <!-- <el-button class="date_btn_wrap">
            <i class="icon-zuojiantou iconfont color1"
                @click="beforeDayBtn"></i>

            2018-09-30

            <i class="icon-youjiantou iconfont color1"
                @click="nextDayBtn"></i>
        </el-button> -->
        <div class="fr header_rt clearfix">
          <ul class=" label_wrap">
            <li class=" item">
                            <span class="border_color1">
                                <i class="bag_color1"></i>
                            </span>
              未确认
            </li>
            <li class=" item">
                            <span class="border_color2">
                                <i class="bag_color2"></i>
                            </span>
              已确认
            </li>
            <li class=" item">
                            <span class="border_color3">
                                <i class="bag_color3"></i>
                            </span>
              已到店
            </li>
          </ul>
          <el-button-group>
            <el-button @click="toStoreBoard">
              <i class="iconfont icon-quanlan"></i> 全览
            </el-button>
            <el-button class="btn_active">
              <i class="iconfont icon-jishi"></i> 技师
            </el-button>
            <el-button @click="toList">
              <i class="iconfont icon-liebiao"></i> 列表
            </el-button>
          </el-button-group>
        </div>

      </div>
      <div>
        <!-- 技师头像  swiper-header -->
        <div class="swiper-header">
          <div class="slot-arrow"></div>
          <div class="swiper-button-next el-icon-arrow-right cursor"
               @click='nextWeekBtn'></div>
          <div class="swiper-button-prev el-icon-arrow-left cursor"
               @click='beforeWeekBtn'></div>
          <div class="swiper-container1">
            <div class="swiper-wrapper">
              <div class="swiper-slide  swiper-no-swiping"
                   v-for='(item ,index) in theader'
                   :key="index"
                   :class="{now_day:item.week=='今天'}">
                <p class="day">{{item.day}}</p>
                <p>{{item.week}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-container swiper-scroll-parent"
             :style="{height:maxHeight+'px'}"
             id='swiper-container_id'>
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-parent swiper-body">
                <div class="left">
                  <div class="cell"
                       v-for="(item,index) in leftData"
                       :key="index">
                                        <span>
                                            {{item.date}}
                                        </span>
                  </div>
                </div>
                <div class="right">
                  <div class="swiper-container2">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide"
                           v-for='(item ,index) in content'
                           :key="index">
                        <div class="cell"
                             v-for="(it,idx) in item"
                             :key="idx">
                          <el-popover placement="right"
                                      popper-class="detail_popover"
                                      v-if='it.reservations'
                                      width="300"
                                      trigger="hover">
                            <div>
                              <p style="margin-bottom:12px;">
                                <span>预约详情</span>
                                <span class="fr"
                                      :class="'text_color'+it.reservations.detail.state">{{it.reservations.detail.state=='1'&&'未确认'||it.reservations.detail.state=='2'&&'已确认'||it.reservations.detail.state=='3'&&'已到店'}}</span>
                              </p>
                              <el-form label-width="80px"
                                       class="detail_form">
                                <el-form-item label="预约时间">
                                  <ul>
                                    <li>
                                      {{it.reservations.detail.arrivalTime}}
                                    </li>
                                    <li>
                                      约 {{it.reservations.detail.period}} 分钟
                                    </li>
                                  </ul>
                                </el-form-item>
                                <el-form-item label="到店人">
                                  <ul>
                                    <template v-if=' it.reservations.detail.customers.length'>
                                      <li v-for='(ite,ind) in it.reservations.detail.customers'
                                          :key="ind">
                                        <span class="card_relation label_bg_color4" v-if='ite.flag=="Y"'>本人</span>
                                        <span class="card_relation label_bg_color5"
                                              v-else>好友
                                        </span>
                                        {{ite.customerName }}{{ite.phone}}
                                      </li>
                                    </template>
                                    <li v-else>
                                      无
                                    </li>
                                  </ul>
                                </el-form-item>
                                <el-form-item label="服务项目">
                                  <ul>
                                    <template v-if=' it.reservations.detail.services.length'>
                                      <li v-for='(ite,ind) in it.reservations.detail.services'
                                          :key="ind">
                                        {{ite.serviceName}}
                                      </li>
                                    </template>
                                    <li v-else>
                                      无
                                    </li>
                                  </ul>
                                </el-form-item>
                              </el-form>
                              <ul class=" clearfix"
                                  v-if='it.reservations.state=="1"'
                                  :class="'btn_wrap'+it.reservations.state">
                                <li class="fl cursor"
                                    @click="confirmBtn(it)">确认到店
                                </li>
                                <li class="fl cursor">到店登记</li>
                                <li class="fl cursor"
                                    @click="cancleBtn(it)">取消
                                </li>
                              </ul>
                              <ul class=" clearfix"
                                  v-if='it.reservations.state=="2"'
                                  :class="'btn_wrap'+it.reservations.state">
                                <li class="fl cursor">到店登记</li>
                                <li class="fl cursor"
                                    @click="cancleBtn(it)">取消预约
                                </li>
                              </ul>
                            </div>
                            <div slot="reference">
                              <div @mouseenter='getDetail(it.reservations)'
                                   @click.stop="goDetail(it.reservations)"
                                   class="app_item_wrap"
                                   v-if='it.reservations'>
                                <div :style="{height:(it.reservations.period-2)*2+'px'}"
                                     class="app_item cursor"
                                     :class="'bg_color'+it.reservations.state">
                                  <p style="margin-top:6px;">{{it.reservations.start}} - {{it.reservations.end}} </p>
                                  <p>{{it.reservations.customerName}} {{it.reservations.customerPhone}} </p>
                                </div>
                              </div>
                            </div>
                          </el-popover>
                          <div class="add_wrap"
                               v-if='idx!=leftData.length-1'>
                            <i class="iconfont icon-shanchu cursor"
                               @click="cellClick(it,index)"></i>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Add Scroll Bar -->
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </div>
    <el-dialog title="请选择取消原因"
               :visible.sync="visible"
               @closed="cancelReason=''"
               center
               width="460px"
               custom-class="appointment-dialog-cancel">
      <div class="select-box text-center mb40">
        <el-button round
                   size="medium"
                   v-for="item in reasons"
                   :key="item.code"
                   @click="cancelReason=item.name">{{item.name}}
        </el-button>
      </div>
      <div class="btn-row text-center">
        <el-button class="ml10 plain-default"
                   @click="visible=false;cancelReason=''">保留预约
        </el-button>
        <el-button class="appbtn-blue"
                   type="primary"
                   @click="visible=false;confirmBtn()">确定取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fmtDate } from '@/utils/common'
import infoApi from '@/api/AppointmentInfo'
import Api from '@/api/appointmentBoard'
import Cookies from 'js-cookie'
import detailApi from '@/api/appointmentDetail'

export default {

  data () {
    return {
      item: '',
      visible: false,
      reasons: [],
      cancelReason: '',
      value: '',
      maxHeight: '400',
      options: [{ value: '', label: '选项' }],
      leftData: [
        { date: '09:00' },
        { date: '09:30' },
        { date: '10:00' },
        { date: '10:30' },
        { date: '11:00' },
        { date: '11:30' },
        { date: '12:00' },
        { date: '12:30' },
        { date: '13:00' },
        { date: '13:30' },
        { date: '14:00' },
        { date: '14:30' },
        { date: '15:00' },
        { date: '15:30' },
        { date: '16:00' },
        { date: '16:30' },
        { date: '17:00' },
        { date: '17:30' },
        { date: '18:00' },
        { date: '18:30' },
        { date: '19:00' },
        { date: '19:30' },
        { date: '20:00' },
        { date: '20:30' },
        { date: '21:00' },
        { date: '21:30' },
        { date: '22:00' }
      ],
      content: [],
      theader: [],
      beforeDate: '',
      nextDate: '',
      'noTechnicianCount': '', // "int,待安排技师预约数",
      'totalCount': '', // "int,总预约数",
      tecIndex: 'x',
      tecData: [], // 员工
      yearMonthDay: new Date(),
      keyword: ''
    }
  },

  methods: {
    // 确认到店
    confirmBtn (val) {
      this.$confirm('此处将对该预约记录进行确认到店操作, 是否继续?', '', {
        confirmButtonText: '继续',
        confirmButtonClass: 'confirmButton',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButton',
        center: true,
        showClose: false,
        roundButton: true
      }).then(() => {
        detailApi.reserConfirm(val.reservationId).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          this.getData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 取消预约按钮
    cancleBtn (val) {
      this.item = val.reservations
      this.visible = true
      infoApi.getCancelReason().then(res => {
        this.reasons = res
      })
    },
    // 、、取消预约
    confirmApp () {
      infoApi.cancel_reservations(this.item.reservationId, { cancel_reason: this.cancelReason }).then(res => {
        this.$message({
          type: 'success',
          message: '取消成功'
        })
        this.getData()
      })
    },
    toStoreBoard () {
      this.$router.push({ path: '/appointment' })
    },
    toList () {
      this.$router.push({ path: '/appointment/list' })
    },
    cellClick (it, index) {
      this.$router.push({
        path: '/appointment/create',
        query: {
          tecId: this.tecData[this.tecIndex].id,
          date: this.theader[index].date + ' ' + it.date + ':00'
        }
      })
    },
    tecClick (item, index) {
      this.tecIndex = index
      this.getData(item.id)
    },
    btnClick () {
      this.$router.push({ path: '/goodsList' })
    },
    beforeWeekBtn () {
      this.getTheader('before')
    },
    nextWeekBtn () {
      this.getTheader('next')
    },
    searchTec () {
      // if (!this.keyword) return;
      const storeId = Cookies.get('storeId')
      let obj = {
        sid: storeId,
        page: 1,
        page_size: 1000,
        keyword: this.keyword,
        position: ''
      }
      infoApi.technician_employees(obj).then(({ totalCount, technicians }) => {
        this.tecData = technicians
      })
    },
    getTec () {
      const storeId = Cookies.get('storeId')
      let obj = {
        sid: storeId,
        page: 1,
        page_size: 10000,
        keyword: '',
        position: ''
      }
      infoApi.technician_employees(obj).then(({ totalCount, technicians }) => {
        this.tecData = technicians
        // this.getData()
      })
    },
    getTheader (type) {
      this.theader = []
      let now = new Date().getTime()// 获取当天日期
      if (type === 'next') { now = new Date(this.nextDate).getTime() }//
      if (type === 'before') { now = new Date(this.beforeDate).getTime() }
      let nowDay = fmtDate(new Date(), 'yyyy-MM-dd')// 当前日
      let weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      this.beforeDate = fmtDate(now - 7 * 3600 * 24 * 1000, 'yyyy-MM-dd')// 上一周起始
      // 下一周起始
      this.nextDate = fmtDate(now + 7 * 3600 * 24 * 1000, 'yyyy-MM-dd')
      for (let i = 0; i < 7; i++) {
        let obj = {}
        // 当前周
        let forDay = now + i * 3600 * 24 * 1000
        let week = new Date(forDay).getDay()
        obj.day = fmtDate(forDay, 'dd')
        obj.date = fmtDate(forDay, 'yyyy-MM-dd')
        obj.week = weekArr[week]
        if (nowDay === obj.date) {
          obj.week = '今天'
        }
        this.theader.push(obj)
      }
    },
    getDetail (item) {
      if (item.detail.arrivalTime) { return }
      detailApi.qyReservations(item.reversionId).then(res => {
        item.detail = res
      })
    },
    getContent () {
      for (let i = 0; i < 7; i++) {
        let date = [
          { date: '09:00' },
          { date: '09:30' },
          { date: '10:00' },
          { date: '10:30' },
          { date: '11:00' },
          { date: '11:30' },
          { date: '12:00' },
          { date: '12:30' },
          { date: '13:00' },
          { date: '13:30' },
          { date: '14:00' },
          { date: '14:30' },
          { date: '15:00' },
          { date: '15:30' },
          { date: '16:00' },
          { date: '16:30' },
          { date: '17:00' },
          { date: '17:30' },
          { date: '18:00' },
          { date: '18:30' },
          { date: '19:00' },
          { date: '19:30' },
          { date: '20:00' },
          { date: '20:30' },
          { date: '21:00' },
          { date: '21:30' },
          { date: '22:00' }
        ]
        this.content.push(date)
        setTimeout(() => {
          this.initSwiper()
        }, 5)
      }
    },
    initSwiper () {
      var swiper1 = new Swiper('.swiper-container1', {
        slidesPerView: 'auto',
        noSwiping: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChange: function () {
            swiper2.slideTo(swiper1.activeIndex, 200, false) // 切换到第一个slide，速度为1秒
          }
        }
      })
      var swiper2 = new Swiper('.swiper-container2', {
        slidesPerView: 'auto',
        on: {
          slideChange: function () {
            swiper1.slideTo(swiper2.activeIndex, 200, false) // 切换到第一个slide，速度为1秒
          }
        }
      })
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,

        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      })
      this.maxHeight = document.documentElement.clientHeight - document.getElementById('swiper-container_id').offsetTop - 40
    },

    getData (id) {
      this.content = []
      Api.empBoard(id || this.tecData[0].id, { begin_time: this.theader[0].date, date: 7 }).then(res => {
        let arr = Object.keys(res)
        let index = arr.indexOf('technicianId')
        arr.splice(index, 1)
        arr.sort()
        arr.map(item => {
          let date = [
            { date: '09:00' },
            { date: '09:30' },
            { date: '10:00' },
            { date: '10:30' },
            { date: '11:00' },
            { date: '11:30' },
            { date: '12:00' },
            { date: '12:30' },
            { date: '13:00' },
            { date: '13:30' },
            { date: '14:00' },
            { date: '14:30' },
            { date: '15:00' },
            { date: '15:30' },
            { date: '16:00' },
            { date: '16:30' },
            { date: '17:00' },
            { date: '17:30' },
            { date: '18:00' },
            { date: '18:30' },
            { date: '19:00' },
            { date: '19:30' },
            { date: '20:00' },
            { date: '20:30' },
            { date: '21:00' },
            { date: '21:30' },
            { date: '22:00' }
          ]
          res[item].map(el => {
            el.detail = {
              'id': '', // "string,预约id",
              'state': '', // "string,预约状态 1未确认、2已确认、3已进店、4已取消、5未履约",
              'storeId': '', // "预约门店ID",
              'storeName': '', // "string,预约门店名称",
              'arrivalTime': '', // "string,到店时间 格式 : 2018-01-09 08:30 ",
              'period': '', // "string,预约时长",
              'customerMemo': '', // "string,客户备注",
              'storeMemo': '', // "string,门店备注",
              'cancelReason': '', // "取消原因",
              'customers': [],
              'beauticions': [],
              'services': []
            }
            el.start = fmtDate(new Date(el.arrivalTime), 'hh:mm')
            el.end = fmtDate(new Date(el.endTime), 'hh:mm')
            el.period = (new Date(el.endTime) - new Date(el.arrivalTime).getTime()) / 1000 / 60
            let obj = date.find(it => { return it.date === el.start })
            obj.reservations = el
          })
          this.content.push(date)
        })
        setTimeout(() => {
          this.initSwiper()
        }, 5)
      }).catch(() => {
        setTimeout(() => {
          this.initSwiper()
        }, 5)
      })
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.swiper-container5', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar5'
      },
      mousewheel: true
    })
    this.getTec()
    this.getTheader()
    this.getContent()
    // this.getData()
  }
}

</script>

<style lang="scss" scoped>
  .label_bg_color4 {
    background-color: #dc5fdf;
  }

  .label_bg_color5 {
    background-color: #9470e5;
  }

  .card_relation {
    display: inline-block;
    border-radius: 3px;
    padding: 0 4px;
    color: #fff;
    line-height: 16px;
    font-size: 12px;
  }

  // 、、、、、、、
  .bg_color1 {
    border-top: 2px solid #ffa364;
    background-color: #ffebdd;
  }

  .text_color1 {
    color: #ffa364;
  }

  .bg_color2 {
    border-top: 2px solid #53c0ff;
    background-color: #ddf2ff;
  }

  .text_color2 {
    color: #53c0ff;
  }

  .bg_color3 {
    border-top: 2px solid #29c7d3;
    background-color: #e5f8f9;
  }

  .text_color3 {
    color: #29c7d3;
  }

  .bg_color4 {
    border-top: 2px solid #ebebeb;
    background-color: #efefef;
  }

  .text_color4 {
    color: #ebebeb;
  }

  * {
    box-sizing: border-box;
  }

  .header_wrap {
    padding: 20px;
  }

  .btn_active:focus,
  .btn_active:hover,
  .btn_active {
    background: #fff;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-color: #ececec;
    color: #272636;
  }

  .search_tec_wrap {
    margin-top: 12px;
  }

  .round_img {
    border-radius: 50%;
    width: 46px;
    height: 46px;
  }
</style>
<style lang="scss">
  .technician_board_wrap {
    .el-button-group > .el-button:focus,
    .el-button-group > .el-button:hover {
      background: #fff;
      -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
      border-color: #ececec;
      color: #272636;
    }
    .header_wrap {
      .header_rt {
        .label_wrap {
          display: inline-block;
          margin-right: 12px;
          .item {
            display: inline-block;
            span {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              position: relative;
              vertical-align: middle;
              &.border_color1 {
                border: 1px solid #ffa364;
              }
              &.border_color2 {
                border: 1px solid #53c0ff;
              }
              &.border_color3 {
                border: 1px solid #29c7d3;
              }
              i {
                &.bag_color1 {
                  background: #ffa364;
                }
                &.bag_color2 {
                  background: #53c0ff;
                }
                &.bag_color3 {
                  background: #29c7d3;
                }
                width: 12px;
                height: 12px;
                display: inline-block;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }
    }

    .left_wrap {
      .input_wrap {
        padding: 8px;
      }
      .icon-dianpucopy {
        font-size: 18px;
        display: inline-block;
        margin-top: 10px;
        color: #272636;
      }
      .tec_wrap {
        position: fixed;
        top: 170px;
        width: 186px;
        left: 0;
        bottom: 0;
        overflow: auto;
        .item {
          &.tec_active {
            background-color: #ff5183;
            color: #fff;
            .info {
              .no {
                color: #fff;
              }
            }
          }
          padding: 8px;
          position: relative;
          .info {
            position: absolute;
            top: 50%;
            left: 64px;
            transform: translateY(-50%);
            .no {
              color: #a6a6b0;
            }
          }
        }
      }
      width: 186px;
      position: fixed;
      top: 66px;
      left: 0;
      bottom: 0;
      height: 100%;
    }
    .right_wrap {
      margin-left: 186px;
    }
    .swiper-container2 {
      .cell {
        height: 60px;
        position: relative;
        border-bottom: 1px solid #ebebeb;
        border-right: 1px solid #ebebeb;
        &:last-child {
          border-bottom: 0;
          border-right: 0;
        }
        .add_wrap {
          width: 100%;
          height: 100%;
          border: 1px dashed #ff5183;
          border-radius: 2px;
          display: none;
          position: relative;
          .icon-shanchu {
            position: absolute;
            top: 56%;
            left: 44%;
            transform: rotate(45deg) translate(-50%, -50%);
            color: #ff5183;
            font-size: 18px;
          }
        }
        &:hover {
          .add_wrap {
            display: block;
          }
        }
        .app_item_wrap {
          border: 4px solid transparent;
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          z-index: 1;
        }
        &:first-child {
          border-top: 1px solid #ebebeb;
        }
        .app_item {
          border-radius: 3px 3px 6px 6px;
          border-left: 2px solid transparent;
          border-right: 2px solid transparent;
          border-bottom: 2px solid transparent;
          padding-left: 6px;
        }
      }
    }
    .swiper-scroll-parent {
      width: 100%;
      // height: 500px;
      .swiper-slide {
        height: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        // padding: 2px;
      }
    }
    .swiper-container {
      .left {
        .cell {
          width: 70px;
          height: 60px;
          text-align: right;
          padding-right: 15px;
          span {
            display: inline-block;
            transform: translateY(-50%);
            z-index: 1;
          }
        }
      }
    }
    .swiper-header {
      * {
        box-sizing: border-box;
      }
      //   padding: 2px;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;
      padding-left: 70px;
      .swiper-button-next,
      .swiper-button-prev {
        background-image: none;
        width: 20px;
        height: 20px;
        font-size: 16px;
        text-align: center;
        line-height: 20px;
        background: #96989c;
        border-radius: 50%;
        color: #fff;
      }
      .swiper-button-prev {
        left: 25px;
      }
      .slot-arrow {
        position: absolute;
        left: 0;
        width: 70px;
        height: 80px;
        top: 0;
        background: #fff;
        z-index: 5;
      }
    }
    .swiper-container1 {
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      .swiper-slide {
        &.now_day {
          color: #272636;
        }
        .day {
          font-size: 32px;
          font-weight: bold;
          margin-top: 24px;
          margin-bottom: 6px;
        }
        padding-left: 13px;
        border-right: 1px solid #ececec;
        height: 80px;
        width: 14.285%;
        color: #96989c;
      }
    }
    .swiper-parent {
      box-sizing: border-box;
      display: flex;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
      padding-top: 12px;
      .left {
        width: 70px;
      }

      .right {
        flex: 1;
        overflow: hidden;
      }

      .swiper-container2 {
        .swiper-slide {
          // min-height: 9980px;
          width: 14.285%;
        }
      }
    }

    //
    .date_btn_wrap,
    .sel_wrap {
      vertical-align: middle;
    }
    .date_btn_wrap:focus,
    .date_btn_wrap:hover {
      color: #363840;
      border-color: #dcdfe6;
      background-color: #fff;
    }

    .color1 {
      color: #ff5183;
    }
    .el-button--danger {
      background-color: #ff5183;
      border-color: #ff5183;
    }
    .refresh {
      color: #4d88fe;
    }
    .statistics_wrap {
      display: inline-block;
      line-height: 40px;
      .item {
        display: inline-block;
        padding: 0 20px;
        position: relative;
        .icon {
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
          display: inline-block;
          height: 16px;
          border-right: 1px solid #cccccc;
        }
        span {
          display: inline-block;
          padding-left: 20px;
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }

  .detail_popover {
    .detail_form {
      .el-form-item__label,
      .el-form-item__content {
        line-height: 20px;
      }
    }
    .btn_wrap2 {
      li {
        line-height: 46px;
        text-align: center;
        width: 50%;
        margin-top: 12px;
        &:nth-child(1) {
          color: #ff5183;
        }
      }
    }
    .btn_wrap1 {
      li {
        line-height: 46px;
        text-align: center;
        margin-top: 12px;
      }
      :nth-child(1) {
        width: 111px;
        color: #4d88fe;
      }
      :nth-child(2) {
        width: 111px;
        color: #ff5183;
      }
      :nth-child(3) {
        width: 78px;
        color: #96989c;
      }
    }
  }
</style>
