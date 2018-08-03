<template>
  <div :class="['chapterDetail_container',menu_B?'on':'']" ref="scrollview">
    <!-- header -->
    <div class="chapterDetail_header">
        <div class="_goback" @click="navitoCatalog()"></div>
        <h2 class="chapter_t">第{{menuChapter.sort_number}}话 {{menuChapter.name}}</h2>
        <div class="chapter_S">剩{{$route.query.chaptertotalNum - menuChapter.sort_number}}话</div>
    </div>
    <!-- content -->
    <div class="chapterDetail_content">
        <div class="chapterDetail_wrap" v-for="item in chapterDetailData" :key="item.sort_number" @click="menuShowEvent(item)">
            <img src="" v-lazy="img.imgurl" v-for="img in item.images" class="img-content" :key="img.imgurl" alt="">
            <div class="content_footer">
                <div class="readEnd_wrap">
                    <div :class="['readEnd_t',item.Pnumber?'on':'']" @click.stop="chapterFabulousEvent(item)">{{item.praise}}赞</div>
                    <div :class="['readEnd_t',item.Cnumber?'on':'']" @click.stop="collectionEvent(item)">{{item.Cnumber?'已收藏':'收藏'}}</div>
                </div>
                <div class="recom_wrap" >
                    <div v-for="likeitem in likeCartoonData" :key="likeitem.cid" @click.stop="navigateToCartoonDetail(likeitem)">{{likeitem.name}}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- footer -->
    <div class="chapterDetail_footer">
        <div class="footer_wrap">
            <div class="footer_item" @click="navitoCatalog()">目录</div>
            <div class="footer_item" v-if="menuChapter.sort_number != 1" @click="prevChapterEvent(menuChapter)">上一话</div>
            <div class="footer_item home" v-else @click="$router.push('/')">首页</div>
            <div class="footer_item" v-if="menuChapter.sort_number != $route.query.chaptertotalNum" @click="nextChapterEvent(menuChapter)">下一话</div>
            <div class="footer_item home" v-else @click="$router.push('/')">首页</div>
            <div :class="['footer_item',menuChapter.Pnumber?'on':'']" @click.stop="chapterFabulousEvent(menuChapter)">点赞</div>
            <div :class="['footer_item',menuChapter.Cnumber?'on':'']" @click.stop="collectionEvent(menuChapter)">收藏</div>
        </div>
    </div>
    <!-- fixed -->
    <div class="naviTo_wrap">
        <div class="_gohome" @click="gohome()"></div>
        <!-- <div class="_goreport" ></div> -->
    </div>
    <!-- 订阅 -->
     <div :class="['paypromt_container',paypromt_B?'on':'']">
       <div class="paypromt_bg" @click.stop="switchpaypromtEvent()"></div>
       <div class="paypromt_wrap">
         <div class="paypromt_t">订阅章节 <span class="close" @click.stop="switchpaypromtEvent()"></span></div>
         <div class="payitems">购买章节共计：1话<span> / {{itemData.coinnum}}币</span></div>
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
</template>

<script>
export default {
  name: 'chapterDetail',
  data () {
    return {
        menu_B:false,
        paypromt_B:false,
        balance_B:false,
        throttle_B:false,
        chapterNum:this.$route.query.sortNumber,
        scrollview:'',
        likeCartoonData:[],
        chapterDetailData:[],
        menuChapter:{},
        loadtype:0,
        coinnum2:'扣0赠币',
        ydb:0,
        zb:0,
        itemData:'',
    }
  },
  mounted(){
    this.scrollview = this.$refs.scrollview;
    this.chapterDetailDataEvent(0);
    this.getlikeCartoonData();
  },
  methods:{
    menuShowEvent(item){
        console.log(item)
        this.menuChapter = item;
        this.menu_B = !this.menu_B;
    },
    // 数据
    chapterDetailDataEvent(loadtype){
        var _self = this;
        console.log(loadtype)
        _self.loadtype = loadtype; //加载方法
        _self.$store.state.loadShow =true;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapter_page',_self.$qs.stringify({cid:_self.$route.query.cid,uid:_self.$store.state.uid,sortNumber:_self.chapterNum}))
            .then(function(response){
            //获取章节数据
            _self.itemData = response.data;
            console.log(_self.itemData)
            // 是否付费
            if(_self.itemData.free_pay){
                _self.$store.state.loadShow =false;
                // 是否登录
                if(_self.$store.state.isLogin){
                    _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-selectBalance',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid}))
                    .then(function(response){
                        if(response.data.power == 2){
                            console.log('年费会员绿色通道')
                            _self.loadFunEvent();
                        }else{
                            console.log('需扣币'+_self.itemData.coinnum,'阅读币'+_self.ydb,'赠币'+_self.zb)
                            let adequateMoney; //元宝够不够
                            _self.ydb = Number(response.data.coinyd);
                            _self.zb = Number(response.data.coinz);
                            _self.balance_B = response.data.autopay;
                            if(_self.zb > _self.itemData.coinnum){
                                _self.coinnum2 = '扣'+_self.itemData.coinnum + '赠币';
                            }else if(_self.zb <_self.itemData.coinnum && _self.ydb > _self.itemData.coinnum){
                                _self.coinnum2 = '扣'+_self.itemData.coinnum + '阅读币';
                            }else if(_self.zb < _self.itemData.coinnum && _self.ydb < _self.itemData.coinnum){
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
                _self.loadFunEvent();
            }
        })
    },
    // 推荐漫画
    getlikeCartoonData(){
        var _self = this;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-youLike',_self.$qs.stringify({uid:_self.$store.state.uid}))
        .then(function(response){
            _self.likeCartoonData = response.data;
            console.log(response)
        })
    },
    // 推荐漫画跳转
    navigateToCartoonDetail(item){
        this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:item.cid}})
    },
    // 购买章节
    buyChapterEvent(){
        var _self = this;
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-buyChapter',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid,chapterid:_self.itemData.chapterid,coin:_self.itemData.coinnum}))
        .then(function(response){
            _self.loadFunEvent();
            _self.paypromt_B = false;
        })
    },
    // 上一话
    prevChapterEvent(menuChapter){
        let prevchapterNum = menuChapter.sort_number;
        prevchapterNum--;
        this.chapterNum = prevchapterNum;
        this.menu_B = ! this.menu_B;
        this.chapterDetailDataEvent(0);
    },
    // 下一话
    nextChapterEvent(menuChapter){
        let nextchapterNum = menuChapter.sort_number;
        nextchapterNum++;
        this.chapterNum = nextchapterNum;
        this.menu_B = ! this.menu_B;
        this.chapterDetailDataEvent(0);
    },
    // 加载方法  1 合并 0重载
    loadFunEvent(){
        var _self = this;
        if(_self.loadtype){
            _self.chapterDetailData = _self.chapterDetailData.concat([_self.itemData])
            _self.$store.state.loadShow =false;
            layer.open({
                content: '已自动为你加载下一话'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
        }else{
            _self.chapterDetailData = [_self.itemData]
            _self.scrollview.addEventListener('scroll',_self.Pulluploading,false);
            _self.scrollview.scrollTop = 0;
            _self.$store.state.loadShow =false;
        }
    },

    // 点赞
    chapterFabulousEvent(item){
        var _self = this;
        if(_self.$store.state.isLogin){
            item.Pnumber = !item.Pnumber;
            item.Pnumber?item.praise++:item.praise--;
            _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapter_praise',_self.$qs.stringify({chapterid:item.chapterid,uid:_self.$store.state.uid,judge:Number(item.Pnumber)}))
            .then(function(response){
                // if(response.data){
                //     layer.open({
                //         content:'点赞成功'
                //         ,skin:'msg'
                //         ,time:2
                //     })
                // }else{
                //     layer.open({
                //         content:'取消成功'
                //         ,skin:'msg'
                //         ,time:2
                //     })
                // }
            })
        }else{
            _self.$router.push('/mypage/login') 
        }
        
    },
    // 收藏
    collectionEvent(item){
        var _self = this;
        if(_self.$store.state.isLogin){
            item.Cnumber = !item.Cnumber;
            _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-collection',_self.$qs.stringify({cid:_self.$route.query.cid,uid:_self.$store.state.uid,judge:Number(item.Cnumber)}))
            .then(function(response){
                // if(response.data){
                //     layer.open({
                //         content:'收藏成功'
                //         ,skin:'msg'
                //         ,time:2
                //     })
                // }else{
                //     layer.open({
                //         content:'取消收藏'
                //         ,skin:'msg'
                //         ,time:2
                //     })
                // }
            })
        }else{
           _self.$router.push('/mypage/login') 
        }
        
    },
    // 上拉加载
    Pulluploading(){
      var _self = this;
      var scrollTop = _self.scrollview.scrollTop;
      var scrollHeight = _self.scrollview.scrollHeight;
      var clientHeight = _self.scrollview.clientHeight;
      this.menu_B = false;
      if(scrollHeight - clientHeight < scrollTop+1){
          console.log(1321313)
        var item = _self.chapterDetailData[_self.chapterDetailData.length-1];
        _self.chapterNum = item.sort_number;
        if(_self.chapterNum == _self.$route.query.chaptertotalNum){
            layer.open({
                content: '到底了~'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
        }else{
            if(!_self.throttle_B){
                    _self.$store.state.loadShow =true;
                setTimeout(function(){
                    _self.chapterNum++;
                    _self.chapterDetailDataEvent(1);
                    _self.throttle_B = false;
                },300)
                _self.throttle_B = true;
            }else{
                return;
            }
        }
          
      }
    },
     // 自动扣币
    selectPayEvent(){
      var _self = this;  
      this.balance_B=!this.balance_B;
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-payAuto',_self.$qs.stringify({uid:_self.$store.state.uid,cid:_self.$route.query.cid,chapterid:_self.itemData.chapterid,coin:_self.itemData.coinnum}))
      .then(function(response){
        console.log(response)
      })
    },
    // 去充值
    navigateToPaypage(){this.$router.push('/mypage/recharge')},
    // 关闭付费窗口
    switchpaypromtEvent(){this.paypromt_B=!this.paypromt_B;},
    // 回主页
    gohome(){this.$router.push('/')},
    // 目录
    navitoCatalog(){this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:this.$route.query.cid,Catalog:1}})},
  },
  destroyed(){
    this.scrollview.removeEventListener('scroll',this.Pulluploading,false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chapterDetail_container{
        height: 100vh;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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
        -webkit-tap-highlight-color: transparent;
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
        vertical-align: middle;
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
        -webkit-tap-highlight-color: transparent;
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
    .footer_item.home{
        background:url('../../static/images/iconhome.png') no-repeat;
        background-size:auto 0.55rem;
        background-position:center 0.08rem;
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
        -webkit-tap-highlight-color: transparent;
    }
    ._goreport{
        background-image: url('../../static/images/jb1_icon.png');
        background-size: 0.8rem;
        -webkit-tap-highlight-color: transparent;
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