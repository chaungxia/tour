<template>
  <div class="selectcoupons flex_1">
    <ul class="coupons_coupon">
      <li v-for="(item,index) in coupons" :key="index" class="coupons_item select_none"
          :class="{active:item.coupon==coupon}" @click.stop="coupon = item.coupon">{{item.name}}
      </li>
    </ul>
    <div v-if="coupon==1" class="meituan">
      <el-input :value="value" v-model="value" @keyup.native="couponkeyup" placeholder="请输入验卷码">
        <i class="iconfont icon-shanchu2" slot="suffix" v-show="value!==''" @click="couponremove"></i>
      </el-input>
      <div class="display_flex box_sizing select_none">
        <div class="flex_1">
          <div class="display_flex">
            <div class="flex_1 number" @click.stop="couponclick(1)">1</div>
            <div class="flex_1 number" @click.stop="couponclick(2)">2</div>
            <div class="flex_1 number" @click.stop="couponclick(3)">3</div>
          </div>
          <div class="display_flex">
            <div class="flex_1 number" @click.stop="couponclick(4)">4</div>
            <div class="flex_1 number" @click.stop="couponclick(5)">5</div>
            <div class="flex_1 number" @click.stop="couponclick(6)">6</div>
          </div>
          <div class="display_flex">
            <div class="flex_1 number" @click.stop="couponclick(7)">7</div>
            <div class="flex_1 number" @click.stop="couponclick(8)">8</div>
            <div class="flex_1 number" @click.stop="couponclick(9)">9</div>
          </div>
          <div class="display_flex">
            <div class="flex_1 number" @click.stop="couponclick(0)">0</div>
            <div class="clear" @click.stop="value=''">清除</div>
          </div>
        </div>
        <div class="operation">
          <div class="scanning">
            <i class="iconfont icon-saomayanzheng"></i>
          </div>
          <div class="determine">
            <i class="iconfont icon-queding"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="coupon==2"></div>
    <div v-else class="other_merchants">
      <div class="merchants_title">请选择一种卷进行验证</div>
      <ul class="display_flex merchants_verification">
        <li v-for="(item,index) in mode" :key="index" class="verification" :class="{active:item.type==type}"
            @click.stop="type=item.type">
          <i class="iconfont" :class="item.class"></i>
          <div>{{item.name}}</div>
        </li>
      </ul>
      <div class="roll">
        <div class="roll_type display_flex align_center">
          <div class="roll_name">优惠卷类型</div>
          <el-select v-model="value" placeholder="请选择" size="medium" class="select_type" style="width: 220px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-popover class="roll_type inline_block" placement="right" width="300" trigger="click">
          <el-input slot="reference" class="roll_input" v-model="roll" @keyup.native="rollkeyup" placeholder="请输入验卷码">
            <i class="iconfont icon-queding" slot="suffix" @click.stop></i>
          </el-input>
          <div class="display_flex rows">
            <div class="flex_1" @click.stop="rollclick(1)">1</div>
            <div class="flex_1" @click.stop="rollclick(2)">2</div>
            <div class="flex_1">3</div>
          </div>
          <div class="display_flex rows">
            <div class="flex_1" @click.stop="rollclick(4)">4</div>
            <div class="flex_1" @click.stop="rollclick(5)">5</div>
            <div class="flex_1" @click.stop="rollclick(6)">6</div>
          </div>
          <div class="display_flex rows">
            <div class="flex_1" @click.stop="rollclick(7)">7</div>
            <div class="flex_1" @click.stop="rollclick(8)">8</div>
            <div class="flex_1" @click.stop="rollclick(9)">9</div>
          </div>
          <div class="display_flex rows">
            <div class="flex_1 rows_txt" @click.stop="roll=''">清除</div>
            <div class="flex_1" @click.stop="rollclick(0)">0</div>
            <div class="flex_1" @click.stop="rollcalear"><i class="iconfont icon-shanchu2"></i></div>
          </div>
        </el-popover>

        <!-- <div class="roll_type inline_block">
            <el-input class="roll_input" v-model="roll" @keyup.native="rollkeyup" @focus="visible=true" placeholder="请输入验卷码">
                <i class="iconfont icon-queding" slot="suffix"></i>
            </el-input>
            <div v-show="visible" class="keyboard select_none">
                <div class="display_flex rows">
                    <div class="flex_1" @click.stop="rollclick(1)">1</div>
                    <div class="flex_1" @click.stop="rollclick(2)">2</div>
                    <div class="flex_1">3</div>
                </div>
                <div class="display_flex rows">
                    <div class="flex_1" @click.stop="rollclick(4)">4</div>
                    <div class="flex_1" @click.stop="rollclick(5)">5</div>
                    <div class="flex_1" @click.stop="rollclick(6)">6</div>
                </div>
                <div class="display_flex rows">
                    <div class="flex_1" @click.stop="rollclick(7)">7</div>
                    <div class="flex_1" @click.stop="rollclick(8)">8</div>
                    <div class="flex_1" @click.stop="rollclick(9)">9</div>
                </div>
                <div class="display_flex rows">
                    <div class="flex_1 rows_txt" @click.stop="roll=''">清除</div>
                    <div class="flex_1" @click.stop="rollclick(0)">0</div>
                    <div class="flex_1" @click.stop="rollcalear"><i class="iconfont icon-shanchu2"></i></div>
                </div>
            </div>
        </div> -->
        <div class="roll_type display_flex align_center">
          <div class="roll_name">销售员工工号</div>
          <el-input class="select_type" style="width: 130px" v-model="no" size="medium"></el-input>
        </div>
        <div class="roll_type display_flex ">
          <div class="roll_name">备注</div>
          <el-input class="select_type" rows="4" type='textarea' resize="none" style="width: 382px"
                    v-model="textarea"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      coupons: [
        { name: '美团/大众点评', coupon: 1 },
        { name: '支付宝口碑', coupon: 2 },
        { name: '自有&其他商家卷', coupon: 3 }
      ],
      coupon: 1,
      value: '',
      mode: [
        { name: '卷号', type: 1, class: 'icon-quanhao' },
        { name: '序号', type: 2, class: 'icon-xuhao' },
        { name: '电子卷号', type: 3, class: 'icon-dianziquanhao' }
      ],
      type: 1,
      options: [],
      roll: '',
      visible: false,
      no: '',
      textarea: ''
    }
  },
  mounted () { },
  methods: {
    couponremove () {
      if (this.value.length && this.value.length % 5 === 0) {
        this.value = this.value.substring(0, this.value.length - 2)
      } else {
        this.value = this.value.substring(0, this.value.length - 1)
      }
    },
    couponkeyup (e) {
      this.value = this.value.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    },
    couponclick (no) {
      this.value += no + ''
      this.couponkeyup()
    },
    rollcalear () {
      if (this.roll.length && this.roll.length % 5 === 0) {
        this.roll = this.roll.substring(0, this.roll.length - 2)
      } else {
        this.roll = this.roll.substring(0, this.roll.length - 1)
      }
    },
    rollkeyup (e) {
      this.roll = this.roll.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    },
    rollclick (no) {
      this.roll += no + ''
      this.rollkeyup()
    }
  }
}
</script>

<style lang="scss">
  .el-popover {
    padding: 0;
    .rows {
      text-align: center;
      line-height: 100px;
      height: 100px;
      font-size: 26px;
      color: #272636;
      box-sizing: border-box;
      &:not(:last-child) {
        border-bottom: 1px solid #ececec;
      }
      div:not(:last-child) {
        border-right: 1px solid #ececec;
      }
      .rows_txt {
        font-size: 20px;
        box-sizing: border-box;
      }
      .icon-shanchu2::before {
        font-size: 36px;
        color: #ccc;
      }
    }
  }

  .selectcoupons {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    border-radius: 6px;
    border: 1px solid #ececec;

    .coupons_coupon {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      height: 56px;
      padding-top: 7px;
      background: #f8fafb;
      box-sizing: border-box;
      .coupons_item {
        display: inline-block;
        width: 148px;
        line-height: 49px;
        text-align: center;
        margin-left: 12px;
        color: #96989c;
        font-size: 14px;
        cursor: pointer;
        &.active {
          background: url("../../../assets/img/tab-bg.jpg") no-repeat;
          background-position: center;
          background-size: 100% 100%;
          font-weight: 600;
          color: #272636;
        }
      }
    }
    .meituan {
      width: 520px;
      margin: 20px;
      padding: 20px;
      box-sizing: border-box;
      background: rgba(248, 250, 251, 1);
      border: 1px solid #f8fafb;
      .el-input {
        font-size: 26px;
        color: #272636;
        .el-input__inner {
          border-radius: 0;
          height: 84px;
          line-height: 84px;
          border-color: #ececec;
          padding-right: 70px;
        }
        .el-input--suffix .el-input__inner {
          padding-right: 60px;
        }
        .el-input__prefix,
        .el-input__suffix {
          line-height: 84px;
        }
        .icon-shanchu2:before {
          font-size: 36px;
          color: #cccccc;
          padding-right: 24px;
          line-height: 84px;
          display: inline-block;
        }
      }
      .box_sizing {
        box-sizing: border-box;
        .operation {
          width: 120px;
          box-sizing: border-box;
          .scanning {
            height: 100px;
            box-sizing: border-box;
            background: #000;
            text-align: center;
            line-height: 100px;
            .icon-saomayanzheng::before {
              color: #fff;
              font-size: 50px;
              cursor: pointer;
            }
          }
          .determine {
            height: 300px;
            line-height: 300px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            background: #cccccc;
            &.active {
              background: #ff5183;
            }
            .icon-queding::before {
              color: #fff;
              font-size: 40px;
            }
          }
        }
        .number {
          height: 100px;
          line-height: 100px;
          background: #fff;
          font-size: 26px;
          color: #272636;
          cursor: pointer;
          text-align: center;
          box-sizing: border-box;
          border-left: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
        }
        .clear {
          width: 240px;
          height: 100px;
          line-height: 100px;
          background: #fff;
          text-align: center;
          font-size: 26px;
          color: #272636;
          cursor: pointer;
          box-sizing: border-box;
          border-left: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
        }
      }
    }
    .other_merchants {
      padding: 20px;
      .merchants_title {
        font-size: 14px;
        color: #272636;
      }
      .merchants_verification {
        padding: 20px 0;
        .verification {
          display: inline-block;
          width: 136px;
          border: 1px solid #d8e2e7;
          border-radius: 6px;
          background: #fff;
          text-align: center;
          cursor: pointer;
          margin-right: 10px;
          padding: 20px 0 10px;
          font-size: 14px;
          line-height: 20px;
          color: #272636;
          position: relative;
          .icon-quanhao::before,
          .icon-xuhao::before,
          .icon-dianziquanhao::before {
            font-size: 32px;
            color: #cccccc;
          }
          &.active {
            background: #fff9fa;
            border-color: #ff5183;
            .icon-quanhao::before,
            .icon-xuhao::before,
            .icon-dianziquanhao::before {
              color: #ff5183;
            }
            &::after {
              content: "";
              background: #fff;
              border: 1px solid #ff5183;
              border-top-color: transparent;
              border-left-color: transparent;
              position: absolute;
              width: 8px;
              height: 8px;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%) rotate(45deg);
            }
          }
        }
      }
      .roll {
        padding: 30px 20px;
        background: #f8fafb;
        .inline_block {
          display: inline-block;
        }
        .roll_type {
          font-size: 12px;
          color: #272636;
          margin-bottom: 20px;
          position: relative;
          .roll_name {
            width: 80px;
            text-align: right;
          }
          .select_type {
            margin-left: 18px;
            .el-input__inner {
              border-radius: 0;
            }
          }
          // .keyboard {
          //   position: absolute;
          //   right: -330px;
          //   bottom: -105px;
          //   width: 300px;
          //   box-sizing: border-box;
          //   background: #ffffff;
          //   box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
          //   border-radius: 6px;
          //   border: 1px solid #ececec;
          //   text-align: center;
          //   z-index: 999;
          //   &::before {
          //     content: "";
          //     background: #fff;
          //     border: 1px solid #ececec;
          //     border-top-color: transparent;
          //     border-right-color: transparent;
          //     position: absolute;
          //     width: 10px;
          //     height: 10px;
          //     bottom: 140px;
          //     left: -6px;
          //     transform: rotate(45deg);
          //   }
          //   .rows {
          //     line-height: 100px;
          //     height: 100px;
          //     font-size: 26px;
          //     color: #272636;
          //     box-sizing: border-box;
          //     &:not(:last-child) {
          //       border-bottom: 1px solid #ececec;
          //     }
          //     div:not(:last-child) {
          //       border-right: 1px solid #ececec;
          //     }
          //     .rows_txt {
          //       font-size: 20px;
          //       box-sizing: border-box;
          //     }
          //     .icon-shanchu2::before {
          //       font-size: 36px;
          //       color: #ccc;
          //     }
          //   }
          // }
        }
        .roll_input {
          width: 480px;
          &.el-input {
            font-size: 26px;
            color: #272636;
            .el-input__inner {
              border-radius: 0;
              height: 84px;
              line-height: 84px;
              border-color: #ececec;
              padding-right: 84px;
            }
            .el-input__prefix,
            .el-input__suffix {
              right: 0px;
              width: 84px;
              line-height: 84px;
              background: #cccccc;
            }
            .icon-queding:before {
              font-size: 36px;
              color: #fff;
              line-height: 84px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
