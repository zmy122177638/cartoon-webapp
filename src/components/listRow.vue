<template>
  <div class="listRow_container">
    <div class="listRow_title">
        <h2>{{title}}</h2>
        <span class="more_btn" @click="$emit('setcartoonclass')">更多</span>
    </div>
    <ul class="listRow_content">
        <li :class="classSwitch" 
            v-for="item in rowObj" 
            :key="item.id" 
            @click="navigateToDetailes(item)">
            <figure><img src="" v-lazy="item.img_url" alt="" class="listRow_c_i"></figure>
            <div class="listRow_c_c" v-if="row != '1'">
                <p>{{item.name}}</p>
                <p>{{item.brief}}</p>
            </div>
            <div class="listRow_c_c_1" v-else>
                <p>{{item.name}}</p>
                <p>更新至第<span style="color:rgb(253, 125, 73);">{{item.set_number}}</span></p>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'listRow',
  props:["rowObj","row",'title','cartoonType'],   //rowobj 子数组 row排列参数仅支持1,2,3  title标题 cartoonType 分类
  data () {
    return {
        
    }
  },
  mounted(){
  },
  methods:{
    // 详情页
    navigateToDetailes(item){
        this.$router.push({path:'/cartoon/cartoonDetail',query:{cid:item.cid}})
    },
  },
  computed:{
    classSwitch(){
        if(this.row == "1"){
            return 'listRow1_c_item'
        }
        if(this.row == "2"){
            return 'listRow2_c_item'
        }
        if(this.row == "3"){
            return 'listRow3_c_item'
        }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* 标题 */
    .listRow_title{position: relative;padding:0.15rem 0;line-height: 0.9rem;}
    .listRow_title h2{
        font-weight: bold;
        font-size: 0.32rem;
        color: #333;
        text-align: center;
    }
    .listRow_title .more_btn{
        position: absolute;
        font-size:0.26rem;
        color:#fe7c4a;
        right:0.2rem;
        transform: translateY(-50%);
        top:50%;
        -webkit-tap-highlight-color: transparent;
    }
    .listRow_title .more_btn::after{
        content:'';
        width:0.28rem;
        height:0.28rem;
        display: inline-block;
        vertical-align:middle;
        margin-left:0.1rem;
        background:url('../../static/images/more.png') no-repeat;
        background-size:100% 100%;
    }
    /* 内容 */
    .listRow_content{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
    }
    /* Row1 */
    .listRow1_c_item{width: 100%;}
    .listRow1_c_item .listRow_c_i{width:100%;height:100%;object-fit: cover;}
    .listRow1_c_item .listRow_c_c_1{
        display: flex;
        padding:0.3rem 0.2rem;
        justify-content: space-between;
    }
    .listRow1_c_item .listRow_c_c_1 p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .listRow1_c_item .listRow_c_c_1 p:nth-child(1){font-size:0.28rem;color:#333333;max-width: 3.2rem;}
    .listRow1_c_item .listRow_c_c_1 p:nth-child(2){font-size:0.28rem;color:#909090;}
    /* Row2 */
    .listRow2_c_item{
        width:calc(50% - 0.03rem);
        box-sizing: border-box;
        margin-bottom: 0.3rem;
    }
    .listRow2_c_item:nth-child(odd){
        margin-right:0.03rem;
    }
    .listRow2_c_item:nth-child(even){
        margin-left:0.03rem;
    }
    .listRow2_c_item .listRow_c_i{width:100%;height:2.31rem;object-fit: cover;}
    /* Row3 */
    .listRow3_c_item{
        width:calc(100% / 3 - 0.02rem);
        box-sizing: border-box;
        margin-bottom: 0.3rem;
    }
    .listRow3_c_item:nth-child(3n+1){
        margin-right:0.03rem;
    }
    .listRow3_c_item:nth-child(3n){
        margin-left:0.03rem;
    }
    .listRow3_c_item .listRow_c_i{width:100%;height:3.42rem;object-fit: cover;}

    .listRow_c_c{
        width: 100%;
        padding:0.2rem;
        box-sizing: border-box;
    }
    .listRow_c_c p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .listRow_c_c p:nth-child(1){
        width: 100%;
        line-height:0.76rem;
        font-size: 0.28rem;
        color: #333333;
    }
    .listRow_c_c p:nth-child(2){
        width: 100%;
        font-size: 0.24rem;
        color: #909090;
    }
    
</style>