<template>
  <section class="page-payment-list appointment-page">
    <div class="header_wrap clearfix">
      <label class="mr10">客户信息</label>
      <el-input placeholder="姓名/编号/电话" v-model="filter.keyword" size="medium" :style="{'width':'370px'}">
      </el-input>
      <div class="fr button-group">
        <el-button-group>
          <el-button @click="consume">
            <i class="iconfont icon-xiaofei mr5"></i>消费
          </el-button>
          <el-button class="selected" @click="recharge">
            <i class="iconfont icon-chongzhi1 mr5"></i>充值
          </el-button>
          <el-button>
            <i class="iconfont icon-kaiqia1 mr5"></i>开卡
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="filter-form mt20">
      <div class="time-wrap mb30">
        <label class="mr10">开卡时间</label>
        <el-date-picker clear-icon="time" v-model="filter.begin_time" type="date" size="medium"
                        prefix-icon="iconfont icon-riqi" value-format="yyyy-MM-dd" placeholder="选择日期"
                        :style="{'width':timew}">
        </el-date-picker>
        <span class="ml20 mr20">至</span>
        <el-date-picker clear-icon="time" v-model="filter.end_time" type="date" size="medium"
                        prefix-icon="iconfont icon-riqi" value-format="yyyy-MM-dd" placeholder="选择日期"
                        :style="{'width':timew}" :picker-options="pickerOptions">
        </el-date-picker>
        <label class="ml30 mr10">状态</label>
        <el-select v-model="filter.payment_state" placeholder="全部" size="medium" :style="{'width':inputWs}">
          <el-option v-for="item in stateType" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
        <el-button class="appbtn-blue ml30" type="primary" size="medium" icon="el-icon-search" @click="getList">查询
        </el-button>
        <el-button class="ml20  f12 btn-refresh" type="text" size="medium" @click="refresh"
                   :class="{'rotating':loading}"><i class="el-icon-refresh mr5"></i>重置
        </el-button>

      </div>
    </div>
    <!-- TABLE -->
    <div class="table-wrap ml20 mr20 frontdesk-table-wrap">
      <el-table class="align-center" ref="singleTable" :data="tableData" style="width: 100%;">
        <el-table-column prop="customerName" label="客户姓名" min-width="150">
          <template slot-scope="scope">
            <span class="column-name">{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paymentCode" label="交易号" min-width="130">
          <template slot-scope="scope">
            {{scope.row.paymentCode||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="paymentTime" label="支付时间" min-width="150"></el-table-column>
        <el-table-column prop="paymentState" label="支付方式" min-width="90">
          <template slot-scope="scope">
            {{scope.row.paymentState==1?'微信':scope.row.paymentState==2?'支付宝':scope.row.paymentState==3?'拉卡拉':scope.row.paymentState==4?'银联':scope.row.paymentState==5?'现金':scope.row.paymentState==6?'转账':scope.row.paymentState==7?'支票':'其他'}}
          </template>
        </el-table-column>
        <el-table-column prop="paymentAmount" label="支付金额">
          <template slot-scope="scope">
            {{scope.row.paymentAmount?`¥${scope.row.paymentAmount}`:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="extendAmount" label="赠送金额" min-width="180">
          <template slot-scope="scope">
            {{scope.row.extendAmount?`¥${scope.row.extendAmount}`:'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="流水号"></el-table-column>
        <el-table-column prop="operatorName" label="创建人" min-width="130">
        </el-table-column>
        <el-table-column prop="paymentState" label="订单状态">
          <template slot-scope="scope">
            {{scope.row.paymentState==2?'已支付':scope.row.paymentState==1?'待支付':scope.row.paymentState==3?'已撤销':''}}
          </template>
        </el-table-column>
        <el-table-column width="100" label="操作">
          <template slot-scope="scope">
            <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页行 -->
    <div class="page-handle">
      <pagination class="list-pagination fr" @current-change="handleCurrentChange" @size-change="handleSizeChange"
                  :total='total'></pagination>
    </div>
  </section>
</template>

<script>
import pagination from '@/components/pagination'
// import api from "@/api/appointmentDetail";
import api from '@/api/recharge'
import Cookies from 'js-cookie'
// console.log(api2.rechargeList())
export default {
  components: {
    pagination
  },
  data () {
    return {
      loading: false,
      inputW: '216px',
      inputWs: '126px',
      timew: '156px',
      total: 0,
      stateType: [
        {
          name: '待支付',
          code: '1'
        },
        {
          name: '已支付',
          code: '2'
        },
        {
          name: '已撤销',
          code: '3'
        }
      ],
      store_id: '',
      filter: {
        keyword: '',
        payment_state: '',
        begin_time: '',
        end_time: '',
        page: 1,
        page_size: 10
      },
      tableData: []
    }
  },
  watch: {
    pickerOptions () {
      let st = this.filter.begin_time
      return {
        disabledDate (time) {
          return time.getTime() + 24 * 60 * 60 * 1000 <= new Date(st).getTime()
        }
      }
    }
  },
  computed: {
    pickerOptions () {
      let st = this.filter.begin_time
      return {
        disabledDate (time) {
          return time.getTime() + 24 * 60 * 60 * 1000 <= new Date(st).getTime()
        }
      }
    }
  },
  mounted () {
    this.store_id = Cookies.get('storeId')
    this.store_id !== '' && (this.getList())
  },
  methods: {
    handleCurrentChange (val) {
      this.filter.page = val
      this.getList()
    },
    handleSizeChange (val) {
      this.filter.page_size = val
      this.getList()
    },
    getList () {
      this.handleId = ''
      this.loading = true
      api.rechargeList(this.store_id, this.filter).then(res => {
        this.total = res.totalCount
        this.tableData = res.info
        this.loading = false
      }).catch(() => {
        this.tableData = []
        this.loading = false
      })
    },
    refresh () {
      this.filter = {
        keyword: '',
        payment_state: '',
        begin_time: '',
        end_time: '',
        page: 1,
        page_size: 10
      }
      this.getList()
    },
    consume () {
      // this.$router.push({
      //     path: '/'
      // })
    },
    recharge () {
      // this.$router.push({
      //     path: '/'
      // })
    },
    see (row) {
      // this.$router.push({
      //     path: '/',
      //     query: {
      //         id: row.id
      //     }
      // })
    }
  }
}
</script>

<style lang="scss">
  .page-payment-list {
    padding: 20px 0 0;

    .rotating .el-icon-refresh {
      animation: rotating 2s linear infinite;
    }

    .header_wrap {
      padding: 0 20px;

      .icon-dianpucopy {
        font-size: 18px;
        display: inline-block;
        margin-top: 10px;
        color: #272636;
      }
    }

    .el-button--danger {
      background-color: #ff5183;
      border-color: #ff5183;
    }

    .button-group {
      button {
        color: #96989c;
        background: rgba(248, 250, 251, 1);
        border-color: #ececec;
      }

      .el-button:focus,
      .selected,
      .el-button:hover {
        background: #fff;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        border-color: #ececec;
        color: #272636;
      }
    }

    .filter-form {
      padding: 0 20px;
      .time-wrap {
        .iconfont {
          font-size: 20px;
          color: #272636;
        }

        .el-input__inner {
          font-size: 12px;
          padding-left: 15px;
        }
      }

      .el-input__prefix,
      .el-input__suffix {
        left: inherit;
        right: 0;
        width: 36px;
        border-left: 1px solid #dcdfe6;
      }

      .el-select .el-input .el-select__caret {
        color: #272636;
      }

      .el-icon-refresh {
        color: #4d88fe;
        font-size: 16px;
        vertical-align: middle;
      }
    }
    .btn-refresh {
      color: #4d88fe;
    }
    .page-handle {
      padding: 20px 20px;
      background: #fff;
      padding-top: 12px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.1);
    }
  }
</style>
