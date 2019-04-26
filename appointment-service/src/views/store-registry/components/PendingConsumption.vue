<template>
  <div class="pendingconsumption flex_1">
    <div class="consumption_title select_none">共有 <span class="number">{{content.length}}</span>个待确认消费</div>
    <div :style="{height:height}" class="consumption_content">
      <ul class="display_flex display_flex_wrap">
        <li v-for="(Item,Index) in content" :key="Index">
          <div class="consumption_item">
            <div class="store_name">{{Item.storeName}}</div>
            <div class="arrival_time">{{Item.arrivalTime}}</div>
            <div v-for="(item,index) in Item.servers" :key="index" class="servers_li">
              <div class="display_flex flex_justify align_center">
                <div class="server_name flex_1">{{item.SerialNumber+' '+item.name}}</div>
                <div class="sale_price">￥ {{item.salePrice}}</div>
              </div>
              <div class="display_flex flex_justify align_center">
                <div class="server_name flex_1">×{{item.name}}</div>
                <div class="server_num">{{item.num}}</div>
              </div>
            </div>
            <div class="server_content">
              <div class="server_item display_flex flex_justify align_center">
                <div class="server_name">服务技师</div>
                <div class="server_details">{{Item.technician}}</div>
              </div>
              <div class="server_item display_flex flex_justify align_center">
                <div class="server_name">项目总数</div>
                <div class="server_details">{{Item.total}}</div>
              </div>
              <div class="server_item display_flex flex_justify align_center">
                <div class="server_name">总计</div>
                <div class="server_details">{{Item.totalPrice}}</div>
              </div>
              <div class="server_item display_flex flex_justify align_center">
                <div class="server_name">卷抵扣</div>
                <div class="server_details">-￥{{Item.couponDeduction}}</div>
              </div>
              <div class="server_item display_flex flex_justify align_center">
                <div class="server_name">积分抵扣</div>
                <div class="server_details">-￥{{Item.integralDeduction}}</div>
              </div>
            </div>
            <div class="server_submit display_flex flex_justify align_center">
              <div class="submit_total display_flex align_center">
                <span>应付总额</span>
                <span class="total_price">￥{{Item.totalPrice}}</span>
              </div>
              <el-button plain>确认消费</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Height } from '@/utils/common'

export default {
  props: {
    num: {
      default: 0
    }
  },
  data () {
    return {
      height: '',
      content: [
        {
          storeName: '奈瑞儿(虹口门店)',
          arrivalTime: '2018-11-22 09:00:00',
          servers: [
            { name: '环保悦然美甲环保悦然美甲环保悦然美甲（足部光疗单色款）', salePrice: '398', num: 1, SerialNumber: 'W1234567' },
            { name: '化妆造型化妆造型化妆造型化妆造型（派对妆）', salePrice: '598', num: 2, SerialNumber: 'W1234567' }
          ],
          technician: '张静雯,刘铭锐',
          total: 3,
          totalPrice: 996,
          couponDeduction: 0,
          integralDeduction: 0
        },
        {
          storeName: '奈瑞儿(浦东门店)',
          arrivalTime: '2018-11-22 09:00:00',
          servers: [
            { name: '环保悦然美甲环保悦然美甲环保悦然美甲（足部光疗单色款）', salePrice: '398', num: 1, SerialNumber: 'W1234567' },
            { name: '化妆造型化妆造型化妆造型化妆造型（派对妆）', salePrice: '598', num: 2, SerialNumber: 'W1234567' }
          ],
          technician: '张静雯,刘铭锐',
          total: 3,
          totalPrice: 996,
          couponDeduction: 0,
          integralDeduction: 0
        },
        {
          storeName: '奈瑞儿(东方门店)',
          arrivalTime: '2018-11-22 09:00:00',
          servers: [
            { name: '环保悦然美甲环保悦然美甲环保悦然美甲（足部光疗单色款）', salePrice: '398', num: 1, SerialNumber: 'W1234567' },
            { name: '化妆造型化妆造型化妆造型化妆造型（派对妆）', salePrice: '598', num: 2, SerialNumber: 'W1234567' }
          ],
          technician: '张静雯,刘铭锐',
          total: 3,
          totalPrice: 996,
          couponDeduction: 0,
          integralDeduction: 0
        },
        {
          storeName: '奈瑞儿(静安门店)',
          arrivalTime: '2018-11-22 09:00:00',
          servers: [
            { name: '环保悦然美甲环保悦然美甲环保悦然美甲（足部光疗单色款）', salePrice: '398', num: 1, SerialNumber: 'W1234567' },
            { name: '化妆造型化妆造型化妆造型化妆造型（派对妆）', salePrice: '598', num: 2, SerialNumber: 'W1234567' }
          ],
          technician: '张静雯,刘铭锐',
          total: 3,
          totalPrice: 996,
          couponDeduction: 0,
          integralDeduction: 0
        }
      ]
    }
  },
  mounted () {
    this.height = Height('.consumption_content', 60)
    window.onresize = () => {
      this.height = Height('.consumption_content', 60)
    }
  }
}
</script>

<style lang="scss">
  .pendingconsumption {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    border-radius: 6px;
    border: 1px solid #ececec;
    .consumption_title {
      background: #f8fafb;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      line-height: 56px;
      padding: 0 20px;
      font-size: 14px;
      color: #96989c;
      .number {
        color: #ff5183;
        font-weight: 600;
      }
    }
    .consumption_content {
      box-sizing: border-box;
      margin: 20px 0;
      padding: 20px 10px;
      overflow-y: auto;
      li {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        @media (min-width: 1200px) {
          width: 100%;
        }
        @media (min-width: 1350px) {
          width: 50%;
        }
        @media (min-width: 1550px) {
          width: 33.33%;
        }
        .consumption_item {
          border: 1px solid #ececec;
          padding: 20px;
          .store_name {
            font-size: 16px;
            color: #272636;
            font-weight: 600;
            line-height: 22px;
            text-align: center;
            margin: 8px 0 4px;
          }
          .arrival_time {
            font-size: 12px;
            color: #272636;
            text-align: center;
          }
          .servers_li {
            font-size: 14px;
            color: #272636;
            line-height: 20px;
            padding: 15px 0;
            border-bottom: 1px solid #ececec;
            .server_name {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .sale_price {
              font-weight: 600;
              font-size: 14px;
              color: #ff5183;
            }
            .server_num {
              font-size: 12px;
              color: #96989c;
            }
          }
          .server_content {
            padding: 20px 0;
            border-bottom: 1px solid #ececec;
            .server_item {
              line-height: 20px;
              font-size: 12px;
              .server_name {
                color: #96989c;
              }
              .server_details {
                color: #272636;
              }
            }
          }
          .server_submit {
            margin-top: 20px;
            .submit_total {
              font-size: 12px;
              color: #272636;
              .total_price {
                font-weight: 600;
                font-size: 16px;
                color: #ff5183;
                margin-left: 10px;
              }
            }
            .el-button {
              padding: 10px 26px;
              border-color: #ff5183;
              background: #ff5183;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
