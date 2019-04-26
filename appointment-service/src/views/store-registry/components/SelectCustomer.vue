<template>
  <div class="selectcustomer flex_1">
    <ul class="customer_state">
      <li v-for="(item,index) in states" :key="index" class="customer_item select_none"
          :class="{active:item.state==state}" @click.stop="select(item)">{{item.name}}
      </li>
    </ul>
    <el-input placeholder="客户姓名/编号/电话" class="search" v-model="keyword" @keyup.native.enter="keyup">
      <i class="el-icon-search el-input__icon" slot="suffix" @click="keyup"></i>
    </el-input>
    <div v-if="state==1||state==2" class="customers_content" :style="{height:height}">
      <ul class="display_flex display_flex_wrap">
        <li v-for="(item,index) in customers" :key="index">
          <div class="customers_item" :class="{atcive:item.atcive}" @click.stop="SelectCustomer(item)">
            <img :src="item.customerAvatar&&item.customerAvatar||require('@/assets/img/pic.png')"
                 class="customer_avatar">
            <div class="customer_name">{{item.customerName}}</div>
            <div class="customer_code">{{item.customerCode}}</div>
            <span class="customer_level">{{item.customerLevel}}</span>
            <div class="arrival_time" v-if="state==1"><span class="time_color">{{item.arrivalTime}}</span> 预约到店</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="new_custome">
      <div class="basic">基本资料</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label-width="0px">
          <el-form-item label="手机：" prop="phone" :label-width="labelwidth" class="inline_block">
            <el-input clearable v-model="ruleForm.phone" maxlength='11' size="medium " style="width:180px"
                      placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item label="性别：" :label-width="labelwidth" class="inline_block">
            <el-radio-group v-model="ruleForm.sexual">
              <el-radio v-for="item in SEXUAL_OPTS" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-form-item label="姓名：" prop="name" :label-width="labelwidth" class="inline_block">
            <el-input clearable size="medium " v-model="ruleForm.name" style="width:180px" placeholder="请输入姓名"/>
          </el-form-item>
          <el-form-item label="生日：" :label-width="labelwidth" class="inline_block">
            <el-select class="birthday" size="medium " v-model="ruleForm.calendar_type" placeholder="请选择"
                       style="width:80px;">
              <el-option v-for="item in CALENDAR_TYPE_OPTS" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-date-picker type="date" size="medium " value-format="yyyy-MM-dd" style="width:180px" placeholder="选择日期"
                            v-model="ruleForm.birthday" clearable/>
          </el-form-item>
        </el-form-item>
        <el-form-item label="备注：" :label-width="labelwidth">
          <el-input type="textarea" resize="none" :rows="4" style="max-width:570px" :maxlength='TEXTAREA_MAXLENGTH'
                    v-model="ruleForm.memo"/>
        </el-form-item>
      </el-form>
      <el-button @click="savecustomer" :disabled="ruleForm.phone===''||ruleForm.name===''"
                 :class="{disabled:ruleForm.phone===''||ruleForm.name===''}">保存并选择
      </el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/storeregistry'
import { addBasic, getCustomer } from '@/api/customer'
import Cookies from 'js-cookie'
import { Height } from '@/utils/common'
import { SEXUAL_OPTS, CALENDAR_TYPE_OPTS, TEXTAREA_MAXLENGTH } from '@/utils/consts'

export default {
  data () {
    let validatephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback(new Error('手机号码格式有误'))
      } else {
        callback()
      }
    }
    return {
      storeId: Cookies.get('storeId'), // 门店id
      states: [
        { name: '预约客户', state: 1 },
        { name: '非预约客户', state: 2 },
        { name: '新客户', state: 3 }
      ],
      state: 1,
      keyword: '',
      customers: [],
      height: '',
      labelwidth: '120px',
      SEXUAL_OPTS,
      CALENDAR_TYPE_OPTS,
      TEXTAREA_MAXLENGTH,
      ruleForm: {
        phone: '',
        name: '',
        sexual: '2',
        calendar_type: '1',
        birthday: '',
        memo: ''
      },
      rules: {
        phone: [{ required: true, validator: validatephone, trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    // let swiper = new Swiper('.swiper-container',{
    //     direction: 'vertical',
    //     slidesPerView: 'auto',
    //     scrollbar: {
    //         el: '.swiper-scrollbar',
    //     },
    // })
    this.height = Height('.customers_content', 60)
    window.onresize = () => {
      this.height = Height('.customers_content', 60)
    }
    this.reservation_customers()
  },
  methods: {
    select (item) {
      if (this.state !== item.state) {
        this.state = item.state
        if (this.state === 1) {
          this.reservation_customers()
        }
        if (this.state === 2) {
          this.not_reservation_customers()
        }
      }
    },
    keyup () {
      if (this.state === 1) {
        this.reservation_customers()
      }
      if (this.state === 2) {
        this.not_reservation_customers()
      }
    },
    reservation_customers () {
      api.reservation_customers(this.storeId, { keyword: this.keyword }).then(res => {
        this.customers = res
      })
    },
    not_reservation_customers () {
      api.not_reservation_customers(this.storeId, { keyword: this.keyword }).then(res => {
        this.customers = res
      })
    },
    selectcustomer (item) {
      let selectcustomer = {
        customerId: item.customerId,
        customerName: item.customerName,
        customerCode: item.customerCode,
        customerAvatar: item.customerAvatar,
        customerPhone: item.customerPhone,
        customerLevel: item.customerLevel,
        isHasDefaultTechnician: item.isHasDefaultTechnician,
        reservationId: this.state === 1 ? item.reservationId : ''
      }
      this.$emit('customerFun', selectcustomer)
    },
    savecustomer () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addBasic(this.ruleForm).then(res => {
            getCustomer(res.id).then(res => {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              let selectcustomer = {
                customerId: res.id,
                customerName: res.name,
                customerCode: res.no,
                customerAvatar: res.phone,
                customerPhone: res.phone,
                customerLevel: res.customerLevel,
                isHasDefaultTechnician: false,
                reservationId: ''
              }
              this.$emit('customerFun', selectcustomer)
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .selectcustomer {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    border-radius: 6px;
    border: 1px solid #ececec;
    .customer_state {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      height: 56px;
      padding-top: 7px;
      background: #f8fafb;
      box-sizing: border-box;
      .customer_item {
        display: inline-block;
        width: 148px;
        line-height: 49px;
        text-align: center;
        margin-left: 12px;
        color: #96989c;
        font-size: 14px;
        cursor: pointer;
        &.active {
          background: url("../../../assets/img/tab-bg.jpg") no-repeat;
          background-position: center;
          background-size: 100% 100%;
          font-weight: 600;
          color: #272636;
        }
      }
    }
    .search {
      width: 330px;
      margin-top: 20px;
      margin-left: 20px;
      .el-input__inner {
        border-radius: 6px;
      }
      .el-input__suffix {
        width: 40px;
        right: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        background-color: #ff5183;
        color: #fff;
      }
    }
    .customers_content {
      margin: 20px 15px;
      box-sizing: border-box;
      text-align: center;
      overflow-y: auto;
      li {
        box-sizing: border-box;
        padding: 5px;
        width: 25%;
        @media (min-width: 1350px) {
          width: 25%;
        }
        @media (min-width: 1550px) {
          width: 20%;
        }
        @media (min-width: 1700px) {
          width: 14.28%;
        }
        .customers_item {
          border: 1px solid #ececec;
          cursor: pointer;
          .customer_avatar {
            display: block;
            width: 74px;
            height: 74px;
            margin: 20px auto 14px;
          }
          .customer_name {
            font-size: 14px;
            color: #272636;
            font-weight: 600;
          }
          .customer_code {
            font-size: 14px;
            color: #96989c;
            line-height: 20px;
          }
          .customer_level {
            border-radius: 3px;
            border: 1px solid #ff5183;
            font-size: 12px;
            color: #ff5183;
            padding: 0 4px;
            margin: 6px auto 14px;
            display: inline-block;
          }
          .arrival_time {
            line-height: 40px;
            background: #f8fafb;
            font-size: 12px;
            color: #272636;
            .time_color {
              color: #ff5183;
            }
          }
        }
      }
    }
    .new_custome {
      padding: 25px 20px;
      .basic {
        font-size: 14px;
        color: #272636;
      }
      .el-form {
        background: #f8fafb;
        padding: 30px 0;
        margin: 20px 0;
        .el-form-item {
          margin-bottom: 20px;
        }
        .el-form-item .el-form-item {
          margin-bottom: 0;
        }
        .inline_block {
          display: inline-block;
        }
      }
      .el-button {
        border-radius: 6px;
        background: #ff5183;
        color: #fff;
        &.disabled {
          background: #ccc;
        }
      }
    }
  }
</style>
