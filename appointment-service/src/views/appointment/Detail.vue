<template>
    <section class="page-appoint-detail  appointment-page">
        <div class="state-handle table">
            <span class="table-cell">
                预约状态
                <b :class="{'ml15':true, 'state':true, 'cancel':state==4}">{{state==1?'未确认':state==2?'已确认':state==3?'已进店':'已取消'}}</b>
            </span>
            <span class="table-cell text-right">
                <el-button v-if="state==1" class="appbtn-blue" type="primary" size="medium" @click="confirm">确认预约</el-button>
                <router-link v-if="state==1||state==2" to="/appointment/create" class="ml10">
                    <el-button class="appbtn-red" type="danger" size="medium">进店登记</el-button>
                </router-link>
            </span>
        </div>
        <div class="detail-wrap mt10">
            <span class="store-name ib f14 mb24">
                <i class="iconfont icon-dianpucopy"></i>
                {{info.storeName}}
            </span>
            <div class="content">
                <div class="col">
                    <h4 class="item-t"><span>*</span>到店客户</h4>
                    <ul class="detail-box ul-list-5 mb25">
                        <!-- <li>
                            <span class="c-block ib owner">本人</span>胡丽春 (3837208) 13789654324
                        </li>
                        <li>
                            <span class="c-block ib">好友</span> 胡丽春 (3837208) 13789654324
                        </li> -->
                        <li v-for="item in info.customers" :key="item.customerId">
                            <span class="c-block ib" :class="{'owner':item.flag=='Y'?true:false}">{{item.flag=='Y'?'本人':'好友'}}</span> {{`${item.customerName}&nbsp;(${item.customerNo})&nbsp;&nbsp;${item.phone}`}}
                        </li>
                    </ul>
                    <h4 class="item-t"><span>*</span>到店时间</h4>
                    <div class="detail-box mb25">
                        {{info.arrivalTime}}
                    </div>
                    <h4 class="item-t"><span>*</span>预计时长</h4>
                    <div class="detail-box mb25">
                        {{info.period}}分钟
                    </div>
                    <h4 class="item-t">门店备注</h4>
                    <div class="detail-box memo">
                        {{info.storeMemo||'--'}}
                    </div>
                </div>
                <div class="col">
                    <h4 class="item-t">服务项目</h4>
                    <ul class="detail-box ul-list-29 mb25">
                        <li v-for="ser in info.services" :key='ser.code'>
                            <p>{{ser.serviceName}}</p>
                            <p v-if="ser.macTypeName">仪器：{{ser.macTypeName}}</p>
                            <p v-if="ser.period">时长：{{ser.period}}分钟</p>
                        </li>
                        <!-- {{info.services.length}} -->
                        <li v-if="info.services && info.services.length==0">--</li>
                        <!-- <li>
                            <p>十二经络体质调理（加一对经络）</p>
                            <p>仪器：小水仙</p>
                            <p>时长：约60分钟</p>
                        </li> -->
                    </ul>
                    <h4 class="item-t">客户备注</h4>
                    <div class="detail-box memo">
                        {{info.customerMemo||'--'}}
                    </div>
                </div>
                <div class="col table-cell">
                    <h4 class="item-t">服务技师</h4>
                    <ul class="detail-box ul-list-5">
                        <li v-for="js in info.technicians" :key="js.code">
                            {{js.name+'&nbsp;&nbsp;'+js.code}}
                        </li>
                        <li v-if="info.technicians==0">--</li>
                    </ul>
                </div>
            </div>
            <div class="btn-row mt20">
                <el-button v-if='state==1||state==2' class="plain-red" size="medium" @click="update">更改预约</el-button>
                <el-button v-if='state==1||state==2' class="ml10  plain-default" size="medium" @click="visible=true">取消预约</el-button>
                <span v-if='state==4'>取消原因：{{info.cancelReason||'--'}}</span>
                <router-link v-if='state==3||state==4' to="/appointment">
                    <el-button class="ml10 plain-default" size="medium">关闭</el-button>
                </router-link>
            </div>
        </div>
        <el-dialog title="请选择取消原因" :visible.sync="visible" center width="460px" custom-class="appointment-dialog-cancel" @closed="selectId=''">
            <div class="select-box text-center mb40">
                <el-button round size="medium" v-for="item in select" :key="item.code" @click="selectId=item.name">{{item.name}}</el-button>
            </div>
            <div class="btn-row text-center">
                <el-button class="ml10 plain-default" @click="visible=false">保留预约</el-button>
                <el-button class="appbtn-blue" type="primary" @click="cancel">确定取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import api from '@/api/appointmentDetail'
export default {
  data () {
    return {
      state: 1, // 1. 未确认  2.已确认  3. 已进店  4.已取消 5.未履约
      visible: false,
      select: [],
      selectId: '',
      id: '',
      info: ''
    }
  },
  created () { },
  mounted () {
    api.getCancelReason().then(res => {
      this.select = res
    })
    this.id = this.$route.params.id
    this.getInfo()
  },
  methods: {
    cancel () {
      if (this.selectId === '') {
        this.$message({
          type: 'warning',
          message: '请选择取消原因'
        })
        return
      }
      api.putCanceReason(this.id, { cancel_reason: this.selectId }).then(() => {
        this.$message({
          type: 'success',
          message: '预约取消成功'
        })
        this.state = 4
        this.visible = false
      })
    },
    confirm () {
      api.reserConfirm(this.id).then(res => {
        this.$message({
          type: 'success',
          message: '预约确认成功'
        })
        this.state = 2
      })
    },
    getInfo () {
      api.qyReservations(this.id).then(res => {
        this.info = res
        this.state = res.state
      })
    },
    update () {
      this.$router.push({ path: '/appointment/create', query: { id: this.id } })
    }
  }
}
</script>

<style lang="scss">
.page-appoint-detail {
  padding: 20px;
  * {
    box-sizing: border-box;
  }
  .state-handle {
    width: 100%;
    background: #fff;
    border: 1px solid #ececec;
    padding: 0 20px;
    border-radius: 4px;
    font-weight: bold;
    height: 76px;
    .table-cell {
      width: 50%;
    }
    .state {
      color: #4d88fe;
      font-size: 16px;
    }
    .cancel {
      color: #96989c;
    }
  }
  .detail-wrap {
    background: #fff;
    border: 1px solid #ececec;
    padding: 24px 20px 20px;
    border-radius: 4px;
    .content {
      background: #f8fafb;
      width: 100%;
      padding: 28px 20px 32px;
    }
    .item-t {
      font-weight: bold;
      margin-bottom: 8px;
      span {
        color: #ff5183;
        vertical-align: middle;
        margin-right: 3px;
      }
    }
    .c-block {
      color: #fff;
      width: 31px;
      height: 16px;
      line-height: 16px;
      background: #9470e5;
      text-align: center;
      border-radius: 3px;
    }
    .col {
      vertical-align: top;
      width: 330px;
      display: inline-block;
      &:not(:last-child) {
        margin-right: 50px;
      }
    }
    .owner {
      background: #dc5fdf;
    }
    .detail-box {
      background: #fff;
      border: 1px solid #ececec;
      padding: 8px 10px;
      border-radius: 4px;
    }
    .ul-list-5 {
      li {
        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
    .ul-list-29 {
      li {
        margin-bottom: 19px;
      }
    }
    .memo {
      min-height: 86px;
    }
  }
  .store-name {
    border: 1px solid #ececec;
    border-radius: 4px;
    padding: 10px;
    min-width: 150px;
    padding-left: 13px;
    .iconfont {
      font-size: 18px;
      vertical-align: middle;
    }
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
      padding: 10px 20px;
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
