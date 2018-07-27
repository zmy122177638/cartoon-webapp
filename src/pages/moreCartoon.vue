<template>
  <div class="moreCartoon_container">
    <ul class="moreCartoon_wrap">
      <li class="moreCartoon_item">
        <figure><img src="http://img.super-dreamers.com/xqmall/images/3b3373c0-cb48-4765-b580-b93b28ffe1c4.jpg@75Q" class="cartoon_img" alt=""></figure>
        <div class="cartoon_c">
          <p class="cartoon_t">重返全台</p>
          <p class="desc">曾经拳坛新星在经历打击之后如说的，啊的撒打</p>
          <p class="starNum"><span>184万</span><span>55</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'moreCartoon',
  data () {
    return {
        
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moreCartoon_wrap{
  padding:0.4rem 0.24rem 0;
  list-style: none;
}
.moreCartoon_item{
  display: flex;
  align-items: center;
  margin-bottom:0.4rem;
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
</style>