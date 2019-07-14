//路由页面

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HomePage from '@/components/index'
import HotList from '@/components/hot'
import Destination from '@/components/destination'
import TravelDetail from '@/components/travelDetail'
import UserCenter from '@/components/userCenter'
import TravelPic from '@/components/travelPic'
import HotDetail from '@/components/HotDetail'
import UpLoad from '@/components/UpLoad'
import Register from '@/components/register'
import Strategy from '@/components/strategy'
import StrategyDetail from '@/components/strategyDetail'
import RecommedDetail from '@/components/recommend'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component:HomePage
    },
    {
      path: '/hot',
      name: 'HotList',
      component:HotList
    },
    {
      path: '/destination',
      name: 'Destination',
      component:Destination
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/travelDetail',
      name: 'TravelDetail',
      component: TravelDetail
    },
    {
      path : '/userCenter',
      name : 'UserCenter',
      component : UserCenter
    },
    {
      path : '/travelPic',
      name : 'TravelPic',
      component : TravelPic
    },
    {
      path : '/hotDetail',
      name : 'HotDetail',
      component : HotDetail
    },
    {
      path : '/create_hotDetail',
      name : 'UpLoad',
      component : UpLoad
    },
    {
      path : '/Strategy',
      name : 'Strategy',
      component : Strategy
    },
    {
      path : '/Strategy_detail',
      name : 'StrategyDetail',
      component : StrategyDetail
    },
    {
      path : '/Recomme_detail',
      name : 'RecommedDetail',
      component : RecommedDetail
    },
  ]
})
