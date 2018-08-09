<template>
    <div class="modifyuser_container">
        <div class="modifyuser_head">
            <div class="goback" @click="$router.back(-1)"></div>
            <h1>个人中心</h1>
            <div class="gohome" @click="$router.push('/')"></div>
        </div>
        <div class="modifyuser_wrap">
           <div class="headimg_wrap">
               <label for="headimg" class="fileBtn">
                   <img :src="userimg" width="100%" alt="">
                   <p class="headpromt">更换头像</p>
                </label>
               <input type="file" id="headimg" accept="image/*" @change="getupdateEvent($event)">
           </div>
           <div class="setname">
               <label for="username">昵称</label>
               <input type="text" id="username" maxlength="14" v-model="username" placeholder="请输入昵称">
           </div>
        </div>
        <div class="setEndBtn" @click="setEndEvent()">保存</div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            username:'',
            userimg:'',
        }
    },
    mounted(){
        this.username = this.$store.state.userinfo.nickname;
        this.userimg = this.$store.state.userinfo.head_img;
        console.log(this.$store.state.userinfo)
    },
    methods:{
        getupdateEvent(event){
            let _self = this;
            let fileData = event.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(fileData);
            reader.onloadend = function () {     
                _self.userimg = reader.result;
                _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-headImg',_self.$qs.stringify({uid:_self.$store.state.uid,imgsrc:_self.userimg}))
                .then(function(response){
                    if(response.data){
                        layer.open({
                            content:'头像更换成功',
                            skin:'msg',
                            time:2
                        })
                    }else{
                        layer.open({
                            content:'头像上传失败',
                            skin:'msg',
                            time:2
                        })
                    }
                })
            };
        },
        setEndEvent(){
            let _self = this;
            if(_self.username == ''){
                layer.open({
                    content:'请输入您的昵称',
                    skin:'msg',
                    time:2
                })
                return;
            }
            _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-updateName',_self.$qs.stringify({uid:_self.$store.state.uid,nickname:_self.username}))
            .then(function(response){
                if(response.data){
                    layer.open({
                        content:'昵称修改成功',
                        skin:'msg',
                        time:1,
                        end(){
                            _self.$router.push('/mypage')
                        }
                    })
                }else{
                    layer.open({
                        content:'服务器错误',
                        skin:'msg',
                        time:2,
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    .modifyuser_container{
        height:100vh;
        position: relative;
    }

    .modifyuser_head{
        display: flex;
        justify-content: space-between;
        height:0.88rem;
        align-items: center;
        background-color:#FD7D49;
    }
    .modifyuser_head h1{
        font-size:0.32rem;
        color:#fff;
        font-weight: 400;
    }
    .goback{
        padding:0.44rem;
        background:url('../../static/images/back_icon.png') no-repeat;
        background-size:0.21rem;
        background-position: center;
        -webkit-tap-highlight-color: transparent;
    }
    .gohome{
        padding:0.44rem;
        background:url('../../static/images/icon61.png') no-repeat;
        background-size:0.38rem;
        background-position: center;
        -webkit-tap-highlight-color: transparent;
    }

    .headimg_wrap{
        height:40vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #headimg{display: none;-webkit-tap-highlight-color: transparent;}
    .fileBtn{
        display: block;
        width:1.9rem;
        height:1.9rem;
        font-size:0;
        position: relative;
    }
    .fileBtn img{
        border-radius: 50%;
        width:1.9rem;
        height:1.9rem;
        object-fit:cover;
    }
    .headpromt{
        font-size:0.28rem;
        color:#fff;
        background-color:rgba(0, 0, 0, 0.7);
        position: absolute;
        height:0.5rem;
        width:100%;
        line-height: 0.5rem;
        text-align: center;
        bottom: 0;
        border-radius: 0.1rem;
    }
    .setname{
        display: flex;
        justify-content: space-between;
        line-height: 0.74rem;
        margin:0 0.24rem;
        border-bottom: 0.02rem solid #e1e1e1; 
    }
    .setname label{
        font-size:0.3rem;
        color:#333;
    }
    
    .setname #username{
        border:none;
        outline:none;
        text-align: right;
        padding-right:0.3rem;
        background: url(../../static/images/jiantou.png) 100% no-repeat;
        background-size: .13rem;
        width: 80%;
    }
    .setEndBtn{
        position: absolute;
        
        bottom:5%;
        -webkit-tap-highlight-color: transparent;
        width:94%;
        left:50%;
        margin-left:-47%;
        height:0.8rem;
        line-height: 0.8rem;
        text-align: center;
        color:#fff;
        font-size:0.32rem;
        background-color:#FD7D49;
        border-radius: 0.1rem;
    }
</style>