// 请求头
export const F_CONTENT_TYPE = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}

// 日期类型
export const CALENDAR_TYPE_OPTS = [{ value: '1', label: '公历' }, { value: '2', label: '农历' }]

// 性别
export const SEXUAL_OPTS = [{ value: '2', label: '女' }, { value: '1', label: '男' }]

// 在职状态
export const WORKING_STATE = [
  { value: '1', label: '在职' },
  { value: '2', label: '离职' },
  { value: '3', label: '休假中' }
]

// 员工组
export const EMP_GROUP = [
  { id: '7', code: 'CM', name: '客户经理组' },
  { id: '8', code: 'MR', name: '美容师组' },
  { id: '9', code: 'MJ', name: '美甲师组' },
  { id: '10', code: 'XN', name: '虚拟组' },
  { id: '11', code: 'CJ', name: '长假组' }
]

// 添加成功
export const ADD_SUCCESS_MSG = '添加成功!'

// 编辑成功
export const EDIT_SUCCESS_MSG = '编辑成功!'

// 分页选项
export const PAGE_SIZE_OPT = [10, 15, 20, 30]

// 备注最大长度
export const TEXTAREA_MAXLENGTH = 64

// 上架方式
export const ON_WAY = [
  { id: '', name: '全部' },
  { id: '1', name: '仅线下门店' },
  { id: '2', name: '仅线上商城' },
  { id: '3', name: '线下线上' },
  { id: '4', name: '不单卖' }
]

// 上架状态
export const ON_WAY_STATE = [{ id: '', name: '全部' }, { id: '1', name: '上架' }, { id: '2', name: '下架' }]
