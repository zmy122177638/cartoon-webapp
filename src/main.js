// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import Qs from 'qs'

Vue.config.productionTip = false;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
Vue.prototype.$qs = Qs;

// Vuex
const store = new Vuex.Store({
  state: {
    loadShow:false,
    uid:localStorage.getItem('uid'),
    isLogin:localStorage.getItem('uid')?true:false,
  },
  mutations: {
  	login(state,uid){
      state.uid = uid;
      state.isLogin = true;
      localStorage.setItem('uid',uid);
    },
    Signout(state){
      state.isLogin = false;
      localStorage.clear('uid');
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
