<template>
    <div class="selecttechnician">
        <el-form ref="form" :model="form" label-width="62px">
            <el-form-item label="员工信息">
                <el-input v-model="form.keyword" size="medium" :style="{width:width}"></el-input>
            </el-form-item>
            <el-form-item label="门店职位">
                <el-select v-model="form.position" :style="{width:width}" clearable placeholder="请选择" size="medium">
                    <el-option v-for="item in positions" :key="item.code" :label="item.name" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label-width="0px">
                <el-button size="medium" @click.native="page=1;getlist()" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table ref="Table" class="customers_teble" :v-loading='loading' :data="technicians" style="width:100%;" :row-key="getRowKeys" @row-click="rowClick" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="54" align="center" :reserve-selection="true"></el-table-column>
            <el-table-column prop="realname" label="员工姓名" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.realname||'--'}}</template>
            </el-table-column>
            <el-table-column prop="empNo" label="工号" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.empNo||'--'}}</template>
            </el-table-column>
            <el-table-column prop="positionName" label="职位" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.positionName||'--'}}</template>
            </el-table-column>
        </el-table>
        <div class="pagination_box display_flex flex_justify align_center">
            <el-button :disabled="!selecttechnician.length" :class="{'select_btn':selecttechnician.length}" @click.native="submit">确定</el-button>
            <el-pagination
                class="pagination flex_1"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="PAGE_SIZE_OPT" layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from '@/api/AppointmentInfo'
import { PAGE_SIZE_OPT } from '@/utils/consts'
import Cookies from 'js-cookie'
export default {
  props: {
    technicianData: {
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      width: '216px',
      PAGE_SIZE_OPT,
      positions: [],
      form: {
        keyword: '',
        position: ''
      },
      loading: false,
      sid: Cookies.get('storeId'), // 门店id
      page: 1,
      page_size: 10,
      totalCount: 0,
      technicians: [],
      getRowKeys (row) {
        return row.id
      },
      selecttechnician: []
    }
  },
  watch: {
    'technicianData': {
      handler: function (val, oldVal) {
        this.selecttechnician = val
      },
      deep: true
    }
  },
  mounted () {
    this.selecttechnician = this.technicianData
    api.positions().then(res => {
      this.positions = res
    })
    this.getlist()
  },
  methods: {
    getlist () {
      let obj = {
        sid: this.sid,
        page: this.page,
        page_size: this.page_size
      }
      this.loading = true
      api.technician_employees(Object.assign(obj, this.form)).then(({ totalCount, technicians }) => {
        this.technicians = technicians
        this.totalCount = totalCount
        this.technicians.map(e => {
          if (this.selecttechnician.length && this.selecttechnician.some(({ id }) => id === e.id)) {
            this.$nextTick(() => this.$refs.Table.toggleRowSelection(e, true))
          } else {
            this.$nextTick(() => this.$refs.Table.toggleRowSelection(e, false))
          }
        })
        this.loading = false
      }).catch(() => {
        this.technicians = []
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.getlist()
    },
    handleSizeChange (val) {
      this.page_size = val
      this.getlist()
    },
    handleSelectionChange (val) {
      for (let i = 0, len = val.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (val[i].id === val[j].id) {
            val.splice(j, 1)
            len--
            j--
          }
        }
      }
      this.selecttechnician = val
    },
    rowClick (val) {
      this.$refs.Table.toggleRowSelection(val)
    },
    submit () {
      if (!this.selecttechnician.length) return
      this.$emit('techniciansFun', this.selecttechnician)
    }
  }
}
</script>

<style lang="scss">
.selecttechnician{
    .el-form-item{
        display: inline-block;
        margin-right: 30px;
        .el-button{
            padding: 10px 25px;
            background:#4D88FE;
            color: #fff;
        }
    }
    .customers_teble{
        .customers_no{
            color:#4D88FE;
        }
        .el-table__header th.is-leaf{
            background: #fff;
            &:first-child{
                background:#E8ECED;
            }
        }
    }
    .pagination_box{
        margin:20px 20px 20px 0;
        .el-button{
            padding: 10px 42px;
            background:#CCCCCC;
            color: #fff;
        }
        .select_btn{
            &.el-button{
                background:#4D88FE;
            }
        }
        .pagination{
            text-align: right;
        }
    }
}
</style>
