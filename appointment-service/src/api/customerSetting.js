import axios from '@/utils/axios'

export default {
  // 获取生命周期信息列表
  lifeCycleList () {
    return axios.get(`customers/lifecycle/_search`)
  },
  // 查询生命周期信息
  qyLifeCycle (id) {
    return axios.get(`customers/lifecycle/${id}`)
  },
  // 更新客户生命周期
  putLifeCycle (id, data) {
    return axios.put(`customers/lifecycle/${id}`, Object.assign({
      min_recharge: '',
      max_recharge: '',
      min_balance: '',
      max_balance: '',
      min_days: '',
      max_days: ''
    }, data))
  },
  // 客户等级列表
  customerLevels () {
    return axios.get(`customers/levels/_search`)
  },
  // 客户等级详情
  customerLevelsInfo (id) {
    return axios.get(`customers/levels/${id}`)
  },
  // 添加客户等级
  addCustomerLevels (data) {
    return axios.post(`customers/levels/`, Object.assign({
      name: '',
      grow_value: '',
      max_balance: '',
      mj_money_limit: '',
      mx_money_limit: '',
      dx_times_limit: '',
      other_memo: '',
      memo: ''
    }, data))
  },
  // 编辑客户等级
  putCustomerLevels (id, data) {
    return axios.put(`customers/levels/${id}`, Object.assign({
      name: '',
      grow_value: '',
      max_balance: '',
      mj_money_limit: '',
      mx_money_limit: '',
      dx_times_limit: '',
      other_memo: '',
      memo: ''
    }, data))
  },
  // 成长值规则列表
  getGrowRules () {
    return axios.get(`growth_rules`)
  },
  putGrowRules (id, data) {
    return axios.put(`growth_rules/${id}`, Object.assign({
      id: '',
      amounts: '',
      grow_values: ''
    }, data))
  }
}
