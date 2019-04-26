<template>
  <div class="storeregistry">
    <div class="display_flex flex_justify align_center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :class="{txtcolor:index==routevuex.length-1}" v-for="(item,index) in routevuex" :key="index"
                            :to="item.path">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button class="return_btn" @click.native="$router.go(-1)">
        <i class="iconfont icon-zuojiantou"></i>
      </el-button>
    </div>
    <div class="registry_box display_flex" :style="{height:height}">
      <div class="the_customer">
        <div class="select_customer select_none display_flex align_center" v-if="selectcustomers.customer_id===''">
          <i class="iconfont icon-xuanzekehu"></i><span>选择客户</span>
        </div>
        <div v-else>
          <div class="the_selecte select_none display_flex flex_justify align_center" :class="{active:NO==1}"
               @click.stop="selectswitch(1)">
            <div class="display_flex align_center">
              <img class="customer_avatar"
                   :src="selectcustomers.customer_avatar&&selectcustomers.customer_avatar||require('@/assets/img/pic.png')">
              <div>
                <div class="customer_info display_flex align_center">{{selectcustomers.customer_name}} <span
                  class="customer_level">{{selectcustomers.customer_level}}</span></div>
                <div class="customer_code">{{selectcustomers.customer_code}}</div>
              </div>
            </div>
            <el-button plain @click.native="remove">更改</el-button>
          </div>
          <ul class="submit">
            <li class="display_flex flex_justify align_center select_none" :class="{active:NO==2}"
                @click.stop="selectswitch(2)" v-if="!isHasDefaultTechnician">
              <div>美容师</div>
              <div>
                <span class="employee_name"
                      v-if="selectcustomers.technician_name">{{selectcustomers.technician_name}}</span>
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
            <li class="display_flex flex_justify align_center select_none" :class="{active:NO==3}"
                @click.stop="selectswitch(3)">
              <div>待确认消费</div>
              <div>
                <!-- <span>{{}}</span> -->
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
            <li class="display_flex flex_justify align_center select_none" :class="{active:NO==4}"
                @click.stop="selectswitch(4)">
              <div>验卷</div>
              <div>
                <!-- <span>{{}}</span> -->
                <i class="iconfont icon-youjiantou"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="recognition">
          <div class="display_flex flex_justify align_center select_none recognition_litem">
            <i class="iconfont icon-renlianshibie"></i>
            <span>人脸识别登记</span>
          </div>
          <div class="display_flex flex_justify align_center select_none recognition_litem">
            <i class="iconfont icon-saomadengji"></i>
            <span>扫码登记</span>
          </div>
        </div>
      </div>
      <select-customer v-if="selectcustomers.customer_id===''" @customerFun="customerFun"/>
      <customer-info v-if="selectcustomers.customer_id!==''&&NO==1" :customerId="selectcustomers.customer_id"
                     @customerinfoFun="customerinfoFun"/>
      <select-technician v-if="selectcustomers.customer_id!==''&&NO==2" :employeeId="selectcustomers.technician_id"
                         @technicianFun="technicianFun"/>
      <pending-consumption v-if="selectcustomers.customer_id!==''&&NO==3" @consumptionFun="consumptionFun"/>
      <select-coupons v-if="selectcustomers.customer_id!==''&&NO==4" @couponsFun="couponsFun"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Height } from '@/utils/common'
import api from '@/api/storeregistry'
import Cookies from 'js-cookie'
import SelectCustomer from './components/SelectCustomer'
import CustomerInfo from './components/CustomerInfo'
import SelectTechnician from './components/SelectTechnician'
import PendingConsumption from './components/PendingConsumption'
import SelectCoupons from './components/SelectCoupons'

export default {
  components: {
    SelectCustomer,
    CustomerInfo,
    SelectTechnician,
    PendingConsumption,
    SelectCoupons
  },
  data () {
    return {
      height: '',
      selectcustomers: {
        customer_id: '', // 客户ID
        customer_name: '', // 客户名
        customer_code: '', // 客户编号
        customer_avatar: '', // 客户头像
        customer_phone: '', // 客户手机
        customer_level: '', // 客户等级
        customer_source: '', // 客户来源
        customer_source_name: '', // 客户来源名
        member_type: '', // 会员类型、1会员、2非会员
        reservation_id: '', // 预约ID
        technician_id: '', // 技师ID，逗号隔开
        technician_name: '', // 技师名，逗号隔开
        entry_type: '1', // 进店方式，1登记进店、2刷脸进店、3扫码进店
        coupon_id: '', // 优惠券ID
        coupon_code: '', // 优惠券代码
        store_id: Cookies.get('storeId'), // 门店id
        store_name: Cookies.get('storeName')// "string,门店名"
      },
      isHasDefaultTechnician: false, // 没有选技师
      NO: 1
    }
  },
  watch: {
    '$route': {
      handler (to, from) {
        this.setDatas({ name: 'routevuex', value: to.meta.data })
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['routevuex'])
  },
  mounted () {
    this.setDatas({ name: 'routevuex', value: this.$route.meta.data })
    this.height = Height('.registry_box', 40)
    window.onresize = () => {
      this.height = Height('.registry_box', 40)
    }
  },
  methods: {
    ...mapMutations(['setDatas']),
    remove () {
      this.selectcustomers = {
        customer_id: '',
        customer_name: '',
        customer_code: '',
        customer_avatar: '',
        customer_phone: '',
        customer_level: '',
        customer_source: '',
        customer_source_name: '',
        member_type: '', // 会员类型、1会员、2非会员
        reservation_id: '', // 预约ID
        technician_id: '', // 技师ID，逗号隔开
        technician_name: '', // 技师名，逗号隔开
        entry_type: '1', // 进店方式，1登记进店、2刷脸进店、3扫码进店
        coupon_id: '', // 优惠券ID
        coupon_code: '', // 优惠券代码
        store_id: Cookies.get('storeId'), // 门店id
        store_name: Cookies.get('storeName')// "string,门店名"
      }
      this.isHasDefaultTechnician = false
    },
    selectswitch (NO) {
      if (this.NO !== NO) {
        this.NO = NO
      }
    },
    customerFun (val) {
      this.selectcustomers.customer_id = val.customerId
      this.selectcustomers.customer_name = val.customerName
      this.selectcustomers.customer_code = val.customerCode
      this.selectcustomers.customer_avatar = val.customerAvatar
      this.selectcustomers.customer_phone = val.customerPhone
      this.selectcustomers.customer_level = val.customerLevel
      this.selectcustomers.reservation_id = val.reservationId
      this.isHasDefaultTechnician = val.isHasDefaultTechnician
    },
    customerinfoFun (val) {
      this.selectcustomers.memberType = val.memberType
      this.selectcustomers.customer_source = val.customerSource
      this.selectcustomers.customer_source_name = val.customerSourceName
      api.new_registrations(this.selectcustomers).then(res => {
        this.$message({
          type: 'success',
          message: '登记成功',
          duration: 1500
        })
        setTimeout(() => {
          this.$router.push({
            path: '/enter-shop-list'
          })
        }, 1600)
      })
    },
    technicianFun (val) {
      this.selectcustomers.technician_id = val.employeeId
      this.selectcustomers.technician_name = val.employeeName
    },
    consumptionFun (val) { },
    couponsFun (val) { }
  }
}
</script>

<style lang="scss">
  .storeregistry {
    padding: 12px 20px 20px 20px;
    background: #f8fafb;
    .return_btn {
      padding: 12px;
    }
    .el-breadcrumb__inner {
      color: #272636;
    }
    .txtcolor {
      .el-breadcrumb__inner {
        color: #ff5183;
      }
    }
    .registry_box {
      .the_customer {
        height: 100%;
        width: 358px;
        margin-right: 20px;
        background: #ffffff;
        box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
        border-radius: 6px;
        border: 1px solid #ececec;
        position: relative;
        .recognition {
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 1px solid #ececec;
          .recognition_litem {
            padding: 0 20px 0 15px;
            line-height: 60px;
            font-size: 14px;
            color: #272636;
            box-sizing: border-box;
            .icon-renlianshibie::before,
            .icon-saomadengji::before {
              font-size: 25px;
              color: #ff5183;
            }
            &:first-child {
              border-bottom: 1px solid #ececec;
            }
          }
        }
        .select_customer {
          padding: 0 22px;
          background: #fff9fa;
          line-height: 88px;
          font-size: 14px;
          color: #ff80a4;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          cursor: pointer;
          .icon-xuanzekehu::before {
            font-size: 25px;
            margin-right: 20px;
          }
        }
        .the_selecte {
          padding: 16px 20px;
          background: #fff;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          border-bottom: 1px solid #ececec;
          box-sizing: border-box;
          &.active {
            background: #f8fafb;
          }
          .customer_avatar {
            width: 56px;
            height: 56px;
            display: block;
            margin-right: 15px;
          }
          .customer_info {
            color: #272636;
            font-size: 16px;
            font-weight: 600;
            margin-top: 5px;
            .customer_level {
              font-size: 12px;
              color: #ff5183;
              padding: 0 4px;
              border: 1px solid #ff5183;
              display: inline-block;
              border-radius: 3px;
              margin-left: 5px;
            }
          }
          .customer_code {
            font-size: 14px;
            color: #96989c;
            line-height: 28px;
          }
          .el-button {
            padding: 5px 12px;
            color: #fff;
            background: #ff5183;
            border-radius: 6px;
            border-color: #ff5183;
          }
        }
        .submit {
          margin: 20px;
          box-sizing: border-box;
          border: 1px solid #ececec;
          border-radius: 6px;
          li {
            line-height: 60px;
            padding: 0 15px;
            font-size: 14px;
            color: #272636;
            background: #fff;
            box-sizing: border-box;
            .employee_name {
              font-weight: 600;
              font-size: 14px;
              color: #272636;
            }
            &:not(:last-child) {
              border-bottom: 1px solid #ececec;
            }
            &:first-child {
              border-top-left-radius: 6px;
              border-top-right-radius: 6px;
            }
            &:last-child {
              border-bottom-left-radius: 6px;
              border-bottom-right-radius: 6px;
            }
            &.active {
              background: #f8fafb;
            }
          }
        }
      }
    }
  }
</style>
