<template>
    <div class="rechargeRecord_container">
        <div class="rechargeRecord_wrap" v-if="rechargeRecordData != ''">
           
        </div>
        <fail-view v-else></fail-view>
    </div>
</template>

<script>
import fail from '../components/fail'
export default {
    data(){
        return{
            rechargeRecordData:[]
        }
    },
    components:{
        'fail-view':fail
    }
}
</script>

<style>

</style>