<template>
    <div class="search_container">
        <div class="search_header">
            <div class="search_box">
                <input type="text" name="" placeholder="请输入作者名或作品" v-model="keyword" id="keyword">
                <span class="delValueBtn" v-show="keyword!=''" @click="keyword=''"></span>
            </div>
            <div :class="['searchBtn',keyword!=''?'on':'']" @click="startSearchEvent()">搜索</div>
        </div>

            <div class="searchwrap" v-show="!endShow">
                <div class="title">热门搜索</div>
                <div class="centent">

                </div>
            </div>
            <div class="searchwrap" v-show="!endShow" v-if="searchHistoryData != ''">
                <div class="title">搜索历史</div>
                <div class="hostory_centent">
                    <ul class="hostory_list">
                        <li class="hostory_item" v-for="(item,index) in searchHistoryData" @click="gethistorvalue(item)">
                            <span class="l_icon"></span>
                            <p class="item_C">{{item}} </p>
                            <span class="r_icon" @click.stop="delHistory(index)"></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="searchwrap" v-if="!isYes && endShow">
                <div class="title">搜索结果</div>
                <div class="end_centent">
                   <ul class="searchEnd_list">
                       <li class="searchEnd_item" v-for="item in searchEndData" :key="item.cid" @click="navigateTocartoonDetail(item)">
                           <figure><img :src="item.img_url" class="c_img" alt=""></figure>
                            <div class="item_c">
                                <h3>{{item.name}}</h3>
                                <p>作者：{{item.author}}</p>
                                <p><span v-for="ctype in item.label" :key="ctype">{{ctype}}</span></p>
                            </div>
                            <p class="item_f">更新到{{item.set_number}}话</p>
                       </li>
                   </ul>
                   <div class="loadpromt">没有更多了~</div>
                </div>
            </div>
            <fail-view v-if="isYes"></fail-view>

    </div>
</template>

<script>
import fail from '../components/fail'
export default {
    data(){
        return{
            keyword:'',
            endShow:false,
            isYes:false,
            searchHistoryData:[],
            searchEndData:[],
        }
    },
    components:{
        'fail-view':fail
    },
    mounted(){
        this.searchHistoryData = JSON.parse(localStorage.getItem('searchHistoryData'))||[];
    },
    watch:{
        keyword(val){
            if(val == ''){
                this.endShow = false;
                this.isYes = false;
            }
        }
    },
    methods:{
        startSearchEvent(){
            var _self = this;
            _self.endShow = true;
            _self.$store.state.loadShow = true;
            _self.searchHistoryData.unshift(_self.keyword)
            _self.searchHistoryData = [...new Set(_self.searchHistoryData)]
            localStorage.setItem('searchHistoryData',JSON.stringify(_self.searchHistoryData))
            this.$axios.post('https://www.yixueqm.com/cartoon/index.php/Home-Cartoon-select_cartoon',this.$qs.stringify({name:this.keyword}))
            .then(function(response){
                console.log(response)
                if(response.data == ""){
                    _self.isYes = true;
                }else{
                    _self.searchEndData = response.data;
                    _self.isYes = false;
                }
                _self.$store.state.loadShow = false;
            })
            .catch(function(error){console.log(error)})
        },
        gethistorvalue(item){
            this.keyword = item;
            this.startSearchEvent();
        },
        navigateTocartoonDetail(item){
            this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:item.cid}})
        },
        delHistory(index){
            this.searchHistoryData.splice(index,1)
            localStorage.setItem('searchHistoryData',JSON.stringify(this.searchHistoryData))
        }
    }
}
</script>

<style scoped>
    .search_header{
        padding:0.2rem 0.24rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: .02rem solid #e1e1e1;
    }
    .search_box{position: relative;flex: 1;margin-right:0.2rem;}
    .search_box #keyword{
        width: 100%;
        height: .6rem;
        line-height: 1;
        box-sizing: border-box;
        border-radius: 50px;
        border: none;
        font-size: .28rem;
        padding-left: .7rem;
        background: url('../../static/images/search.png') left .2rem center no-repeat;
        background-size: .3rem;
        background-color: #f5f5f5;
        padding-right: .53rem;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
    #keyword::-webkit-input-placeholder{color:#B5B5B5;}
    .delValueBtn{
        position: absolute;
        right: .2rem;
        top: .15rem;
        width: .31rem;
        height: .31rem;
        background: url('../../static/images/icon12.png') 50% no-repeat;
        background-size: .31rem;
        -webkit-tap-highlight-color: transparent;
    }
    .searchBtn{
        width: 1rem;
        text-align: center;
        line-height: .6rem;
        color: #333;
        font-size: .28rem;
        background-color:#ccc;
        color:#ffffff;
        border-radius: 0.1rem; 
        transition: .3s; 
        -webkit-tap-highlight-color: transparent;
    }
    .searchBtn.on{background:#db4852;}

    .searchwrap{
        padding:0.3rem 0.24rem;
    }
    .title{
        line-height: .6rem;
        font-size: .3rem;
        color: #909090;
    }
    .centent{
        padding:0.2rem 0;
    }
    .hostory_list{
        list-style: none;
    }
    .hostory_item{
       display: flex;
       align-items: center;
       border-bottom: .02rem solid #e1e1e1;
       -webkit-tap-highlight-color: transparent;
    }
    .hostory_item .l_icon{
        display: block;
        width: .3rem;
        height:0.3rem;
        background:url('../../static/images/icon11.png') no-repeat;
        background-size:100% 100%;
        margin-right: 0.2rem;
    }
    .hostory_item .item_C{
        flex:1;
        line-height: .88rem;
        font-size: .28rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .hostory_item .r_icon{
        display: block;
        width: 0.31rem;
        height:0.31rem;
        background:url('../../static/images/icon12.png') no-repeat;
        background-size:100% 100%;
        -webkit-tap-highlight-color: transparent;
    }

    .searchEnd_list{list-style: none;}
    .searchEnd_list .searchEnd_item{
        display: flex;
        padding:0.2rem 0;
        -webkit-tap-highlight-color: transparent;
    }
    .searchEnd_item .c_img{width:2.32rem;height:1.46rem;vertical-align: middle;}
    .searchEnd_item .item_c{
        display: flex;
        flex-direction:column;
        margin:0 0.36rem;
        flex: 1;
        overflow: hidden;
        justify-content:space-between;
    }
    .searchEnd_item .item_c h3{
        line-height: .4rem;
        font-weight: 700;
        font-size: .3rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .searchEnd_item .item_c p:nth-child(2){
        line-height: .56rem;
        color: #909090;
        font-size: .26rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .searchEnd_item .item_c p:nth-child(3) span{
        padding: 0 .2rem;
        border: .02rem solid #d7d7da;
        color: #909090;
        display: inline-block;
        border-radius: 50px;
        box-sizing: border-box;
        margin-right: .1rem;
        font-size: .28rem;
    }
    .searchEnd_item .item_f{
        line-height: .4rem;
        font-size: .24rem;
        color: #909090;
        align-self: flex-start;
    }
    .loadpromt{
        line-height: .6rem;
        background-size: .48rem;
        font-size: .28rem;
        color: #909090;
        text-align: center;
    }
</style>
