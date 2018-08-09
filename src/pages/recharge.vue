<template>
    <div class="recharge_container">
        <div class="recharge_header">
            <ul class="header_wrap">
                <router-link to="/cartoon" tag="li" class="nav_item">漫画</router-link>
                <router-link to="/home" tag="li" class="nav_item">首页</router-link>
                <router-link to="/mypage/rechargeRecord" tag="li" class="nav_item">充值记录</router-link>
            </ul>
        </div>
        <div class="recharge_content">
            <div class="recharge_t">首次充值,即送20%赠币,价值可高达20.00元.</div>
            <ul class="recharge_module_wrap">
                <li class="recharge_module_item on" v-for="item in priceData" :key="item.price" @click="startPayEvent(item.price,item.coin_yd)">
                    <h3 class="ydb">{{item.coin_yd}}币</h3>
                    <p class="rmb">￥{{item.price}}元</p>
                    <span class="sign" v-if="item.coin_z">送{{item.coin_z}}</span>
                </li>
            </ul>
            <!-- 年费vip -->
            <div class="year_card_wrap">
                <div class="year_card" @click="startPayEvent(365)">
                    <div class="hot_icon"></div>
                    <div class="girl_icon"></div>
                    <div class="year_text">
                        <p class="year_name">年费VIP会员<span style="color:#fe7c4a;">365元</span></p>
                        <p class="fuli">每天1.00元，全年免费看喔~</p>
                    </div>
                </div>
            </div>
            <!-- 充值说明 -->
            <div class="recharge_promt">
                <h4>充值说明:</h4>
                <p>1.尊敬的读者您好，漫画的免费章节之后就进入到付费章节，兑换比率为1元=100阅读币；</p>
                <p>2.您在平台购买收费服务成功后，漫画平台将即时收取费用，虚拟产品不提供退费服务，敬请谅解；</p>
                <p>3.本漫画平台的所有内容，均经过正规正版授权发布，真诚期待您可以支持正版，您的支持是对作者最大的鼓励；</p>
                <p>4.十六周岁以下的未成年人在本漫画平台进行的任何活动应事先得到家长或其法定监护人的同意，请自觉遵守；</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'recharge',
    data(){
        return{
            priceData:[]
        }
    },
    mounted(){

        this.getpriceData();
    },
    methods:{
        getpriceData(){
            var _self = this;
            _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-payRecharge',this.$qs.stringify({uid:this.$store.state.uid}))
            .then(function(response){
                _self.priceData = response.data;
                console.log(response)
            })
        },
        startPayEvent(price,ydb){
            var _self = this;
            window.location.href = `https://www.yixueqm.com/cartoon/index.php/Home-Index-PlaceOrder?uid=${_self.$store.state.uid}&&price=${price}&&coin=${ydb}&&channel=${_self.$store.state.channel}`
        }
    }
}
</script>
<style scoped>  
    .recharge_container{

    }
    .recharge_header{
        position: fixed;
        width:100%;
        top:0;left:0;
        z-index: 3;
    }
    .header_wrap{list-style: none;display: flex;align-items: center;}
    .header_wrap .nav_item{
        flex: 1;
        line-height: 0.8rem;
        position: relative;
        line-height: .8rem;
        background-color: #fe7c4a;
        text-align: center;
        font-size: .28rem;
        color: #fff;
        -webkit-tap-highlight-color: transparent;
    }
    .header_wrap .nav_item::before{
        content: "";
        width: .02rem;
        height: .24rem;
        background-color: #e1e1e1;
        position: absolute;
        right: 0;
        top: .28rem;
    }
    .header_wrap .nav_item:nth-last-child(1)::before{background-color:transparent;}
    /* content */
    .recharge_content{
        padding-top:0.8rem;
        box-sizing: border-box;
    }
    .recharge_t{
        line-height: .68rem;
        background: url('../../static/images/icon28.png') left .3rem center no-repeat;
        background-size: .35rem;
        color: #ff893a;
        font-size: .28rem;
        background-color: #fff7d6;
        padding: 0 .24rem 0 .75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    /* 充值模块 */
    .recharge_module_wrap{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding: .4rem .24rem 0;
        box-sizing: border-box;
    }
    .recharge_module_item{
        width:48.5%;
        position: relative;
        height: 1.46rem;
        border: .02rem solid #d6d7dc;
        border-radius: .08rem;
        overflow: hidden;
        box-sizing: border-box;
        transition: all .3s;
        box-shadow: 0 0 0.3rem transparent;
        margin-right:3%;
        margin-bottom: 0.2rem;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        padding-right:0.2rem;
        -webkit-tap-highlight-color: transparent;
    }
    .recharge_module_item.on{
        border-color: #ffacb2;
        background-color: #fff7d5;
    }
    .recharge_module_item:nth-child(2n){margin-right:0;}
    .recharge_module_item .ydb{
        line-height: .7rem;
        color: #333;
        font-weight: 700;
        font-size: .32rem;
    }
    .recharge_module_item .ydb::before{
        content: "";
        width:0.42rem; 
        height:0.31rem;
        background: url(../../static/images/icon15.png)  no-repeat;
        background-size:100% 100%;
        display: inline-block;
        vertical-align: middle;
        margin-right:0.1rem;
    }
    .recharge_module_item .rmb{
        height: .34rem;
        box-sizing: border-box;
        line-height: .34rem;
        width: 1.14rem;
        border: .02rem solid #fe7c4a;
        border-radius: 0.7rem;
        text-align: center;
        display: inline-block;
        font-size: .24rem;
        color: #fe7c4a;
        margin:0 auto;
    }
    .recharge_module_item .sign{
        position: absolute;
        line-height: .6rem;
        background-color: #fe7c4a;
        width: 1.8rem;
        right: -.26rem;
        top: -.1rem;
        font-size: .28rem;
        text-align: center;
        box-sizing: border-box;
        padding-left: .46rem;
        color: #fff;
        transform: rotate(30deg);
    }
    /* 年卡 */
    .year_card_wrap{
        padding: .2rem .24rem 0;
    }
    .year_card{
        width: 100%;
        height: 1.46rem;
        border: .02rem solid #d6d7dc;
        border-radius: .2rem;
        padding: 0 1rem 0 1.7rem;
        box-sizing: border-box;
        transition: all .3s;
        box-shadow: 0 0 0.3rem transparent;
        position: relative;
        overflow: visible;
        background: url(../../static/images/xin_icon.png) no-repeat;
        background-size: 6.3rem auto;
        background-position: .1rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        -webkit-tap-highlight-color: transparent;
    }
    .hot_icon{
        background: url(../../static/images/cz_hot_icon.png) 0 no-repeat;
        background-size: .45rem;
        position: absolute;
        top: -.6rem;
        left: 0;
        width: 1rem;
        height: 100%;
    }
    .girl_icon{
        background: url(../../static/images/icon-girl.png) 50% no-repeat;
        background-size: 1.23rem 1.68rem;
        position: absolute;
        top: -.2rem;
        left: .3rem;
        width: 1.23rem;
        height: 1.68rem;
    }
    .year_text{
        padding-left:0.5rem;
    }
    .year_text .year_name{
        line-height: .6rem;
        font-size: .4rem;
    }
    .year_text .fuli{
        font-size:0.28rem;
        color:#909090;
    }
    /* 充值说明 */
    .recharge_promt{
        margin-top: .43rem;
        line-height: .36rem;
        color: #909090;
        font-size: .28rem;
        padding: 0 .24rem .1rem;
    }
    .recharge_promt h4{
        margin-bottom: .16rem;
        font-weight: 400;
    }
</style>


