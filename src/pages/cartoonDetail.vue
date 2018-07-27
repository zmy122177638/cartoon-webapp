<template>
  <div class="cartoonDetail_container">
    <div class="cartoonDetail_wrap">
      <div class="cartoonDetail_header">
        <img :src="CartoonData.cover" class="cartoonDetail_banner" alt="">
        <div class="img_bg"></div>
        <div class="cartoonDetail_h_t"><span class="_goback" @click="goback()"></span><span class="_gohome" @click="gohome()"></span></div>
        <div class="cartoonDetail_h_b">
          <div class="cartoonDetail_title">{{CartoonData.bname}}</div>
          <div class="cartoonDetail_msg">
            <div class="msg_left">
              <span v-for="btype of CartoonData.btype" :key="btype">{{btype}}</span>
            </div>
            <div class="msg_right">{{CartoonData.loadstate?'连载中':'完结'}}/更新至{{CartoonData.chapterData.length}}话</div>
          </div>
        </div>
      </div>
      <div class="cartoonDetail_footer">
        <div class="footer_wrap">
          <div :class="['collection',collection_B?'onto':'']"  @click="collectionEvent()"><img :src="collection_B?collection_img1:collection_img0" class="footer_icon" alt="">{{collection_B?'已收藏':'收藏'}}</div>
          <div :class="['fabulous',fabulous_B?'onto':'']" @click="fabulousEvent()"><img :src="fabulous_B?fabulous_img1:fabulous_img0" class="footer_icon" alt="">{{fabulous_B?'已赞':'点赞'}}</div>
          <div class="startRead" @click="startReadCartoon()"><img src="../../static/images/yd_icon.png" class="footer_icon" alt=""> 开始阅读</div>
        </div>
      </div>
      <div class="cartoonDetail_content">
        <div class="switch_wrap">
          <span :class="select==0?'on':''" @click="selectTabbarEvent(0)">详情</span>
          <span :class="select==1?'on':''" @click="selectTabbarEvent(1)">选集</span>
        </div>
        <!-- 详情 -->
        <div class="content_wra0" v-show="select==0">
          <p class="cartoon_jj"><span class="c_t_h">简介：</span>{{CartoonData.bnameContent}}</p>
          <div class="cartoon_tj_wrap">
            <div class="tj_w"><img src="../../static/images/browse.png" class="read_icon" alt="">总浏览{{CartoonData.readNum}}</div>
            <div class="tj_w"><img src="../../static/images/zan4.png" class="fabulous_icon" alt="">{{CartoonData.fabulousTotalNum}}人点赞</div>
          </div>
          <p class="cartoon_author"><span class="c_t_h">主笔：</span>{{CartoonData.author}}</p>
        </div>
        <!-- 选集 -->
        <div class="content_wrap1" v-show="select==1">
          <div class="content_all_cartoon"><p>全部章节</p><p @click="chapterSortEvent()">排序</p></div>
          <ul class="chapter_list">
            <li class="chapter_item" v-for="item in CartoonData.chapterData" :key="item.cid" @click="navigateToChapterDetail(item)">
              <figure><img :src="item.img" class="chapter_img" alt=""></figure>
              <div class="chapter_msg">
                <p class="chapter_t">第{{item.chapterNum}}话 {{item.title}}</p>
                <p class="chapter_m" v-show="item.charge"><span class="chapter_m_icon"></span></p>
                <p class="chapter_ft"><span>{{item.time}}</span><span :class="item.fabulousB?'on':''" @click.stop="chapterFabulouEvent(item)">{{item.fabulousNum}}</span></p>
              </div>
            </li>
          </ul>
          <!-- 提示加载 -->
          <div class="chapter_load_wrap" v-show="loading_B">没有更多了~</div>
        </div>
      </div>
      <!-- 订阅 -->
     <div :class="['paypromt_container',paypromt_B?'on':'']">
       <div class="paypromt_bg" @click.stop="switchpaypromtEvent()"></div>
       <div class="paypromt_wrap">
         <div class="paypromt_t">订阅章节 <span class="close" @click.stop="switchpaypromtEvent()"></span></div>
         <div class="payitems">购买章节共计：1话<span> / 59币</span></div>
         <div class="assets">
           <p>余额：</p>
           <p><span class="ec">0</span>阅读币</p>
           <p><span class="ec">0</span>赠币</p>
         </div>
         <p :class="['balance_s',balance_B?'on':'']" @click.stop="selectPayEvent()">余额充足时点击下一话自动扣费，不再提示</p>
         <div class="paypromt_btn">去充值</div>
         <img src="../../static/images/zf_ren_icon.png" class="wrap_bg" alt="">
       </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartoonDetail',
  data () {
    return {
      select:0, //默认详情
      throttle_B:false,
      loading_B:false,
      fabulous_B:false,
      paypromt_B:false,
      balance_B:false,
      fabulous_img0:'../../static/images/zan6.png',
      fabulous_img1:'../../static/images/zan5.png',
      collection_B:false,
      collection_img0:'../../static/images/icon56.png',
      collection_img1:'../../static/images/collection_icon.png',
      CartoonData:{
        bid:0,bname:'1204公寓',btype:['情感','恋爱'],cover:'http://img.super-dreamers.com/xqmall/images/40d96fb5-d7e0-4cd0-8692-f3cdfd1263cf.jpg@75Q',
        loadstate:0,readNum:1324,fabulousTotalNum:65464,author:'Anles',bnameContent:'一个突如其来的男人，住进了奇怪的城堡，意外引发两姐妹内心情欲的流动...',
        chapterData:[
          {title:'回国',chapterNum:1,fabulousB:0,time:'2018-06-07',fabulousNum:68,img:'http://img.super-dreamers.com/xqmall/images/20522c50-10cf-4e20-9f34-5694365e974d.png',charge:0,cid:0},
          {title:'外出',chapterNum:2,fabulousB:0,time:'2018-06-07',fabulousNum:68,img:'http://img.super-dreamers.com/xqmall/images/20522c50-10cf-4e20-9f34-5694365e974d.png',charge:0,cid:1},
          {title:'放开',chapterNum:3,fabulousB:0,time:'2018-06-07',fabulousNum:68,img:'http://img.super-dreamers.com/xqmall/images/20522c50-10cf-4e20-9f34-5694365e974d.png',charge:0,cid:2},
          {title:'放开',chapterNum:4,fabulousB:0,time:'2018-06-07',fabulousNum:68,img:'http://img.super-dreamers.com/xqmall/images/20522c50-10cf-4e20-9f34-5694365e974d.png',charge:1,cid:3},
          {title:'放开',chapterNum:5,fabulousB:0,time:'2018-06-07',fabulousNum:68,img:'http://img.super-dreamers.com/xqmall/images/20522c50-10cf-4e20-9f34-5694365e974d.png',charge:1,cid:4},
        ]
      }
    }
  },
  mounted(){
    window.addEventListener('scroll',this.Pulluploading,false);
    // 接收返回目录
    if(this.$route.query.Catalog != undefined){
      this.select = this.$route.query.Catalog;
    }
    // 接收漫画id
    console.log('传入漫画id'+this.$route.query.cid)
  },
  methods:{
    // tabbar切换
    selectTabbarEvent(select){
      this.select = select;
    },
    // 返回上个路由
    goback(){this.$router.back(-1)},
    // 返回首页
    gohome(){this.$router.push('/')},
    // 上拉加载
    Pulluploading(){
      var _self = this;
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      var scrollHeight = document.querySelector('.cartoonDetail_container').clientHeight;
      var screenHeight = window.screen.height||window.innerHeight;
      if(scrollHeight - screenHeight < scrollTop + 20 && _self.select==1){
          if(!_self.throttle_B){
              console.log('调用数据')
              _self.$store.state.loadShow =true;
              setTimeout(function(){
                  _self.throttle_B = false;
                  _self.$store.state.loadShow =false;
              },1000)
              _self.throttle_B = true;
          }else{
              return;
          }
      }
    },
    // 漫画点赞
    fabulousEvent(){
      var _self = this;
      _self.fabulous_B = !_self.fabulous_B;
      _self.fabulous_B?_self.CartoonData.fabulousTotalNum++:_self.CartoonData.fabulousTotalNum--;
    },
    //章节点赞
    chapterFabulouEvent(item){
      var _self = this;
      item.fabulousB=!item.fabulousB;
      item.fabulousB?item.fabulousNum++:item.fabulousNum--;
    },
    // 收藏
    collectionEvent(){
      var _self = this;
      _self.collection_B = !_self.collection_B;
    },
    // 自动扣币
    selectPayEvent(){
      this.balance_B=!this.balance_B;
    },
    // 关闭付费窗口
    switchpaypromtEvent(){
      this.paypromt_B=!this.paypromt_B;
    },
    // 排序
    chapterSortEvent(){
      this.CartoonData.chapterData.reverse();
    },
    // 开始阅读
    startReadCartoon(){
      this.paypromt_B = !this.paypromt_B;
      // this.$router.push({path:'/chapter/chapterDetail',query: {chapterid:0}});
    },
    // 选择章节阅读
    navigateToChapterDetail(item){
      console.log(item)
      var _self = this;
      if(item.charge === 1){
        _self.paypromt_B = !_self.paypromt_B;
      }else{
        _self.$router.push({path:'/chapter/chapterDetail',query: {chapterid:item.cid}});
      }
      // _self.CartoonData.chapterData.forEach(function(item){
      //   if(item.cid == cid){
      //     if(item.charge === 1){
      //       _self.paypromt_B = !_self.paypromt_B;
      //     }else{
      //       this.$router.push({path:'/chapter/chapterDetail',query: {chapterid:cid}});
      //     }
      //   }
      // })
    },
  },
  destroyed(){
    window.removeEventListener('scroll',this.Pulluploading,false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* paypromt */
  .paypromt_container{
    
  }
  .paypromt_container.on .paypromt_wrap{bottom:0;}
  .paypromt_container.on .paypromt_bg{opacity: 1;display: block;}
  .paypromt_bg{
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.7);
    position: fixed;
    lefT:0;
    opacity:0; 
    top:0;
    z-index:99;
    transition: all 0.3s;
    display: none;
  }
  .paypromt_wrap{
    position: fixed;
    z-index: 99;
    bottom:-100%;
    left:0;
    width:100%;
    background-color:#ffffff;
    text-align: center;
    transition: all 0.3s;
  }
  .wrap_bg{
    width: 2.13rem;
    position: absolute;
    left: 0.35rem;
    top: -0.84rem;
    z-index: -1;
  }
  .paypromt_t{
    line-height: 0.76rem;
    font-size: 0.34rem;
    color: #333;
    padding-bottom: 0.26rem;
    position: relative;
    text-align: center;
  }
  .paypromt_t::before{
    content: "";
    width: 100%;
    height: 0.32rem;
    background: url('../../static/images/tc_img_02.png') 50% no-repeat;
    background-size: 100%;
    position: absolute;
    left: 0;
    top: -0.26rem;
    z-index: -2;
  }
  .close{
    position: absolute;
    right: 0.28rem;
    top: 0.17rem;
    width: 0.46rem;
    height: 0.46rem;
    background: url('../../static/images/del_icon.png') 50% no-repeat;
    background-size: 0.46rem;
  }
  .payitems{
    width:80%;
    line-height: .85rem;
    background-color:#EEEEEE;
    margin: 0 auto;
    border-radius: 0.43rem;
    font-size:0.28rem;
    color:#333333;
    text-align: center;
  }
  .payitems span{color: #fd7d49;font-size: .31rem;}
  .assets{
    display: flex;
    justify-content: center;
    font-size:0.28rem;
    line-height: 0.84rem;
  }
  .assets p{margin-right:0.5rem;}
  .assets p:nth-last-child(1){margin-right:0;}
  .assets p:nth-child(1){color:#909090}
  .ec{color: #fd7d49;}
  .balance_s{
    line-height: 0.36rem;
    padding-left: 0.5rem;
    background: url('../../static/images/icon8.png') 0 no-repeat;
    color: #333;
    font-size: 0.22rem;
    background-size: 0.36rem;
    display: inline-block;
    margin: 0 auto;
  }
  .balance_s.on{
    background-image: url('../../static/images/zf_icon.png');
  }
  .paypromt_btn{
    margin-top: 0.44rem;
    line-height: 1rem;
    background-color: #fd7d49;
    text-align: center;
    color: #fff;
    font-size: 0.32rem;
  }
  /* 详情页 */
  .cartoonDetail_container{
    min-height:100vh;
    width:100%;
    height:100%;
    background-color:#F2F5F5;
  }
  /* 头部 */
  .cartoonDetail_header{
    position: relative;
    min-height:4.7rem;
  }
  .cartoonDetail_banner{
    position: absolute;
    width:100%;
    height:100%;

  }
  .img_bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(transparent,#000);
    opacity: .6;
  }
  .cartoonDetail_h_t{
    position: relative;
    padding:0.27rem 0.24rem 0.27rem 0.27rem;
    z-index: 2;
  }
  .cartoonDetail_h_t ._goback{
    width:0.55rem;
    height:0.55rem;
    display: inline-block;
    background:url('../../static/images/icon50.png') no-repeat;
    background-size:100% 100%;
  }
  .cartoonDetail_h_t ._gohome{
    margin-left:0.1rem;
    width: 0.55rem;
    height: 0.55rem;
    display: inline-block;
    background:url('../../static/images/iconhome.png') no-repeat;
    background-size:100% 100%;
  }
  .cartoonDetail_h_b{
    position: relative;
    z-index: 2;
    margin-top:1.9rem;
    padding:0 0.24rem 0 0.27rem;
  }
  .cartoonDetail_h_b .cartoonDetail_title{
    font-size: 0.43rem;
    color: #fff;
    line-height: 0.6rem;
    padding: 0.2rem 0;
  }
  .cartoonDetail_msg{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cartoonDetail_msg .msg_left{font-size: 0;}
  .cartoonDetail_msg .msg_left span{
    padding: 0 0.1rem;
    text-align: center;
    border: 0.02rem solid #fff;
    color: #fff;
    font-size: 0.24rem;
    margin-right: 0.1rem;
    height: 0.36rem;
    display: inline-block;
    line-height: 0.36rem;
    border-radius: 0.05rem;
  }
  .cartoonDetail_msg .msg_right{
    font-size: 0.28rem;
    height: 0.36rem;
    line-height: 0.36rem;
    color: #fff;
  }
  /* 脚部 */
  .cartoonDetail_footer{
    width: 100%;
    background-color: #ffffff;
    overflow: hidden;
    z-index: 1;
    padding: .24rem 0;
  }
  .footer_wrap{
    padding-right:0.2rem;
    overflow: hidden;
  }
  .collection{
    width:25%;
    font-size:0.28rem;
    line-height: 0.8rem;
    text-align: center;
    position: relative;
    float: left;
  }
  .collection::after{
    content: "";
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    height: .33rem;
    width: .02rem;
    position: absolute;
    background-color: #e1e1e1;
    line-height: .8rem;
  }
  .collection .footer_icon{
    width:0.32rem;
    height:0.32rem;
    vertical-align: middle;
    margin-right:0.1rem;
    margin-bottom:0.05rem;
    transition: all 0.3s;
  }
  .onto{
    color:#fd7d49;
    transition: all 0.3s;
  }

  .fabulous{
    width:25%;
    font-size:0.28rem;
    line-height: 0.8rem;
    text-align: center;
    float: left;
  }
  .fabulous .footer_icon{
    width:0.32rem;
    height:0.32rem;
    vertical-align: middle;
    margin-right:0.1rem;
    margin-bottom:0.1rem;
    transition: all 0.3s;
  }
  .startRead{
    background-color: #fd7d49;
    width:50%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #fff;
    border-radius: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    float:right;
  }
  .startRead .footer_icon{
    width:0.45rem;
    height:0.35rem;
    vertical-align: middle;
    margin-right:0.1rem;
  }
  /* 内容 */
  .cartoonDetail_content{background-color:#ffffff;}
  .switch_wrap{font-size:0;border-bottom: .02rem solid #e1e1e1;}
  .switch_wrap span{
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 0.8rem;
    font-size:0.3rem;
    transition: all 0.3s;
    color:#919191;
    -webkit-tap-highlight-color: transparent;
  }
  .switch_wrap span.on{color:#fd7d49;position: relative;}
  .switch_wrap span.on::after{
    content: "";
    width: 2.26rem;
    height: 0.05rem;
    background-color: #fd7d49;
    position: absolute;
    left: 0.745rem;
    bottom: 0;
    transition: all .3s;
  }
  .cartoon_jj{
    padding:0.3rem 0.24rem 0.2rem;
    font-size: .28rem;
    color: #333;
    line-height: .48rem;
    word-wrap: break-word;
    word-break: break-all;
  }
  .c_t_h{padding-right:0.2rem;color:#9a9a9a;}
  .cartoon_tj_wrap{
    display: flex;
    padding:0 0.24rem;
    border-bottom: .2rem solid #f2f5f5;
  }
  .cartoon_tj_wrap .tj_w{
    color: #9a9a9a;
    line-height: .56rem;
    font-size: .28rem;
  }
  .cartoon_tj_wrap .tj_w:nth-child(2){margin-left:0.43rem;}
  .cartoon_tj_wrap .tj_w .read_icon{
    width:0.3rem;
    height: 0.2rem;
    margin-right:0.1rem;
    vertical-align: baseline;
  }
  .cartoon_tj_wrap .tj_w .fabulous_icon{
    width:0.3rem;
    height:0.3rem;
    margin-right:0.1rem;
    vertical-align: baseline;
  }
  .cartoon_author{
    padding: 0 .24rem;
    height: .85rem;
    line-height: 0.85rem;
    color: #333;
    font-size:0.28rem;
  }
  /* 选集 */
  .content_all_cartoon{
    display: flex;
    justify-content: space-between;
    color: #333;
    font-size:0.28rem;
    padding:0.4rem 0.25rem 0.1rem;
  }
  .content_all_cartoon p:nth-child(2){
    color:#989898;
  }
  .content_all_cartoon p:nth-child(2)::before{
    content: '';
    width:0.32rem;
    height:0.32rem;
    display: inline-block;
    vertical-align: middle;
    margin-right:0.1rem;
    background:url('../../static/images/sort.png') no-repeat;
    background-size:100% 100%;
  }
  .chapter_list{list-style: none;padding-bottom:0.2rem;}
  .chapter_item{
    display: flex;
    align-items: center;
    padding:0.2rem 0.24rem 0;
  }
  .chapter_item .chapter_img{
    width: 2.32rem;
    height: 1.46rem;
    margin-right: .28rem;
    vertical-align: middle;
  }
  .chapter_item .chapter_msg{
    flex: 1;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height:1.46rem;
  }
  .chapter_msg .chapter_t{
    line-height: .4rem;
    color: #333;
    font-size: .3rem;
  }
  .chapter_m .chapter_m_icon{
    width: .37rem;
    height: .37rem;
    background: url('../../static/images/icon57.png') 50% no-repeat;
    background-size: .37rem;
    display: inline-block;
    vertical-align:middle;
  }
  .chapter_msg .chapter_ft{
    font-size:0.24rem;
    line-height: 0.38rem;
    color: #909090;
  }
  .chapter_msg .chapter_ft span{padding-right: .5rem;}
  .chapter_msg .chapter_ft span:nth-last-child(1){padding-right:0;}
  .chapter_msg .chapter_ft span:nth-child(2)::before{
    content:'';
    display: inline-block;
    vertical-align: middle;
    width:0.22rem;
    height:0.22rem;
    background:url('../../static/images/zan2.png') no-repeat;
    background-size:100% 100%;
    margin-right:0.1rem;
  }
  .chapter_msg .chapter_ft span:nth-child(2).on::before{
     background:url('../../static/images/zan4.png') no-repeat;
    background-size:100% 100%;
  }
  /* 加载 */
  .chapter_load_wrap{
    line-height: 0.6rem;
    font-size:0.28rem;
    text-align: center;
    color:#989898;
  }
</style>