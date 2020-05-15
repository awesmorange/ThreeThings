import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import FirstPage from '@/components/FirstPage'

import OperateCa from '@/components/view/calendar/OperateCa'

import Data from '@/components/view/dataStatistics/Data'

import AllEvents from'@/components/view/eventPool/AllEvents'

import ModifyPass from'@/components/view/setting/ModifyPass'
import ModifyPI from'@/components/view/setting/ModifyPI'
import ViewPI from'@/components/view/setting/ViewPI'

import AllMoments from'@/components/view/socialCircle/AllMoments'
import MyMoments from'@/components/view/socialCircle/MyMoments'
import Timing from'@/components/view/socialCircle/Timing'

import { getKey } from '@/utils/store'

Vue.use(Router)

const router = new Router({
  routes: [  
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        title: '用户登录',
        header: false,
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta:{
        title: '用户登录',
        header: false,
      }
    },
    {
      path: '/FirstPage',
      name: 'FirstPage',
      component: FirstPage,
      meta:{
        title: '首页',
        header: true
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta:{
        title: '用户注册',
        header: false
      }
    },
    {
      path: '/OperateCa',
      name: 'OperateCa',
      component: OperateCa,
      meta:{
        title: '管理日程',
        header: true,
        header2:true
      }
    },
    {
      path: '/Data',
      name: 'Data',
      component: Data,
      meta:{
        title: '数据展示',
        header: true
      }
    },
    {
      path: '/AllEvents',
      name: 'AllEvents',
      component: AllEvents,
      meta:{
        title: '全部事件',
        header: true
      }
    },
    {
      path: '/ModifyPass',
      name: 'ModifyPass',
      component: ModifyPass,
      meta:{
        title: '修改密码',
        header: true
      }
    },
    {
      path: '/ModifyPI',
      name: 'ModifyPI',
      component: ModifyPI,
      meta:{
        title: '修改个人信息',
        header: true
      }
    },
    {
      path: '/ViewPI',
      name: 'ViewPI',
      component: ViewPI,
      meta:{
        title: '查看个人信息',
        header: true
      }
    },
    {
      path: '/AllMoments',
      name: 'AllMoments',
      component: AllMoments,
      meta:{
        title: '全部动态',
        header: true
      }
    },
    {
      path: '/MyMoments',
      name: 'MyMoments',
      component: MyMoments,
      meta:{
        title: '我的动态',
        header: true
      }
    },
    {
      path: '/Timing',
      name: 'Timing',
      component: Timing,
      meta:{
        title: '计时界面',
        header: true
      }
    }
  ]
})

//每次切换路由之前
// to 去哪个页面  from 从哪个页面来的  //next 方法 执行的话才能跳转
router.beforeEach((to, from, next)=>{
  /* 路由发生变化修改页面title */
  let url = to.path.toLowerCase()
  document.title = to.meta.title
  if(url != '/login' && url != '/register'){
    let token = getKey('token')
    if(!token){
      next({ path: '/Login' })
      return
    }
  }
  next()
})

export default router