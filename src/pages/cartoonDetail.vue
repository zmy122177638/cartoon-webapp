<template>
  <div class="cartoonDetail_container" ref="scrollview">
    <div class="cartoonDetail_wrap">
      <div class="cartoonDetail_header">
        <img :src="CartoonData.img_url" class="cartoonDetail_banner" alt="">
        <div class="img_bg"></div>
        <div class="cartoonDetail_h_t"><span class="_goback" @click="goback()"></span><span class="_gohome" @click="gohome()"></span></div>
        <div class="cartoonDetail_h_b">
          <div class="cartoonDetail_title">{{CartoonData.name}}</div>
          <div class="cartoonDetail_msg">
            <div class="msg_left">
              <span v-for="btype of CartoonData.label" :key="btype">{{btype}}</span>
            </div>
            <div class="msg_right">{{CartoonData.serial_end?'连载中':'完结'}}/更新至{{CartoonData.set_number}}话</div>
          </div>
        </div>
      </div>
      <div class="cartoonDetail_footer">
        <div class="footer_wrap">
          <div :class="['collection',CartoonData.Cnumber?'onto':'']"  @click="collectionEvent()"><img :src="CartoonData.Cnumber?collection_img1:collection_img0" class="footer_icon" alt="">{{CartoonData.Cnumber?'已收藏':'收藏'}}</div>
          <div :class="['fabulous',CartoonData.Pnumber?'onto':'']" @click="fabulousEvent()"><img :src="CartoonData.Pnumber?fabulous_img1:fabulous_img0" class="footer_icon" alt="">{{CartoonData.Pnumber?'已赞':'点赞'}}</div>
          <div class="startRead" @click="startReadCartoon()"><img src="../../static/images/yd_icon.png" class="footer_icon" alt=""> {{CartoonData.sort_number == 0?'开始阅读':'继续阅读'}}</div>
        </div>
      </div>
      <div class="cartoonDetail_content">
        <div class="switch_wrap">
          <span :class="select==0?'on':''" @click="selectTabbarEvent(0)">详情</span>
          <span :class="select==1?'on':''" @click="selectTabbarEvent(1)">选集</span>
        </div>
        <!-- 详情 -->
        <div class="content_wra0" v-show="select==0">
          <p class="cartoon_jj"><span class="c_t_h">简介：</span>{{CartoonData.brief}}</p>
          <div class="cartoon_tj_wrap">
            <div class="tj_w"><img src="../../static/images/browse.png" class="read_icon" alt="">总浏览{{CartoonData.browse > 9999 ? (Math.floor(CartoonData.browse/1000)/10) + '万' : CartoonData.browse}}</div>
            <div class="tj_w"><img src="../../static/images/zan4.png" class="fabulous_icon" alt="">{{CartoonData.praise}}人点赞</div>
          </div>
          <p class="cartoon_author"><span class="c_t_h">主笔：</span>{{CartoonData.author}}</p>
        </div>
        <!-- 选集 -->
        <div class="content_wrap1" v-show="select==1">
          <div class="content_all_cartoon"><p>全部章节</p><p @click="chapterSortEvent()">排序</p></div>
          <ul class="chapter_list">
            <li class="chapter_item" v-for="item in chapterData" :key="item.chapterid" @click="navigateToChapterDetail(item)">
              <figure><img :src="item.imgurl" class="chapter_img" alt=""></figure>
              <div class="chapter_msg">
                <p class="chapter_t">第{{item.sort_number}}话 {{item.name}}</p>
                <p class="chapter_m" v-show="item.free_pay"><span class="chapter_m_icon"></span></p>
                <p class="chapter_ft"><span>{{item.createtime}}</span><span :class="item.Pnumber?'on':''" @click.stop="chapterFabulouEvent(item)">{{item.praise}}</span></p>
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
         <div class="payitems">购买章节共计：1话<span> / {{coinnum}}币</span></div>
         <div class="assets">
           <p>余额：</p>
           <p><span class="ec">{{ydb}}</span>阅读币</p>
           <p><span class="ec">{{zb}}</span>赠币</p>
         </div>
         <p :class="['balance_s',balance_B?'on':'']" @click.stop="selectPayEvent()">余额充足时点击下一话自动扣费，不再提示</p>
         <div class="paypromt_btn" @click="coinnum2=='去充值'?navigateToPaypage():buyChapterEvent()">{{coinnum2}}</div>
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
      pageNum:1,
      sort:0,   //排序
      scrollview:'',
      throttle_B:false,
      loading_B:false,
      paypromt_B:false,
      balance_B:false,
      coinnum:0, // 扣币
      Mchapterid:'',  //购买章节Id
      MchapterNum:0,
      coinnum2:'扣0赠币', 
      ydb:0, 
      zb:0,
      fabulous_img0:'static/images/zan6.png',
      fabulous_img1:'static/images/zan5.png',
      collection_img0:'static/images/icon56.png',
      collection_img1:'static/images/collection_icon.png',
      CartoonData:{},
      chapterData:[]
    }
  },
  mounted(){
    this.select = this.$route.query.Catalog || this.select;
    this.scrollview = this.$refs.scrollview;
    this.scrollview.addEventListener('scroll',this.Pulluploading,false);
    this.cartoonDataEvent();
    this.charpteDatainitEvent();
  },
  activated(){
    this.pageNum = 1;
    this.select = this.$route.query.Catalog || 0;
    this.scrollview = this.$refs.scrollview;
    this.scrollview.addEventListener('scroll',this.Pulluploading,false);
    this.cartoonDataEvent();
    this.charpteDatainitEvent();
  },
  deactivated(){

  },
  methods:{
    // 漫画数据
    cartoonDataEvent(){
      var _self = this;
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-index',_self.$qs.stringify({cid:_self.$route.query.cid,uid:_self.$store.state.uid}))
      .then(function(response){
        _self.CartoonData =response.data;
        // console.log(response)
      })
    },
    // 章节初始数据
    charpteDatainitEvent(){
      var _self = this;
      if(_self.select){
        _self.$store.state.loadShow =true;
         _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapter',_self.$qs.stringify({page:1,cid:_self.$route.query.cid,uid:_self.$store.state.uid,sort:_self.sort}))
        .then(function(response){
          console.log(response)
          _self.chapterData = response.data;
          _self.$store.state.loadShow =false;
        })
      }
    },
    // 章节上拉加载数据
    charpteDataEvent(){
       var _self = this;
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapter',_self.$qs.stringify({page:_self.pageNum,cid:_self.$route.query.cid,uid:_self.$store.state.uid,sort:_self.sort}))
      .then(function(response){
        if(response.data != ""){
          _self.chapterData = _self.chapterData.concat(response.data);
          _self.$store.state.loadShow =false;
        }else{
          _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false);
          _self.loading_B = true;
          _self.$store.state.loadShow =false;
        }
        console.log(response)
      })
    },
    // tabbar切换
    selectTabbarEvent(select){
      var _self = this;
      _self.select = select;
      _self.pageNum = 1;
      _self.loading_B = false;
      this.scrollview.addEventListener('scroll',this.Pulluploading,false);
      _self.charpteDatainitEvent();
    },
     // 排序
    chapterSortEvent(){
      var _self = this;
      _self.sort == 1?_self.sort=0:_self.sort=1;
      _self.pageNum = 1;
      _self.loading_B = false;
      this.scrollview.addEventListener('scroll',this.Pulluploading,false);
      _self.charpteDatainitEvent()
    },
    // 返回上个路由
    goback(){this.$router.back(-1)},
    // 返回首页
    gohome(){this.$router.push('/')},
    // 上拉加载
    Pulluploading(){
      var _self = this;
      var scrollTop = _self.scrollview.scrollTop;
      var scrollHeight = _self.scrollview.scrollHeight;
      var clientHeight = _self.scrollview.clientHeight;
      if(scrollHeight - clientHeight < scrollTop+1 && _self.select){
        if(!_self.throttle_B){
            _self.$store.state.loadShow =true;
            setTimeout(function(){
                _self.pageNum++;
                _self.charpteDataEvent();
                _self.throttle_B = false;
            },300)
            _self.throttle_B = true;
        }else{
            return;
        }
      }
    },
    // 漫画点赞
    fabulousEvent(){
      var _self = this;
      if(_self.$store.state.isLogin){
        _self.CartoonData.Pnumber = !_self.CartoonData.Pnumber;
        _self.CartoonData.Pnumber?_self.CartoonData.praise++:_self.CartoonData.praise--;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-praise',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid,judge:Number(_self.CartoonData.Pnumber)}))
        .then(function(response){
          // if(response.data){
          //   layer.open({
          //     content:'点赞成功'
          //     ,skin:'msg'
          //     ,time:2
          //   })
          // }else{
          //   layer.open({
          //     content:'取消成功'
          //     ,skin:'msg'
          //     ,time:2
          //   })
          // }
        })
      }else{
        _self.$router.push('/mypage/login')
      }
      
    },
    //章节点赞
    chapterFabulouEvent(item){
      var _self = this;
      if(_self.$store.state.isLogin){
        item.Pnumber=!item.Pnumber;
        item.Pnumber?item.praise++:item.praise--;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapter_praise',_self.$qs.stringify({chapterid:item.chapterid,uid:_self.$store.state.uid,judge:Number(item.Pnumber)}))
        .then(function(response){
          // if(response.data){
          //   layer.open({
          //     content:'点赞成功'
          //     ,skin:'msg'
          //     ,time:2
          //   })
          // }else{
          //   layer.open({
          //     content:'取消成功'
          //     ,skin:'msg'
          //     ,time:2
          //   })
          // }
        })
      }else{
        _self.$router.push('/mypage/login')
      }
    },
    // 收藏
    collectionEvent(){
      var _self = this;
      if(_self.$store.state.isLogin){
        _self.CartoonData.Cnumber = !_self.CartoonData.Cnumber;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-collection',_self.$qs.stringify({cid:_self.$route.query.cid,uid:_self.$store.state.uid,judge:Number(_self.CartoonData.Cnumber)}))
        .then(function(response){
          // if(response.data){
          //   layer.open({
          //     content:'收藏成功'
          //     ,skin:'msg'
          //     ,time:2
          //   })
          // }else{
          //   layer.open({
          //     content:'取消收藏'
          //     ,skin:'msg'
          //     ,time:2
          //   })
          // }
        })
      }else{
        _self.$router.push('/mypage/login')
      }
      
    },
    // 自动扣币
    selectPayEvent(){
      var _self = this;
      _self.balance_B = !_self.balance_B;
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-payAuto',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid,chapterid:_self.Mchapterid,coin:_self.coinnum,judge:Number(_self.balance_B)}))
      .then(function(response){
        console.log(response)
      })
    },
    
    // 去充值
    navigateToPaypage(){this.$router.push('/mypage/recharge')},

    // 购买章节
    buyChapterEvent(){
      var _self = this;
      console.log(_self.coinnum)
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-buyChapter',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid,chapterid:_self.Mchapterid,coin:_self.coinnum}))
      .then(function(response){
        console.log(response)
        _self.navigateTopayChapter();
      })
    },

    // 关闭付费窗口
    switchpaypromtEvent(){this.paypromt_B=!this.paypromt_B;},

    // 开始阅读
    startReadCartoon(){
      if(this.CartoonData.sort_number == 0){
        this.$router.push({path:'/chapter/chapterDetail',query: {sortNumber:1,cid:this.$route.query.cid,chaptertotalNum:this.CartoonData.set_number}});
      }else{
        this.$router.push({path:'/chapter/chapterDetail',query: {sortNumber:this.CartoonData.sort_number,cid:this.$route.query.cid,chaptertotalNum:this.CartoonData.set_number}});
      }
      
    },

    // 阅读
    navigateTopayChapter(){
      console.log(this.MchapterNum)
      this.$router.push({path:'/chapter/chapterDetail',query: {sortNumber:this.MchapterNum,cid:this.$route.query.cid,chaptertotalNum:this.CartoonData.set_number}});
    },

    // 选择章节阅读
    navigateToChapterDetail(item){
      console.log(item)
      var _self = this;
      _self.MchapterNum = item.sort_number;
      _self.Mchapterid = item.chapterid;
      _self.coinnum = Number(item.coinnum);
      // 是否付费
      if(item.free_pay){
        // 是否登录
        if(_self.$store.state.isLogin){
          _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-selectBalance',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid}))
          .then(function(response){
            console.log(response)
            // 是否年费
            if(response.data.power == 2){
              console.log('年费会员绿色通道')
              _self.navigateTopayChapter();
            }else{
              // 计算显示扣币
              console.log('需扣币'+_self.coinnum,'阅读币'+_self.ydb,'赠币'+_self.zb)
              let adequateMoney; //元宝够不够
              _self.ydb = Number(response.data.coinyd);
              _self.zb = Number(response.data.coinz);
              _self.balance_B = response.data.autopay;
              if(_self.zb > _self.coinnum){
                _self.coinnum2 = '扣'+_self.coinnum + '赠币';
              }else if(_self.zb <_self.coinnum && _self.ydb > _self.coinnum){
                _self.coinnum2 = '扣'+_self.coinnum + '阅读币';
              }else if(_self.zb < _self.coinnum && _self.ydb < _self.coinnum){
                adequateMoney = true;
                _self.coinnum2 = '去充值';
              }

              // 是否自动订阅
              if(response.data.autopay){
                if(adequateMoney){
                  _self.paypromt_B = !_self.paypromt_B;
                }else{
                  _self.buyChapterEvent();
                }
              }else{
                _self.paypromt_B = !_self.paypromt_B;
              }
            }
          })
        }else{
          _self.$router.push('/mypage/login')
        }
      }else{
        _self.navigateTopayChapter();
      }
    },
  },
  destroyed(){
    this.scrollview.removeEventListener('scroll',this.Pulluploading,false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 详情页 */
  .cartoonDetail_container{
    height:100vh;
    width:100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
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
    -webkit-tap-highlight-color: transparent;
  }
  .cartoonDetail_h_t ._gohome{
    margin-left:0.1rem;
    width: 0.55rem;
    height: 0.55rem;
    display: inline-block;
    background:url('../../static/images/iconhome.png') no-repeat;
    background-size:100% 100%;
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
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
    overflow: hidden;
  }
  .chapter_msg .chapter_t{
    line-height: .4rem;
    color: #333;
    font-size: .3rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
  .chapter_msg .chapter_ft span:nth-last-child(1){padding-right:0;-webkit-tap-highlight-color: transparent;}
  .chapter_msg .chapter_ft span:nth-child(2)::before{
    content:'';
    display: inline-block;
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
  /* paypromt */
  .paypromt_container{}
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
    -webkit-tap-highlight-color: transparent;
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
    -webkit-tap-highlight-color: transparent;
  }
  /* 加载 */
  .chapter_load_wrap{
    line-height: 0.6rem;
    font-size:0.28rem;
    text-align: center;
    color:#989898;
  }
</style>