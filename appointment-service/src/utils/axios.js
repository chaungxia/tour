import axios from 'axios'
import Cookies from 'js-cookie'
import { clearCookies } from '@/utils/common'
// import router from '@/router/index'
import { Message } from 'element-ui'

const isProd = process.env.NODE_ENV === 'production'

const config = {
  // http://dev.zhimeiplus.com:20001/api/cspc/v1/
  baseURL: isProd ? '' : '/api/cspc/v1/',
  responseType: 'json', // default
  headers: {
    'Content-Type': 'application/json'
  }
}
const instance = axios.create(config)

instance.interceptors.request.use((req) => {
  req.headers.token = Cookies.get('token')
  req.data = req.data || {}
  return req
}, (error) => Promise.reject(error))

instance.interceptors.response.use((data) => {
  if (data.status === 200) {
    return data.request.response
  }
  return Promise.reject(data.request.response)
}, error => {
  if (error.response && error.response.data.code === 'USER_NOT_LOGIN') {
    Message({
      message: '请重新登录',
      type: 'warning',
      duration: 1500
    })
    setTimeout(() => {
      let CookiesNames = ['token', 'storeId', 'storeName', 'loginId', 'loginName', 'avatar', 'positionName', 'account', 'password', 'loginIn']
      clearCookies(CookiesNames)

      // TODO 判断环境
      // location.href = 'http://0.0.0.0:8081/#/Login?redirect=' + encodeURIComponent(location.href)
      // router.replace({
      //   path: '/Login'
      // })
    }, 1600)
    return
  }
  if ((error.response && error.response.data) || error.response.data.code) {
    Message({
      message: error.response.data.msg || error.response.data.message,
      type: 'warning',
      duration: 1800
    })
  }
  return Promise.reject(error)
})

export default instance
