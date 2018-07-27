<template>
  <div :class="['chapterDetail_container',menu_B?'on':'']" @click="menuShowEvent()">
    <!-- header -->
    <div class="chapterDetail_header">
        <div class="_goback" @click="goback()"></div>
        <h2 class="chapter_t">第6话 U盘</h2>
        <div class="chapter_S">剩20话</div>
    </div>
    <!-- content -->
    <div class="chapterDetail_content">
        <div class="chapterDetail_wrap">
            <img src="http://img.super-dreamers.com/xqmall/images/12b291ad-f162-4e68-8218-5eb3b0e2d82e.jpg@75Q" alt="">
            <img src="http://img.super-dreamers.com/xqmall/images/12b291ad-f162-4e68-8218-5eb3b0e2d82e.jpg@75Q" alt="">
            <div class="content_footer">
                <div class="readEnd_wrap">
                    <div :class="['readEnd_t',fabulous_B?'on':'']" @click.stop="chapterFabulousEvent()">87赞</div>
                    <div :class="['readEnd_t',collection_B?'on':'']" @click.stop="collectionEvent()">{{collection_B?'已收藏':'收藏'}}</div>
                </div>
                <div class="recom_wrap">
                    <div>贴身教练</div>
                    <div>家庭教师</div>
                    <div>家庭教师家庭教师家庭教师家庭教师家庭教师家庭教师家庭教师s</div>
                </div>
            </div>
        </div>
    </div>
    <!-- footer -->
    <div class="chapterDetail_footer">
        <div class="footer_wrap">
            <div class="footer_item" @click="navitoCatalog()">目录</div>
            <div class="footer_item">上一话</div>
            <div class="footer_item">下一话</div>
            <div :class="['footer_item',fabulous_B?'on':'']" @click.stop="chapterFabulousEvent()">点赞</div>
            <div :class="['footer_item',collection_B?'on':'']" @click.stop="collectionEvent()">收藏</div>
        </div>
    </div>
    <!-- fixed -->
    <div class="naviTo_wrap">
        <div class="_gohome" @click="gohome()"></div>
        <div class="_goreport" ></div>
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
</template>

<script>
export default {
  name: 'chapterDetail',
  data () {
    return {
        menu_B:false,
        fabulous_B:false,
        collection_B:false,
        paypromt_B:false,
        balance_B:false,
        throttle_B:false,
    }
  },
  mounted(){
    console.log(this.$route.query.chapterid)
    window.addEventListener('scroll',this.Pulluploading,false);
  },
  methods:{
    menuShowEvent(){
        this.menu_B = !this.menu_B;
    },
    // 返回
    goback(){this.$router.back(-1);},
    // 回主页
    gohome(){this.$router.push('/')},
    // 目录
    navitoCatalog(){this.$router.push({path:'/category/cartoonDetail',query:{Catalog:1}})},
    // 点赞
    chapterFabulousEvent(){
        this.fabulous_B = !this.fabulous_B;
    },
    // 上拉加载
    Pulluploading(){
      var _self = this;
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      var scrollHeight = document.querySelector('.chapterDetail_container').clientHeight;
      var screenHeight = window.screen.height||window.innerHeight;
      if(scrollHeight - screenHeight < scrollTop+1){
          if(!_self.throttle_B){
              console.log('调用数据')
              _self.$store.state.loadShow =true;
              _self.paypromt_B = !_self.paypromt_B;
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
     // 自动扣币
    selectPayEvent(){
      this.balance_B=!this.balance_B;
    },
    // 关闭付费窗口
    switchpaypromtEvent(){
      this.paypromt_B=!this.paypromt_B;
    },
    // 收藏
    collectionEvent(){
        this.collection_B = !this.collection_B;
    },
  },
  destroyed(){
    window.removeEventListener('scroll',this.Pulluploading,false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chapterDetail_container{
        min-height: 100vh;
    }
    /* 头 */
    .on .chapterDetail_header{top:0;}
    .chapterDetail_header{
        position:fixed;
        top:-1.45rem;
        left:0;
        width:100%;
        background-color:rgba(0,0,0,0.8);
        transition: all 0.3s;
        z-index: 3;
    }
    ._goback{
        width:0.5rem;
        height:0.9rem;
        background:url('../../static/images/icon62.png') no-repeat;
        background-size:0.34rem;
        background-position: center;
        position: absolute;
        top:0;
        left:0.2rem;
    }
    .chapter_t{
        height:0.9rem;
        line-height: 0.9rem;
        font-size: 0.26rem;
        color: #ffffff;
        text-align: center;
    }
    .chapter_S{
        font-size: 0.28rem;
        color: #ffffff;
        height: 0.9rem;
        line-height: 0.9rem;
        position: absolute;
        top:0;
        right: 0.2rem;
    }
    /* 内容 */
    .chapterDetail_wrap img{
        display: block;
        width: 100%;
    }
    .readEnd_wrap{
        display: flex;
        justify-content:center;
        padding:0.35rem 0;
    }
    .readEnd_wrap .readEnd_t{
        width:40%;
        background-color:#EEEEEE;
        color:#323232;
        font-size:0.28rem;
        line-height: 0.56rem;
        text-align: center;
        border-radius: 1rem;
    }
    .readEnd_wrap .readEnd_t:nth-child(1){margin-right:0.4rem;}
    .readEnd_wrap .on{color:#fd7d49;}
    .readEnd_wrap .readEnd_t:nth-child(1)::before{
        content:'';
        width:0.22rem;
        height:0.22rem;
        display: inline-block;
        background:url('../../static/images/icon64.png') no-repeat;
        background-size:100% 100%;
        vertical-align: baseline;
        margin-right:0.2rem;
    }
    .readEnd_wrap .readEnd_t:nth-child(1).on::before{
        background:url('../../static/images/icon63.png') no-repeat;
        background-size:100% 100%;
    }
    .readEnd_wrap .readEnd_t:nth-child(2)::before{
        content:'';
        width:0.25rem;
        height:0.25rem;
        display: inline-block;
        background:url('../../static/images/icon54.png') no-repeat;
        background-size:100% 100%;
        vertical-align: baseline;
        margin-right:0.2rem;
    }
    .readEnd_wrap .readEnd_t:nth-child(2).on::before{
        background:url('../../static/images/collection1.png') no-repeat;
        background-size:100% 100%;
    }

    .recom_wrap{
        border-top: .2rem solid #f2f5f5;
        background-color: #fff;
        padding: .4rem .24rem;
    }
    .recom_wrap div{
        line-height:0.68rem;
        font-size:0.28rem;
        color:#323232;
        padding:0 0.4rem;
        border:0.02rem solid #e1e1e1;
        border-radius: 0.7rem;
        margin-bottom:0.3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .recom_wrap div:nth-last-child(1){margin-bottom:0;}

    /* 脚 */
    .on .chapterDetail_footer{
        bottom:0;
    }
    .chapterDetail_footer{
        position:fixed;
        bottom:-1.45rem;
        width: 100%;
        z-index: 3;
        transition: all 0.3s;
    }
    .footer_wrap{
        display: flex;
        background-color:rgba(0,0,0,0.8);
        height:1rem;
        padding:0 0.2rem;
    }
    .footer_item{
        flex: 1;
        height:1rem;
        padding-top:0.6rem;
        font-size:0.21rem;
        color:#ffffff;
        line-height: 0.4rem;
        text-align: center;
    }
    .footer_item:nth-child(1){
        background:url('../../static/images/mu_icon.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
    }
    .footer_item:nth-child(2){
        background:url('../../static/images/before_icon.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
    }
    .footer_item:nth-child(3){
        background:url('../../static/images/next_icon.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
    }
    .footer_item:nth-child(4){
        background:url('../../static/images/icon52.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
    }
    .footer_item:nth-child(5){
        background:url('../../static/images/collection.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
    }
    .footer_item:nth-child(4).on{
        background:url('../../static/images/zan5.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
        color:#fe7c4a;
    }
    .footer_item:nth-child(5).on{
        background:url('../../static/images/collection1.png') no-repeat;
        background-size:auto 0.28rem;
        background-position:center 0.2rem;
        color:#fe7c4a;
    }
    /* naviTo_wrap */
    .on .naviTo_wrap{display: block;}
    .naviTo_wrap{
        position: fixed;
        right: 0.44rem;
        bottom: 1.6rem;
        z-index: 3;
        transition: all 0.3s;
        display: none;
    }
    .naviTo_wrap div{
        width: 0.88rem;
        height: 0.88rem;
        background-repeat: no-repeat;
        background-position: 50%;
    }
    ._gohome{
        background-image: url('../../static/images/home1_icon.png');
        margin-bottom: 0.4rem;
        background-size:0.8rem;
    }
    ._goreport{
        background-image: url('../../static/images/jb1_icon.png');
        background-size: 0.8rem;
    }
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

</style>