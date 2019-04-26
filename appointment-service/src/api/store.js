import request from '../utils/request'
import axios from '@/utils/axios'
import {
  F_CONTENT_TYPE
} from '@/utils/consts'
import qs from 'qs'

// 门店列表
// export const stores = request.instance('stores')
export const stores = (data) => {
  let query = Object.assign({
    firm_id: '', // 公司id
    dept_id: '', // 组织id
    area_id: '', // 区域id
    region_id: '', // 地区id
    level_id: '', // 等级
    valid: '', // 有效
    keyword: '', // 门店
    page: 1,
    page_size: 10
  }, data)
  return axios.get(`stores/_search`, {
    params: query
  })
}

// 部门列表
export const department = request.instance('organizations')

// 获取子地区列表
export const subRegions = (id) => {
  return axios.get(`sub_regions`, {
    params: {
      region_id: id
    }
  })
}

// 获取公司信息
export const cpyInfo = (id) => {
  return axios.get(`companys/${id}`)
}
// 新增门店
// export const newStore = request.instance('stores');
export const newStore = (data) => {
  return axios.post(`stores`, data)
}
// 获取门店标签列表
export const storeTags = request.instance('tags')

// 门店详情
export const storeinfo = (id) => {
  return axios.get(`stores/${id}`)
}

// 修改门店
// export const modifystore = request.instance('stores');
export const modifystore = (id, data) => {
  return axios.put(`stores/${id}`, data)
}

// 经营性质
export const bizType = () => {
  return axios.get(`stores/biz_types_valid`)
}
// 获取门店已选择的标签
export const getStoreTags = id => {
  return axios.get(`stores/${id}/tags`)
}

// 获取门店等级下拉菜单列表
export const storeLevels = () => {
  return axios.get(`valid_levels`)
}
// 搜索门店
export const searchStore = (query) => {
  return axios.get(`stores/_search`, {
    params: query
  })
}

// 门店批量停业/营业
export const storeSpSt = data => {
  return axios.put(`stores/biz_state`, qs.stringify(data), F_CONTENT_TYPE)
}

// 门店批量删除
export const storeMulDel = data => {
  return axios.delete(`stores`, {
    params: data
  })
}

// 复制门店
export const copeStore = data => {
  return axios.post(`stores/_clone`, qs.stringify(data), F_CONTENT_TYPE)
}

/** *****新增门店相关api*******/
// 获取所有有效的公司信息
export const validFirms = () => {
  return axios.get(`valid_firms`)
}
// 查询门店所有
