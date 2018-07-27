<template>
  <div id="app">
    <router-view/>
    <div class="load_container" v-show="loadShowEvent"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      loadShow:false,
    }
  },
  computed:{
    loadShowEvent(){
      this.loadShow = this.$store.state.loadShow
      return this.loadShow;
    }
  }
}
</script>

<style>
  .load_container{
    position: fixed;
    height: 100%;
    background-image: url('http://img.super-dreamers.com/xqmall/images/x_loading.gif');
    background-repeat: no-repeat;
    background-position: center 30%;
    background-size: auto 2.3rem;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
  }
</style>
