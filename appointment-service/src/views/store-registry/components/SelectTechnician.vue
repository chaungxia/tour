<template>
  <div class="selecttechnician flex_1">
    <div class="technician_title select_none">当前空闲美容师</div>
    <div class="technician_content" :style="{height:height}">
      <ul class="display_flex display_flex_wrap">
        <li v-for="(item,index) in technician" :key="index">
          <div :class="{atcive:item.atcive}" class="technician_item display_flex flex_justify align_center select_none"
               @click.stop="selectcustomer(item)">
            <div>
              <div class="employee_name">{{item.employeeName}}</div>
              <div class="employee_id">{{item.employeeId}}</div>
            </div>
            <i v-if="item.atcive" class="iconfont icon-zhijiaoxuanzhong"></i>
            <img class="employee_avatar"
                 :src="item.employeeAvatar&&item.employeeAvatar||require('@/assets/img/pic.png')" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Height } from '@/utils/common'
import Cookies from 'js-cookie'
import api from '@/api/storeregistry'

export default {
  props: {
    employeeId: {
      default: ''
    }
  },
  data () {
    return {
      height: '',
      technician: []
    }
  },
  mounted () {
    this.height = Height('.technician_content', 60)
    window.onresize = () => {
      this.height = Height('.technician_content', 60)
    }
    this.employees()
  },
  methods: {
    employees () {
      api.free_employees(Cookies.get('storeId')).then(res => {
        let technician = res
        technician.map(e => {
          if (e.employeeId === this.employeeId) {
            e.atcive = true
          } else {
            e.atcive = false
          }
        })
        this.technician = technician
      })
    },
    selectcustomer (val) {
      this.technician.map(e => { e.atcive = false })
      val.atcive = true
      this.$emit('technicianFun', val)
    }
  }
}
</script>

<style lang="scss">
  .selecttechnician {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    border-radius: 6px;
    border: 1px solid #ececec;
    .technician_title {
      background: #f8fafb;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      line-height: 56px;
      padding: 0 20px;
      font-size: 14px;
      color: #96989c;
    }
    .technician_content {
      box-sizing: border-box;
      padding: 20px 15px;
      overflow-y: auto;
      li {
        padding: 5px;
        width: 25%;
        box-sizing: border-box;
        @media (min-width: 1350px) {
          width: 25%;
        }
        @media (min-width: 1550px) {
          width: 20%;
        }
        @media (min-width: 1700px) {
          width: 16.66%;
        }
        .technician_item {
          border: 1px solid #ECECEC;
          padding: 15px;
          position: relative;
          .employee_name {
            color: #272636;
            font-size: 16px;
            font-weight: 600;
            line-height: 26px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .employee_id {
            color: #272636;
            font-size: 12px;
            line-height: 24px;
          }
          .employee_avatar {
            width: 50px;
            height: 50px;
            display: block;
            margin-left: 50px;
          }
          &.atcive {
            border: 1px solid #ff5183;
            position: relative;
            .icon-zhijiaoxuanzhong::before {
              color: #ff5183;
              font-size: 18px;
              position: absolute;
              right: 0;
              bottom: -1px;
            }
          }
        }
      }
    }
  }
</style>
