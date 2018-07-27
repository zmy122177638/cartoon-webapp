<template>
    <div :class="['login_container','bg'+bgNum]">
        <div class="_goback" @click="goback()"></div>
        <div class="register_wrap">
            <img src="/static/images/logo.png" class="logo" alt="">
            <div class="form_wrap">
                <div class="form_item">
                    <input type="text" v-model.trim="phone" placeholder="输入手机号" >
                    <span class="clearValue" v-show="phone!=''" @click="phone=''"></span>
                </div>
                <div class="form_item">
                    <input type="text" class="sex" v-model.trim="sexText" readonly>
                    <div :class="['sex_select',sex?'':'on']">
                        <span @click="sex = 1"></span>
                        <span @click="sex = 0"></span>
                    </div>
                </div>
                <div class="form_item">
                    <input type="text" class="reg" v-model.trim="reg" placeholder="请输入验证码">
                   <span class="getReg" @click="getRegEvent()" v-show="!regShow">获取验证码</span>
                   <span class="getReg"  v-show="regShow">{{regtext}}</span>
                </div>
                <div class="form_item">
                    <input type="password"  v-model.trim="password" placeholder="请输入至少6位密码">
                    <span class="clearValue" v-show="password!=''" @click="password=''"></span>
                </div>
            </div>
            <div class="signupBtn" @click="signupEvent()">注册</div>
            
            <div class="signupwrap">
                <router-link to="/mypage/login" class="signinBtn">已有账号？快速登录</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'register',
    data(){
        return{
            bgNum:1,
            phone:'',
            sex:1, //默认男
            reg:'',
            password:'',
            num:60,
            regShow:false,
            regtext:'60秒后重新获取',
        }
    },
    mounted(){
        this.bgNum = Math.floor(Math.random()*7 +1);
        console.log(this.bgNum)
    },
    computed:{
        sexText(){
            if(this.sex){
                return '男生'
            }else{
                return '女生'
            }
        }   
    },
    methods:{
        goback(){
            this.$router.back(-1);
        },
        // 获取验证码
        getRegEvent(){
            if(this.phone == ""){
                layer.open({
                    content: '请输入手机号'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.phone)){
                layer.open({
                    content: '手机号不正确'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            this.regShow = true;  // flag && event 会重复触发。
            this.timeComputed(this)
        },
        // 注册
        signupEvent(){
            var _self = this;
            if(this.phone == ""){
                layer.open({
                    content: '手机号不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(this.reg == ""){
                layer.open({
                    content: '验证码不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(this.password == ""){
                layer.open({
                    content: '请输入你的密码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }else if(this.password.length < 6){
                layer.open({
                    content: '密码不能少于6位数'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            this.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Login-registerSubmission',this.$qs.stringify({user:this.phone,password:this.password,sex:this.sex}))
            .then(function(result){
                if(result.data){
                    _self.phone = '';
                    _self.password = '';
                    _self.sex = 1;
                    layer.open({
                        content: '账号注册成功'
                        ,btn:'去登录'
                        ,yes:function(index){
                            _self.$router.push('/mypage/login')
                            layer.close(index);
                        }   
                    });
                }else{
                    layer.open({
                        content: '账号已被注册'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                }
            })

        },
         // 倒计时
        timeComputed(_self){
            _self.num--;
            if(_self.num > 0){ 
                _self.regtext = _self.num +'秒后重新获取'
                setTimeout(function(){
                    _self.timeComputed(_self)
                },1000)
            }else{
                _self.num = 60;
                _self.regShow = false;
                return;
            }
        }
    },

}
</script>
<style scoped>
    .bg1{
        background-image: url('/static/images/bg1.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg2{
        background-image: url('/static/images/bg2.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg3{
        background-image: url('/static/images/bg3.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg4{
        background-image: url('/static/images/bg4.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg5{
        background-image: url('/static/images/bg5.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg6{
        background-image: url('/static/images/bg6.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg7{
        background-image: url('/static/images/bg7.jpg');
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
        background: url('/static/images/back_icon.png') 50% no-repeat;
        background-size: 0.24rem;
        position: absolute;
        left: 0.24rem;
        top: 0.3rem;
        z-index: 10;
    } 
    .register_wrap{
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
        z-index: 2;
    }  
    .logo{
        width: 1.93rem;
        margin: .46rem 0 0;
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
        font-size:0;
        background-repeat: no-repeat;
        position: relative;
    }
    .form_wrap .form_item:nth-child(1){
        background-image: url('/static/images/login_phone_icon.png');
        background-position: left .5rem center;
        background-size: .3rem;
    }
    .form_wrap .form_item:nth-child(2){
        background-image: url('/static/images/login_user_icon.png');
        background-position: left .5rem center;
        background-size: .36rem;
    }
    .form_wrap .form_item:nth-child(3){
        background-image: url('/static/images/login_yzm_icon.png');
        background-position: left .5rem center;
        background-size: .36rem;
    }
    .form_wrap .form_item:nth-child(4){
        background-image: url('/static/images/login_password_icon.png');
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
    }
    .form_item input.reg{width:50%;}
    .form_item input.sex{width:50%;}
    .getReg{
        width:50%;
        height: .84rem;
        line-height: .84rem;
        color: #fff;
        font-size: .26rem;
        text-align: center;
        display: inline-block;
        position: relative;
    }
    .getReg::before{
        content: "";
        width: .02rem;
        height: .48rem;
        top: .18rem;
        background-color: #fff;
        position: absolute;
        left: 0;
    }
    .sex_select{
        float: right;
        border-radius: 50px;
        background-color: rgba(0,0,0,.5);
        width: 1.2rem;
        height: .54rem;
        margin: .14rem .24rem 0 0;
        overflow: hidden;
        position: relative;
    }
    .sex_select::before{
        content: "";
        width: .6rem;
        height: .5rem;
        border-radius: 50px;
        background-color: #fff;
        position: absolute;
        left: .02rem;
        top: .02rem;
        z-index: 1;
        transition: all .3s;
    }
    .sex_select.on::before{left: .58rem;}
    .sex_select span{
        width: 50%;
        display: inline-block;
        height: .54rem;
        background-repeat: no-repeat;
        background-position: 50%;
        position: relative;
        z-index: 2;
        transition: all .3s;
    }
    .sex_select span:nth-child(1){
        background-image: url('/static/images/boy_pressed.png');
        background-size: .26rem;
    }
    .sex_select span:nth-child(2){
        background-image: url('/static/images/girl_normal.png');
        background-size: .26rem;
    }
    .sex_select.on span:nth-child(1){
        background-image: url('/static/images/boy_normal.png');
    }
    .sex_select.on span:nth-child(2){
        background-image: url('/static/images/girl_pressed.png');
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
        background: url('/static/images/icon12.png') 50% no-repeat;
        background-size: .32rem;
    }
    .signupBtn{
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
    .signinBtn{
        color:#ffffff;
        text-decoration: none;
        font-size:0.28rem;
        -webkit-tap-highlight-color: transparent;
    }
    .signupwrap{
        position: absolute;
        width: 80%;
        border-top: .02rem solid #9babb3;
        line-height: 1.26rem;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
    }
</style>