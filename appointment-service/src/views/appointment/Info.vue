<template>
  <div class="AppointmentInfo">
    <div class="info_sidebar">
      <el-input v-model="name" readonly placeholder="请选择门店">
        <i class="iconfont icon-dianpucopy mt20" slot='prefix'></i>
      </el-input>
      <div class="content_box">
        <i class="iconfont icon-xinghao"></i> 到店客户
      </div>
      <el-input v-model="customerName" size="medium" @click.native="selectswitch(1)" clearable
                @clear="customerId=customerNo=growValue=''" placeholder="选择客户"></el-input>
      <div class="content_box">服务项目</div>
      <template v-if="serviceData.length">
        <el-card shadow="never" v-for="(item,index) in serviceData" :key="index">
          <i class="iconfont icon-quxiao" @click="Delete(index)"></i>
          <p>{{item.name}}</p>
          <p>
            仪器：<span v-for="(el,indx) in item.machines" :key="indx">{{el.machineType}}</span>
          </p>
          <p>时长：{{item.period}}分钟</p>
        </el-card>
      </template>
      <el-input type='textarea' :rows="3" readonly @click.native="selectswitch(2)" style="height:72px" resize="none"
                placeholder="选择服务和卡项"></el-input>
      <div class="content_box">
        <i class="iconfont icon-xinghao"></i> 到店时间
      </div>
      <el-input v-model="arrivalTime" clearable @click.native="selectswitch(3)" size="medium"
                placeholder="选择到店时间"></el-input>
      <div class="content_box">服务技师</div>
      <template v-if="technicianData.length">
        <el-card shadow="never" v-for="(item,index) in technicianData" :key="item.id">
          <i class="iconfont icon-quxiao" @click="remove(index)"></i>
          <p>{{item.realname}}:{{item.empNo}}</p>
        </el-card>
      </template>
      <el-input readonly @click.native="selectswitch(4)" size="medium" placeholder="选择技师"></el-input>
      <div class="content_box">
        <i class="iconfont icon-xinghao"></i> 预约时长
      </div>
      <el-input v-model="period" size="medium" placeholder="选择时长"></el-input>
      <!-- <el-select v-model="period" clearable placeholder="选择时长" size="medium" style="width:100%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select> -->
      <div class="content_box"> 备注</div>
      <el-input v-model="storeMemo" type='textarea' :rows="4" resize="none"></el-input>
      <div class="webkit_box display_flex flex_justify align_center">
        <el-button type="text" @click.native="reset" icon="el-icon-refresh">重置</el-button>
        <span class="webkit_box_icon"><i class="iconfont icon-xinghao"></i> 为必选项</span>
      </div>
    </div>
    <div class="appointment_btn display_flex">
      <div class="webkit_flex flex_1 select_none" @click.stop="submit">保存预约</div>
      <div class="webkit_flex flex_1 select_none" @click.stop="cancel">取消预约</div>
    </div>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :class="{txtcolor:index==routevuex.length-1}" v-for="(item,index) in routevuex" :key="index"
                            :to="item.path">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <select-customers v-if="NO==1" :customerData="customerData" @customerFun="customerFun"/> -->
      <select-customers v-if="NO==1" :customerId="customerId" @customerFun="customerFun"/>
      <select-service v-else-if="NO==2" :growValue="growValue" :serviceData="serviceData" @serviceFun="serviceFun"/>
      <select-datetime v-else-if="NO==3" :arrivalTime="arrivalTime" @datetimeFun="datetimeFun"/>
      <select-technician v-else :technicianData="technicianData" @techniciansFun="techniciansFun"/>
    </div>
    <el-dialog title="请选择取消原因" :visible.sync="visible" @closed="cancelReason=''" center width="460px"
               custom-class="appointment-dialog-cancel">
      <div class="select-box text-center mb40">
        <el-button round size="medium" v-for="item in reasons" :key="item.code" @click="cancelReason=item.name">
          {{item.name}}
        </el-button>
      </div>
      <div class="btn-row text-center">
        <el-button class="ml10 plain-default" @click="visible=false;cancelReason=''">保留预约</el-button>
        <el-button class="appbtn-blue" type="primary" @click="visible=false;Confirm()">确定取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SelectCustomers from './components/SelectCustomers'
import SelectService from './components/SelectService'
import SelectDatetime from './components/SelectDatetime'
import SelectTechnician from './components/SelectTechnician'
import { mapState, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import api from '@/api/AppointmentInfo'
import emp from '@/api/storeStaff'

export default {
  components: {
    SelectCustomers,
    SelectService,
    SelectDatetime,
    SelectTechnician
  },
  data () {
    return {
      NO: 1,
      name: Cookies.get('storeName'), // 门店名
      storeId: Cookies.get('storeId'), // 门店id
      // customerData:[],//选中的客户
      customerId: '', // 客户id
      customerName: '', // 客户姓名
      customerNo: '', // 客户编号
      growValue: '', // 客户成长值
      serviceData: [], // 选中的服务
      arrivalTime: '', // 预约到店时间
      technicianData: [], // 选中的技师
      options: [], // 预约时长数组
      period: '', // 预约时长
      storeMemo: '', // 备注
      visible: false,
      reasons: [],
      cancelReason: ''
    }
  },
  computed: { ...mapState(['routevuex']) },
  watch: {
    '$route': {
      handler (to, from) {
        this.setDatas({ name: 'routevuex', value: to.meta.data })
      },
      deep: true
    },
    'serviceData': {
      handler (val) {
        if (val.length) {
          let period = 0
          val.map(e => {
            period += parseInt(e.period)
          })
          this.period = period
        }
      },
      deep: true
    }
  },
  created () {
    this.setDatas({ name: 'routevuex', value: this.$route.meta.data })
  },
  mounted () {
    if (this.$route.query.id !== undefined) { // 服务id
      api.get_reservations(this.$route.query.id).then(res => {
        this.arrivalTime = res.arrivalTime
        this.period = res.period
        this.storeMemo = res.storeMemo
        this.customerId = res.customers[0].customerId
        this.customerName = res.customers[0].customerName
        this.customerNo = res.customers[0].customerNo
        this.growValue = res.customers[0].growValue
        let technicianData = []// 技师
        res.technicians.map(e => {
          technicianData.push({
            realname: e.name,
            empNo: e.code,
            id: e.id
          })
        })
        this.technicianData = technicianData
        let serviceData = res.services
        serviceData.map(e => {
          e.id = e.serviceId
        })
        this.serviceData = serviceData// 服务
        this.customerMemo = res.customerMemo// 客户备注
        this.cancelReason = res.cancelReason// 取消原因
      })
      api.getCancelReason().then(res => {
        this.reasons = res
      })
    }
    if (this.$route.query.tecId !== undefined) { // 员工技师id
      emp.getStoreStaffInfo(this.$route.query.tecId).then(res => {
        this.arrivalTime = this.$route.query.date
        let technicianData = []
        technicianData.push({
          realname: res.realname,
          empNo: res.emptNo,
          id: res.id
        })
        this.technicianData = technicianData
      })
    }
  },
  methods: {
    ...mapMutations(['setDatas']),
    selectswitch (NO) {
      if (this.growValue === '' && NO !== 1) {
        this.$message({
          message: '请先选择客户',
          type: 'warning'
        })
        return
      }
      if (this.NO !== NO) {
        this.NO = NO
      }
    },
    customerFun (val) {
      this.customerId = val.customerId
      this.customerName = val.name + '(' + val.no + ')' + val.phone
      this.customerNo = val.no
      this.growValue = val.growValue
      api.reservation_setting(val.customerId).then(res => {
        this.period = res.defaultReservationTime
      })
    },
    serviceFun (val) {
      this.serviceData = val
    },
    Delete (index) {
      this.serviceData.splice(index, 1)
    },
    datetimeFun (val) {
      this.arrivalTime = val
    },
    techniciansFun (val) {
      this.technicianData = val
    },
    remove (index) {
      this.technicianData.splice(index, 1)
    },
    reset () {
      this.customerId = ''// 客户id
      this.customerName = ''// 客户姓名
      this.customerNo = ''// 客户编号
      this.growValue = ''// 客户成长值
      this.serviceData = []// 选中的服务
      this.arrivalTime = ''// 预约到店时间
      this.technicianData = []// 选中的技师
      this.period = ''// 预约时长
      this.storeMemo = ''// 备注
    },
    submit () {
      if (this.customerId === '' || this.customerName === '' || this.customerNo === '') {
        this.$message({
          message: '请选择客户',
          type: 'warning'
        })
        return
      }
      if (this.arrivalTime === '') {
        this.$message({
          message: '请选择到店时间',
          type: 'warning'
        })
        return
      }
      let technicians = []
      let services = []
      this.technicianData.map(e => {
        technicians.push(e.id)
      })
      this.serviceData.map(e => {
        let macTypeName = []
        e.machines.length && e.machines.map(e => {
          macTypeName.push(e.machineType)
        })
        services.push({
          service_id: e.id,
          service_name: e.name,
          mac_type_name: macTypeName.join(','),
          card_id: '',
          period: e.period,
          spu_id: e.spuId,
          specification: e.specification,
          sale_price: e.salePrice,
          cost_price: e.costPrice,
          employee_fit: e.employeeFit,
          income_type: e.inComeType,
          salary_type: e.salaryType,
          free_manual_fee: e.freeManualFee
        })
      })
      let _data = {
        arrival_time: this.arrivalTime, // 预约到店时间
        period: this.period, // 预约时长
        store_memo: this.storeMemo, // 备注
        technicians: technicians, // 技师id
        services: services// 服务
      }
      if (this.$route.query.id === undefined) {
        _data.store_id = this.storeId // 门店id
        _data.customer_id = this.customerId // 客户id
        _data.customer_code = this.customerNo // 客户编号
        api.new_reservations(_data).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({ path: '/appointment' })
        })
      } else {
        api.update_reservations(this.$route.query.id, _data).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$router.push({ path: '/appointment' })
        })
      }
    },
    cancel () {
      if (this.$route.query.id === undefined) {
        this.$router.push({ path: '/appointment' })
      } else {
        this.visible = true
      }
    },
    Confirm () {
      const { id } = this.$route.query
      api.cancel_reservations(id, { cancel_reason: this.cancelReason }).then(res => {
        this.$message({
          type: 'success',
          message: '取消成功'
        })
        this.$router.push({ path: '/appointment', params: { id } })
      })
    }
  }
}
</script>

<style lang='scss'>
  .AppointmentInfo {
    z-index: 0;
    .icon-dianpucopy::before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #272636;
    }
    .info_sidebar {
      position: fixed;
      top: 66px;
      left: 0;
      bottom: 60px;
      width: 290px;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 20px;
      z-index: 11;
      background: #fff;
      border-right: 1px solid #ececec;
    }
    .el-card {
      border: 1px solid #ececec;
      margin-bottom: 5px;
      .el-card__body {
        padding: 10px 12px;
        background-color: #f8fafb;
        position: relative;
        font-size: 12px;
        color: #272636;
        .icon-quxiao::before {
          position: absolute;
          right: 12px;
          top: 10px;
          font-size: 12px;
          color: #000;
          cursor: pointer;
        }
      }
    }
    .content {
      padding-left: 310px;
      padding-right: 20px;
      background: #f8fafb;
      z-index: 10;
      .el-breadcrumb {
        margin-bottom: 20px;
        .el-breadcrumb__inner {
          color: #272636;
        }
        .txtcolor {
          .el-breadcrumb__inner {
            color: #ff5183;
          }
        }
      }
    }
    .content_box {
      margin: 26px 0 8px;
      font-size: 12px;
      color: #272636;
      font-weight: 600;
      padding-left: 14px;
      position: relative;
      .icon-xinghao::before {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .icon-xinghao::before {
      color: #ff5183;
      font-size: 12px;
      font-weight: 400;
    }
    .webkit_box {
      .webkit_box_icon {
        font-size: 12px;
        color: #96989c;
      }
      .el-button {
        font-size: 12px;
      }
    }
    .appointment_btn {
      background-color: #fff;
      z-index: 1000;
      position: fixed;
      width: 290px;
      left: 0;
      z-index: 11;
      bottom: 0;
      height: 60px;
      box-sizing: border-box;
      border: 1px solid #ECECEC;
      .webkit_flex {
        cursor: pointer;
        text-align: center;
        line-height: 60px;
        font-size: 12px;
        &:first-child {
          border-right: 1px solid #ECECEC;
          color: #ff5183;
        }
        &:last-child {
          color: #96989c;
        }
      }
    }
    .el-button [class*="el-icon-"] + span {
      margin-left: 8px;
    }
    .el-textarea {
      font-size: 12px;
    }
    .appointment-dialog-cancel {
      border-radius: 6px;
      .el-dialog__body {
        padding: 40px 0 30px;
      }
      .btn-row .el-button {
        width: 160px;
        height: 46px;
      }
      .el-dialog__title {
        font-weight: bold;
      }
      .el-dialog__header {
        background: #f8fafb;
        padding: 16px 20px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
      .el-dialog__headerbtn {
        top: 15px;
      }
      .el-dialog__headerbtn .el-dialog__close {
        color: #272636;
      }
      .select-box {
        .el-button {
          width: 94px;
        }
      }
    }
  }
</style>
