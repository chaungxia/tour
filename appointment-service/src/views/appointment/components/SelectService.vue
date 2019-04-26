<template>
    <div class="selectservice">
        <div class="item_class">
            <el-tabs v-model="item" type="border-card">
                <el-tab-pane label="服务项目" name="1">
                    <el-button :class="{active:category_id===''}" @click.native="category_id='';servers_list()" round>全部分类</el-button>
                    <el-button :class="{active:category_id==item.id}" @click.native="select(item)" round v-for="(item,index) in serverproduct" :key="index">{{item.name}}</el-button>
                </el-tab-pane>
                <el-tab-pane label="套卡项目" name="2"></el-tab-pane>
            </el-tabs>
            <el-input v-model="keyword" @keyup.native.enter="page=1;servers_list()" class="pos_input" placeholder="项目或套卡名称/简拼">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="page=1;servers_list()"></i>
            </el-input>
        </div>
        <el-table ref="Table" v-if="item==1" class="customers_teble" :v-loading='loading' :data="servers" style="width:100%;" :row-key="getRowKeys" @row-click="rowClick" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="54" align="center" :reserve-selection="true"></el-table-column>
            <el-table-column prop="name" label="项目名称" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.name||'--'}}</template>
            </el-table-column>
            <el-table-column prop="specification" label="规格" align="center" min-width="100" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.specification||'--'}}</template>
            </el-table-column>
            <el-table-column prop="period" label="护理时长" align="center" min-width="120" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.period+'(分钟)'||'--'}}</template>
            </el-table-column>
            <el-table-column prop="machines" label="服务仪器" align="center" min-width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="!scope.row.machines.length">{{'--'}}</span>
                    <span v-else v-for="(item,index) in  scope.row.machines" :key="index">{{item.machineType+'('+item.id+')'}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-table ref="Table" v-if="item==2" class="customers_teble" :v-loading='loading' :data="card" style="width:100%;" :row-key="getRowKeys" @row-click="rowClick" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="54" align="center" :reserve-selection="true"></el-table-column>
            <el-table-column prop="name" label="项目名称" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.name||'--'}}</template>
            </el-table-column>
            <el-table-column prop="period" label="护理时长" align="center" min-width="150" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.period+'(分钟)'||'--'}}</template>
            </el-table-column>
            <el-table-column prop="machines" label="服务仪器" align="center" min-width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="!scope.row.machines.length">{{'--'}}</span>
                    <span v-else v-for="(item,index) in  scope.row.machines" :key="index">{{item.machineType+'('+item.id+')'}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination_box display_flex flex_justify align_center">
            <div>
                <el-button :disabled="!selectservice.length" class="disabled" :class="{'select_btn':selectservice.length}" @click.native="submit">选择({{selectservice.length}})</el-button>
                <!-- <el-button @click.native="Tostore">到店安排</el-button> -->
            </div>
            <el-pagination class="pagination flex_1" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="PAGE_SIZE_OPT" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import api from '@/api/AppointmentInfo'
import Api from '@/api/classify'
import store from '@/api/storeHandle'
import Cookies from 'js-cookie'
import { PAGE_SIZE_OPT } from '@/utils/consts'
export default {
  props: {
    serviceData: {
      default: () => {
        return []
      }
    },
    growValue: {
      default: ''
    }
  },
  watch: {
    'serviceData': {
      handler: function (val, oldVal) {
        this.selectservice = val
      },
      deep: true
    }
  },
  data () {
    return {
      PAGE_SIZE_OPT,
      loading: false,
      item: '1',
      sid: Cookies.get('storeId'), // 门店id
      area_id: '', // 区域id
      category_id: '', // 分类id
      keyword: '',
      page: 1,
      page_size: 10,
      totalCount: 0,
      getRowKeys (row) {
        return row.id
      },
      servers: [], // 服务数据
      serverproduct: [], // 一级服务分类
      selectservice: [], // 选中的服务
      card: []
    }
  },
  mounted () {
    this.selectservice = this.serviceData
    Api.product_list({ type: 2, pid: 0 }).then(res => {
      this.serverproduct = res
    })
    if (this.sid) {
      store.requestStore(this.sid).then(res => {
        this.area_id = res.areaId
        this.servers_list()
      })
    }
  },
  methods: {
    select (item) {
      if (this.category_id !== item.id) {
        this.category_id = item.id
        this.servers_list()
      }
    },
    servers_list () {
      let _data = {
        area_id: this.area_id,
        sid: this.sid,
        grow_value: this.growValue,
        category_id: this.category_id,
        keyword: this.keyword,
        page: this.page,
        page_size: this.page_size
      }
      this.loading = true
      api.servers_choose(_data).then(({ servers, totalCount }) => {
        this.totalCount = totalCount
        this.servers = servers
        this.servers.map(e => {
          if (this.selectservice.length && this.selectservice.some(({ id }) => id === e.id)) {
            this.$nextTick(() => this.$refs.Table.toggleRowSelection(e, true))
          } else {
            this.$nextTick(() => this.$refs.Table.toggleRowSelection(e, false))
          }
        })
        this.loading = false
      }).catch(() => {
        this.servers = []
        this.loading = false
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.servers_list()
    },
    handleSizeChange (val) {
      this.page_size = val
      this.servers_list()
    },
    rowClick (val) {
      this.$refs.Table.toggleRowSelection(val)
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
      this.selectservice = val
    },
    submit () {
      if (!this.selectservice.length) return
      // if(this.selectservice.length>1){
      //     this.$message({
      //         message: '当前只支持单个客户预约',
      //         type: 'warning'
      //     });
      //     return
      // }
      this.$emit('serviceFun', this.selectservice)
    }
    // Tostore(){},
  }
}
</script>

<style lang="scss">
.selectservice {
  .item_class {
    position: relative;
    .pos_input {
      width: 310px;
      position: absolute;
      right: 0;
      top: 0;
      .el-input__inner {
        border-radius: 100px;
      }
    }
    .el-tabs--border-card > .el-tabs__header {
      border-top-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: #4d88fe;
      border-top: 2px solid #4d88fe;
    }
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      padding: 0 26px;
      color: #272636;
      border-top: 2px transparent solid;
    }
    .el-tabs__content {
      padding: 18px;
      .el-button:focus,
      .el-button:hover {
        background: #fff;
        color: #96989c;
        border-color: #d8e2e7;
      }
      .el-button {
        padding: 7px 18px;
        color: #96989c;
        &.active {
          color: #4d88fe;
          border-color: #b4cdff;
        }
      }
    }
  }
  .customers_teble {
    .el-table__header th.is-leaf {
      background: #fff;
      &:first-child {
        background: #e8eced;
      }
    }
  }
  .pagination_box {
    margin: 20px 20px 20px 0;
    .el-button {
      padding: 10px 42px;
      color: #4d88fe;
      border-color: #4d88fe;
      &.disabled {
        border-color: #cccccc;
        background: #cccccc;
        color: #fff;
      }
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
  .el-table__header th.is-leaf {
    background: #fff;
    &:first-child {
      background: #e8eced;
    }
  }
}
</style>
