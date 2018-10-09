import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'


import index from '@/pages/index'
import fail from '@/components/fail'
import home from '@/pages/home'
import moreCartoon from '@/pages/moreCartoon'
import rankingList from '@/pages/rankingList'
import category from '@/pages/category'
import bookshelf from '@/pages/bookshelf'
import mypage from '@/pages/mypage'
import recharge from '@/pages/recharge'
import rechargeRecord from '@/pages/rechargeRecord'
import login from '@/pages/login'
import modifyuser from '@/pages/modifyuser'
import forgetPassword from '@/pages/forgetPassword'
import register from '@/pages/register'
import assetsDetail from '@/pages/assetsDetail'
import cartoonDetail from '@/pages/cartoonDetail'
import chapterDetail from '@/pages/chapterDetail'
import payAdministration from '@/pages/payAdministration'
import subRecord from '@/pages/subRecord'
import mynews from '@/pages/mynews'
import dayUpdate from '@/pages/dayUpdate'
import search from '@/pages/search'
import signinRule from '@/pages/signinRule'

Vue.use(Router)
Vue.use(Vuex)


export default new Router({
  routes: [
    { path: '*', component: fail},
    { 
      path: '/', 
      component: index,
      redirect: '/home'
    },
    {
      path: '/home',
      component: index,
      children:[
        {
          path:'',
          component:home,
          meta: {keepAlive: true,title:'首页'}
        },
        {
          path:'/cartoon',
          component:category,
          meta: {title:'分类'}
        },
        {
          path:'/bookshelf',
          component:bookshelf,
          meta: {title:'书架'}
        },
        {
          path:'/mypage',
          component:mypage,
          meta: {title:'我的'}
        }
      ]
    },
    {
      path:'/king/rankingList',
      component:rankingList,
      meta: {title:'排行榜'}
    },
    {
      path:'/cartoon/moreCartoon',
      component:moreCartoon,
      meta: {title:'更多'}
    },
    {
      path:'/cartoon/cartoonDetail',
      component:cartoonDetail,
      meta: {keepAlive: true,title:'漫画详情'}
    },
    {
      path:'/cartoon/search',
      component:search,
      meta: {title:'搜索'}
    },
    {
      path:'/chapter/chapterDetail',
      component:chapterDetail,
      meta: {title:'章节详情'}
    },
    {
      path:'/mypage/register',
      component:register,
      meta: {title:'注册'}
    },
    {
      path:'/mypage/login',
      component:login,
      meta: {title:'登陆'}
    },
    {
      path:'/mypage/forgetPassword',
      component:forgetPassword,
      meta: {title:'重置密码'}
    },
    {
      path:'/mypage/recharge',
      component:recharge,
      meta: {title:'充值'}
    },
    {
      path:'/mypage/assetsDetail',
      component:assetsDetail,
      meta: {title:'我的消费记录'}
    },
    {
      path:'/mypage/payAdministration',
      component:payAdministration,
      meta: {title:'我的付费管理'}
    },
    {
      path:'/mypage/subRecord',
      component:subRecord,
      meta: {title:'我的订阅记录'}
    },
    {
      path:'/mypage/dayUpdate',
      component:dayUpdate,
      meta: {title:'每日更新'}
    },
    {
      path:'/mypage/mynews',
      component:mynews,
      meta: {title:'我的消息'}
    },
    {
      path:'/mypage/signinRule',
      component:signinRule,
      meta: {title:'签到活动规则'}
    },
    {
      path:'/mypage/rechargeRecord',
      component:rechargeRecord,
      meta: {title:'我的充值记录'}
    },
    {
      path:'/mypage/modifyuser',
      component:modifyuser,
      meta: {title:'修改信息'}
    },
  ]
})
