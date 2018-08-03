<template>
    <div class="signinRule_container">
        <div class="signinRule_wrap">
            <img src="../../static/images/rules-img.png" class="signinRule_title" alt="">
            <div class="signinRule_content">
                <p>周一至周日共7天为一个签到周期;</p>
                <p>每天签到送不同额度赠币,连续签到7天,第7天额外送100赠币;</p>
                <p>如果有一天断签,这周将无法获得额外的100赠币;</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .signinRule_container{
        background: url('../../static/images/bg4.png') top no-repeat;
        height:100vh;
        background-size:7.5rem;
        padding-top: 2.22rem;
        box-sizing: border-box;
        text-align: center;
        background-color: #fd7d49;
    }
    .signinRule_title{
        width: 2.4rem;
        margin-bottom: .12rem;
    }
    .signinRule_content{
        padding: 0 .68rem 0 .86rem;
        font-size: 0;
        text-align: left;
    }
    .signinRule_content p{
        line-height: .5rem;
        color: #323232;
        margin-top: .26rem;
        font-size: .3rem;
        position: relative;
    }
    .signinRule_content p::before{
        content: "";
        width: .09rem;
        height: .09rem;
        border-radius: 50px;
        background-color: #fd7d49;
        position: absolute;
        left: -.29rem;
        top: .21rem;

    }
</style>
