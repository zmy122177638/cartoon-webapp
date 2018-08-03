<template>
    <div class="mynews_container">
        <div class="mynews_wrap" v-if="newsData != ''">
           
        </div>
        <fail-view v-else></fail-view>
    </div>
</template>

<script>
import fail from '../components/fail'
export default {
    data(){
        return{
            newsData:[]
        }
    },
    components:{
        'fail-view':fail
    }
}
</script>

<style>

</style>
