<template>
  <div class="category_container">
    <div class="category_head">
      <h1 class="category_title">分类<span class="search_b" @click="searchEvent()"></span></h1>
    </div>
    <div class="category_wrap" ref="scrollBox">
      <div class="category_select">
        <ul class="select_wrap">
          <li :class="['category_item',type==0?'on':'']" @click="selectTypeEvent(1,0,serialEnd,freePay,newHot)">全部</li>
          <li :class="['category_item',type==1?'on':'']" @click="selectTypeEvent(1,1,serialEnd,freePay,newHot)">恋爱</li>
          <li :class="['category_item',type==2?'on':'']" @click="selectTypeEvent(1,2,serialEnd,freePay,newHot)">都市</li>
          <li :class="['category_item',type==3?'on':'']" @click="selectTypeEvent(1,3,serialEnd,freePay,newHot)">伦理</li>
          <li :class="['category_item',type==4?'on':'']" @click="selectTypeEvent(1,4,serialEnd,freePay,newHot)">异能</li>
          <li :class="['category_item',type==5?'on':'']" @click="selectTypeEvent(1,5,serialEnd,freePay,newHot)">搞笑</li>
          <li :class="['category_item',type==6?'on':'']" @click="selectTypeEvent(1,6,serialEnd,freePay,newHot)">真人</li>
          <li :class="['category_item',type==7?'on':'']" @click="selectTypeEvent(1,7,serialEnd,freePay,newHot)">其他</li>
          <li :class="['more_category',moreWrapShow?'on':'']" @click="moreSelectEvent()">筛选</li>
        </ul>
        <div class="more_container" v-show="moreWrapShow">
          <ul class="more_wrap">
            <li :class="['category_item',serialEnd==0?'on':'']" @click="selectTypeEvent(1,type,0,freePay,newHot)">全部</li>
            <li :class="['category_item',serialEnd==1?'on':'']" @click="selectTypeEvent(1,type,1,freePay,newHot)">连载</li>
            <li :class="['category_item',serialEnd==2?'on':'']" @click="selectTypeEvent(1,type,2,freePay,newHot)">完结</li>
          </ul>
          <ul class="more_wrap">
            <li :class="['category_item',freePay==0?'on':'']" @click="selectTypeEvent(1,type,serialEnd,0,newHot)">全部</li>
            <li :class="['category_item',freePay==1?'on':'']" @click="selectTypeEvent(1,type,serialEnd,1,newHot)">免费</li>
            <li :class="['category_item',freePay==2?'on':'']" @click="selectTypeEvent(1,type,serialEnd,2,newHot)">付费</li>
          </ul>
          <ul class="more_wrap">
            <li :class="['category_item',newHot==0?'on':'']" @click="selectTypeEvent(1,type,serialEnd,freePay,0)">全部</li>
            <li :class="['category_item',newHot==1?'on':'']" @click="selectTypeEvent(1,type,serialEnd,freePay,1)">最热</li>
            <li :class="['category_item',newHot==2?'on':'']" @click="selectTypeEvent(1,type,serialEnd,freePay,2)">最新</li>
          </ul>
        </div>
      </div>
      <div class="category_content" v-if="cartoonData.length != ''">
        <ul class="cartoon_wrap">
          <li class="cartoon_item" v-for="item in cartoonData" :key="item.cid" @click="navigateToDetailes(item)">
            <figure><img src="" v-lazy="item.img_url" class="cartoon_img" alt=""></figure>
            <div class="cartoon_C">
              <h3 class="cartoon_n"><p>{{item.name}}</p><p>更新到{{item.set_number}}话</p></h3>
              <p class="cartoon_t">
                <span v-for="(ctype,index) in item.label" :key="ctype">{{ctype}}<span class="dian" v-if="index!=item.label.length-1">•</span></span>
              </p>
            </div>
          </li>
        </ul>
        <!-- 加载 -->
        <div class="loadpromt" v-if="loadEnd">没有更多了~</div>
      </div>
      <fail-view v-else></fail-view>
    </div>
  </div>
</template>

<script>
import fail from '../components/fail'
export default {
  name: 'category',
  data () {
    return {
      moreWrapShow:false,
      page:1, //分页
      type:0, //类型
      serialEnd:0,
      freePay:0,
      newHot:0,
      throttle_B:false,
      loadEnd:false,
      cartoonData:[],
      scrollview:null,
    }
  },
  components:{
    'fail-view':fail
  },
  mounted(){
    this.cartoonDataEvent();
    this.scrollview = this.$refs.scrollBox;
    this.scrollview.addEventListener('scroll',this.Pulluploading,false);
  },
  methods:{
    // axiosType  0初始数据 1
    cartoonDataEvent(axiosType){
      var _self = this;
      _self.$store.state.loadShow =true;
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-select_type',_self.$qs.stringify({page:_self.page,type:_self.type,serialEnd:_self.serialEnd,freePay:_self.freePay,newHot:_self.newHot}))
      .then(function(response){
        console.log(response)
        if(response.data == ""){
          _self.loadEnd = true;
          _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false);
        }else{
          if(axiosType){
            _self.cartoonData = _self.cartoonData.concat( response.data);
          }else{
            _self.cartoonData = response.data;
            if(_self.cartoonData.length < 10){
              _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false);
              _self.loadEnd = true;
            }
          }
        }
        _self.$store.state.loadShow =false;
      })
    },
    // 上拉加载
    Pulluploading(){
      var _self = this;
      var scrollTop = _self.scrollview.scrollTop;
      var scrollHeight = _self.scrollview.scrollHeight;
      var clientHeight = _self.scrollview.clientHeight;
      if(scrollHeight - clientHeight < scrollTop+1){
        if(!_self.throttle_B){
          setTimeout(function(){
            _self.page++;
            _self.cartoonDataEvent(1);
            _self.throttle_B = false;
          },300)
          _self.throttle_B = true;
        }else{
          return;
        }
      }
    },
    // 漫画详情
    navigateToDetailes(item){
      this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:item.cid}})
    },
    // 类型选择
    selectTypeEvent(page,type,serialEnd,freePay,newHot){
      this.page = page;
      this.type = type;
      this.serialEnd = serialEnd;
      this.freePay = freePay;
      this.newHot = newHot;
      this.loadEnd = false;
      this.scrollview.addEventListener('scroll',this.Pulluploading,false);
      this.cartoonDataEvent(0);
    },
    // 筛选
    moreSelectEvent(){
      this.moreWrapShow = !this.moreWrapShow;
    },
    // 搜素
    searchEvent(){
        this.$router.push({path:'/cartoon/search',})
    },
  },
  destroyed(){
    this.scrollview.removeEventListener('scroll',this.Pulluploading,false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .category_container{
    height:-webkit-fill-available;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    padding:0.8rem 0 0;
  }
  .category_head{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  .category_title{
    height:0.8rem;
    background-color: #fd7d49;
    font-size:0.3rem;
    line-height: 0.8rem;
    text-align: center;
    position: relative;
    color:#fff;
    font-weight: 400;
  }
  .search_b{
    width: .36rem;
    height: 0.38rem;
    display: inline-block;
    background: url('../../static/images/search2.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right:0.36rem;
    top:50%;
    margin-top:-0.19rem;
    -webkit-tap-highlight-color: transparent;
  }
  .category_wrap{
    overflow: auto;
    height: inherit;
    -webkit-overflow-scrolling: touch;
  }
  /* 选择 */
  .category_select{
    position: relative;
  }
  .select_wrap{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding:0.3rem 0.24rem;
    border-bottom: .2rem solid #f2f5f5;
    position: relative;
  }
  .category_item.on{
    background-color: #fd7d49;
    color: #fff;
  }
  .category_item{
    width: 1.28rem;
    line-height: .45rem;
    text-align: center;
    font-size:0.28rem;
    color:#909090;
    border-radius:0.7rem;
    margin: 0 .15rem .14rem 0;
    -webkit-tap-highlight-color: transparent;
  }
  .category_item:nth-child(5n){margin-right:0;}
  .more_category{
    color: #fd7d49;
    background: url('../../static/images/arrow2.png') 0 no-repeat;
    position: absolute;
    z-index: 1;
    right: .15rem;
    background-color: #fff;
    width: 1.28rem;
    line-height: .45rem;
    margin:0 0.15rem 0.14rem 0;
    font-size: .28rem;
    text-align: center;
    border-radius:0.7rem;
    bottom:0.3rem;
  }
  .more_category.on{
    background: url('../../static/images/arrow.png') 0 no-repeat;
  }
  /* more */
  .more_container{position: absolute;width: 100%;left:0;background-color:#fff;top:calc(100% - 0.25rem);}
  .more_wrap{display: flex;flex-wrap: wrap;list-style: none;padding:0 0.24rem;margin-bottom:0.26rem;}
  /* 漫画 */
  .cartoon_wrap{
    padding:0.3rem 0.26rem;
    list-style: none;
  }
  .cartoon_item{
    display: flex;
    align-items: center;
    margin-bottom:0.4rem;
    -webkit-tap-highlight-color: transparent;
  } 
  .cartoon_item:nth-last-child(1){margin-bottom:0;}
  .cartoon_img{
    width: 2.32rem;
    height: 1.46rem;
    vertical-align: middle;
  }
  .cartoon_C{
    margin-left:0.32rem;
    width:calc(100% - 2.64rem);
    height:1.46rem;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
  }
  .dian{margin:0.05rem;}
  .cartoon_n{
    display: flex;
    justify-content: space-between;
  }
  .cartoon_n p:nth-child(1){
    font-weight: 700;
    font-size: 0.3rem;
    color: #323232;
  }
  .cartoon_n p:nth-child(2){
    font-weight: 400;
    font-size: 0.24rem;
    color: #999;
  }
  .cartoon_t{
    color: #909090;
    box-sizing: border-box;
    font-size: .28rem;
    padding-left: 0.34rem;
    background: url('../../static/images/index_label_icon.png') 0 no-repeat;
    background-size: 0.23rem;
  }
  /* 加载 */
  .loadpromt{
    font-size:0.28rem;
    padding:0.3rem 0;
    text-align: center;
    color:#909090;
  }
</style>