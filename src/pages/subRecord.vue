<template>
    <div class="subRecord_container" ref="scrollview">
        <div class="subRecord_wrap" v-if="payAutoData.length != 0">
            <ul class="pay_list" >
                <li class="pay_item" v-for="item in payAutoData" :key="item.createtime">
                    <figure><img src="" v-lazy="item.img_url" alt="" class="pay_item_img"></figure>
                    <div class="pay_item_c">
                        <h3>{{item.name}}</h3>
                        <p>第{{item.sort_number}}话</p>
                        <p>￥{{item.coin}}</p>
                        <p>{{item.createtime}}</p>
                    </div>
                </li>
            </ul>
            <p class="load_promt" v-if="loadShow">没有更多了~</p>
        </div>
        <fail-view v-else></fail-view>
    </div>
</template>

<script>
import fail from '../components/fail'
export default {
    data(){
        return{
            loadShow:false,
            payAutoData:[],
            page:1,
            throttle_B:false,
            scrollview:''
        }
    },
    components:{
        'fail-view':fail
    },
    mounted(){
        this.ajaxEvent();
        this.scrollview = this.$refs.scrollview;
        this.scrollview.addEventListener('scroll',this.Pulluploading,false)
    },
    methods:{
        
        ajaxEvent(){
            var _self = this;
            _self.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-chapterRecord',_self.$qs.stringify({page:_self.page,uid:_self.$store.state.uid}))
            .then(function(response){
                if(response.data == ""){
                    _self.scrollview.removeEventListener('scroll',_self.Pulluploading,false)
                    _self.loadShow = !_self.loadShow;
                }else{
                    _self.payAutoData = _self.payAutoData.concat(response.data); 
                }
                _self.$store.state.loadShow =false;
                console.log(response)
            })
        },
        
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
                        _self.ajaxEvent();
                        _self.throttle_B = false;
                    },300)
                    _self.throttle_B = true;
                }else{
                    return;
                }
            }
        },   
    }
}
</script>

<style>
    .subRecord_container{
        -webkit-overflow-scrolling: touch;
        height:100vh;
        overflow:auto;
    }
    .pay_list{
        padding:0.4rem 0;
        list-style: none;
    }
    .pay_item{
        padding:0 0.24rem;
        display: flex;
        margin-bottom:0.3rem;
        align-items: center;
    } 
    .pay_item:nth-last-child(1){margin-bottom: 0;}
    .pay_item_img{
        width: 1.5rem;
        height:2.1rem;
        vertical-align: middle;
        object-fit:cover;
    }
    .pay_item_c{
        margin-lefT:0.3rem;
        flex: 1;
    }
    .pay_item_c h3{
        line-height: .5rem;
        color: #333;
        font-size: .32rem;
    }
    .pay_item_c p{
        line-height: .44rem;
        color: #909090;
        font-size: .26rem;
    }
    .pay_item_c p:nth-last-child(1){margin-top:0.3rem;}
    .payautoBtn{
        -webkit-tap-highlight-color: transparent;
        width: 1.7rem;
        line-height: .46rem;
        border: .02rem solid #fd7d49;
        color: #fd7d49;
        box-sizing: border-box;
        text-align: center;
        border-radius:0.7rem;
        font-size: .28rem;
        align-self:flex-start;
    }
    .load_promt{
        line-height: .6rem;
        font-size: .28rem;
        color: #909090;
        text-align: center;
    }
</style>


