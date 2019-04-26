<template>
  <div class="ad_table">
    <template :table="table">
      <el-table
        ref="adTable"
        :show-summary="table.hasShowSummary"
        :summary-method="table.getSummaries"
        :data="tbody"
        v-loading='vLoading'
        :border="table.border"
        :row-class-name="rowClassName"
        :span-method="objectSpanMethod"
        tooltip-effect="dark"
        style="width: 100%;"
        size="mini"
        header-row-class-name="thClassName"
        @selection-change="handleSelectionChange"
        @row-click="rowClick">
        <!-- 自己 start-->
        <template v-for="(item,index) in theader">
          <el-table-column v-if="item.type==='sel'"
                           :label="item.label"
                           align='center'
                           :reserve-selection="true"
                           :class-name="item.className"
                           :key="index"
                           :fixed="item.fixed"
                           type="selection"
                           width="55"/>
          <el-table-column v-if="item.type=='index'"
                           :label="item.label"
                           :class-name="item.className"
                           :key="index"
                           align='center'
                           :fixed="item.fixed"
                           type="index"
                           width="55"/>
          <el-table-column v-if="item.type == 'tem'"
                           :label="item.label"
                           :class-name="item.className"
                           show-overflow-tooltip
                           :key="index"
                           align='center'
                           :width="item.width"
                           :fixed="item.fixed"
                           :min-width="item.minWidth">
            <template slot-scope="scope">
              <slot :name="item.prop"
                    :obj="scope"/>
            </template>
          </el-table-column>
          <el-table-column v-if="item.type == 'text'"
                           :label="item.label"
                           :class-name="item.className"
                           :key="index"
                           align='center'
                           :prop="item.prop"
                           :width="item.width"
                           show-overflow-tooltip
                           :fixed="item.fixed"
                           :min-width="item.minWidth">
            <template slot-scope="scope">
              {{scope.row[item.prop]||'--'}}
            </template>
          </el-table-column>
          <el-table-column v-if="(item.type === 'btn'||item.type === 'slotBtn')"
                           :label="item.label"
                           :class-name="item.className"
                           :key="index"
                           align='center'
                           :prop="item.prop||'操作'"
                           :width="item.width"
                           :min-width="item.minWidth"
                           fixed="right">
            <template slot-scope="scope">
              <template v-for="(it,idx) in item.btn">
                <el-button v-if="item.type ==='btn'"
                           :class="it.className"
                           :key="idx"
                           :size="item.size||'mini'"
                           type="text"
                           @click.stop="handleOperation(it.fun,scope.row,scope.$index,it)">{{ it.label }}
                </el-button>
              </template>
              <slot v-if="item.type ==='slotBtn'"
                    :obj="scope"
                    name="slotBtn"/>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div v-if="pages.show"
           class="pages_wrap">
        <el-pagination :current-page.sync="pages.currentPage"
                       @size-change="handleSizeChange"
                       :page-size="pages.pageSize"
                       :page-sizes="PAGE_SIZE_OPT"
                       :total="pages.total"
                       layout="total, prev, sizes,pager, next,jumper"
                       @current-change="handleCurrentChange"/>
      </div>
    </template>
  </div>
</template>

<script>
import { PAGE_SIZE_OPT } from '@/utils/consts'

export default {
  name: 'AdTable',
  data () {
    return {
      PAGE_SIZE_OPT
    }
  },
  props: {
    delData: {
      type: String,
      default: ''
    },
    selData: {
      type: String,
      default: ''
    },
    vLoading: {
      type: Boolean,
      default: false
    },
    pages: {
      type: Object,
      default: function () {
        return {
          show: false,
          pageSize: 0,
          total: 0,
          currentPage: 0
        }
      }
    },
    // theader: [
    //     {
    //         label: '表头1', //表头名称
    //         prop: 'header1',   //列字段
    //         type: 'sel',   //列类型 带勾选
    //         width: '100',//列宽度
    //         className: 'class1',//列class名
    //         minWidth: '100',//列最小宽度
    //     },
    //     {
    //         label: '表头2', //表头名称
    //         prop: 'header2',   //列字段
    //         type: 'index',   //列类型 带序列号
    //         width: '100',//列宽度
    //         className: 'class2',//列class名
    //         minWidth: '100',//列最小宽度
    //     },
    //     {
    //         label: '表头3', //表头名称
    //         prop: 'header3',   //列字段
    //         type: 'text',   //列类型 常用
    //         width: '100',//列宽度
    //         className: 'class3',//列class名
    //         minWidth: '100',//列最小宽度
    //     },
    //     {
    //         label: '表头3', //表头名称
    //         prop: 'header3',   //列字段
    //         type: 'tem',   //列类型 自定义模板
    //         width: '100',//列宽度
    //         className: 'class3',//列class名
    //         minWidth: '100',//列最小宽度
    //     },
    //     {
    //         label: '表头4', //表头名称
    //         prop: 'header4',   //列字段
    //         type: 'btn',   //列类型 按钮
    //         width: '100',//列宽度
    //         className: 'class4',//列class名
    //         minWidth: '100',//列最小宽度
    //         btn: [
    //             {
    //                 label: '编辑',//按钮名称
    //                 fun: 'edit',//按钮回调事件
    //                 className: '',//按钮class
    //                 show:false,//按钮展示隐藏
    //             }
    //         ]
    //     },
    // ],
    // <template slot-scope="scope"
    //         slot="content">
    //         {{ scope.obj.row.content==1?'是':'否'}}    scope.obj.row 当行item
    //     </template>
    theader: {
      type: Array,
      default: () => [ // 表头数据 —— className:列的class名
        {
          label: '', // 表头名称
          prop: '', // 列字段
          type: '', // 列类型
          width: '', // 列宽度
          className: '', // 列class名
          minWidth: ''// 列最小宽度
        }
      ]
    },
    tbody: {
      type: Array,
      default: () => []
    },
    table: {
      type: Object,
      default () {
        return {
          hasMergeRowOrColumn: false, // 是否合并单元格
          loading: false, // 加载中动画
          hasShowSummary: false, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          expands: [ // 展开行数据
            {
              id: '1',
              label: 'label',
              prop: 'prop'
            }
          ],
          getSummaries (param) { // 自定义表位合计行数据
            // *** 此函数传入param参数
            // console.log(param);
            // *** 最后返回一个数组，合计行会显示数组中的内容
            return []
          }
        }
      }
    }
  },
  watch: {
    'delData': function () {
      this.$refs.adTable.toggleRowSelection(this.delData, false)
    },
    'selData': function () {
      this.selData.map(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('size-change', val)
      // size-change
    },
    clearSelection () {
      this.$refs.adTable.clearSelection()
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
      // selection-change
    },
    handleOperation (fun, val, index, it) {
      this.$emit(fun, val, index, it)
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (!this.hasMergeRowOrColumn) {

      } else {
        this.$emit('onMergeRowOrColumn', { row, column, rowIndex, columnIndex })
      }
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick (Row, Event, Column) {
      if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
        return
      }
      const data = {
        row: Row,
        event: Event,
        column: Column
      }
      this.$emit('rowClick', data)
    },
    // 行类名的回调函数
    // 在表格数据中添加class字段即为表格行类名，配合css可对表格行中的自定义标签进行样式优化
    rowClassName (rowdata) {
      const data = this.tbody
      let className = data[rowdata.rowIndex].class ? data[rowdata.rowIndex].class : ''
      if (className.length === 0) {
        return
      }
      className = className.join(' ')
      return className
    }
  }
}
</script>

<style lang='scss'>
  .el-table th {
    background-color: #fafbfc;
  }

  .pages_wrap {
    .el-pagination {
      font-weight: normal;
      text-align: right;
    }
  }
</style>
