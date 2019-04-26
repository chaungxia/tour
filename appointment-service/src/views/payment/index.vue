<template>
  <div class="payment_wrap">
    <div>
      <div class="right_wrap fr"
           :style="{height:contentHeight}">
        <div class="header">
          <p>充值金额</p>
          <el-popover placement="left"
                      width="300"
                      popper-class='keyboard_wrap'
                      trigger="click">
            <ul class="keyboard">
              <li @click="keyboardClick(1)"
                  class="item fl cursor">
                1
              </li>
              <li @click="keyboardClick(2)"
                  class="item fl cursor">
                2
              </li>
              <li @click="keyboardClick(3)"
                  class="item fl cursor">
                3
              </li>
            </ul>
            <ul class="keyboard">
              <li @click="keyboardClick(4)"
                  class="item fl cursor">
                4
              </li>
              <li @click="keyboardClick(5)"
                  class="item fl cursor">
                5
              </li>
              <li @click="keyboardClick(6)"
                  class="item fl cursor">
                6
              </li>
            </ul>
            <ul class="keyboard">
              <li @click="keyboardClick(7)"
                  class="item fl cursor">
                7
              </li>
              <li @click="keyboardClick(8)"
                  class="item fl cursor">
                8
              </li>
              <li @click="keyboardClick(9)"
                  class="item fl cursor">
                9
              </li>
            </ul>
            <ul class="keyboard last_keyboard">
              <li @click="clearClick"
                  class="item fl cursor">
                清除
              </li>
              <li @click="keyboardClick(0)"
                  class="item fl cursor">
                0
              </li>
              <li @click="deleteClick"
                  class="item fl cursor">
                <i class="iconfont icon-shanchu2"></i>
              </li>
            </ul>
            <el-input slot="reference"
                      v-model='importValue'
                      placeholder="0.00">
            </el-input>
          </el-popover>
          <p>
            充值
            <span class="color1">{{importValue||0}}</span> 元， 赠送
            <span class="color1">0</span> 元
          </p>
        </div>
        <ul class="content clearfix">
          <li class="item fl cursor"
              :class="{'active':item.checked}"
              v-for="(item,index) in wayType"
              @click="wayTypeClick(item)"
              :key="index">
            <div>
              <i class="iconfont"
                 :class="[item.icon,]">
              </i>
              <p>
                {{item.name}}
              </p>
            </div>
            <i class="iconfont icon-zhijiaoxuanzhong"></i>
          </li>
        </ul>
        <div class="footer cursor"
             @click='payBtn'
             :class="{'active':isActive}">
          充值
        </div>
      </div>
      <div class="left_wrap"
           id='left_wrap'
           :style="{height:contentHeight}">
        <div class="header">
          <div class="header_left">
            <div class="img_wrap">
              <img class="round_img"
                   :src="info.headerImage||require('../../assets/img/pic.png')"
                   alt="">
              <i v-if='info.memberType=="1"'
                 class="iconfont icon-huiyuantubiao"></i>
            </div>
            <ul class="info">
              <li class="name">{{info.name}}
                <span class="label">{{info.levelName}}</span>
              </li>
              <li class="no">{{info.no}}</li>
            </ul>
          </div>
          <div class="header_right fr">
            <ul class="info_wrap">
              <li class="title">总余额</li>
              <li class="num">
                <span>￥</span>
                {{info.totalBalance}}
              </li>
            </ul>
            <ul class="info_wrap">
              <li class="title">本次充值总额</li>
              <li class="num">
                <span>￥</span>0
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <ul class="item_wrap"
              v-if='hasPay.length'>
            <li class="item"
                v-for='(item,index) in hasPay'
                :key="index">
              <div class="item_left">
                <i class="iconfont"
                   :class="[item.icon,]">
                </i>
                <span>
                                    {{item.name}}
                                </span>
              </div>
              <ul class="fr item_right">
                <li class="top">+￥{{item.importValue}}</li>
                <li class="bottom color1">+￥0</li>
              </ul>
            </li>
            <li class="item ">
              <ul class="fr all_wrap">
                <li class="pay_gold"> 实付金额
                  <span>￥{{totalMoney}}</span>
                </li>
                <li class="with_gold">赠金
                  <span class="color1">￥0</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <ul class="footer">
          <li class="item">
            实际支付
            <span class="money">￥{{info.actualBalance}}</span>
          </li>
          <li class="item">赠金
            <span class="money">￥{{info.extraBalance}}</span>
          </li>
          <li class="item">锁定金额
            <span class="money">￥{{info.lockBalance}}</span>
          </li>
          <li class="item">可用金额
            <span class="money">￥{{info.availableBalance}}</span>
          </li>
        </ul>
      </div>

    </div>
    <el-dialog title="刷卡登记"
               @closed='colseCard'
               class="ad_dialog"
               center
               :visible.sync="cardShow"
               width="480px">
      <el-form :model="cardForm"
               class="ad_form"
               :rules="cardForm"
               ref="ruleForm"
               label-width="110px"
               size="medium">
        <el-form-item label="银行名称"
                      prop="name">
          <el-select placeholder="请选择"
                     v-model="cardForm.bankName"
                     :style="{width:inputw}">
            <el-option :label="item"
                       :value="item"
                       v-for="(item,index) in bankOpt"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡类型"
                      prop="name">
          <el-radio-group v-model='cardForm.bankType'>
            <el-radio :label="3">储蓄卡</el-radio>
            <el-radio :label="6">信用卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开户名"
                      prop="name">
          <el-input v-model="cardForm.name"
                    :style="{width:inputw}"
                    size="medium"></el-input>
        </el-form-item>
        <el-form-item label="银行账号"
                      prop="name">
          <el-input v-model="cardForm.bankN0"
                    :style="{width:inputw}"
                    size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div class="text-center footer-row">
        <el-button @click="cardShow=false"
                   :style="{width:btnWidth}">取消
        </el-button>
        <el-button type="danger"
                   @click="cardSubmit"
                   :style="{width:btnWidth}">确定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title=""
               class="ad_dialog"
               center
               :visible.sync="waitShow"
               width="280px">
      <div class="waiting_wrap">
        <i class="icon-dengdai iconfont color1"></i>
        <p>
          等待客户支付...
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import paymentApi from '@/api/payment'
import Cookies from 'js-cookie'

let $ = (className) => {
  return document.querySelector(className)
}
export default {
  data () {
    return {
      // 、、充值是否可点
      isActive: false,
      // 等待支付 waiting
      waitShow: false,
      inputw: '246px',
      // 银行 options
      bankOpt: [],
      // 、、刷卡登记form
      cardForm: {
        bankName: '',
        bankType: ''
      },
      btnWidth: '160px',
      // 刷卡登记show
      cardShow: false,
      // 、、计算内容高
      contentHeight: '',
      // 输入充值金额
      importValue: '',
      // 支付方式
      wayType: [
        {
          name: '微信支付',
          icon: 'icon-weixinzhifu',
          checked: false,
          type: '1'
        }, {
          name: '支付宝',
          icon: 'icon-zhifubao ',
          checked: false,
          type: '2'
        }, {
          name: ' 拉卡拉POS',
          icon: 'icon-pos',
          checked: false,
          type: '3'
        }, {
          name: '银行卡',
          icon: 'icon-yinhangqia',
          checked: false,
          type: '4'
        }, {
          name: ' 现金',
          icon: ' icon-xianjin',
          checked: false,
          type: '5'
        }, {
          name: ' 转账',
          icon: 'icon-zhuanzhang',
          checked: false,
          type: '6'
        }, {
          name: '支票',
          icon: 'icon-zhipiao',
          checked: false,
          type: '7'
        }, {
          name: '其他',
          icon: 'icon-qita',
          checked: false,
          type: '8'
        }
      ],
      hasPay: [],
      selectedWay: '',
      totalMoney: '',
      custId: '',
      info: {},
      batchNo: ''
    }
  },
  methods: {
    cardSubmit () {

    },
    // 刷卡登记关闭 colsed
    colseCard () {

    },
    // 、、充值按钮
    payBtn () {
      if (this.isActive) {
        this.totalMoney = ''
        let obj = {
          payment_amount: this.importValue,
          payment_channel: this.selectedWay.type,
          batch_no: this.batchNo,
          customer_id: this.custId
        }
        paymentApi.receiptsPost(obj).then(res => {
          this.$message({
            type: 'success',
            message: '充值成功'
          })
          this.getInfo()
          this.selectedWay.importValue = this.importValue
          this.hasPay.push(this.selectedWay)
          this.hasPay.map(el => {
            this.totalMoney = Number(this.totalMoney) + Number(el.importValue)
          })
        })
      }
    },
    // 键盘数组click方法
    keyboardClick (item) {
      this.importValue += item + ''
    },
    // 、、键盘清除按钮
    clearClick () {
      this.importValue = ''
    },
    // 键盘删除按钮
    deleteClick () {
      this.importValue = this.importValue.substring(0, this.importValue.length - 1)
    },
    // 支付方式选中方法
    wayTypeClick (item) {
      this.wayType.map(el => {
        if (el.name === item.name) {
          item.checked = !item.checked
          this.selectedWay = item
          if (item.checked && Number(this.importValue)) {
            this.isActive = true
          } else {
            this.isActive = false
          }
        } else {
          el.checked = false
        }
      })
    },
    // 获取客户账户信息
    getInfo () {
      paymentApi.custAccountsPost(this.custId, {
        'sid': Cookies.get('storeId')
      }).then(res => {
        this.info = res
      })
    }

  },
  watch: {
    'importValue': function (val) {
      if ((Number(this.importValue) + '').length && this.wayType.some(el => { return el.checked })) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  },
  mounted () {
    this.batchNo = new Date().getTime() + ''
    let winH = document.documentElement.clientHeight
    this.contentHeight = winH - $('#left_wrap').offsetTop - 20 + 'px'
    this.custId = '48'
    this.getInfo()
  }
}
</script>
<style lang="scss">
  .ad_dialog {
    .waiting_wrap {
      text-align: center;
      .iconfont {
        font-size: 27px;
      }
      p {
        margin-top: 20px;
      }
    }
    .ad_form .el-input__prefix,
    .ad_form .el-input__suffix {
      left: inherit;
      right: 0;
      width: 36px;
      border-left: 1px solid #dcdfe6;
    }
    .el-radio__inner:hover {
      border-color: #ff5183;
    }
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #ff5183;
      background: #ff5183;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #272636;
    }
  }

  .payment_wrap {
    .right_wrap {
      .header {
        .el-input__inner {
          border: 0;
          text-align: center;
          color: #cccccc;
          min-width: 100px;
          max-width: 100%;
          font-size: 48px;
          margin-top: 8px;
        }
      }
    }
  }

  .keyboard_wrap {
    padding: 0;
    .keyboard {
      .item {
        font-size: 26px;
        color: #272636;
        width: 33.33%;
        line-height: 100px;
        text-align: center;
        border-right: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        &:last-child {
          border-right: 0;
        }
      }
      &.last_keyboard {
        .item {
          border-bottom: 0;
          line-height: 100px;
          height: 100px;
          &:first-child {
            font-size: 20px;
          }
          &:last-child {
            .iconfont {
              color: #cccccc;
              font-size: 30px;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .color1 {
    color: #ff5183;
  }

  .icon-weixinzhifu {
    color: #7ed321;
  }

  .icon-zhifubao {
    color: #3988ff;
  }

  .icon-pos {
    color: #fe81c7;
  }

  .icon-yinhangqia {
    color: #ff9439;
  }

  .icon-xianjin {
    color: #f8d51c;
  }

  .icon-zhuanzhang {
    color: #68cab7;
  }

  .icon-zhipiao {
    color: #f76d89;
  }

  .icon-qita {
    color: #cccccc;
  }

  .right_wrap {
    width: 358px;
    color: #272636;
    margin-right: 20px;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    border-radius: 6px;
    padding: 18px 13px 20px;
    .footer {
      &.active {
        background: #ff5183;
      }
      background: #ffc4d5;
      line-height: 56px;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      font-size: 16px;
      margin: 5px;
    }
    .content {
      margin-top: 12px;
      .item {
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &.active {
          border: 1px solid #ff5183;
          .icon-zhijiaoxuanzhong {
            display: block;
          }
        }
        position: relative;
        width: 156px;
        height: 86px;
        border-radius: 6px;
        border: 1px solid #ececec;
        text-align: center;
        color: #272636;
        margin: 5px;
        overflow: hidden;
        .icon-zhijiaoxuanzhong {
          color: #ff5183;
          position: absolute;
          right: 0px;
          bottom: 3px;
          display: none;
        }
        .iconfont {
          font-size: 28px;
        }
      }
    }
    .header {
      text-align: center;
      p {
        color: #272636;
      }
    }
  }

  .left_wrap {
    margin-right: 398px;
    margin-top: 20px;
    margin-left: 20px;
    border-radius: 6px;
    box-shadow: 0px 3px 15px 0px rgba(59, 74, 116, 0.1);
    position: relative;
    .content {
      position: relative;
      height: 100%;
      height: calc(100% - 170px);
      .item_wrap {
        margin: 20px;
        max-height: calc(100% - 40px);
        border: 1px solid #ececec;
        border-radius: 6px;
        .item {
          border-bottom: 1px solid #ececec;
          padding: 0 25px;
          &:last-child {
            overflow: hidden;
            border: 0;
          }
          .all_wrap {
            li {
              display: inline-block;
              line-height: 50px;
              font-size: 14px;
              margin-left: 18px;
              .pay_gold {
                span {
                  font-size: 18px;
                  color: #272636;
                }
              }
              .with_gold {
                span {
                  font-size: 18px;
                }
              }
            }
          }
          .item_right {
            margin-top: 20px;
            text-align: right;
            .top {
              font-size: 18px;
              color: #272636;
              margin-bottom: 4px;
            }
            .bottom {
              font-size: 12px;
            }
          }
          .item_left {
            display: inline-block;
            height: 74px;
            line-height: 74px;
            vertical-align: middle;

            span {
              vertical-align: middle;
              display: inline-block;
              margin-top: -14px;
            }
            .iconfont {
              font-size: 28px;
            }
          }
        }
      }
    }
    .footer {
      text-align: right;
      padding: 13px 0;
      border-top: 1px solid #ececec;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 46px;
      .item {
        display: inline-block;
        margin-right: 30px;
        .money {
          color: #ff5183;
        }
      }
    }

    .header {
      position: relative;
      padding: 29px 20px 31px 20px;
      border-bottom: 1px solid #ececec;
      height: 124px;
      .header_right {
        margin-top: 10px;
        .info_wrap {
          &:last-child {
            .num {
              color: #96989c;
            }
          }
          position: relative;
          &:last-child {
            padding-left: 40px;
            padding-right: 10px;
          }
          &:first-child {
            padding-right: 40px;
            &::after {
              position: absolute;
              right: 0;
              top: 8px;
              content: " ";
              height: 46px;
              border-right: 1px solid #e7eaed;
            }
          }
          display: inline-block;
          text-align: right;
          .title {
            color: #96989c;
            margin-bottom: 10px;
          }
          .num {
            span {
              font-size: 20px;
            }
            font-size: 42px;
            color: #272636;
          }
        }
      }
      .header_left {
        display: inline-block;
        .img_wrap {
          display: inline-block;
          position: relative;
          .iconfont {
            position: absolute;
            right: 0;
            bottom: 0;
            color: #d2b157;
          }
          .round_img {
            border-radius: 50%;
            width: 64px;
            height: 64px;
          }
        }
        .info {
          display: inline-block;
          position: absolute;
          top: 50px;
          left: 92px;
          .name {
            font-size: 16px;
            color: #272636;
            margin-bottom: 4px;
            .label {
              display: inline-block;
              color: #ff5183;
              border: 1px solid #ff5183;
              border-radius: 3px;
              font-size: 12px;
              line-height: 14px;
              margin-left: 4px;
              padding: 0 3px;
            }
          }
          .no {
            color: #96989c;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
