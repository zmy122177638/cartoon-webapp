<template>
  <div class="moreCartoon_container" ref="scrollview">
    <ul class="moreCartoon_wrap">
      <li class="moreCartoon_item" v-for="item in classData" :key="item.cid" @click="navigateTocartoonDetail(item)">
        <figure><img src="" v-lazy="item.img_url" class="cartoon_img" alt=""></figure>
        <div class="cartoon_c">
          <p class="cartoon_t">{{item.name}}</p>
          <p class="desc">{{item.brief}}</p>
          <p class="starNum"><span>{{item.browse > 9999 ? (Math.floor(item.browse/1000)/10) + '万' : item.browse}}</span><span>{{item.praise}}</span></p>
        </div>
      </li>
    </ul>
    <!-- 加载 -->
    <div class="loadpromt" v-if="loadEnd">没有更多了~</div>
  </div>
</template>

<script>
export default {
  name: 'moreCartoon',
  data () {
    return {
      pageNum:1,
      throttle_B:false,
      loadEnd:false,
      scrollview:'',
      cartoonClass:[
        {page:1,type:0,freePay:0,serialEnd:0,newHot:1,name:'新作推荐'}, //新作推荐 
        {page:1,type:0,freePay:0,serialEnd:0,newHot:2,name:'热门佳作'},  //热门佳作
        {page:1,type:0,freePay:0,serialEnd:2,newHot:0,name:'精品完结'},  //精品完结
        {page:1,type:6,freePay:0,serialEnd:0,newHot:0,name:'真人漫画'},  //真人漫画
        {page:1,type:0,freePay:0,serialEnd:0,newHot:2,name:'人气作品'},  //人气作品
      ],
      classData:[]
    }
  },
  mounted(){
    this.axiosEvent(this.cartoonClass[this.$route.query.classIndex]);
    this.scrollview = this.$refs.scrollview;
    this.scrollview.addEventListener('scroll',this.Pulluploading,false)
  },
  methods:{
    axiosEvent(classobj){
      var _self = this;
      classobj.page = _self.pageNum;
      console.log(classobj)
      _self.$store.state.loadShow =true;
      _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-select_type',_self.$qs.stringify(classobj))
      .then(function(response){
        if(response.data == ""){
          _self.loadEnd = true;
          _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
        }else{
          console.log(response)
          _self.classData = _self.classData.concat(response.data);
          if(_self.classData.length < 10){
            _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false);
            _self.loadEnd = true;
          }
        }
        _self.$store.state.loadShow =false;
      })
    },
    Pulluploading(){
      var _self = this;
      var scrollTop = _self.scrollview.scrollTop;
      var scrollHeight = _self.scrollview.scrollHeight;
      var clientHeight = _self.scrollview.clientHeight;
      if(scrollHeight - clientHeight < scrollTop+1){
        if(!_self.throttle_B){
          _self.pageNum++;
          _self.axiosEvent(_self.cartoonClass[_self.$route.query.classIndex]);
          setTimeout(function(){
              _self.throttle_B = false;
          },1000)
          _self.throttle_B = true;
        }else{
          return;
        }
      }
    },
    navigateTocartoonDetail(item){
      this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:item.cid}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moreCartoon_container{
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  max-height:100vh;
}
.moreCartoon_wrap{
  padding:0.4rem 0.24rem 0;
  list-style: none;
}
.moreCartoon_item{
  display: flex;
  align-items: center;
  margin-bottom:0.4rem;
  -webkit-tap-highlight-color: transparent;
}
.moreCartoon_item:nth-last-child(1){margin-bottom: 0;}
.cartoon_img{
  width: 2.32rem;
  height: 1.46rem;
  margin-right: 0.3rem;
}
.cartoon_c{max-width: calc(100% - 2.62rem)}
.cartoon_c .cartoon_t{
  line-height: .43rem;
  color: #333;
  font-size: .32rem;
}
.cartoon_c .desc{
  line-height: .53rem;
  color: #b4b4b4;
  font-size: .28rem;
  margin-bottom: .06rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cartoon_c .starNum span{
  line-height: .44rem;
  background-repeat: no-repeat;
  background-position: 0;
  margin-right: .4rem;
  font-size: .28rem;
  display: inline-block;
  color: #909090;
}
.cartoon_c .starNum span:nth-child(1){
  background-size: .2rem;
  background-image: url('../../static/images/icon30.png');
  padding-left: .27rem;
}
.cartoon_c .starNum span:nth-child(2){
  background-size: .25rem;
  background-image: url('../../static/images/icon31.png');
  padding-left: .33rem;
}
/* 加载 */
.loadpromt{
  font-size:0.28rem;
  padding:0.4rem 0 0.3rem;
  text-align: center;
  color:#909090;
}
</style>