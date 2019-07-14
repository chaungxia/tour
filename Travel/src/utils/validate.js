/**
 * Created by weirui on 18/12/18.
 * 工具类函数
 */

export function isvalidUsername(str) {
    const valid_map = ['test', 'admin']
    return valid_map.indexOf(str.trim()) >= 0
  }
  
  /* 合法uri*/
  export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
  }
  
  /* 小写字母*/
  export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }
  
  /* 大写字母*/
  export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }
  
  /* 大小写字母*/
  export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  }

  // 时间转换
  export const fmtDate = (date, fmtExp) => {
    date = new Date(Number(date))
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmtExp)) {
      fmtExp = fmtExp.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmtExp)) {
        fmtExp = fmtExp.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmtExp
  }
  