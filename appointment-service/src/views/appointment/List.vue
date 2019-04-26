<template>
  <section class="page-reserList appointment-page">
    <div class="header_wrap clearfix">
      <router-link to='/appointment/create'>
        <el-button type="danger">
          <i class="el-icon-plus"></i> 新预约</el-button>
      </router-link>
      <div class="fr button-group">
        <el-button-group>
          <el-button @click="fullScreen">
            <i class="iconfont icon-quanlan"></i> 全览</el-button>
          <el-button @click="goTech">
            <i class="iconfont icon-jishi"></i> 技师
          </el-button>
          <el-button class="selected">
            <i class="iconfont icon-liebiao"></i> 列表
          </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="filter-form">
      <!-- row1 -->
      <div class="filter-row1 filter-row">
        <div class="item">
          <label>客户信息</label>
          <el-input placeholder="姓名/编号/电话" v-model="filter.keyword" size="medium" :style="{'width':inputW}">
          </el-input>
        </div>
        <div class="item">
          <label>所属部门</label>
          <el-select v-model="filter.dept_id" placeholder="全部" size="medium" :style="{'width':inputW}" @focus="qyDept">
            <el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>客户等级</label>
          <el-select v-model="filter.level_id" placeholder="全部" size="medium" :style="{'width':inputWs}" @focus='getCustomerLevel'>
            <el-option v-for="item in customerLevel" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>预约门店</label>
          <el-select v-model="filter.store_id" placeholder="全部" size="medium" :style="{'width':inputW}" @focus="qyStores">
            <el-option v-for="item in stores" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>预约技师</label>
          <el-select v-model="filter.technician_id" placeholder="全部" size="medium" :style="{'width':inputW}" @focus="getTec">
            <el-option v-for="item in tecData" :key="item.id" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>预约状态</label>
          <el-select v-model="filter.state" placeholder="全部" size="medium" :style="{'width':inputWs}">
            <el-option v-for="item in stateType" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="time-wrap mb30">
        <label class="mr10">预约时间</label>
        <el-button class="plain-red mr20" size="medium" @click="today">今日</el-button>
        <el-date-picker clear-icon="time" v-model="filter.begin_time" type="date" size="medium" prefix-icon="iconfont icon-riqi" placeholder="选择日期" value-format="yyyy-MM-dd" :style="{'width':timew}">
        </el-date-picker>
        <span class="ml20 mr20">至</span>
        <el-date-picker clear-icon="time" v-model="filter.end_time" type="date" size="medium" prefix-icon="iconfont icon-riqi" placeholder="选择日期" value-format="yyyy-MM-dd" :style="{'width':timew}" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button class="appbtn-blue ml20" type="primary" size="medium" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button class="ml20 f12 btn-refresh" :class="{'rotating':loading}" type="text" size="medium" @click="refresh"><i class="el-icon-refresh"></i> 重置</el-button>
      </div>
    </div>
    <!-- TABLE -->
    <div class="table-wrap ml20 mr20 frontdesk-table-wrap">
      <el-table class="align-center" ref="singleTable" :data="tableData" style="width: 100%;margin-bottom:68px;" highlight-current-row @row-click="handleChange">
        <el-table-column prop="customerName" label="客户姓名" min-width="150">
          <template slot-scope="scope">
            <div>{{scope.row.customerName}}</div>
            {{scope.row.customerCode||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="customerPhone" label="联系方式" min-width="130">
          <template slot-scope="scope">
            {{scope.row.customerPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}
          </template>
        </el-table-column>
        <el-table-column prop="levelName" label="等级">
          <template slot-scope="scope">
            {{scope.row.levelName||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="store" label="预约门店" min-width="150">
          <template slot-scope="scope">
            {{scope.row.store||'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="technicians" label="预约技师">
          <template slot-scope="scope">
            <div v-for="js in scope.row.technicians" :key="js.technicianId">
              {{js.technicianName}}
            </div>
            <div v-if='scope.row.technicians.length==0'>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="services" label="服务名称" min-width="180">
          <template slot-scope="scope">
            <div v-for="ser in scope.row.services" :key="ser.serviceId">
              {{ser.serviceName}}
            </div>
            <div v-if='scope.row.services.length==0'>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="peroid" label="预约时长">
          <template slot-scope="scope">
            {{scope.row.peroid?scope.row.peroid+'分钟':'--'}}
          </template>
        </el-table-column>
        <el-table-column prop="arrivalTime" label="预计到店时间" min-width="130">
        </el-table-column>
        <el-table-column prop="state" label="预约状态">
          <template slot-scope="scope">
            {{scope.row.state==1?'已登记':scope.row.state==2?'已确认':scope.row.state==3?'已进店':scope.row.state==4?'已取消':'未履约'}}
          </template>
        </el-table-column>
        <el-table-column width="100" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页行 -->
    <div class="page-handle">
      <span class="btn-group">
        <el-button v-if="handleState!=1&&handleState!=4&&handleState!=5&&handleId" class="appbtn-blue" type="primary" size="medium" @click="confirm">确认预约</el-button>
        <router-link to="/appointment/create" class="ml10">
          <el-button v-if="handleState!=1&&handleState!=4&&handleState!=5&&handleId" class="appbtn-red" type="danger" size="medium">进店登记</el-button>
        </router-link>
        <el-button v-if="handleState==1||handleState==2||handleState==3" class="plain-red ml10" size="medium" @click="update">更改预约</el-button>
        <el-button v-if="handleState!=4&&handleId" class="ml10  plain-default" size="medium" @click="cancelDialog">取消预约</el-button>
      </span>
      <pagination class="list-pagination fr" @current-change="handleCurrentChange" @size-change="handleSizeChange" :total='total'></pagination>
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
import pagination from '@/components/pagination'
import infoApi from '@/api/AppointmentInfo'
import api from '@/api/appointmentDetail'
import Cookies from 'js-cookie'
import customer from '@/api/customerSetting'
import { stores, department } from '../../api/store'

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
      total: 20,
      handleId: '',
      handleState: '',
      selectId: '',
      rowState: '',
      stateType: [
        {
          name: '未确认',
          code: '1'
        },
        {
          name: '已确认',
          code: '2'
        },
        {
          name: '已进店',
          code: '3'
        },
        {
          name: '已取消',
          code: '4'
        },
        {
          name: '未履约',
          code: '5'
        }
      ],
      filter: {
        keyword: '',
        dept_id: '',
        store_id: '',
        level_id: '',
        technician_id: '',
        state: '',
        begin_time: '',
        end_time: '',
        page: 1,
        page_size: 10,
        member_type: ''
      },
      department: [],
      stores: [],
      customerLevel: [],
      tecData: [],
      visible: false,
      currentRow: '',
      select: [],
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
    api.getCancelReason().then(res => {
      this.select = res
    })
    this.getList()
  },
  methods: {
    confirm () {
      if (this.handleId === '') {
        this.$message({
          type: 'warning',
          message: '请选择要确认的预约'
        })
        return
      }
      api.reserConfirm(this.handleId).then(res => {
        this.$message({
          type: 'success',
          message: '预约确认成功'
        })
        this.getList()
      })
    },
    handleClick ({ id }) {
      this.$router.push({
        path: `/appointment/${id}`
      })
    },
    cancel () {
      if (this.selectId === '') {
        this.$message({
          type: 'warning',
          message: '请选择取消原因'
        })
        return
      }
      api
        .putCanceReason(this.handleId, {
          cancel_reason: this.selectId
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '预约取消成功'
          })
          this.getList()
          this.visible = false
        })
    },
    update () {
      if (this.handleId === '') {
        this.$message({
          type: 'warning',
          message: '请选择要更改的预约'
        })
        return
      }
      this.$router.push({
        path: '/appointment/create',
        query: {
          id: this.handleId
        }
      })
      this.getList()
    },
    handleCurrentChange (val) {
      this.filter.page = val
      this.getList()
    },
    handleSizeChange (val) {
      this.filter.page_size = val
      this.getList()
    },
    handleChange (val) {
      this.currentRow = val
      this.handleId = val.id
      this.handleState = val.state
    },
    cancelDialog () {
      if (this.handleId === '') {
        this.$message({
          type: 'warning',
          message: '请选择要取消的预约'
        })
        return
      }
      if (this.handleState !== 1 && this.handleState !== 2) {
        this.$message({
          type: 'warning',
          message: '当前状态不支持取消该操作'
        })
        return
      }
      this.visible = true
    },
    getList () {
      console.log(12)
      this.handleId = ''
      this.loading = true
      api
        .reserList(this.filter)
        .then(res => {
          this.total = res.totalCount
          this.tableData = res.info
          this.loading = false
        })
        .catch(() => {
          this.tableData = []
          this.loading = false
        })
    },
    refresh () {
      this.filter = {
        keyword: '',
        dept_id: '',
        store_id: '',
        level_id: '',
        technician_id: '',
        state: '',
        begin_time: '',
        end_time: '',
        page: 1,
        page_size: 10,
        member_type: ''
      }
      this.getList()
    },
    qyDept () {
      department
        .get({
          // 查询部门
          type: '1'
        })
        .then(res => {
          this.department = res
        })
    },
    qyStores () {
      stores().then(res => {
        this.stores = res.storeList || []
      })
    },
    getTec () {
      const storeId = Cookies.get('storeId')
      let obj = {
        sid: storeId,
        page: 1,
        page_size: 1000,
        keyword: '',
        position: ''
      }
      infoApi.technician_employees(obj).then(({ totalCount, technicians }) => {
        this.tecData = technicians
        // this.getData()
      })
    },
    getCustomerLevel () {
      customer.customerLevels().then(res => {
        this.customerLevel = res
      })
    },
    today () {
      let now = new Date()
      let time =
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1 > 9
          ? now.getMonth() + 1
          : '0' + now.getMonth() + 1) +
        '-' +
        (now.getDate() > 9 ? now.getDate() : '0' + now.getDate())
      this.filter.begin_time = time
      this.filter.end_time = time
    },
    fullScreen () {
      this.$router.push({ path: '/appointment' })
    },
    goTech () {
      this.$router.push({ path: '/appointment/technician-board' })
    }
  }
}
</script>

<style lang="scss">
.page-reserList {
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
  .btn-refresh {
    color: #4d88fe;
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
    margin-top: 30px;

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

  .filter-row {
    .item {
      display: inline-block;
      margin-right: 30px;
      margin-bottom: 20px;
    }

    label {
      margin-right: 10px;
    }
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
