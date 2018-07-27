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
import login from '@/pages/login'
import forgetPassword from '@/pages/forgetPassword'
import register from '@/pages/register'
import assetsDetail from '@/pages/assetsDetail'
import cartoonDetail from '@/pages/cartoonDetail'
import chapterDetail from '@/pages/chapterDetail'

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
          path:'/category',
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
      path:'/category/moreCartoon',
      component:moreCartoon,
    },
    {
      path:'/category/cartoonDetail',
      component:cartoonDetail,
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
  ]
})
