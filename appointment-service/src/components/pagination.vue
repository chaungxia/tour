<template>
    <el-pagination @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :current-page.sync="num"
        :page-sizes="PAGE_SIZE_OPT"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total" />
</template>
<script>
import { PAGE_SIZE_OPT } from '@/utils/consts'
export default {
  props: {
    pageSize: {
      default: 10
    },
    currentPage: {
      default: 1
    },

    total: {
      default: 0
    }
  },

  data () {
    return {
      PAGE_SIZE_OPT,
      num: 1
    }
  },

  watch: {
    currentPage: function () {
      this.num = this.currentPage
    }
  },

  methods: {
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    }
  }
}
</script>

<style lang="scss">
</style>
