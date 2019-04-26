<template>
    <div class="selectcustomers">
        <el-button type="danger" icon="el-icon-plus" @click.native="visible=true">新增客户</el-button>
        <el-input placeholder="姓名/编号/电话" class="customers" v-model="keyword" @keyup.native.enter="page=1;getlist()">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="page=1;getlist()"></i>
        </el-input>
        <!-- <el-table ref="Table" class="customers_teble" :v-loading='loading' :data="customers" style="width:100%;" @row-click="rowClick" :row-key="getRowKeys" @selection-change="handleSelectionChange"> -->
        <el-table ref="Table" class="customers_teble" :v-loading='loading' :data="customers" style="width:100%;" @row-click="rowClick" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="54" align="center" :reserve-selection="true"></el-table-column> -->
            <el-table-column type="selection" width="54" align="center"></el-table-column>
            <el-table-column prop="name" label="客户姓名" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.name||'--'}}(<span class="customers_no">{{scope.row.no||'--'}}</span>)</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" align="center" min-width="100" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.phone||'--'}}</template>
            </el-table-column>
            <el-table-column prop="level" label="等级" align="center" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.level||'--'}}</template>
            </el-table-column>
            <el-table-column prop="storeName" label="当前门店" align="center" min-width="200" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.storeName||'--'}}</template>
            </el-table-column>
            <el-table-column prop="technicianName" label="所属美容师" align="center" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.technicianName||'--'}}</template>
            </el-table-column>
            <el-table-column prop="lastEntryDate" label="末次进店日期" align="center" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.lastEntryDate&&fmtDate(scope.row.lastEntryDate,'yyyy-MM-dd hh:mm:ss')||'--'}}</template>
            </el-table-column>
        </el-table>
        <div class="pagination_box display_flex flex_justify align_center">
            <el-button :disabled="!selectcustomer.length" :class="{'select_btn':selectcustomer.length}" @click.native="submit">确定</el-button>
            <el-pagination class="pagination flex_1" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="PAGE_SIZE_OPT" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>
        <el-dialog title="新增客户" :visible.sync="visible" @closed="cancel" center width="650px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label-width="0px">
                    <el-form-item label="手机：" prop="phone" :label-width="labelwidth" class="inline_block">
                        <el-input clearable v-model="ruleForm.phone" maxlength='11' size="medium " style="width:180px" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="性别：" :label-width="labelwidth" class="inline_block">
                        <el-radio-group v-model="ruleForm.sexual">
                            <el-radio v-for="item in SEXUAL_OPTS" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form-item>
                <el-form-item label-width="0px">
                    <el-form-item label="姓名：" prop="name" :label-width="labelwidth" class="inline_block">
                        <el-input clearable size="medium " v-model="ruleForm.name" style="width:180px" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item label="生日：" :label-width="labelwidth" class="inline_block">
                        <el-select class="birthday" size="medium " v-model="ruleForm.calendar_type" placeholder="请选择" style="width:80px;">
                            <el-option v-for="item in CALENDAR_TYPE_OPTS" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-date-picker type="date" size="medium " value-format="yyyy-MM-dd" style="width:180px" placeholder="选择日期" v-model="ruleForm.birthday" clearable />
                    </el-form-item>
                </el-form-item>
                <el-form-item label="备注：" :label-width="labelwidth">
                    <el-input type="textarea" resize="none" :rows="4" :maxlength='TEXTAREA_MAXLENGTH' v-model="ruleForm.memo" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="savecustomer">保存并选择</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api/customerManagement'
import { fmtDate } from '@/utils/common'
import { addBasic, getCustomer } from '@/api/customer'
import { PAGE_SIZE_OPT, SEXUAL_OPTS, CALENDAR_TYPE_OPTS, TEXTAREA_MAXLENGTH } from '@/utils/consts'
export default {
  props: {
    customerData: {
      default: () => {
        return []
      }
    },
    customerId: {
      default: ''
    }
  },
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
      fmtDate,
      PAGE_SIZE_OPT,
      SEXUAL_OPTS,
      CALENDAR_TYPE_OPTS,
      TEXTAREA_MAXLENGTH,
      keyword: '',
      page: 1,
      page_size: 10,
      totalCount: 0,
      getRowKeys (row) {
        return row.customerId
      },
      loading: false,
      customers: [],
      selectcustomer: [], // 选中的客户
      visible: false,
      labelwidth: '70px',
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
  watch: {
    'customerData': {
      handler: function (val, oldVal) {
        this.selectcustomer = val
      },
      deep: true
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      let obj = {
        page: this.page,
        page_size: this.page_size,
        keyword: this.keyword,
        dep_id: '',
        store: '',
        member_type: '',
        lifecycle_code: '',
        level_grow_value: '',
        employee_type: '',
        belong: '',
        technician_id: '',
        manager_id: '',
        wx_state: '',
        level_above: ''
      }
      this.loading = true
      api.customers_search(obj).then(({ totalCount, customers }) => {
        this.customers = customers
        this.totalCount = totalCount
        this.customers.map(e => {
          if (this.customerId === e.customerId) {
            this.$nextTick(() => this.$refs.Table.toggleRowSelection(e, true))
          } else {
            this.$nextTick(() => this.$refs.Table.toggleRowSelection(e, false))
          }
        })
        // this.customers.map(e => {
        //     if(this.selectcustomer.length&&this.selectcustomer.some(({customerId})=>customerId==e.customerId)){
        //         this.$nextTick(()=>this.$refs.Table.toggleRowSelection(e,true))
        //     }else{
        //         this.$nextTick(()=>this.$refs.Table.toggleRowSelection(e,false))
        //     }
        // })
        this.loading = false
      }).catch(() => {
        this.customers = []
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
      // for(let i = 0,len=val.length; i < len; i++){
      //     for(let j = i + 1; j < len; j++){
      //         if(val[i].id == val[j].id){
      //             val.splice(j,1);
      //             len--;
      //             j--;
      //         }
      //     }
      // }
      this.selectcustomer = val
    },
    rowClick (val) {
      this.$refs.Table.toggleRowSelection(val)
    },
    submit () {
      if (!this.selectcustomer.length) return
      if (this.selectcustomer.length > 1) {
        this.$message({
          message: '当前只支持单个客户预约',
          type: 'warning'
        })
        return
      }
      this.$emit('customerFun', this.selectcustomer[0])
    },
    cancel () {
      this.$refs.ruleForm.resetFields()
    },
    savecustomer () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addBasic(this.ruleForm).then(res => {
            getCustomer(res.id).then(res => {
              this.visible = false
              this.page = 1
              this.getlist()
              let selectcustomer = {
                customerId: res.id,
                name: res.name,
                no: res.no,
                phone: res.phone,
                growValue: res.growValue
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
.selectcustomers {
  .el-button--danger {
    background-color: #ff5183;
    border-color: #ff5183;
    &.el-button {
      padding: 12px 15px;
    }
  }
  .customers {
    width: 270px;
    margin-left: 20px;
  }
  .pagination_box {
    margin: 20px 20px 20px 0;
    .el-button {
      padding: 10px 42px;
      background: #cccccc;
      color: #fff;
    }
    .select_btn {
      &.el-button {
        background: #4d88fe;
      }
    }
    .pagination {
      text-align: right;
    }
  }
  .customers_teble {
    margin-top: 25px;
    .customers_no {
      color: #4d88fe;
    }
    .el-table__header th.is-leaf {
      background: #fff;
      &:first-child {
        background: #e8eced;
      }
    }
  }
  .el-dialog {
    border-radius: 6px;
    .el-dialog__header {
      padding: 16px 20px;
      background: #f8fafb;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      font-weight: 600;
      .el-dialog__title {
        color: #272636;
      }
    }
    .el-dialog__body {
      padding: 34px 30px 0;
      .el-form-item {
        margin-bottom: 20px;
      }
      .el-form-item .el-form-item {
        margin-bottom: 0;
      }
    }
    .inline_block {
      display: inline-block;
    }
    .el-dialog__footer {
      padding: 0 20px 30px;
    }
    .el-button {
      border-radius: 6px;
      width: 160px;
    }
  }
}
</style>
