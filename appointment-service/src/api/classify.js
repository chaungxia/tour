import axios from '@/utils/axios'

export default{
  // 产品分类列表
  product_list (data = {}) {
    return axios.get(`product/sub_category`, { params: data })
  },
  // 增分类
  new_product (data) {
    return axios.post(`product/category`, data)
  },
  // 删
  del_product (id) {
    return axios.delete(`product_category/${id}`)
  },
  // 查
  get_product (id) {
    return axios.get(`product_category/${id}`)
  },
  // 改
  update_product (id, data) {
    return axios.put(`product_category/${id}`, data)
  }
}
