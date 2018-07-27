<template>
  <div class="rankingList_container">
    <div class="rankingList_wrap">
        <ul class="ranking_tabbar">
            <li :class="['tabbar',current==0?'on':'']" @click="switchTabbarEvent(0)">女生榜</li>
            <li :class="['tabbar',current==1?'on':'']" @click="switchTabbarEvent(1)">男生榜</li>
            <li :class="['tabbar',current==2?'on':'']" @click="switchTabbarEvent(2)">人气榜</li>
            <li :class="['tabbar',current==3?'on':'']" @click="switchTabbarEvent(3)">新作榜</li>
            <li :class="['tabbar',current==4?'on':'']" @click="switchTabbarEvent(4)">追更榜</li>
        </ul>
        <div class="ranking_content">
            <div class="totabbar_wrap">
                <div class="tabbar_list">
                    <span :class="zgcurrent==0?'on':''" @click="switchzgcurrentEvent(0)">本周</span>
                    <span :class="zgcurrent==1?'on':''" @click="switchzgcurrentEvent(1)">上周</span>
                    <span :class="zgcurrent==2?'on':''" @click="switchzgcurrentEvent(2)">更早</span>
                </div>
            </div>
            <div class="king1">
                <div class="king_item">
                    <p class="k_t">TOP</p>
                    <p class="k_k">1</p>
                    <figure><img src="http://img.super-dreamers.com/xqmall/images/f056b595-1e8c-4aeb-84f8-4b9967c49529.jpg@75Q" alt=""></figure>
                    <p class="k_n">爱上男闺蜜</p>
                    <p class="k_a">anles</p>
                </div>
                <div class="king_item">
                    <p class="k_t">TOP</p>
                    <p class="k_k">2</p>
                    <figure><img src="http://img.super-dreamers.com/xqmall/images/f056b595-1e8c-4aeb-84f8-4b9967c49529.jpg@75Q" alt=""></figure>
                    <p class="k_n">爱上男闺蜜</p>
                    <p class="k_a">anles</p>
                </div>
                <div class="king_item">
                    <p class="k_t">TOP</p>
                    <p class="k_k">3</p>
                    <figure><img src="http://img.super-dreamers.com/xqmall/images/f056b595-1e8c-4aeb-84f8-4b9967c49529.jpg@75Q" alt=""></figure>
                    <p class="k_n">爱上男闺蜜</p>
                    <p class="k_a">anles</p>
                </div>
            </div>
            <div class="king2">
                <ul class="king2_wrap">
                    <li class="king2_item">
                        <p class="k2_k">4</p>
                        <figure><img src="http://img.super-dreamers.com/xqmall/images/f81de1a3-8094-45d2-9904-453e27071a4c.jpg@75Q" alt="" class="king2_img"></figure>
                        <div class="king2_c">
                            <p class="k2_n">哥哥，多爱我一天哥哥</p>
                            <p class="k2_g">更新到41话</p>
                            <p class="k2_ty"><span>恋爱</span></p>
                        </div>
                    </li>
                    <li class="king2_item">
                        <p class="k2_k">5</p>
                        <figure><img src="http://img.super-dreamers.com/xqmall/images/f81de1a3-8094-45d2-9904-453e27071a4c.jpg@75Q" alt="" class="king2_img"></figure>
                        <div class="king2_c">
                            <p class="k2_n">哥哥，多爱我一天哥哥</p>
                            <p class="k2_g">更新到41话</p>
                            <p class="k2_ty"><span>恋爱</span></p>
                        </div>
                    </li>
                    <li class="king2_item">
                        <p class="k2_k">6</p>
                        <figure><img src="http://img.super-dreamers.com/xqmall/images/f81de1a3-8094-45d2-9904-453e27071a4c.jpg@75Q" alt="" class="king2_img"></figure>
                        <div class="king2_c">
                            <p class="k2_n">哥哥，多爱我一天哥哥</p>
                            <p class="k2_g">更新到41话</p>
                            <p class="k2_ty"><span>恋爱</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankingList',
  data () {
    return {
        current:0,
        zgcurrent:0,
        kindlistData:[]
    }
  },
  mounted(){
    this.axiosDataEvent();
    this.current = this.$route.query.current;
  },
  methods:{
    axiosDataEvent(){
        this.$axios.get('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapter_page')
        .then(function(response){
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error)
        })
    },
    switchTabbarEvent(current){
        this.current = current;
    },
    switchzgcurrentEvent(zgcurrent){
        this.zgcurrent=zgcurrent;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* topking */
.king1{
    height: 5.38rem;
    display: flex;
    align-items:flex-end;
    justify-content: space-between;
    padding:0 0.48rem;
}
.king_item{
    display: flex;
    flex-direction: column;
    text-align: center;
}
.king_item .k_t{
    font-weight: 700;
    font-size: 0.3rem;
    line-height:0.32rem;
}
.king_item .k_k{
    width: 0.57rem;
    height: 0.57rem;
    border: 0.02rem solid transparent;
    border-radius: 0.7rem;
    line-height: 0.57rem;
    color: #693400;
    text-align: center;
    margin:0 auto;
    font-size:0.32rem;
    font-weight: 700;
}
.king_item .k_n{
    margin-top: .21rem;
    line-height: 0.5rem;
    font-weight: 700;
    color: #333;
    font-size: 0.3rem;
}
.king_item .k_a{
    line-height: .42rem;
    color: #909090;
    font-size: .24rem;
}
.king_item figure img{
    border: .02rem solid transparent;
    width: 1.86rem;
    height: 2.62rem;
    margin-top: .25rem;
    vertical-align: middle;
}
.king_item:nth-child(1){order: 2}
.king_item:nth-child(2){order: 1}
.king_item:nth-child(3){order: 3}
.king_item:nth-child(1) .k_t{color: #e1b45e;}
.king_item:nth-child(2) .k_t{color: #c3b7b6;}
.king_item:nth-child(3) .k_t{color: #d5ab98;}
.king_item:nth-child(1) .k_k{background: linear-gradient(#ffe6cb,#fdb870);border-color: #febe50;}
.king_item:nth-child(2) .k_k{background: linear-gradient(#fefffc,#c2b7b6);border-color: #c3bab8;}
.king_item:nth-child(3) .k_k{background: linear-gradient(#fee6db,#d6ac99);border-color: #d3ae99;}
.king_item:nth-child(1) figure img{border-color: #ec9b16;height: 3.02rem;width: 2.14rem;}
.king_item:nth-child(2) figure img{border-color: #8b8ba8;}
.king_item:nth-child(3) figure img{border-color: #af7b82;}
/* king2 */
.king2{padding-bottom: 0.4rem;}
.king2_wrap{list-style: none;}
.king2_item{
    display: flex;
    align-items: center;
    margin-top:0.4rem;
    padding:0 0.24rem;
}
.king2_item .k2_k{
    line-height: 2.1rem;
    font-weight: 700;
    color: #909090;
    font-size: .4rem;
    width: 0.72rem;
    text-align: center;
}
.king2_item figure img{
    width: 1.5rem;
    height: 2.1rem;
    vertical-align: middle;
}
.king2_item .king2_c{
    margin-left:0.3rem;
    flex: 1;
    height:2.1rem;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
}
.king2_c .k2_n{
    line-height: 0.5rem;
    font-weight: 700;
    font-size: 0.3rem;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.king2_c .k2_g{
    line-height: 0.88rem;
    color: #909090;
    font-size: 0.24rem;
}
.king2_c .k2_ty span{
    padding: 0 0.2rem;
    border: 0.02rem solid #d7d7da;
    color: #909090;
    border-radius: 0.7rem;
    box-sizing: border-box;
    margin-right: 0.1rem;
    font-size: 0.24rem;
    display: inline-block;
}
    
/* 追更tabbar */
.totabbar_wrap{
    text-align: center;
    padding: .06rem 0 .32rem;
}
.tabbar_list{
    border-radius: 0.7rem;
    overflow: hidden;
    border: .02rem solid #fd7d49;
    display: inline-block;
    font-size:0;
}
.tabbar_list span{
    border-right: 0.02rem solid #fd7d49;
    line-height: 0.48rem;
    text-align: center;
    width: .94rem;
    font-size: 0.26rem;
    display: inline-block;
    color: #fd7d49;
}
.tabbar_list span:nth-last-child(1){border-right:none;}
.tabbar_list span.on{
    background-color: #fd7d49;
    color: #fff;
}




.rankingList_wrap{
    position: relative;
    min-height: 100vh;
}
.rankingList_wrap::before,.rankingList_wrap::after{
    content: "";
    width: 0.24rem;
    height: 100%;
    background-color: #fd7d49;
    position: absolute;
    top: 0;
}
.rankingList_wrap::before{left:0;}
.rankingList_wrap::after{right:0;}
/*tabbar */
.ranking_tabbar{
    list-style: none;
    display: flex;
    background-color:#fd7d49;
}
.tabbar{
    flex:1;
    color: #fff;
    font-size: .28rem;
    line-height: 0.8rem;
    text-align: center;
    position: relative;
}
.tabbar.on::after{
    content: '';
    width: .18rem;
    height: .06rem;
    background-color: #fff;
    position: absolute;
    left: .66rem;
    border-radius: 50px;
    bottom: 0;
    transition: all .3s;
}
/* 榜单 */
.ranking_content{
    padding-top: 0.68rem;
    background: url('../../static/images/head_bg3.jpg') top no-repeat;
    background-size: 7.5rem;
}
</style>