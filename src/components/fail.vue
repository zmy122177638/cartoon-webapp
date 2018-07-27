<template>
  <div class="fail_container">
    <div class="fail_wrap">
        <img src="../../static/images/x-kong_icon.png" class="fail_img" alt="">
        <p class="fail_promt">没有相关数据哦</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fail_wrap{text-align: center;}
.fail_img{
    width: 3.93rem;
    margin-top: 2rem;
    margin-bottom: .1rem;
}
.fail_promt{
    margin-top: .28rem;
    color: #999;
    font-size:0.28rem;
}
</style>