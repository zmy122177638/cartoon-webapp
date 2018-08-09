<template>
  <div class="bookshelf_container">
    <div class="bookshelf_header">
      <h1 class="bookshelf_t">
        <ul class="bookshelf_tabbar">
          <li :class="[current==0?'on':'','new']" @click="switchTabbarEvent(0)">收藏</li>
          <li :class="[current==1?'on':'']" @click="switchTabbarEvent(1)">历史</li>
        </ul>
        <div :class="['setBtn',edit_B?'on':'']" @click="editEvent()" v-show="editBtnShow">编辑</div>
      </h1>
    </div>
    <div class="bookshelf_wrap" ref="scrollview">
      <!-- 历史 -->
      <div class=“history_container” v-show="current==1">
        <ul class="history_wrap" v-if="historyData.length != 0">
          <li class="history_item" v-for="item in historyData" :key="item.cid" @click="edit_B?editListEvent(item):navigateTodetailEvent(item)">
            <span :class="['checkBox',item.ischeck?'on':'']"></span>
            <div :class="['history_content',edit_B?'on':'']">
              <figure><img src="" v-lazy="item.img_url" class="history_img"></figure>
              <div class="history_c">
                <p class="h_t">{{item.name}}</p>
                <p class="h_n">更新到{{item.set_number}}话</p>
                <p class="h_j">续看{{item.sort_number}}话</p>
              </div>
            </div>
          </li>
        </ul>
        <fail-view v-else></fail-view>
        <p class="load_promt" v-if="loadShow1 && historyData!=''">没有更多了~</p>
      </div>
      <!-- 收藏 -->
      <div class="collec_container" v-show="current==0">
        <ul class="collec_wrap" v-if="collecData.length != 0">
          <li class="collec_item" v-for="item in collecData" :key="item.cid" @click="edit_B?editListEvent(item):navigateTodetailEvent(item)">
            <figure class="pst_rlt active">
              <img src="" v-lazy="item.img_url" class="colle_img" alt="">
              <div :class="['imgbg_cover',item.ischeck?'on':'']" v-show="edit_B"></div>
            </figure>
            <div class="collec_c">
              <p class="c_t">{{item.name}}</p>
              <p class="c_n">{{item.sort_number}}话/{{item.set_number}}话</p>
            </div>
          </li>
        </ul>
        <fail-view v-else></fail-view>
        <p class="load_promt" v-if="loadShow0 && collecData!=''">没有更多了~</p>
      </div>
      
      <!-- 猜你喜欢 -->
      <!-- <div class="like_container">
        <div class="like_title"><p class="l_t">猜你喜欢</p></div>
        <ul class="like_wrap">
          <li class="like_item" v-for="item in likeData" :key="item.cid">
            <figure><img :src="item.img_url" class="like_img" alt=""></figure>
            <p class="l_n">{{item.name}}</p>
          </li>
        </ul>
      </div> -->
    </div>
    <!-- 编辑按钮 -->
    <div :class="['setBtn_container',startAnimate?edit_B?'fadeInUp':'fadeInDown':'hidden']" v-show="editBtnShow">
      <div class="setBtn_wrap">
        <div :class="['s_btn',historyAllCheck?'on':'']" @click="allEditEvent()">全选</div>
        <div class="s_btn" @click="delEditEvent()">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import fail from '../components/fail'
export default {
  name: 'bookshelf',
  data () {
    return {
        current:1,
        throttle_B:false,
        loadShow0:false,
        loadShow1:false,
        page:1,
        scrollview:'',
        edit_B:false,
        startAnimate:false,
        onceFN:false,
        historyData:[],
        collecData:[],
        likeData:[]
    }
  },
  components:{
    'fail-view':fail
  },
  mounted(){
    this.scrollview = this.$refs.scrollview;
    this.scrollview.addEventListener('scroll',this.Pulluploading,false)
    this.axjaEvent(this.current);
  },
  computed:{
    historyAllCheck(current){
      if(this.current==1){
        let trueArr = this.historyData.filter(function(item){return item.ischeck == false});
        if(trueArr.length == 0){return true;}else{return false;}
      }else if(this.current==0){
        let trueArr = this.collecData.filter(function(item){return item.ischeck == false});
        if(trueArr.length == 0){return true;}else{return false;}
      }
    },
    editBtnShow(){
      if(this.current == 0){
        if(this.collecData.length == 0){return false;}else{return true;}
      }else if(this.current == 1){
        if(this.historyData.length == 0){return false;}else{return true;}
      }
    }
  },
  methods:{
    // 上拉加载
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
                    _self.axjaEvent(_self.current);
                    _self.throttle_B = false;
                },300)
                _self.throttle_B = true;
            }else{
                return;
            }
        }
    },
    switchTabbarEvent(current){
      if(this.$store.state.isLogin){
        this.current = current;
        this.edit_B = false;
        this.loadShow0 = false;
        this.loadShow1 = false;
        this.historyData = [];
        this.collecData = [];
        this.startAnimate = false;
        this.scrollview.addEventListener('scroll',this.Pulluploading,false)
        this.page = 1;
        this.axjaEvent(this.current)
      }else{
        this.$router.push('/mypage/login') 
      }
    },
    // 数据
    axjaEvent(current){
      var _self = this;
      _self.$store.state.loadShow = true;
      if(current == 1){
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-browse',_self.$qs.stringify({page:_self.page,uid:_self.$store.state.uid}))
        .then(function(response){
          if(response.data == ""){
            _self.loadShow1 = true;
            _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
          }else{
            response.data.forEach(function(item){item.ischeck = false})
            _self.historyData = _self.historyData.concat(response.data);
          }
          
          _self.$store.state.loadShow = false;
        })
      }
      if(current == 0){
        _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-collection',_self.$qs.stringify({page:_self.page,uid:_self.$store.state.uid}))
        .then(function(response){
          if(response.data == ""){
            _self.loadShow0 = true;
            _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
          }else{
            response.data.forEach(function(item){item.ischeck = false})
            _self.collecData = _self.collecData.concat(response.data);
          }
          _self.$store.state.loadShow = false;
        })
      }
      // if(!_self.onceFN){
      //    _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-youLike',_self.$qs.stringify({uid:_self.$store.state.uid}))
      //   .then(function(response){
      //     _self.likeData = response.data;
      //     _self.onceFN = true; //只执行一次
      //     _self.$store.state.loadShow = false;
      //     console.log(_self.likeData)
      //   })
      // }
    },
    // 编辑
    editEvent(){
      // 历史
      this.edit_B = !this.edit_B;
      if(this.current==1){
        this.startAnimate = true;
        if(!this.edit_B){
          this.historyData.forEach(function(item){item.ischeck = false})
        }
      }
      // 收藏
      if(this.current==0){
        this.startAnimate = true;
        if(!this.edit_B){
          this.collecData.forEach(function(item){item.ischeck = false})
        }
      }
    },
    // 单选
    editListEvent(item){
      item.ischeck = !item.ischeck;
    },
    // 全选
    allEditEvent(){
      var _self = this;
      if(_self.historyAllCheck){
        if(_self.current == 0){_self.collecData.forEach(function(item){item.ischeck = false})}
        if(_self.current == 1){ _self.historyData.forEach(function(item){item.ischeck = false})}
      }else{
        if(_self.current == 0){_self.collecData.forEach(function(item){item.ischeck = true})}
        if(_self.current == 1){_self.historyData.forEach(function(item){item.ischeck = true})}
      }
    },
    // 删除
    delEditEvent(){
      let checkedArr = new Array();
      var _self = this;
      if(_self.current == 1){
        _self.historyData.forEach(function(item){if(item.ischeck){checkedArr.push(item.cid)}})
        if(checkedArr.length ==0){
          layer.open({
            content: '请选择漫画'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
          return
        }else{
          layer.open({
            style: 'border:none;max-width:75%;color:#333;',
            content: '确定删除历史吗？'
            ,btn: ['确定', '取消']
            ,yes: function(index){
              checkedArr = checkedArr.length == _self.historyData.length?0:checkedArr;
              _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-deleteBrowse',_self.$qs.stringify({uid:_self.$store.state.uid,cidArr:JSON.stringify(checkedArr)}))
              .then(function(response){
                layer.open({
                  content: '删除成功'
                  ,skin: 'msg'
                  ,time: 2 //2秒后自动关闭
                  ,success:function(){
                    _self.historyData = [];
                    _self.page = 1;
                    _self.axjaEvent(_self.current)
                    _self.edit_B = !_self.edit_B;
                  }
                });
              })
              layer.close(index);
            }
          });
        }
      }
      if(_self.current == 0){
        _self.collecData.forEach(function(item){if(item.ischeck){checkedArr.push(item.cid)}})
        if(checkedArr.length ==0){
          layer.open({
            content: '请选择漫画'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });
          return
        }else{
          layer.open({
            style: 'border:none;max-width:75%;color:#333;',
            content: '确定删除收藏吗？'
            ,btn: ['确定', '取消']
            ,yes: function(index){
              checkedArr = checkedArr.length == _self.collecData.length?0:checkedArr;
              _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-User-deleteCollection',_self.$qs.stringify({uid:_self.$store.state.uid,cidArr:JSON.stringify(checkedArr)}))
              .then(function(response){
                layer.open({
                  content: '删除成功'
                  ,skin: 'msg'
                  ,time: 2 //2秒后自动关闭
                  ,success:function(){
                    _self.collecData = [];
                    _self.page = 1;
                    _self.axjaEvent(_self.current)
                    _self.edit_B = !_self.edit_B;
                  }
                });
              })
              layer.close(index);
            }
          });
        }
      }
    },

    // 跳转
    navigateTodetailEvent(item){
      if(item.sort_number == 0){
        this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:item.cid}})
      }else{
        this.$router.push({path:'/chapter/chapterDetail',query:{cid:item.cid,sortNumber:item.sort_number,chaptertotalNum:item.set_number}})
      } 
    }
  },
  destroyed(){
    this.scrollview.addEventListener('scroll',this.Pulluploading,false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bookshelf_container{
    height:100%;
    background-color:#f2f2f2;
  }
  /* tou */
  .bookshelf_header{
    width:100%;
  }
  .bookshelf_t{
    height:0.8rem;
    background-color:#fd7d49;
    font-size: 0.3rem;
    color: #fff;
    text-align: center;
    line-height: 0.8rem;
    position: relative;
  }
  .setBtn{
    height: .53rem;
    background: url('../../static/images/icon1.png') 100% no-repeat;
    background-size: .26rem;
    position: absolute;
    right: .14rem;
    top: .13rem;
    padding-right: .38rem;
    line-height: .53rem;
    font-size: .3rem;
    color: #fff;
    font-weight: 400;
    -webkit-tap-highlight-color: transparent;
  }
  .setBtn.on{
    background-image: url('../../static/images/icon9.png');
    padding-right: .38rem;
    line-height: .53rem;
    font-size: .3rem;
    color: #fff;
  }
  .bookshelf_tabbar{
    width:2.36rem;
    border: 0.02rem solid #fff;
    border-radius: 0.7rem;
    display: inline-flex;
    list-style: none;
    justify-content: center;
    flex-direction:row;
  }
  .bookshelf_tabbar li{
    width: 50%;
    line-height: .52rem;
    font-size: .3rem;
    font-weight: 400;
    color: #fff;
    display: inline-block;
    position: relative;
    text-align: center;
    border-top-left-radius: 0.7rem;
    border-bottom-left-radius: 0.7rem;
    border-top-right-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
    -webkit-tap-highlight-color: transparent;
  }
  .bookshelf_tabbar li.on{
    background-color: #fff;
    color: #fd7d49;
  }
  .bookshelf_tabbar li.new::before{
    content: "";
    width: 0.14rem;
    height: 0.14rem;
    position: absolute;
    background-color: #fff;
    right: 0.14rem;
    top: 0.06rem;
    border-radius: 0.7rem;
  }
  /* content */
  .bookshelf_wrap{
    height:calc(100vh - 1.8rem);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color:#fff;
  }
  .history_wrap{
    padding:0.4rem 0.24rem;
    list-style: none;
  }
  .history_item{
    margin-bottom: 0.4rem;
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .history_item .history_content{
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height:1.46rem;
    transition: all .3s;
  }
  .history_item .history_content.on{
    transform: translate(0.78rem);
  }
  .checkBox{
    position: absolute;
    width: .44rem;
    height: .44rem;
    background: url('../../static/images/icon8.png') 50% no-repeat;
    background-size: .44rem;
    top: .46rem;
    z-index:0;
  }
  .checkBox.on{
    background-image: url('../../static/images/zf_icon.png');
  }
  .history_item:nth-last-child(1){margin-bottom:0;}
  .history_img{
    width: 2.32rem;
    height: 1.46rem;
    vertical-align: middle;
    object-fit: cover;
    background-color:#ffffff;
  }
  .history_c{
    margin-left:0.3rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    height:100%;
    overflow: hidden;
  }
  .history_c .h_t{
    line-height: .44rem;
    font-size: .3rem;
    color: #333;
    display: inline-block;
    width: 3.42rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .history_c .h_n{
    line-height: .32rem;
    color: #909090;
    font-size: .25rem;
  }
  .history_c .h_j{
    color: #fd7d49;
    line-height: .32rem;
    font-size: .25rem;
  }
  .history_c .h_j::after{
    content: '';
    width:0.15rem;
    height:0.29rem;
    background-image: url('../../static/images/arrow_icon.png');
    background-repeat: no-repeat;
    background-size:100% 100%;
    display: inline-block;
    vertical-align: top;
    margin-left:0.3rem;
  }
  /* collection */
  .collec_container{}
  .collec_wrap{
    padding:0.4rem 0.24rem;
    display: flex;
    flex-wrap: wrap;
  }
  .collec_item{
    width:calc(100% / 3 - 0.14rem);
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-right:0.21rem;
    margin-bottom: 0.3rem;
    -webkit-tap-highlight-color: transparent;
  }
  .collec_item:nth-child(3n){margin-right:0;}
  .pst_rlt{position: relative;}
  .pst_rlt::before{
    content: '';
    width: .54rem;
    height: .56rem;
    background: url('../../static/images/label_recommend_icon.png') 50% no-repeat;
    background-size: .54rem;
    position: absolute;
    left: -.12rem;
    top: -.12rem;
  }
  .pst_rlt.active::before{
    content: '';
    width: .54rem;
    height: .56rem;
    background: url('../../static/images/label_new_icon.png') 50% no-repeat;
    background-size: .54rem;
    position: absolute;
    left: -.12rem;
    top: -.12rem;
  }
  .pst_rlt .imgbg_cover{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    background-repeat: no-repeat;
    background-position: right .1rem top .1rem;
    background-size: .44rem;
    background-image: url('../../static/images/icon8.png');
  }
  .pst_rlt .imgbg_cover.on{
    background-image: url('../../static/images/gx1.png');
  }

  .collec_item .colle_img{
    width: 2.2rem;
    height: 3.07rem;
    vertical-align: middle;
    object-fit: cover;
  }
  
  .collec_c{
    padding-top: .12rem;
    font-size:0;
  }
  .collec_c .c_t{
    line-height: .44rem;
    font-size: .3rem;
    color: #333;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .collec_c .c_n{
    line-height: 0.36rem;
    color: gray;
    font-size: 0.24rem;
  }
  /* 喜欢 */
  .like_container{
    padding:0 0.24rem 0.3rem;
  }
  .like_title{margin-bottom: 0.3rem;}
  .like_title .l_t{
    padding-left: .43rem;
    font-size: .3rem;
    color: #333;
    background: url('../../static/images/icon2.png') 0 no-repeat;
    background-size: .21rem;
  }
  .like_wrap{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  .like_item{
    width:calc(100% / 3 - 0.14rem);
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-right:0.21rem;
    -webkit-tap-highlight-color: transparent;
  }
  .like_item:nth-child(3n){margin-right:0;}
  .like_item .like_img{
    width: 2.2rem;
    height: 3.07rem;
    vertical-align: middle;
    object-fit: cover;
  }
  .like_item .l_n{
    line-height: .44rem;
    font-size: .3rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top:0.1rem;
    text-align: left;
  }
  /* 按钮 */
  .setBtn_container{
    position: fixed;
    left:0;
    bottom:1rem;
    z-index: 1;
    width: 100%;
    background-color:#fff;
    transform: translate3d(0,0,0);
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .fadeInUp{animation-name: fadeInUp;}
  .fadeInDown{animation-name:fadeInDown;}
  .hidden{display:none;}
  @keyframes fadeInUp{
    0%{opacity: 0;bottom: 0;}
    100%{opacity:1;bottom: 1rem;}
  }
  @keyframes fadeInDown{
    0%{opacity: 1;bottom: 1rem;}
    100%{opacity:0;bottom: 0rem;}
  }
  .setBtn_wrap{
    display: flex;
    border-top: .02rem solid #e1e1e1;
  }
  .setBtn_wrap .s_btn{
    flex: 1;
    line-height: .98rem;
    font-size: .32rem;
    color: #909090;
    display: inline-block;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }
  .setBtn_wrap .s_btn:nth-child(1){border-right:0.02rem solid #e1e1e1;}
  .setBtn_wrap .s_btn:nth-child(1)::before{
    content: '';
    display: inline-block;
    width:0.44rem;
    height:0.44rem;
    background: url('../../static/images/icon8.png')  no-repeat;
    background-size:100% 100%;
    vertical-align:sub;
    margin-right:0.2rem;
  }
  .setBtn_wrap .s_btn:nth-child(1).on::before{
    background: url('../../static/images/zf_icon.png')  no-repeat;
    background-size:100% 100%;
  }
  .setBtn_wrap .s_btn:nth-child(2)::before{
    content: '';
    display: inline-block;
    width:0.44rem;
    height:0.44rem;
    background: url('../../static/images/icon10.png')  no-repeat;
    background-size:100% 100%;
    vertical-align:sub;
    margin-right:0.2rem;
  }
  .load_promt{
      line-height: .6rem;
      font-size: .28rem;
      color: #909090;
      text-align: center;
  }
</style>