<template>
    <div :class="['login_container','bg'+bgNum]">
        <div class="_goback" @click="goback()"></div>
        <div class="login_wrap">
            <img src="../../static/images/logo.png" class="logo" alt="">
            <div class="form_wrap">
                <div class="form_item">
                    <input type="text" class="phone" v-model.trim="phone" placeholder="输入手机号" >
                    <span class="clearValue" v-show="phone!=''" @click="phone=''"></span>
                </div>
                <div class="form_item">
                    <input type="password" class="phone" v-model.trim="password" placeholder="请输入至少6位密码">
                    <span class="clearValue" v-show="password!=''" @click="password=''"></span>
                </div>
            </div>
            <div class="SigninBtn" @click="signInEvent()">登录</div>
            <div class="forgetWrap">
                <div class="OtherLoginShowBtn" v-if="isWeixin" @click="closeOtherLoginEvent()">其他登陆方式</div>
                <router-link to="/mypage/forgetPassword" class="forgetBtn">忘记密码？</router-link>
            </div>
            <div class="OtherLogin_container" v-if="isOtherLoginpopuShow"  @click.self="closeOtherLoginEvent()">
                <div class="OtherLogin_wrap">
                    <p class="login_title">使用第三方登陆</p>
                    <ul class="login_list">
                        <li class="login_item wx" @click="wxloginWatchEvent()"></li>
                    </ul>
                    <div class="login_close" @click="closeOtherLoginEvent()">使用其他账号登陆</div>
                </div>
            </div>
            <div class="signupwrap">
                <router-link to="/mypage/register" class="signupBtn">还没账号？快速注册</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            bgNum:1,
            phone:'',
            password:'',
            isOtherLoginpopuShow:false,
            // isOtherLogin:false,
            isWeixin:false,
        }
    },
    mounted(){
        this.getTokenEvent();
        this.bgNum = Math.floor(Math.random()*7 +1);
    },
    methods:{
        goback(){
            this.$router.back(-1);
        },
        
        signInEvent(){
            var _self = this;
            if(this.phone == ""){
                layer.open({
                    content: '账号不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(this.password == ""){
                layer.open({
                    content: '密码不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            this.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-loginSelect',this.$qs.stringify({user:this.phone,password:this.password}))
            .then(function(result){
                if(result.data.state){
                    layer.open({
                        content: '登陆成功'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                        ,end:function(){
                            _self.$store.commit('login',result.data.uid);
                            _self.$router.push({path:'/mypage'})
                        }
                    });
                }else{
                    layer.open({
                        content: '账号或密码错误，请重新输入'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                }
            })
        },
        // 第三方登陆登录
        wxloginWatchEvent(){
            var _self = this;
            if (_self.isWeixin) {
                // _self.isOtherLogin = true;
                window.location.href = 'https://www.yixueqm.com/cartoon/index.php/Home-Login-wxLogin';
            }
        },
        // 获取token开始登陆
        getTokenEvent(){
            var _self = this;
            let ua = navigator.userAgent.toLowerCase();
            _self.isWeixin = ua.indexOf('micromessenger') != -1; //是否微信端
            if(_self.$route.query.uid){
                layer.open({
                    content:'授权成功',
                    skin:'msg',
                    time:2,
                    end(){
                        _self.$store.commit('login',_self.$route.query.uid);
                        _self.$router.push({path:'/mypage'})
                    }
                })
            }
            // else{
            //     alert('还未开始使用微信登陆')
            //     if(_self.isOtherLogin){
            //         alert('用户取消授权'+_self.$route.query.uid)
            //         layer.open({
            //             content:'你取消了授权',
            //             skin:'msg',
            //             time:2,
            //             yes(){
            //                 _self.isOtherLogin = false;
            //             }
            //         })
            //     }
            // }
        },
        closeOtherLoginEvent(){
            this.isOtherLoginpopuShow = !this.isOtherLoginpopuShow;
        }
    },
}
</script>
<style scoped>
    .bg1{
        background-image: url('../../static/images/bg1.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg2{
        background-image: url('../../static/images/bg2.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg3{
        background-image: url('../../static/images/bg3.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg4{
        background-image: url('../../static/images/bg4.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg5{
        background-image: url('../../static/images/bg5.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg6{
        background-image: url('../../static/images/bg6.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg7{
        background-image: url('../../static/images/bg7.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .login_container{
        width:100%;
        height:100vh;
        position: relative;
    }
    .login_container::before{
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    ._goback{
        width: 0.24rem;
        height: 0.42rem;
        background: url('../../static/images/back_icon.png') 50% no-repeat;
        background-size: 0.24rem;
        position: absolute;
        left: 0.24rem;
        top: 0.3rem;
        z-index: 10;
        -webkit-tap-highlight-color: transparent;
    } 
    .login_wrap{
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
        z-index: 2;
    }  
    .logo{
        width: 1.93rem;
        margin: .76rem 0 .46rem;
    }

    .form_wrap .form_item{
        padding-left: 1.06rem;
        width: 5.4rem;
        box-sizing: border-box;
        border-radius: 50px;
        height: .84rem;
        background-color: rgba(0,0,0,.6);
        margin-top: .38rem;
        display: inline-block;
        text-align: left;
        background-repeat: no-repeat;
        position: relative;
    }
    .form_wrap .form_item:nth-child(1){
        background-image: url('../../static/images/login_phone_icon.png');
        background-position: left .5rem center;
        background-size: .3rem;
    }
    .form_wrap .form_item:nth-child(2){
        background-image: url('../../static/images/login_password_icon.png');
        background-position: left .5rem center;
        background-size: .28rem;
    }
    .form_item input{
        height: .84rem;
        border: none;
        background-color: transparent;
        color: #ffffff;
        padding: 0;
        line-height: 1;
        font-size: .26rem;
        width: 100%;
        outline: none;
        padding-right:0.6rem;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
    }
    input::-webkit-input-placeholder {
        color: #ffffff;
    }
    .clearValue{
        position: absolute;
        top: .26rem;
        right: .24rem;
        width: .32rem;
        height: .32rem;
        background: url('../../static/images/icon12.png') 50% no-repeat;
        background-size: .32rem;
    }
    .SigninBtn{
        width: 4.3rem;
        height: .84rem;
        line-height: .84rem;
        margin-top: .82rem;
        display: inline-block;
        cursor: pointer;
        color: #fff;
        border-radius: 50px;
        background-color: #fd7d49;
        font-size: .28rem;
        -webkit-tap-highlight-color: transparent;
    }
    .forgetWrap{display: flex;width:5.4rem;justify-content: space-around;margin:0.5rem auto 0;}
    .OtherLoginShowBtn{
        color:#ffffff;
        font-size:0.28rem;
        -webkit-tap-highlight-color: transparent;
    }
    .signupBtn,.forgetBtn{
        color:#ffffff;
        text-decoration: none;
        font-size:0.28rem;
        -webkit-tap-highlight-color: transparent;
    }
    .signupwrap{
        position: absolute;
        left:0;
        bottom:0;
        right:0;
        width: 80%;
        border-top: .02rem solid #9babb3;
        line-height: 1.26rem;
        margin:auto;
    }
    /* 其他登陆 */
    .OtherLogin_container{
        position: fixed;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,.6);
        left:0;top:0;
        z-index: 33;
    }
    .OtherLogin_wrap{
        position: absolute;
        width:80%;
        top:30%;
        lefT:50%;
        margin-left:-40%;
        background-color:#fff;
        padding:0.4rem 0;
        border-radius: 0.1rem;
        transform: translate3d(0,0,0);
        animation: oscalc 0.5s ease forwards;
    }
    @keyframes oscalc{
        0%{transform:scale(0.3)}
        100%{transform:scale(1)}
    }
    .login_title{
        font-size:0.28rem;
        color:#999999;
        line-height: 1.7;
    }
    .login_title::before,.login_title::after{
        content:'';
        display: inline-block;
        width:20%;
        height:0.02rem;
        background-color:#999999;
        vertical-align: middle;
    }
    .login_title::before{margin-right:0.2rem;}
    .login_title::after{margin-left:0.2rem;}
    .login_list{
        list-style: none;
        margin:0.2rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login_list .login_item{
        width:0.96rem;
        height:0.96rem;
        -webkit-tap-highlight-color: transparent;
        
    }
    .login_list .login_item:nth-child(1){
        background:url('../../static/images/wx.png') no-repeat;
        background-size:100% 100%;
    }
    .login_close{
        color:#333;
        font-size:0.3rem;
        margin-top:0.4rem;
       -webkit-tap-highlight-color: transparent; 
    }
</style>