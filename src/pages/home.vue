<template>
  <div class="home_container">
    <div class="home_wrap" ref="scrollview">
        <div class="banner_container">
            <!-- search -->
            <div class="search_btn" @click="searchEvent()"></div>
            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in bannerData" :key="item.cid" @click="navigateTochapterDetail(item)">
                        <img :src="item.imgurl" width="100%" alt="">
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="king_list_container">
            <ul class="king_list_wrap">
                <li class="king_list_item" @click="navigateToRankingList(3)">
                    <figure><img src="../../static/images/list_01.png" class="king_list_icon" alt=""></figure>
                    <span>女生榜</span>
                </li>
                <li class="king_list_item" @click="navigateToRankingList(2)">
                    <figure><img src="../../static/images/list_02.png" class="king_list_icon" alt=""></figure>
                    <span>男生榜</span>
                </li>
                <li class="king_list_item"  @click="navigateToRankingList(1)">
                    <figure><img src="../../static/images/list_03.png"  class="king_list_icon" alt=""></figure>
                    <span>人气榜</span>
                </li>
                <li class="king_list_item"  @click="navigateToRankingList(4)">
                    <figure><img src="../../static/images/list_04.png" class="king_list_icon" alt=""></figure>
                    <span>新作榜</span>
                </li>
                <!-- <li class="king_list_item"  @click="navigateToRankingList(4)">
                    <figure><img src="../../static/images/list_05.png" class="king_list_icon" alt=""></figure>
                    <span>追更榜</span>
                </li> -->
            </ul>
        </div>
        <list-row :row-obj="NewWorksData" :row="2" :title="'新作推荐'" v-on:setcartoonclass="setcartoonclass(0)"></list-row>
        <list-row :row-obj="HotWorksData" :row="3" :title="'热门佳作'" v-on:setcartoonclass="setcartoonclass(1)"></list-row>
        <list-row :row-obj="essenceWorksData" :row="2" :title="'精品完结'" v-on:setcartoonclass="setcartoonclass(2)"></list-row>
        <list-row :row-obj="peopleWorksData" :row="3" :title="'悬疑漫画'" v-on:setcartoonclass="setcartoonclass(3)"></list-row>
        <list-row :row-obj="popularityWorksData" :row="1" :title="'人气作品'" v-on:setcartoonclass="setcartoonclass(4)"></list-row>
        <!-- 全部作品 -->
        <div class="scroll_bottom">
            <div class="scroll_b_wrap" @click="$router.push('/cartoon')">
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
        scrollview:'',
        scrollTop:0,
        page:1,
        // banner推荐
        bannerData:[],
        // 新作推荐
        NewWorksData:[],
        // 热门佳作
        HotWorksData:[],
        // 精品完结
        essenceWorksData:[],
        // 真人漫画
        peopleWorksData:[],
        // 人气作品
        popularityWorksData:[],
        
    }
  },
  mounted(){
    console.log(this.$route.meta.keepAlive)
    this.axiosDataEvent();
    this.scrollview = this.$refs.scrollview;
    this.scrollview.addEventListener('scroll',this.Pulluploading,false);
  },
  components:{
    'list-row':listRow,
  },
  activated() {
    if(this.scrollTop > 0){
        this.scrollview = this.$refs.scrollview;
        this.scrollview.scrollTo(0, this.scrollTop);
        this.scrollview.addEventListener('scroll', this.Pulluploading,false);
    }
  },
  methods:{
    //   查看更多
    setcartoonclass(classIndex){
        this.$router.push({path:'/cartoon/moreCartoon',query:{classIndex}})
        console.log(classIndex)
    },
    // banner跳转
    navigateTochapterDetail(item){
        if(item.jumpurl){
            window.location.href = item.jumpurl;
        }else{
            this.$router.push({path:'/chapter/chapterDetail',query: {sortNumber:1,cid:item.cid}});
        }
    },
    // 加载插件
    loadPluginEvent(){
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplayDisableOnInteraction: false,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
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
            _self.$nextTick(function () {_self.loadPluginEvent()})
            // console.log(data)
        })
    },
    // 加载数据
    ClassloadEvent(){
        var _self = this;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-select_type',_self.$qs.stringify({page:_self.page++,type:0,freePay:0,serialEnd:0,newHot:1}))
        .then(function(response){
            if(response.data == ""){
                _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false);
            }else{
                _self.popularityWorksData = _self.popularityWorksData.concat(response.data);
            }
            // console.log(response.data)
            _self.$store.state.loadShow =false;
        })
    },
    // 搜素
    searchEvent(){
        this.$router.push({path:'/cartoon/search',})
    },
    // 排行跳转
    navigateToRankingList(current){
        this.$router.push({path:'/king/rankingList',query:{current:current}})
    },
    // 上拉加载
    Pulluploading(){
        var _self = this;
        _self.scrollTop = _self.scrollview.scrollTop;
        // console.log(_self.scrollTop)
        var scrollHeight = _self.scrollview.scrollHeight;
        var clientHeight = _self.scrollview.clientHeight;
        if(scrollHeight - clientHeight < _self.scrollTop+1){
            if(!_self.throttle_B){
                _self.ClassloadEvent();
                _self.$store.state.loadShow =true;
                setTimeout(function(){
                    _self.throttle_B = false;
                },1000)
                _self.throttle_B = true;
            }else{
                return;
            }
        }
    }
  },
  destroyed(){
    this.scrollview.removeEventListener('scroll',this.Pulluploading,false);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url("../../static/css/swiper-4.3.3.min.css");
    .home_container{}
    .home_wrap{overflow-y: scroll; -webkit-overflow-scrolling:touch;height:-webkit-fill-available;}
    img{vertical-align: middle;}
    /* banner */
    .banner_container{position: relative;min-height: 4.7rem;}
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
        -webkit-tap-highlight-color: transparent;
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
        -webkit-tap-highlight-color: transparent;
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
