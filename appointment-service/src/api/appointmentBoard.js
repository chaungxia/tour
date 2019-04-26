import axios from '@/utils/axios'

// TODO 接口分类。同类别的接口放置在一起
export default {
  // 门店看板
  storeBoard (id, data) {
    return axios.get(`stores/${id}/reservations/panel`, {
      params: data
    })
  },
  // 员工看板
  empBoard (id, data) {
    return axios.get(`employees/${id}/reservations/panel`, {
      params: data
    })
  }

}
