import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/_layout' // 前台

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Layout,
    redirect: '/appointment',
    name: 'Home'
  },
  {
    path: '/appointment',
    component: Layout,
    children: [{
      path: '',
      name: 'Appointment',
      component: () => import('@/views/appointment'),
      meta: {
        title: '预约'
      }
    },
    {
      path: ':id(\\d+)',
      name: 'AppointmentDetail',
      component: () => import('@/views/appointment/Detail'),
      meta: {
        title: '预约详情'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/appointment/Info'),
      meta: {
        title: '新增预约'
      }
    },
    {
      path: 'list',
      component: () => import('@/views/appointment/List'),
      meta: {
        title: '预约列表'
      }
    },
    {
      path: 'technician-board',
      name: '技师看板',
      component: () => import('@/views/appointment/TechnicianBoard'),
      meta: {
        title: '技师看板'
      }
    }]
  },

  {
    path: '/enter-shop-list',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/enter-shop/List'),
      meta: {
        title: '进店列表'
      }
    }]
  },

  {
    path: '/payment',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/payment/List'),
      meta: {
        title: '充值列表'
      }
    }]
  },

  {
    path: '/store-registry',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/store-registry/index'),
      meta: {
        title: '进店登记'
      }
    }]
  },

  {
    path: '/test',
    component: () => import('@/views/appointment/Test'),
    meta: {
      title: '测试'
    }
  }]
})

// TODO 处理登录跳转授权
// router.beforeEach((to, from, next) => {
//   console.log(to, from)
// })

// export default router
