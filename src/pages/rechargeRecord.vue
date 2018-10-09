<template>
    <div class="rechargeRecord_container">
        <div class="modifyuser_head">
            <div class="goback" @click="$router.back(-1)"></div>
            <h1>充值记录</h1>
            <div class="gohome" @click="$router.push('/')"></div>
        </div>
        <div class="rechargeRecord_wrap"  ref="scrollview">
           <ul class="assets_list" v-if="rechargeRecordData != ''">
                <li class="assets_item" v-for="item in rechargeRecordData" :key="item.createtime">
                    <div class="item_left">
                        <p class="item_p">订单号：{{item.orderid}}</p>
                        <p class="item_p">获得<span style="color:#fe7c4a;">{{item.coinnum}}</span>阅读币</p>
                        <p class="item_t">{{item.updatetime}}</p>
                    </div>
                    <h4 class="item_ass">￥{{item.price}}</h4>
                </li>
            </ul>
            <p class="load_promt" v-if="loadShow && rechargeRecordData != ''">没有更多了~</p>
            <fail-view v-if="rechargeRecordData== ''"></fail-view>
        </div>
    </div>
</template>

<script>
import fail from '../components/fail'
export default {
    data(){
        return{
            page:1,
            loadShow:false,
            scrollview:'',
            rechargeRecordData:[]
        }
    },
    components:{
        'fail-view':fail
    },
    mounted(){
        this.scrollview = this.$refs.scrollview;
        this.scrollview.addEventListener('scroll',this.Pulluploading,false)
        this.getrechargeRecord();
    },
    methods:{
        getrechargeRecord(){
            let _self = this;
            _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Index-payRecord',this.$qs.stringify({page:_self.page,uid:_self.$store.state.uid}))
            .then(function(response){
                if(response.data == ''){
                    _self.loadShow = true;
                    _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
                }else{
                    _self.rechargeRecordData = response.data; 
                }
                _self.$store.state.loadShow = false;
            })
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
                        _self.getrechargeRecord();
                        _self.throttle_B = false;
                    },300)
                    _self.throttle_B = true;
                }else{
                    return;
                }
            }
        },
    },
    destroyed(){
        this.scrollview.removeEventListener('scroll',this.Pulluploading,false)
    }

}
</script>

<style>
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
    .rechargeRecord_wrap{
        height:calc(100vh - 0.88rem);
        overflow: scroll;
        -webkit-overflow-scrolling:touch;
    }
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