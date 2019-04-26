import axios from '@/utils/axios'
import qs from 'qs'
import {
  F_CONTENT_TYPE
} from '@/utils/consts'

// 新增客户基本资料
export const addBasic = (data) => {
  return axios.post(`customers`, Object.assign({
    phone: '',
    name: '',
    sexual: '2',
    calendar_type: '1',
    birthday: '',
    memo: ''
  }, data))
}
// 修改客户手机号
export const modifyPhone = (id, data) => {
  return axios.put(`customers/${id}/change_phone`, qs.stringify(data), F_CONTENT_TYPE)
}
// 查询客户基本信息
export const getCustomer = (id) => {
  return axios.get(`customers/${id}`)
}

// 查询客户信息
export const qyCustomer = (id) => {
  return axios.get(`customers/${id}/main_info,extend_info,tags`)
}

// 更新添加客户标签
export const putTag = (id, data) => {
  return axios.put(`customers/${id}/tags`, data)
}

// 多个客户id获取客户信息
export const idsList = (ids) => {
  return axios.get(`selected_customers`, {
    params: ids
  })
}

// 批量分配客户到门店
export const allocStoreCust = (data = {}) => {
  return axios.put(`customers/assign_store`, data)
}
// 更新客户基本信息
export const putBasic = (id, data) => {
  return axios.put(`customers/${id}/main_info`, Object.assign({
    phone: '',
    name: '',
    sexual: '2',
    calendar_type: '1',
    birthday: '',
    memo: ''
  }, data))
}
// 编辑客户扩展信息
export const customerExtend = (id, data) => {
  return axios.put(`customers/${id}/extend_info`, Object.assign({
    nickname: '',
    phone1: '',
    phone2: '',
    phone3: '',
    realname: '',
    id_card: '',
    contact: '',
    post_no: '',
    qq: '',
    email: '',
    height: '',
    weight: '',
    min_weight: '',
    max_weight: ''
  }, data))
}
export const customerTag = () => {
  return axios.get(`customers/tags`, {
    params: {
      page: 1,
      page_size: 10000
    }
  })
}

//
export const putCustomerTag = (id, data) => {
  return axios.put(`customers/${id}/tags`, data)
}
