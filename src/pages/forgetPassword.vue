<template>
    <div :class="['login_container','bg'+bgNum]">
        <div class="_goback" @click="goback()"></div>
        <div class="forgetPassword_wrap">
            <img src="../../static/images/logo.png" class="logo" alt="">
            <div class="form_wrap">
                <div class="form_item">
                    <input type="text" v-model.trim="phone" placeholder="输入手机号" >
                    <span class="clearValue" v-show="phone!=''" @click="phone=''"></span>
                </div>
                <div class="form_item">
                    <input type="text" class="reg" v-model.trim="reg" placeholder="请输入验证码">
                   <span class="getReg" @click="getRegEvent()" v-show="!regShow">获取验证码</span>
                   <span class="getReg"  v-show="regShow">{{regtext}}</span>
                </div>
                <div class="form_item">
                    <input type="password"  v-model.trim="password" placeholder="请输入至少6位新密码">
                    <span class="clearValue" v-show="password!=''" @click="password=''"></span>
                </div>
            </div>
            <div class="resetBtn" @click="resetEvent()">重置密码</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'forgetPassword',
    data(){
        return{
            bgNum:1,
            phone:'',
            reg:'',
            regNum:'',
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
    methods:{
        goback(){
            this.$router.back(-1);
        },
        getRegEvent(){
            var _self = this;
            if(_self.phone == ""){
                layer.open({
                    content: '请输入手机号'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(_self.phone)){
                layer.open({
                    content: '手机号不正确'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            _self.regShow = true;  // flag && event 会重复触发。
            _self.timeComputed(_self)
            _self.regNum = _self.getReg();
            _self.$axios.post('https://www.yixueqm.com/cartoon/codeYZ/fileTest.php',_self.$qs.stringify({phone:_self.phone,code:_self.regNum,type:1}))
            .then(function(response){
                if(response.data){
                    layer.open({
                        content: '发送成功'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                }else{
                    layer.open({
                        content: '发送失败'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                }
            })
        },
        // 重置密码
        resetEvent(){
            var _self = this;
            if(_self.phone == ""){
                layer.open({
                    content: '手机号不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(_self.reg == ""){
                layer.open({
                    content: '验证码不能为空'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(_self.password == ""){
                layer.open({
                    content: '请输入你的新密码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }else if(_self.password.length < 6){
                layer.open({
                    content: '密码不能少于6位数'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
            if(_self.regNum == _self.reg){
                _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-updatePassword',_self.$qs.stringify({user:_self.phone,password:_self.password}))
                .then(function(result){
                    if(result.data){
                        _self.phone = '';
                        _self.password = '';
                        layer.open({
                            content: '密码修改成功'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                            ,success:function(){
                                _self.$router.push('/mypage/login')
                            }   
                        });
                    }else{
                        _self.phone = '';
                        _self.password = '';
                        layer.open({
                            content: '密码修改失败'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    }
                })
            }else{
                layer.open({
                    content: '验证码错误'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
                return;
            }
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
        },
        getReg(){
            let regArr = [];
            for(let i=0;i<6;i++){
                regArr.push(Math.floor(Math.random()*9))
            }
            return regArr.join('')
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
    .forgetPassword_wrap{
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
        font-size:0;
        background-repeat: no-repeat;
        position: relative;
    }
    .form_wrap .form_item:nth-child(1){
        background-image: url('../../static/images/login_phone_icon.png');
        background-position: left .5rem center;
        background-size: .3rem;
    }
    .form_wrap .form_item:nth-child(2){
        background-image: url('../../static/images/login_yzm_icon.png');
        background-position: left .5rem center;
        background-size: .36rem;
    }
    .form_wrap .form_item:nth-child(3){
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
    }
    .form_item input.reg{
        width:50%;
    }
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
    .resetBtn{
        width: 4.3rem;
        height: .84rem;
        line-height: .84rem;
        margin-top: .82rem;
        display: inline-block;
        cursor: pointer;
        color: #fff;
        border-radius: 50px;
        background-color: #ff5a5e;
        font-size: .28rem;
        -webkit-tap-highlight-color: transparent;
    }

</style>