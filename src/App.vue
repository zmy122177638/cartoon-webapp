<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive" >
      <router-view/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    
    <div class="load_container" v-show="$store.state.loadShow"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  mounted(){
    let hrefData = this.parseQueryString(window.location.href);
    if(hrefData.channel){
      this.$store.commit('getchannel',hrefData.channel)
    }
  },
  methods:{
    // 网址参数转JSON
    parseQueryString: function (url) {
      var reg_url = /^[^\?]+\?([\w\W]+)$/,
      reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      arr_url = reg_url.exec(url),
      ret = {};
      if (arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2];
        }
      }
      return ret;
    }
  }
}
</script>

<style>
  .load_container{
    position: fixed;
    height: 100%;
    background-image: url('http://qiniu.ddznzj.com/media/180808/180808115536465.gif');
    background-repeat: no-repeat;
    background-position: center 30%;
    background-size: auto 2.3rem;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
  }
</style>
