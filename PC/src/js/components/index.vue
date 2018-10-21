<template>
    <div>
        <p-c-header></p-c-header>
        <transition name="fade">
            <router-view>

            </router-view>
        </transition>
        <chart></chart>
        <p-c-footer></p-c-footer>
    </div>
</template>

<script>
import "css/index.less"
import header from "./common/header.vue"
import footer from "./common/footer.vue"
import chart from "./common/chart.vue"
export default{
    data(){
        return{

        }
    },
    components : {
        PCHeader : header,
        PCFooter : footer,
        chart
    },
}
</script>

<style lang='less' type="text/less">
    @import "../../css/config.less";
    html,body{
        background: white;
        font-family: Microsoft YaHei;
    }
    .headerBarActive{
        color: @colorRed!important;
    }
</style>
