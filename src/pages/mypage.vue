<template>
  <div class="mypage_container">
    <div class="mypage_header">
      <div class="top_wrap">
        <div class="head_img" @click="$store.state.isLogin?$router.push('/mypage/modifyuser'):$router.push('/mypage/login')"><img :src="$store.state.isLogin?userimg:headimg" alt=""></div>
        <div class="usermsg">
          <p class="username" v-if="$store.state.isLogin"><span>{{username}}</span><span :class="[sex?'man_icon':'woman_icon']"></span></p>
          <p class="loginpromt" v-else>你还未登录哦~</p>
          <div class="SigninBtn" @click="loginEvent()" v-if="!$store.state.isLogin" >快速登录</div>
          <!-- <p class="uidname">(ID:{{uid}})</p> -->
        </div>
        <div class="SignBtn" v-if="$store.state.isLogin" @click="signinEvent()">{{signinData.today?'已签到':'签到'}}</div>
        
      </div>
      <div class="assets_wrap" v-if="$store.state.isLogin">
        <div class="z_currency"><p @click="$router.push({path:'/mypage/assetsDetail',query:{current:1,Coindonation,Readingmoney}})">赠币：{{Coindonation}}</p></div>
        <div class="ydb_currency"><p @click="$router.push({path:'/mypage/assetsDetail',query:{current:0,Coindonation,Readingmoney}})">阅读币：{{Readingmoney}}</p></div>
      </div>
    </div>
    <ul class="page_wrap">
      <router-link :to="$store.state.isLogin?'/mypage/recharge':'/mypage/login'" tag="li" class="page_item">
        <p>充值阅读币</p><p style="color:#fe7c4a;">畅读订阅漫画</p>
      </router-link>
      <router-link :to="$store.state.isLogin?'/mypage/payAdministration':'/mypage/login'" tag="li" class="page_item">
        <p>付费管理</p><p>畅读订阅漫画</p>
      </router-link>
      <router-link :to="$store.state.isLogin?'/mypage/subRecord':'/mypage/login'" tag="li" class="page_item">
        <p>我的订阅记录</p><p>订阅的漫画都在这里哦</p>
      </router-link>
      <!-- <router-link to="/mypage/dayUpdate" tag="li" class="page_item">
        <p>每日更新</p>
      </router-link> -->
      <!-- <router-link to="$store.state.isLogin?'/mypage/mynews':'/mypage/login'" tag="li" class="page_item">
        <p>我的消息(待开发)</p>
      </router-link>
      <router-link to="" tag="li" class="page_item">
        <p>兑换码(待开发)</p>
      </router-link> -->
      <li class="page_item" v-if="$store.state.isLogin" @click="SignoutEvent()">
        <p>退出</p>
      </li>
    </ul>
    <!-- 签到弹窗 -->
    <div class="signin_container" v-show="issigninShow" @click.self="closeSigninEvent()">
       <div class="signin_wrap">
        <img src="http://img.super-dreamers.com/xqmall/images/620bd675-2b07-4078-b1fd-035098aa6272.jpg@75Q" alt="" class="propaganda_img">
        <div class="signin_content">
          <div class="signin_t"><p>每周一数据重置</p><p @click="$router.push('/mypage/signinRule')">活动规则</p></div>
          <ul class="signin_list">
            <li class="signin_item" v-for="item in signinData.signinArr" :key="item.day">
              <p>连续{{item.day}}天</p>
              <p>{{item.coin_z}}赠币</p>
              <div class="signin_cover" v-if="item.dayType"></div>
            </li>
          </ul>
          <div :class="['signin_btn',signinData.today?'on':'']" @click="signinSucEvent()">{{signinData.today?'已签到':'签到'}}</div>
        </div>
        <div class="close_btn" @click="closeSigninEvent()"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mypage',
  data () {
    return {
      username:'',
      Coindonation:'',
      Readingmoney:'',
      uid:'',
      sex:1,
      headimg:'static/images/default_head_img.png',
      userimg:'',
      issigninShow:false, 
      signinData:[]
    }
  },
  mounted(){
    let _self = this;
    if(localStorage.getItem('olduid')){
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-loginSelect',_self.$qs.stringify({user:localStorage.getItem('olduid'),password:123456}))
      .then(function(result){
        _self.$store.commit('login',result.data.uid);
        _self.getuserData();
      })
    }else{
      this.getuserData();
    }
  },
  methods:{
    // 获取用户信息
    getuserData(){
      var _self = this;
        _self.$store.state.loadShow = true;
        if(_self.$store.state.isLogin){
          _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-index',_self.$qs.stringify({uid:_self.$store.state.uid}))
          .then(function(result){
            var userData = result.data.userData;
            _self.$store.commit('getinfo',userData);
            _self.signinData = result.data.signData;
            _self.Coindonation = userData.coin_z;
            _self.Readingmoney = userData.coin_yd;
            _self.username = userData.nickname;
            _self.uid = userData.uid;
            _self.sex = Boolean(userData.sex);
            _self.userimg = userData.head_img;
            _self.$store.state.loadShow = false;
          })
          .catch(function(error){
            _self.$store.state.loadShow = false;
            layer.open({
              content:'授权身份过期,请重新登录',
              skin:'msg',
              time:1,
              end(){                                                                                                                                                                                                                                                                                                                                                                                                          
                _self.$store.commit('Signout');
                _self.$router.push({path:'/mypage/login'})
              }
            })
          })
        }else{
          _self.$store.state.loadShow = false;
        }
    },
    updated() {
      this.getuserData();
    },
    // 退出登录
    SignoutEvent(){
      var _self = this;
      layer.open({
        content: '确定要退出登录吗？'
        ,style:'max-width:70%;'
        ,btn: ['确定', '取消']
        ,yes: function(index){
          _self.$store.commit('Signout') //退出登录
          layer.close(index);
        }
      });
    },
    // 快速登录
    loginEvent(){
      let _self = this;
      if(localStorage.getItem('olduid')){
         _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-loginSelect',_self.$qs.stringify({user:localStorage.getItem('olduid'),password:123456}))
        .then(function(result){
          _self.$store.commit('login',result.data.uid);
          _self.getuserData();
        })
      }else{
        this.$router.push({path:"/mypage/login" })
      }
    },
    // 签到弹窗
    signinEvent(){
      this.issigninShow = !this.issigninShow;
    },
    // close
    closeSigninEvent(){
      this.issigninShow = !this.issigninShow;
    },
    // 签到
    signinSucEvent(){
      var _self = this;
      var coin_z = this.signinData.signinArr[this.signinData.signinNum].coin_z;
      if(this.signinData.today){
        _self.issigninShow = !_self.issigninShow;
        layer.open({
          content: '今日已经签到啦~'
          ,style:'max-width:70%;'
          ,btn: '确定'
          ,yes: function(index){
            
            layer.close(index);
          }
        });
      }else{
        this.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-signin',this.$qs.stringify({uid:this.$store.state.uid,coin:coin_z}))
        .then(function(response){
          if(response.data){
            _self.getuserData();
            _self.issigninShow = !_self.issigninShow;
            layer.open({
              content: '签到成功'
              ,style:'max-width:70%;'
              ,btn: '确定'
              ,yes: function(index){
                layer.close(index);
              }
            });
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mypage_container{
    background-color:#f2f2f2;
    height:calc(100vh - 1rem);
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    box-sizing: border-box;
  }
  .mypage_header{
    background: url('../../static/images/my_bg1_icon.png') 50% no-repeat;
    background-size: 100% 100%;
    position: relative;
    min-height: 3.1rem;
    padding:0.6rem 0.6rem 0.2rem;
    box-sizing: border-box;
  }
  .top_wrap{
    display: flex;
    align-items: center;
    position: relative;
  }
  .head_img{
    border: .04rem solid #fe7c4a;
    border-radius: 0.7rem;
    width: 1.24rem;
    height: 1.24rem;
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
  }
  .head_img img{width:100%;height:100%;vertical-align: middle;border-radius: 0.7rem;object-fit: cover;}
  .usermsg{
    display: flex;
    flex-direction: column;
    margin-left:0.3rem;
    width:3.2rem;
  }
  .username{
    color: #333;
    font-size: 0.28rem;
  }
  .loginpromt{
    color: #909090;
    font-size: 0.28rem;
   
  }
  .username .man_icon{
    width:0.26rem;
    height:0.26rem;
    background:url('../../static/images/boy_pressed.png') no-repeat;
    background-size:100% 100%;
    display: inline-block;
    margin-left:0.2rem;
  }
  .username .woman_icon{
    width:0.26rem;
    height:0.26rem;
    background:url('../../static/images/girl_pressed.png') no-repeat;
    background-size:100% 100%;
    display: inline-block;
    margin-left:0.2rem;
  }
  .uidname{font-size: .28rem;color: gray;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;}
  .SignBtn{
    display: inline-block;
    color: #fe7c4a;
    border: 1px solid #fe7c4a;
    border-radius: .1rem;
    width: 1.2rem;
    height: .46rem;
    line-height: .46rem;
    text-align: center;
    font-size:0.28rem;
    position: absolute;
    right:0;
    top:50%;
    transform: translateY(-50%);
    -webkit-tap-highlight-color: transparent;
  }
  .SigninBtn{
    color: #ffffff;
    background-color:#fe7c4a;
    border-radius: 0.1rem;
    box-shadow: 0 0 0.2rem #c4c2c2;
    width: 1.8rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size:0.28rem;
    margin-top:0.2rem;
    -webkit-tap-highlight-color: transparent;
  }
  .assets_wrap{
    display: flex;
    justify-content: center;
    margin-top:0.3rem;
  }
  .assets_wrap div{
    padding-left: 0.6rem;
    background-repeat: no-repeat;
    background-position: 0;
    text-align: left;
    line-height: .5rem;
    position: relative;
    font-size: .28rem;
    -webkit-tap-highlight-color: transparent;
  }
  .assets_wrap .z_currency{
    background-image: url('../../static/images/my_money_icon.png');
    background-size: .32rem;
  }
  .assets_wrap .ydb_currency{
    background-image: url('../../static/images/my_reae_icon.png');
    background-size: .32rem;
    margin-left:10%;
  }
  /* page */
  .page_wrap{
    list-style: none;
  }
  .page_wrap .page_item{
    padding:0 0.6rem 0 0.84rem;
    background-repeat: no-repeat;
    background-position: left 0.24rem center,right 0.24rem center;
    font-size: 0.3rem;
    color: #333;
    line-height: 1.08rem;
    position: relative;
    background-color: #fff;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    -webkit-tap-highlight-color: transparent;
  }
  .page_item::before{
    content: "";
    width: 90%;
    height: .02rem;
    background-color: #e1e1e1;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .page_item:nth-child(1)::before,.page_item:nth-last-child(1)::before,.page_item:nth-last-child(2)::before{background-color: transparent;}
  .page_wrap .page_item:nth-child(1){
    background-image: url('../../static/images/icon17.png'),url('../../static/images/jiantou.png');
    background-size: .4rem,.13rem .26rem;
    margin-bottom: 0.2rem;
  }
  .page_wrap .page_item:nth-child(2){
    background-image: url('../../static/images/icon21.png'),url('../../static/images/jiantou.png');
    background-size: .4rem .43rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(3){
    background-image: url('../../static/images/icon20.png'),url('../../static/images/jiantou.png');
    background-size: .4rem .43rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(4){
    background-image: url('../../static/images/my_sx_icon.png'),url('../../static/images/jiantou.png');
    background-size: .36rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(5){
    background-image: url('../../static/images/icon19.png'),url('../../static/images/jiantou.png');
    background-size: .36rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(6){
    background-image: url('../../static/images/user-index1.png'),url('../../static/images/jiantou.png');
    background-size: .4rem .3rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-last-child(1){
    background-image: url('../../static/images/icon22.png'),url('../../static/images/jiantou.png');
    background-size: .38rem,.13rem .26rem;
    margin-top:0.2rem;
  }
  .page_item p:nth-child(2){color: #909090;font-size: .26rem;}

  /* 签到 */
  .signin_container{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.7);
    z-index: 56;
  }
  .signin_wrap{
    position: absolute;
    left:50%;
    top:40%;
    width:75%;
    background-color:#ffffff;
    border-radius: 0.1rem;
    animation: scalcMove .4s forwards ease-in-out;
    transform: translate3d(0,0,0);
  }
  @keyframes scalcMove{
    0%{transform: translate(-50%,-50%) scale(0.3) }
    100%{transform: translate(-50%,-50%) scale(1) }
  }
  .propaganda_img{width:100%;height:1.68rem;}
  .signin_content{padding:0 0.3rem 0.3rem;}
  .signin_t{display: flex;justify-content: space-between;}
  .signin_t p:nth-child(1){line-height: .7rem;color: #909090;font-size: .28rem;}
  .signin_t p:nth-child(2){
    padding-left: .28rem;
    background: url('../../static/images/iconwenhao.png') 0 no-repeat;
    background-size: .22rem;
    line-height: .7rem;
    font-size:0.28rem;
    color: #fd7d49;
  }
  .signin_list{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content:space-between;
    height:5.3rem;
  }
  .signin_list .signin_item{
    height:1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    width:1.5rem;
    border:0.02rem dashed #d6d7dc;
    position: relative;
  }
  .signin_list .signin_item:nth-child(7){width: 100%;}
  .signin_item p:nth-child(1){line-height: .52rem;font-size: .24rem;}
  .signin_item p:nth-child(2){
    padding-left: .35rem;
    background: url('../../static/images/icon73.png') 0 no-repeat;
    background-size: .33rem;
    color: #fd7d49;
    line-height: .3rem;
    font-size: .24rem;
  }
  .signin_cover{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    background-image: url('../../static/images/zf_icon.png');
    background-position: 50%;
    background-size: .5rem;
    background-repeat: no-repeat;
    z-index: 3;
  }
  .signin_btn{
    width:100%;
    height: 0.76rem;
    background-color: #fd7d49;
    border-radius: .1rem;
    text-align: center;
    line-height: 0.76rem;
    color: #fff;
    -webkit-tap-highlight-color: transparent;
  }
  .signin_btn.on{background-color:#ccc;}
  .close_btn{
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    background: url('../../static/images/icon71.png') no-repeat;
    background-size:100% 100%;
    position: absolute;
    bottom: -1.4rem;
    left: 2.4rem;
    -webkit-tap-highlight-color: transparent;
  }
</style>