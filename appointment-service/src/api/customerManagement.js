import axios from '@/utils/axios'
import qs from 'qs'
import {
  F_CONTENT_TYPE
} from '@/utils/consts'

export default {
  // 客户列表
  customers_search (data = {}) {
    return axios.post(`customers/_search`, data)
  },
  // 标记内部员工
  sign_emp (id, data = {}) {
    return axios.put(`customers/${id}/sign_emp`, qs.stringify(data), F_CONTENT_TYPE)
  },
  // 解封客户
  state_enabled (id) {
    return axios.put(`customers/${id}/state_enabled`)
  },

  // 增一级分类
  Newtop (type, data) {
    return axios.post(`product_category/top/${type}`, data)
  },
  // 删
  Delclassify (id, data = {}) {
    return axios.delete(`product_category/${id}`, data)
  },
  // 查
  getclassify (id, data = {}) {
    return axios.get(`product_category/${id}`, {
      params: data
    })
  },
  // 改
  updateclassify (id, data) {
    return axios.put(`product_category/${id}`, data)
  }
}
