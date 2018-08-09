<template>
    <div class="dayUpdate_container">
        <div class="dayUpdate_head">
            <h1 class="dayUpdate_t">
                <ul class="dayUpdate_tabbar">
                    <li :class="current==0?'on':''" @click="tabbarEvent(0)">关注</li>
                    <li :class="current==1?'on':''"  @click="tabbarEvent(1)">热门</li>
                </ul>
                <div class="searchBtn" @click="$router.push('/cartoon/search')"></div>
            </h1>
        </div>
        <div class="dayUpadate_wrap">
            <!-- hot -->
            <div class="dayUpadate_box" v-if="current == 0">
                <div class="">
                关注
                </div>
            </div>
            <!-- guanzhu -->
            <div class="dayUpadate_box" v-if=" current == 1">
                <div class="gz_title"></div>
                <div class="gz_wrap">
                热门
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            current:1,
            HotDatUpdateData:[]
        }
    },
    mounted() {
        this.getDayUpdateData();
    },
    methods:{
        getDayUpdateData(){
            var _self = this;
            this.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-everydayNew')
            .then(function(response){
                _self.HotDatUpdateData = response.data;
                console.log(response)
            })
        },
        tabbarEvent(current){
            this.current = current;
        }
    }
}
</script>

<style scoped>
    .dayUpdate_head{
        position: fixed;
        width:100%;
        top:0;
        left:0;
        z-index: 3;
    }
    .dayUpdate_t{
        height:0.8rem;
        background-color:#fd7d49;
        font-size: 0.3rem;
        color: #fff;
        text-align: center;
        line-height: 0.8rem;
        position: relative;
    }
    .dayUpdate_tabbar{
        width:2.36rem;
        border: 0.02rem solid #fff;
        border-radius: 0.7rem;
        display: inline-flex;
        list-style: none;
        justify-content: center;
        flex-direction:row;
    }
    .dayUpdate_tabbar li{
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
    .dayUpdate_tabbar li.on{
        background-color: #fff;
        color: #fd7d49;
    }
    .searchBtn{
        width: .36rem;
        height: .38rem;
        background: url(../../static/images/search2.png) 50% no-repeat;
        background-size: 100%;
        position: absolute;
        right: .36rem;
        top: .23rem;
    }
    /* 身体 */
    .dayUpadate_wrap{
        padding-top:0.8rem;
    }
</style>
