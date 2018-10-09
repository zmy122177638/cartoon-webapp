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
    let _self = this;
    let hrefData = this.parseQueryString(window.location.href);
    if(hrefData.channel){
      this.$store.commit('getchannel',hrefData.channel)
    }
    this.$axios.post('https://www.yixueqm.com/cartoon/index.php/home-index-cnzzId',this.$qs.stringify({channel:this.$store.state.channel}))
    .then((response)=>{
      let UM_qudaoId = response.data;
      let scriptView =  document.createElement('script');
      var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
          scriptView.src = cnzz_protocol+'s19.cnzz.com/z_stat.php?id='+UM_qudaoId;
          scriptView.type = "text/javascript";
          document.body.appendChild(scriptView)
    })
    // 自动登录
    if(!localStorage.getItem('uid')){
      let autoUid = _self.uuid(8,16);
      if(localStorage.getItem('olduid')){
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-loginSelect',_self.$qs.stringify({user:localStorage.getItem('olduid'),password:123456}))
        .then(function(result){
          _self.$store.commit('login',result.data.uid);
        })
      }else{
        localStorage.setItem('olduid',autoUid);
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-registerSubmission',_self.$qs.stringify({user:autoUid,password:123456,sex:1,channel:_self.$store.state.channel}))
        .then(function(result){
            if(result.data){
              _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-loginSelect',_self.$qs.stringify({user:autoUid,password:123456}))
              .then(function(result){
                _self.$store.commit('login',result.data.uid);
              })
            }
        })
      }
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
    },
    // uuid
    uuid(len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random()*16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join('');
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
