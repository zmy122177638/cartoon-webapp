import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'


import index from '@/pages/index'
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
import search from '@/pages/search'
import signinRule from '@/pages/signinRule'

Vue.use(Router)
Vue.use(Vuex)


export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      redirect:'/home',
      children:[
        {
          path:'/home',
          component:home,
        },
        {
          path:'/cartoon',
          component:category,
        },
        {
          path:'/bookshelf',
          component:bookshelf,
        },
        {
          path:'/mypage',
          component:mypage,
        }
      ]
    },
    {
      path:'/king/rankingList',
      component:rankingList,
    },
    {
      path:'/cartoon/moreCartoon',
      component:moreCartoon,
    },
    {
      path:'/cartoon/cartoonDetail',
      component:cartoonDetail,
    },
    {
      path:'/cartoon/search',
      component:search,
    },
    {
      path:'/chapter/chapterDetail',
      component:chapterDetail,
    },
    {
      path:'/mypage/register',
      component:register,
    },
    {
      path:'/mypage/login',
      component:login,
    },
    {
      path:'/mypage/forgetPassword',
      component:forgetPassword,
    },
    {
      path:'/mypage/recharge',
      component:recharge,
    },
    {
      path:'/mypage/assetsDetail',
      component:assetsDetail,
    },
    {
      path:'/mypage/payAdministration',
      component:payAdministration,
    },
    {
      path:'/mypage/subRecord',
      component:subRecord,
    },
    {
      path:'/mypage/mynews',
      component:mynews,
    },
    {
      path:'/mypage/signinRule',
      component:signinRule,
    },
    {
      path:'/mypage/rechargeRecord',
      component:rechargeRecord,
    },
    {
      path:'/mypage/modifyuser',
      component:modifyuser,
    },
  ]
})
