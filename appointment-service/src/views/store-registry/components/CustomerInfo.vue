<template>
  <div class="customerinfo flex_1">
    <div class="customerinfo_title select_none">客户信息</div>
    <div class="customerinfo_content">
      <div class="content_info">
        <div class="display_flex flex_justify align_center">
          <div>
            <span class="customer_name">{{customer.name+'('+customer.no+')'}}</span>
            <span class="member_type" v-if="this.customer.memberType==1">会员</span>
            <span class="level_name">{{customer.levelName}}</span>
          </div>
          <el-select v-model="customer.sourceType" size="medium" placeholder="请选择客户来源">
            <el-option v-for="item in source" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </div>
        <div class="the_balance display_flex mt20 first_child">
          <div class="the_balance_li display_flex flex_center align_center flex_1">
            <div>
              <div class="money">￥<span class="money_num">{{0}}</span></div>
              <div class="money_type">可用余额</div>
            </div>
          </div>
          <div class="the_balance_li display_flex flex_center align_center flex_1">
            <div>
              <div class="money">￥<span class="money_num">{{0}}</span></div>
              <div class="money_type">锁定余额</div>
            </div>
          </div>
          <div class="the_balance_li display_flex flex_center align_center flex_1">
            <div>
              <div class="money">￥<span class="money_num">{{0}}</span></div>
              <div class="money_type">积分</div>
            </div>
          </div>
        </div>
        <div class="the_balance display_flex mb20 last_child">
          <div class="the_balance_li display_flex flex_center align_center flex_1">
            <div>
              <div class="money_num">{{0}}</div>
              <div class="money_type">护理规划</div>
            </div>
          </div>
          <div class="the_balance_li display_flex flex_center align_center flex_1">
            <div>
              <div class="money_num">{{0}}</div>
              <div class="money_type">优惠卷</div>
            </div>
          </div>
          <div class="the_balance_li display_flex flex_center align_center flex_1">
            <div>
              <div class="money_num">{{0}}</div>
              <div class="money_type">套卡</div>
            </div>
          </div>
        </div>
        <div class="customer_info">
          <div class="display_flex line_height">
            <div class="info_title">末次进店日期</div>
            <div class="flex_1">{{customer.lastEntryTime}}</div>
          </div>
          <div class="display_flex line_height">
            <div class="info_title">当月进店频次</div>
            <div class="flex_1">{{customer.lastEntryTime}}</div>
          </div>
          <div class="display_flex line_height">
            <div class="info_title">当月消费金额</div>
            <div class="flex_1">{{customer.lastEntryTime}}</div>
          </div>
          <div class="display_flex line_height">
            <div class="info_title">生日</div>
            <div class="flex_1">{{customer.birthday}}</div>
          </div>
          <div class="display_flex line_height">
            <div class="info_title">入会日期</div>
            <div class="flex_1">{{customer.memberDate}}</div>
          </div>
        </div>
        <div class="customer_info">
          <div class="display_flex line_height">
            <div class="info_title">所属门店</div>
            <div class="flex_1">{{customer.storeName}}</div>
          </div>
          <div class="display_flex line_height">
            <div class="info_title">客户经理</div>
            <div class="flex_1">{{customer.managerName?(customer.managerName+'('+customer.managerId+')'):''}}</div>
          </div>
          <div class="display_flex line_height">
            <div class="info_title">美容师</div>
            <div class="flex_1">{{customer.technicianName?(customer.technicianName+'('+customer.technicianId+')'):''}}
            </div>
          </div>
        </div>
      </div>
      <el-button @click.native="submit" plain>确认登记</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/storeregistry'

export default {
  props: {
    customerId: {
      default: ''
    }
  },
  data () {
    return {
      customer: '',
      source: []
    }
  },
  mounted () {
    api.customers(this.customerId).then(res => {
      this.customer = res
    })
    api.customers_source().then(res => {
      this.source = res
    })
  },
  methods: {
    submit () {
      if (this.customer.sourceType === '') {
        this.$message({
          message: '请选择客户来源',
          type: 'warning'
        })
        return
      }
      let obj = {
        memberType: this.customer.memberType,
        customerSource: this.customer.sourceType,
        customerSourceName: this.source.length && this.source.find(({ code }) => code === this.customer.sourceType).name
      }
      this.$emit('customerinfoFun', obj)
    }
  }
}
</script>

<style lang="scss">
  .customerinfo {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    border-radius: 6px;
    border: 1px solid #ececec;
    .customerinfo_title {
      background: #F8FAFB;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      line-height: 56px;
      padding: 0 20px;
      font-size: 14px;
      color: #96989C;
    }
    .customerinfo_content {
      padding: 20px;
      .content_info {
        padding: 20px;
        margin-bottom: 20px;
        background: #F8FAFB;
        border-radius: 6px;
        .customer_name {
          font-size: 18px;
          color: #272636;
          font-weight: 600;
          margin-right: 12px;
        }
        .member_type {
          font-size: 12px;
          color: #fff;
          background: #D2B157;
          padding: 1px 6px;
          border-radius: 3px;
          display: inline-block;
        }
        .level_name {
          font-size: 12px;
          color: #FF5183;
          background: #fff;
          border: 1px solid #FF5183;
          padding: 0 6px;
          border-radius: 3px;
          display: inline-block;
        }
        .the_balance {
          height: 96px;
          background: #fff;
          border: 1px solid #ECECEC;
          box-sizing: border-box;
          &.first_child {
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
          }
          &.last_child {
            border-top: none;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
          }
          .the_balance_li {
            box-sizing: border-box;
            &:not(:last-child) {
              border-right: 1px solid #ECECEC;
            }
            .money {
              line-height: 32px;
              font-size: 12px;
              color: #FF5183;
              font-weight: 600;
            }
            .money_num {
              text-align: center;
              font-weight: 600;
              font-size: 24px;
              line-height: 32px;
              color: #FF5183;
            }
            .money_type {
              font-size: 12px;
              color: #272636;
            }
          }
        }
        .customer_info {
          display: inline-block;
          width: 300px;
          .line_height {
            line-height: 26px;
            color: #272636;
            font-size: 12px;
            .info_title {
              width: 88px;
              text-align: right;
              margin-right: 20px;
              color: #96989C;
            }
          }
        }
      }
      .el-button {
        padding: 12px 30px;
        background: #FF5183;
        border-color: #FF5183;
        border-radius: 6px;
        color: #fff;
      }
    }
  }
</style>
