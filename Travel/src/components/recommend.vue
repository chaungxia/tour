<template>
  <div class="recommend">
    <div class="top">
      <div class="top_left">
        <div class="image">
          <img :src="List.cover" alt>
        </div>
        <el-calendar>
          <template slot="dateCell" slot-scope="{date, data}">
            <p
              :class="data.isSelected ? 'is-selected' : ''"
            >{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
            <div class="color" v-if="List.type==1">99</div>
            <div class="color" v-else>1909</div>
          </template>
        </el-calendar>
      </div>
      <div class="top_right">
        <p class="title">{{List.title}}</p>
        <div class="price">
          <div class="pric">
            <span>{{List.price}}</span>元起
          </div>
          <div class="price_right">
            <span>浏览：18</span>
            <span>销售：0</span>
          </div>
        </div>
        <div class="info">
          <p>产品信息</p>
          <p>{{List.content1}}</p>
        </div>
        <div class="right_bottom">
          <p>
            <b>出行日期</b>
          </p>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            @change="dateChange"
            :picker-options="pickerOptions1"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <div class="num">
            <p>
              <b>数量</b>
              <span class="nums" v-if="show">{{number}}x{{num}}</span>
            </p>
            <el-input-number v-model="num" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
          </div>
          <div class="buy">
            <div class="txt">
              ￥
              <span v-if="show">{{number*num}}</span>
            </div>
        <el-button type="danger" v-model="sum" @click="books()">预定</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom_left">
        <el-tabs v-model="activeName" type="card" @handleClick="handleClick()">
          <el-tab-pane label="产品详情" name="first">
            <div class="detail">
              <h2>产品详情</h2>
              <div class="info">
                <div class="info_left">
                  <b>产品信息</b>
                </div>
                <div class="info_right">
                  <p>{{List.content1}}</p>
                  <div class="image">
                    <img :src="List.url1" alt>
                  </div>
                  <p>{{List.content2}}</p>
                  <div class="image">
                    <img :src="List.url2" alt>
                  </div>
                </div>
              </div>
              <div class="info">
                <div class="info_left">
                  <b>重要提示</b>
                </div>
                <ul class="info_right">
                  <li>1. 尊重并保护用户隐私，用户信息只会用于协助用户预订旅游商品；</li>
                  <li>2. 预订订单，需要在支付时限内支付全款，超出时限的支付将被视为无效支付</li>
                  <li>3. 出行前，请您确保您自身的身体状况适合参加行程。您应将自身健康情况如实告知旅行社；</li>
                  <li>4. 请尊重当地的饮食习惯、习俗禁忌、宗教礼仪，遵守当地法律法规等；</li>
                  <li>5. 为了您人身、财产的安全，请您避免在公开场合暴露贵重物品及大量现金；</li>
                  <li>6. 您所预订的商品可能包含高危项目（如游泳、漂流、潜水、滑雪等），参与前请根据自身条件， 并充分参考当地相关部门及其它专业机构的相关公告和建议后出行；</li>
                  <li>7. 建议您自己购买旅游意外保险及其他保险，可保障您在境内旅行期间自身生命、 身体、财产或者相关利益的短期旅游意外伤害保险及紧急救援保险。</li>
                </ul>
              </div>
              <div class="info">
                <div class="info_left">
                  <b>更多信息</b>
                </div>
                <ul class="info_right">
                  <li>儿童：身高1.2M以下（含1.2M）有成年人监护的儿童入园免门票及电瓶船票【免费】； 儿童6周岁（含6周岁）以下有成年人监护的儿童享受门票免票【免费】；1.2米（不含）-1.5米（含）儿童享受门票及电瓶船半价优惠【半价】。</li>
                  <li>老人：70周岁（含70周岁）以上老人享受门票免票【免费】；60周岁（含60周岁）以上老年人凭有效证件享受门票半价【半价】。</li>
                  <li>学生：全国大中小学生凭有效证件享受门票半价【半价】。</li>
                  <li>残疾人：残疾人凭有效证件享受门票免票【免费】。</li>
                  <li>军人：现役军人凭有效证件享受门票免票【免费】。</li>
                  <li>烈士遗属：烈士遗属享受门票免票【免费】。</li>
                  <li>以上信息仅供参考，具体信息请以景区当天披露为准</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="费用说明" name="second">
            <div class="detail">
              <h2>费用说明</h2>
              <div class="info">
                <div class="info_left">
                  <b>费用包含</b>
                </div>
                <ul class="info_right">
                  <li>1. 园区大门票；</li>
                  <li>1米2以下及70周岁以上老人凭证件免票；</li>
                  <li>
                    注：一个身份信息至多可购买9份。
                    西溪湿地（周家村入口）地址：杭州市西湖区天目山路518号。
                    只能在周家村上船，不能在龙舌嘴上船。
                  </li>
                </ul>
              </div>
              <div class="info">
                <div class="info_left">
                  <b>费用不含</b>
                </div>
                <ul class="info_right">
                  <li>1. 园区内其他票券；</li>
                  <li>2. 一切个人消费及费用包含中未提及的任何费用。</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="预定须知" name="third">
            <div class="detail">
              <h2>预定须知</h2>
              <div class="info">
                <div class="info_left">
                  <b>预定流程</b>
                </div>
                <div class="info_right">
                  <div class="image">
                    <img :src="require('../../static/img_prebook.jpg')" alt>
                  </div>
                </div>
              </div>
              <div class="info">
                <div class="info_left">
                  <b>兑换信息</b>
                </div>
                <ul class="info_right">
                  <li>1. 凭商家发送的取票短信验证入园；</li>
                  <li>2.预订2小时后才能入园！</li>
                </ul>
              </div>
              <div class="info">
                <div class="info_left">
                  <b>退款政策</b>
                </div>
                <ul class="info_right info-right">
                  <li>本品为活动价体验旅行产品。特提示用户注意，此类产品无法享有7日内无理由退货的服务。该类旅行产品一旦下单并支付成功，在商家确认订单前可取消并要求退款；在商家确认订单后则无法申请取消并要求退款或更改订单。</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="温馨提示" name="fourth">
            <div class="detail">
              <h2>温馨提示</h2>
              <div class="info">
                <div class="info_left">
                  <b>温馨提示</b>
                </div>
                <ul class="info_right">
                  <li>1. 出海、游泳、漂流、潜水、滑雪溜冰、跳伞、丛林飞跃等活动项目，均存有较高风险。参与前请根据自身健康、身体状况及有关部门的提示谨慎选择游玩项目，在游玩中请务必听从专业人士指导、切勿冒险进行高风险项目，以免发生不测。</li>
                  <li>2. 请您应确保自身条件适合外出旅游度假。如您为孕妇、老人、小孩或者有心脏病、高血压、呼吸系统疾病等，请在征得医院专业医生同意后预订旅游产品。如您在预订前未告知真实情况而造成人身伤害或损失，您将自行承担相应责任。</li>
                  <li>学生：全国大中小学生凭有效证件享受门票半价【半价】。</li>
                  <li>3. 请自愿购买旅游人身意外保险。穷游网郑重提醒您应安排好自己的活动项目，谨慎参加赛车、骑马、攀岩、滑翔、探险、漂流、出海、潜水（浮潜／深潜）、游泳、滑雪、滑冰、滑板、跳伞、热气球、蹦极、冲浪等高风险活动，如需参加上述活动，穷游网建议您投保包含高风险项目的意外险种。</li>
                  <li>4. 经过危险地段（如陡峭、狭窄、潮湿泛滑的道路等）不可拥挤，前往险峻景点观光时应充分考虑自身的条件是否可行，不要强求和存侥幸心理；参与登山等活动时，应注意适当休息，避免过度激烈运动，同时做好防护工作。</li>
                  <li>5. 在水上（包括江河、湖海、水库）游览或者活动时，您须注意乘船安全，应穿戴救生衣，不可单独前往深水水域或者危险河道；选择水下游泳时，应携救生设备助游。</li>
                  <li>6. 海拔3000公尺以上的高原地带，气压低，空气含氧量少，易导致人体缺氧，引起高原不良反应，请甲方避免剧烈运动和情绪兴奋，洗澡水不易过热，学会正确呼吸方法。16周岁以下及60周岁以上者，患有贫血、糖尿病、慢性肺病、较严重心脑血管疾病、精神病及孕妇等不宜进入高原旅游。</li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="bottom_right">
        <form action="">
          
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { setToken, getToken } from "@/utils/user";
import { fmtDate } from "@/utils/validate";
export default {
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      List: [],
      number: "99",
      date: "",
      show: false,
      num: "",
      activeName: "first",
      id: "",
      sum: ""
    };
  },
  mounted() {
    if (this.$route.query) this.id = this.$route.query.id;
    this.GetList();
  },
  methods: {
    // 今日推荐列表
    GetList() {
      var params = {
        id: this.id
      };
      request({
        url: "/recommend/" + params.id,
        method: "get",
        params
      })
        .then(res => {
          // console.log(res)
          if (res.data.errno == 0) {
            this.List = res.data.data;
          }
        })
        .catch(err => {});
    },
    dateChange(val) {
      console.log(val);
      this.show = true;
      this.num = "1";
    },
    handleChange() {
      this.show = true;
      // this.num = "1";
    }
  },
  handleClick() {},
  books() {
    // if (!getToken("TRAVELUSER")) {
    //   this.$message({
    //     message: "请登录后分享",
    //     type: "warning"
    //   });
    //   return;
    // }
    console.log("11111");
    // this.$message({
    //   message: "预定成功",
    //   type: "success"
    // });
  }
};
</script>


<style lang="scss">
.recommend {
  width: 1200px;
  margin: 20px auto;
  .top {
    display: flex;
    justify-content: space-between;
    .top_left {
      .is-selected {
        color: #ff9d00;
      }
      .image {
        width: 530px;
        height: 354px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .el-calendar {
        width: 530px;
        margin: 20px 0;
        .el-calendar__header {
          background-color: #ff9d00;
        }
        .el-calendar-day {
          text-align: center;
          div {
            color: #ff9d00;
          }
        }
      }
    }
    .top_right {
      height: 520px;
      margin: 0 20px;
      padding: 20px 20px 0 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      line-height: 20px;
      .title {
        font-size: 20px;
        color: #555;
        line-height: 40px;
      }
      .price {
        color: #666;
        margin: 20px 0;
        display: flex;
        justify-content: space-around;
        .pric {
          span {
            font-size: 28px;
          }
        }
      }
      .right_bottom {
        // border-top: 1px solid red;
        // position: relative;
        .color {
          // color: red;
        }
        p {
          font-size: 18px;
        }
        .type {
          margin-bottom: 30px;
          cursor: pointer;
          .header {
            display: flex;
            justify-content: space-around;
            .header_top {
              width: 160px;
              // border: 1px solid red;
              text-align: center;
              padding: 10px 0;
            }
          }
        }
        .nums {
          color: #ff9d00;
        }
        .buy {
          margin: 20px 0;
          position: absolute;
          .txt {
            font-size: 20px;
            margin-top: 20px;
            color: #ff9d00;
            float: left;
          }
          .el-button {
            color: #fff;
            background-color: #ff9d00;
            padding: 20px;
            font-size: 20px;
            float: right;
            margin-left: 430px;
            cursor: pointer;
            border: none;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.recommend {
  .bottom {
    .bottom_left {
      width: 850px;
      padding: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .el-tabs {
        width: 800px;
      }
      .detail {
        h2 {
          text-align: center;
        }
        ul li {
          list-style: none;
        }
        .image {
          width: 650px;
          height: 200px;
          margin-bottom: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info_left {
          font-size: 20px;
          margin-top: 20px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          .info-right {
            color: red;
          }
          .info_right {
            width: 650px;
            line-height: 24px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
