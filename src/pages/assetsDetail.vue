<template>
    <div class="assetsDetail_container" ref="scrollview">
        <div class="assetsDetail_header">
            <h3 class="ydb">{{this.$route.query.Readingmoney}}</h3>
            <p class="ydb_t">我的阅读币</p>
            <div class="zb">我的赠币:{{this.$route.query.Coindonation}}币</div>
        </div>
        <div class="assetsDetail_wrap">
            <div class="tabbar_wrap">
                <h4 :class="current==0?'on':''" @click="switchTabbarEvent(0)">阅读币记录</h4>
                <h4 :class="current==1?'on':''" @click="switchTabbarEvent(1)">赠币记录</h4>
            </div>

            <!-- 阅读币 -->
            <div v-show="current==0">
                <ul class="assets_list" v-if="ydbData.length != 0">
                    <li class="assets_item" v-for="item in ydbData" :key="item.createtime">
                        <div class="item_left">
                            <p class="item_p">{{item.remark}}</p>
                            <p class="item_t">{{item.createtime}}</p>
                        </div>
                        <h4 class="item_ass">{{item.coinnum}}</h4>
                    </li>
                </ul>
                <fail-view v-else></fail-view>
            </div>
            
            <!-- 赠币 -->
            <div v-show="current==1">
                <ul class="assets_list" v-if="zbData.length != 0">
                    <li class="assets_item" v-for="item in zbData" :key="item.createtime">
                        <div class="item_left">
                            <p class="item_p">{{item.remark}}</p>
                            <p class="item_t">{{item.createtime}}</p>
                        </div>
                        <h4 class="item_ass">{{item.coinnum}}</h4>
                    </li>
                </ul>
                <fail-view v-else></fail-view>
            </div>
            <p class="load_promt" v-if="loadShow">没有更多了~</p>
        </div>
    </div>
</template>
<script>
import fail from '../components/fail'
export default {
    data(){
        return{
            current:0,
            zbData:[],
            ydbData:[],
            loadShow:false,
            throttle_B:false,
            scrollview:'',
            page:1,
        }
    },
    mounted(){
        this.current = this.$route.query.current;
        this.axiosEvent();
        this.scrollview = this.$refs.scrollview;
        this.scrollview.addEventListener('scroll',this.Pulluploading,false)
    },
    methods:{
        switchTabbarEvent(current){
            this.current = current;
            this.page = 1;
            this.ydbData = [];
            this.zbData = [];
            this.loadShow = false;
            this.scrollview.addEventListener('scroll',this.Pulluploading,false)
            this.axiosEvent();
        },
        axiosEvent(){
            var _self = this;
            if(_self.current == 0){
                _self.$store.state.loadShow = true;
                _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-coinydRecord',_self.$qs.stringify({page:this.page,uid:this.$store.state.uid}))
                .then(function(response){
                    if(response.data == ""){
                        _self.loadShow = true;
                        _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
                    }else{
                        _self.ydbData = _self.ydbData.concat(response.data)
                    }
                    _self.$store.state.loadShow = false;
                })
            }
            if(_self.current == 1){
                _self.$store.state.loadShow = true;
                _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-coinzRecord',_self.$qs.stringify({page:this.page,uid:this.$store.state.uid}))
                .then(function(response){
                    if(response.data == ""){
                        _self.loadShow = true;
                        _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
                    }else{
                        _self.zbData = _self.zbData.concat(response.data)
                    }
                    _self.$store.state.loadShow = false;
                })
            }
        },
        Pulluploading(){
            var _self = this;
            var scrollTop = _self.scrollview.scrollTop;
            var scrollHeight = _self.scrollview.scrollHeight;
            var clientHeight = _self.scrollview.clientHeight;
            if(scrollHeight - clientHeight < scrollTop+1){
                if(!_self.throttle_B){
                    _self.$store.state.loadShow =true;
                    setTimeout(function(){
                        _self.page++;
                        _self.axiosEvent();
                        _self.throttle_B = false;
                    },300)
                    _self.throttle_B = true;
                }else{
                    return;
                }
            }
        },
    },
    computed:{
        
    },
    components:{
        'fail-view':fail,
    }
}
</script>
<style scoped>
    .assetsDetail_container{
        height:100vh;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .assetsDetail_header{
        height: 4.1rem;
        background: url('../../static/images/recharge.png') top no-repeat;
        background-size: 100% auto;
        text-align: center;
    }
    .assetsDetail_header .ydb{
        line-height: .7rem;
        font-size: .64rem;
        font-weight: 700;
        padding-top: .43rem;
        color: #fff;
    } 
    .assetsDetail_header .ydb_t{
        line-height: .44rem;
        color: #fff;
        font-size: .3rem;
        margin-bottom: .26rem;
    }
    .assetsDetail_header .zb{
        border-radius: 50px;
        border: .02rem solid #fff;
        text-align: center;
        font-size: .3rem;
        color: #fff;
        padding: 0 .37rem;
        line-height: .46rem;
        display: inline-block;
    }

    .tabbar_wrap{
        display: flex;
        border-bottom:0.2rem solid #f5f5f5;
    }
    .tabbar_wrap h4{
        font-weight: 400;
        flex: 1;
        font-size:0.3rem;
        text-align: center;
        line-height: 0.82rem;
        color:#909090;
        position: relative;
        transition:.3s;
        -webkit-tap-highlight-color: transparent;
    }
    .tabbar_wrap h4::after{
        content: '';
        width:50%;
        height:0.04rem;
        background-color:transparent;
        display: inline-block;
        position: absolute;
        bottom:0;
        left:50%;
        margin-left:-25%;
        transition:.3s;
    }
    .tabbar_wrap h4.on{color:#fe7c4a;}
    .tabbar_wrap h4.on::after{ background-color:#fe7c4a;}

    .assets_list{padding:0 0.24rem;list-style: none;}
    .assets_item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0.24rem 0;
        border-bottom:0.02rem solid #e1e1e1;
        -webkit-tap-highlight-color: transparent;
    }
    .assets_item:nth-last-child(1){border-bottom:none;}
    .assets_item .item_p{
        line-height: .5rem;
        color: #323232;
        font-size: .28rem;
    }
    .assets_item .item_t{
        font-size: .18rem;
        color: #919191;
        line-height: .38rem;
    }
    .assets_item .item_ass{
        color: #ff595e;
        font-size: .32rem;
        line-height: .5rem;
        font-weight: 700;
    }
    .load_promt{
        line-height: .6rem;
        font-size: .28rem;
        color: #909090;
        text-align: center;
    }
</style>


