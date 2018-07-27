<template>
  <div class="app_container">
    <router-view></router-view>
    <div class="tabbar_container">
        <ul class="tabbar_wrap">
            <li><router-link to="/home" class="tabbar_naviTo">
                <span class="tabbar_icon"></span>
             </router-link></li>
             <li><router-link to="/category" class="tabbar_naviTo">
                <span class="tabbar_icon"></span>
             </router-link></li>
             <li><router-link to="/bookshelf" class="tabbar_naviTo">
                <span class="tabbar_icon"></span>
             </router-link></li>
             <li><router-link to="/mypage" class="tabbar_naviTo">
                <span class="tabbar_icon"></span>
             </router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .app_container{padding-bottom:1rem;min-height: 100vh;box-sizing: border-box;}
    .tabbar_container{
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        border-top:0.02rem solid #e0e0e0;
        background-color:#Ffffff;
        z-index:55;
    }
    .tabbar_wrap{
        display: flex;
        list-style: none;
    }
    .tabbar_wrap li{flex:1;}
    .tabbar_naviTo{
        text-decoration: none;
        width: 100%;
        display: block;
        height:1rem;
        -webkit-tap-highlight-color: transparent;
    }
    .tabbar_wrap li:nth-child(1) .tabbar_naviTo .tabbar_icon{
        display: inline-block;
        width:100%;
        height:100%;
        background:url('../../static/images/tabbar_01.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(2) .tabbar_naviTo .tabbar_icon{
        display: inline-block;
        width:100%;
        height:100%;
        background:url('../../static/images/tabbar_02.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(3) .tabbar_naviTo .tabbar_icon{
        display: inline-block;
        width:100%;
        height:100%;
        background:url('../../static/images/tabbar_03.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(4) .tabbar_naviTo .tabbar_icon{
        display: inline-block;
        width:100%;
        height:100%;
        background:url('../../static/images/tabbar_04.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(1) .router-link-exact-active .tabbar_icon{
        background:url('../../static/images/tabbar_01_c.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(2) .router-link-exact-active .tabbar_icon{
        background:url('../../static/images/tabbar_02_c.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(3) .router-link-exact-active .tabbar_icon{
        background:url('../../static/images/tabbar_03_c.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
    .tabbar_wrap li:nth-child(4) .router-link-exact-active .tabbar_icon{
        background:url('../../static/images/tabbar_04_c.png') no-repeat;
        background-position: center;
        background-size:0.47rem;
    }
 
</style>