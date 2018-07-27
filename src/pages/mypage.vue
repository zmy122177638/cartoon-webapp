<template>
  <div class="mypage_container">
    <div class="mypage_header">
      <div class="top_wrap">
        <div class="head_img"><img :src="this.$store.state.isLogin?userimg:headimg" alt=""></div>
        <div class="usermsg">
          <p class="username" v-if="this.$store.state.isLogin"><span>{{username}}</span><span class="man_icon"></span></p>
          <p class="loginpromt" v-else>你还未登录哦~</p>
          <router-link to="/mypage/login" class="SigninBtn" tag="div" v-if="!this.$store.state.isLogin" >快速登录</router-link>
          <!-- <p class="uidname">(ID:{{uid}})</p> -->
        </div>
        <div class="SignBtn" v-if="this.$store.state.isLogin">签到</div>
        
      </div>
      <div class="assets_wrap" v-if="this.$store.state.isLogin">
        <div class="z_currency"><p @click="$router.push({path:'/mypage/assetsDetail',query:{current:1,Coindonation:Coindonation,Readingmoney:Readingmoney}})">赠币：{{Coindonation}}</p></div>
        <div class="ydb_currency"><p @click="$router.push({path:'/mypage/assetsDetail',query:{current:0,Coindonation:Coindonation,Readingmoney:Readingmoney}})">阅读币：{{Readingmoney}}</p></div>
      </div>
    </div>
    <ul class="page_wrap">
      <router-link :to="this.$store.state.isLogin?'/mypage/recharge':'/mypage/login'" tag="li" class="page_item">
        <p>充值阅读币</p><p style="color:#fe7c4a;">畅读订阅漫画</p>
      </router-link>
      <router-link to="" tag="li" class="page_item">
        <p>付费管理</p><p>畅读订阅漫画</p>
      </router-link>
      <router-link to="" tag="li" class="page_item">
        <p>我的订阅记录</p><p>订阅的漫画都在这里哦</p>
      </router-link>
      <router-link to="" tag="li" class="page_item">
        <p>每日更新</p>
      </router-link>
      <router-link to="" tag="li" class="page_item">
        <p>我的消息</p>
      </router-link>
      <router-link to="" tag="li" class="page_item">
        <p>兑换码</p>
      </router-link>
      <li class="page_item" v-if="this.$store.state.isLogin" @click="SignoutEvent()">
        <p>退出</p>
      </li>
    </ul>
    <!-- 签到弹窗 -->

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
      headimg:'http://img.super-dreamers.com/xqmall/images/default_head_img.png',
      userimg:'',
    }
  },
  mounted(){
    this.getuserData()
  },
  methods:{
    // 获取id
    getuserData(){
      var _self = this;
      if(this.$store.state.isLogin){
        this.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-index',this.$qs.stringify({uid:this.$store.state.uid}))
        .then(function(result){
          var userData = result.data.userData;
          _self.Coindonation = userData.coin_z;
          _self.Readingmoney = userData.coin_yd;
          _self.username = userData.nickname;
          _self.uid = userData.uid;
          _self.userimg = userData.head_img;
          console.log(result.data.userData)
        })
      }else{
        console.log('未登录')
      }
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
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mypage_container{
    background-color:#f2f2f2;
    height:-webkit-fill-available;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }
  .mypage_header{
    background: url('/static/images/my_bg1_icon.png') 50% no-repeat;
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
  }
  .head_img img{width:100%;height:100%;vertical-align: middle;border-radius: 0.7rem;}
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
    background:url('/static/images/boy_pressed.png') no-repeat;
    background-size:100% 100%;
    display: inline-block;
    margin-left:0.2rem;
  }
  .username .woman_icon{
    width:0.26rem;
    height:0.26rem;
    background:url('/static/images/girl_pressed.png') no-repeat;
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
  }
  .assets_wrap .z_currency{
    background-image: url('/static/images/my_money_icon.png');
    background-size: .32rem;
  }
  .assets_wrap .ydb_currency{
    background-image: url('/static/images/my_reae_icon.png');
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
    background-image: url('/static/images/icon17.png'),url('/static/images/jiantou.png');
    background-size: .4rem,.13rem .26rem;
    margin-bottom: 0.2rem;
  }
  .page_wrap .page_item:nth-child(2){
    background-image: url('/static/images/icon21.png'),url('/static/images/jiantou.png');
    background-size: .4rem .43rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(3){
    background-image: url('/static/images/icon20.png'),url('/static/images/jiantou.png');
    background-size: .4rem .43rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(4){
    background-image: url('/static/images/my_sx_icon.png'),url('/static/images/jiantou.png');
    background-size: .36rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(5){
    background-image: url('/static/images/icon19.png'),url('/static/images/jiantou.png');
    background-size: .36rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(6){
    background-image: url('/static/images/user-index1.png'),url('/static/images/jiantou.png');
    background-size: .4rem .3rem,.13rem .26rem;
  }
  .page_wrap .page_item:nth-child(7){
    background-image: url('/static/images/icon22.png'),url('/static/images/jiantou.png');
    background-size: .38rem,.13rem .26rem;
    margin-top:0.2rem;
  }
  .page_item p:nth-child(2){color: #909090;font-size: .26rem;}


</style>