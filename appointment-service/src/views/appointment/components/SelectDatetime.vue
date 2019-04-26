<template>
    <div class="selectdatetime">
        <div class="datetime_box">
            <div class="webkit_date display_flex flex_center align_center">
                <el-button type="text" icon="el-icon-arrow-left" @click.native="previous"></el-button>
                <div class="year_month display_flex flex_center align_center select_none"><i class="iconfont icon-riqi"></i> {{yearmonth}}</div>
                <el-button type="text" icon="el-icon-arrow-right" @click.native="next"></el-button>
            </div>
            <div class="webkit_month display_flex flex_center align_center select_none">
                <div :style="{width:parseInt(100/Days.length*100)/100+'%'}" @click.stop="selectDate(item)" v-for="(item,index) in Days" :key="index">
                    <div class="month_day" :class="{disabled:item.disabled,active:item.active}">
                        <div class="week">{{item.week}}</div>
                        <div class="day">{{item.day}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="webkit_time">
            <div class="time_item select_none" @click.stop="selectTime(item)" :class="{disabled:item.disabled,active:item.active,btm:item.btm}" v-for="(item,index) in times" :key="index">{{item.time}}</div>
        </div>
        <el-button class="submit" :class="{disabled:day1==''||time==''}" @click.native="submit">确定</el-button>
    </div>
</template>

<script>
export default {
  props: {
    arrivalTime: {
      default: ''
    }
  },
  watch: {
    'arrivalTime': function (val, oldVal) {
      return val
    }
  },
  data () {
    return {
      year: '', // 当年
      month: '', // 当月
      day: '', // 当日
      yearmonth: '', // 年月切换
      day1: '', // 选中的日
      time: '', // 选中的时间
      Days: [],
      times: [
        { disabled: false, active: false, time: ' 09:00', btm: false },
        { disabled: false, active: false, time: ' 09:30', btm: false },
        { disabled: false, active: false, time: ' 10:00', btm: false },
        { disabled: false, active: false, time: ' 10:30', btm: false },
        { disabled: false, active: false, time: ' 11:00', btm: false },
        { disabled: false, active: false, time: ' 11:30', btm: false },
        { disabled: false, active: false, time: ' 12:00', btm: false },
        { disabled: false, active: false, time: ' 12:30', btm: false },
        { disabled: false, active: false, time: ' 13:00', btm: false },
        { disabled: false, active: false, time: ' 13:30', btm: false },
        { disabled: false, active: false, time: ' 14:00', btm: false },
        { disabled: false, active: false, time: ' 14:30', btm: false },
        { disabled: false, active: false, time: ' 15:00', btm: false },
        { disabled: false, active: false, time: ' 15:30', btm: false },
        { disabled: false, active: false, time: ' 16:00', btm: false },
        { disabled: false, active: false, time: ' 16:30', btm: false },
        { disabled: false, active: false, time: ' 17:00', btm: false },
        { disabled: false, active: false, time: ' 17:30', btm: false },
        { disabled: false, active: false, time: ' 18:00', btm: false },
        { disabled: false, active: false, time: ' 18:30', btm: false },
        { disabled: false, active: false, time: ' 19:00', btm: false },
        { disabled: false, active: false, time: ' 19:30', btm: false },
        { disabled: false, active: false, time: ' 20:00', btm: false },
        { disabled: false, active: false, time: ' 20:30', btm: false },
        { disabled: false, active: false, time: ' 21:00', btm: false },
        { disabled: false, active: false, time: ' 21:30', btm: true },
        { disabled: false, active: false, time: ' 22:00', btm: true }
      ]
    }
  },
  mounted () {
    let now = new Date()
    this.year = now.getFullYear()// 年
    let month = now.getMonth() + 1 // 当前月
    let day = now.getDate()// 当日
    this.month = month < 10 ? '0' + month : month
    this.day = day < 10 ? '0' + day : day
    if (this.arrivalTime) {
      this.yearmonth = this.arrivalTime.substring(0, 7)
      let Year = this.arrivalTime.substring(0, 4)
      let Month = this.arrivalTime.substring(5, 7)
      this.day1 = this.arrivalTime.substring(8, 10)
      this.time = this.arrivalTime.substring(10, 16)
      this.setDate(Year, Month)
      this.setTime(this.yearmonth, this.day1)
    } else {
      this.day1 = this.day
      this.yearmonth = this.year + '-' + this.month// 年月切换
      this.setDate(this.year, this.month)
      this.setTime(this.yearmonth, this.day)
    }
  },
  methods: {
    setDate (year, month) {
      let lastDay = new Date(year, month, 0).getDate()
      let weeks = ['日', '一', '二', '三', '四', '五', '六']
      let Days = []
      for (let i = 1; i <= lastDay; i++) {
        let mon = i < 10 ? '0' + i : i
        let date = year + '-' + month + '-' + mon
        let week = new Date(date).getDay()
        Days.push({
          day: i,
          week: weeks[week],
          active: this.year === year && this.month === month && this.day1 === i && true,
          disabled: this.year === year && this.month === month && mon < this.day && true
        })
      }
      this.Days = Days
    },
    setTime (yearmonth, day) {
      let timestamp = new Date().getTime() // 当前时间戳
      // let timestamp = new Date().getTime() + 1000*60*30 //半小时后时间戳
      this.times.map(e => {
        let timestr = new Date(yearmonth + '-' + day + e.time).getTime()
        e.disabled = timestr < timestamp
        e.active = this.yearmonth === yearmonth && this.day1 === day && e.time === this.time && true
      })
    },
    previous () {
      let arr = this.yearmonth.split('-')
      let year = parseInt(arr[0])
      let month = parseInt(arr[1]) - 1
      if ((year < this.year || year === this.year) && month < this.month) return
      if (month < 1) {
        year = year - 1
        month = 12
      }
      this.yearmonth = year + '-' + month
      this.setDate(year, month)
      this.setTime(this.yearmonth, this.day)
      this.Days.map(e => { e.active = false })
      this.times.map(e => { e.disabled = e.active = false })
      this.day1 = this.time = ''
    },
    next () {
      let arr = this.yearmonth.split('-')
      let year = parseInt(arr[0])
      let month = parseInt(arr[1]) + 1
      if (month > 12) {
        year = year + 1
        month = 1
      }
      this.yearmonth = year + '-' + month
      this.setDate(year, month)
      this.Days.map(e => { e.disabled = e.active = false })
      this.times.map(e => { e.disabled = e.active = false })
      this.day1 = this.time = ''
    },
    selectDate (val) {
      if (!val.disabled) {
        this.Days.map(e => { e.active = false })
        val.active = true
        this.day1 = val.day
        this.setTime(this.yearmonth, val.day)
        this.times.map(e => { e.active = false })
        this.time = ''
      }
    },
    selectTime (val) {
      if (!val.disabled) {
        this.times.map(e => { e.active = false })
        val.active = true
        this.time = val.time
      }
    },
    submit () {
      if (this.day1 === '' || this.time === '') return
      this.$emit('datetimeFun', this.yearmonth + '-' + this.day1 + this.time + ':00')
    }
  }
}
</script>

<style lang="scss">
.selectdatetime {
  .datetime_box {
    background: #fff;
    border: 1px solid #ececec;
    padding: 24px 0 20px;
    .webkit_date {
      margin: 0 auto 20px;
      .el-button--text {
        color: #ff5183;
      }
      .year_month {
        padding: 0 12px;
        font-size: 14px;
        font-weight: 600;
        .icon-riqi::before {
          font-size: 15px;
          color: #ff5183;
          margin-right: 10px;
        }
      }
    }
    .webkit_month {
      overflow-x: auto;
      .month_day {
        width: 28px;
        border-radius: 14px;
        line-height: 28px;
        font-size: 12px;
        margin: 0 auto;
        text-align: center;
        cursor: pointer;
        .week {
          color: #96989c;
        }
        .day {
          color: #272636;
          font-weight: 600;
        }
        &.disabled {
          .day {
            color: #96989c;
          }
        }
        &.active {
          background: #ff5183;
          .week {
            color: #fff;
          }
          .day {
            color: #fff;
          }
        }
      }
    }
  }
  .webkit_time {
    border: 1px solid #ececec;
    border-top: none;
    background: #fff;
    .time_item {
      display: inline-block;
      line-height: 80px;
      height: 80px;
      width: 20%;
      font-size: 14px;
      font-weight: 600;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      position: relative;
      border-bottom: 1px solid #ebebeb;
      &:not(:nth-child(5n)) {
        border-right: 1px solid #ebebeb;
      }
      &.disabled {
        background: #f8fafb;
        color: #cccccc;
      }
      &.active {
        background: #fff9fa;
        color: #ff5183;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          border: 1px solid #ff5183;
        }
      }
      &.btm {
        border-bottom: none !important;
      }
    }
  }
  .submit {
    margin-top: 10px;
    padding: 10px 42px;
    color: #fff;
    background: #4d88fe;
    border-color: #4d88fe;
    &.disabled {
      border-color: #cccccc;
      background: #cccccc;
      color: #fff;
    }
  }
}
</style>
