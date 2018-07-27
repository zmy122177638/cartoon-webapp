<template>
  <div class="home_container">
    <div class="home_wrap" ref="homeScrolling">
        <div class="banner_container">
            <!-- search -->
            <div class="search_btn"></div>
            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in bannerData" :key="item.cid">
                        <img :src="item.imgurl" width="100%" alt="">
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="king_list_container">
            <ul class="king_list_wrap">
                <li class="king_list_item" @click="navigateToRankingList(0)">
                    <figure><img src="../../static/images/list_01.png" class="king_list_icon" alt=""></figure>
                    <span>女生榜</span>
                </li>
                <li class="king_list_item" @click="navigateToRankingList(1)">
                    <figure><img src="../../static/images/list_02.png" class="king_list_icon" alt=""></figure>
                    <span>男生榜</span>
                </li>
                <li class="king_list_item"  @click="navigateToRankingList(2)">
                    <figure><img src="../../static/images/list_03.png"  class="king_list_icon" alt=""></figure>
                    <span>人气榜</span>
                </li>
                <li class="king_list_item"  @click="navigateToRankingList(3)">
                    <figure><img src="../../static/images/list_04.png" class="king_list_icon" alt=""></figure>
                    <span>新作榜</span>
                </li>
                <li class="king_list_item"  @click="navigateToRankingList(4)">
                    <figure><img src="../../static/images/list_05.png" class="king_list_icon" alt=""></figure>
                    <span>追更榜</span>
                </li>
            </ul>
        </div>
        <list-row :row-obj="NewWorksData" :row="2" :title="'新作推荐'"></list-row>
        <list-row :row-obj="HotWorksData" :row="3" :title="'热门佳作'"></list-row>
        <list-row :row-obj="essenceWorksData" :row="2" :title="'精品完结'"></list-row>
        <list-row :row-obj="peopleWorksData" :row="3" :title="'真人漫画'"></list-row>
        <list-row :row-obj="popularityWorksData" :row="1" :title="'人气作品'"></list-row>
        <!-- 全部作品 -->
        <div class="scroll_bottom">
            <div class="scroll_b_wrap">
                <img src="../../static/images/scrollBottom.png" class="scroll_b_i" alt="">
                <span>全部作品</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import listRow from '../components/listRow'
import Swiper from '../../static/js/swiper-4.3.3.min.js'
export default {
  name: 'home',
  data () {
    return {
        throttle_B:false,
        // banner推荐
        bannerData:[],
        // 新作推荐
        NewWorksData:[],
        // 热门佳作
        HotWorksData:[],
        // 精品完结
        essenceWorksData:{},
        // 真人漫画
        peopleWorksData:{},
        // 人气作品
        popularityWorksData:{},
        
    }
  },
  mounted(){
    this.loadPluginEvent();
    this.axiosDataEvent();
    window.addEventListener('scroll',this.Pulluploading,false);
    
  },
  components:{
    'list-row':listRow,
  },
  methods:{
    // 加载插件
    loadPluginEvent(){
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
        });
    },
    // 加载数据
    axiosDataEvent(){
        var _self = this;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Index-index')
        .then(function(response){
            let data = response.data;
            _self.bannerData = data.banner;
            _self.NewWorksData = data.xztj;
            _self.HotWorksData = data.rmjz;
            _self.essenceWorksData = data.jqwz;
            _self.peopleWorksData = data.zrmh;
            _self.popularityWorksData = data.rqzp;
            console.log(data)
        })
        _self.$axios.get('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-select_type?page=1',{type:this.type,freePay:0,newHot:1})
        .then(function(response){
            console.log(response)
        })
    },
    // 跳转
    navigateToRankingList(current){
        this.$router.push({path:'/king/rankingList',query:{current:current}})
    },
    // 上拉加载
    Pulluploading(){
        var _self = this;
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        var scrollHeight = document.querySelector('.home_wrap').clientHeight;
        var screenHeight = window.screen.height||window.innerHeight;
        var tabbarHeight = document.querySelector('.tabbar_container').clientHeight;
        var bottomHeight = document.querySelector('.scroll_bottom').clientHeight;
        if(scrollHeight - screenHeight < scrollTop - tabbarHeight + bottomHeight){
            if(!_self.throttle_B){
                console.log('调用数据')
                
                _self.$store.state.loadShow =true;
                console.log(_self.$store.state.loadShow)
                setTimeout(function(){
                    _self.throttle_B = false;
                    _self.$store.state.loadShow =false;
                },1000)
                _self.throttle_B = true;
            }else{
                return;
            }
        }
    }
  },
  destroyed(){
    window.removeEventListener('scroll',this.Pulluploading,false);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url("../../static/css/swiper-4.3.3.min.css");
    .home_wrap{overflow-y: scroll; -webkit-overflow-scrolling:touch;}
    img{vertical-align: middle;}
    /* banner */
    .banner_container{position: relative;}
    .banner_container::after{
        content:'';
        width:100%;
        height:0.88rem;
        display: inline-block;
        position: absolute;
        background:url('../../static/images/banner_bg.png') 50% no-repeat;
        background-size:100%;
        left: 0;
        bottom: -0.31rem;
        z-index: 2;
    }
    .search_btn{
        width: .54rem;
        height: .54rem;
        background: url('../../static/images/search2.png') rgba(0,0,0,.6) 50% no-repeat;
        background-size: .36rem;
        border-radius: 50px;
        position: absolute;
        right: .36rem;
        z-index: 2;
        top: .13rem;
    }
    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom:20px;
    }
    .swiper-slide img{vertical-align: middle;height:4.7rem;width:100%;}
    /* 榜单 */
    .king_list_wrap{
        padding-bottom: .32rem;
        padding-top: .4rem;
        list-style:none;
        display: flex;
    }
    .king_list_item{
        flex: 1;
        text-align: center;
        font-size:0.24rem;
        color:#333333;
        padding-top:0.56rem;
        position: relative;
        line-height: 0.56rem;
    }
    .king_list_icon{
        font-size:0;
        position: absolute;
        top:0;
        transform: translateX(-50%);
    }   
    .king_list_item:nth-child(1) .king_list_icon{width:0.48rem;}
    .king_list_item:nth-child(2) .king_list_icon{width:0.31rem;}
    .king_list_item:nth-child(3) .king_list_icon{width:0.44rem;}
    .king_list_item:nth-child(4) .king_list_icon{width:0.43rem;}
    .king_list_item:nth-child(5) .king_list_icon{width:0.49rem;}
    /* scrollBottom */
    .scroll_bottom{
        padding-bottom: .45rem;
        padding-top: .2rem;
    }
    .scroll_b_wrap{
        margin:0 auto;
        border: 1px solid #fe7c4a;
        color: #fe7c4a;
        border-radius:0.16rem;
        line-height: .7rem;
        width: 3.13rem;
        text-align: center;
        vertical-align: middle;
        font-size: .28rem;
    }
    .scroll_b_i{
        width: .32rem;
        height: .32rem;
        vertical-align: middle;
    }
</style>
